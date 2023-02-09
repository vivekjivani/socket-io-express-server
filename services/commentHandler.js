/* eslint-disable operator-linebreak */
/* eslint-disable func-names */
const _ = require('lodash');

const Logger = require('../utils/logger');
const commentPayloadValidator = require('../validators/commentPayloadValidators');
const commentRepository = require('../repositories/commentRepository');
const userRepository = require('../repositories/userRepository');
const newsRepository = require('../repositories/newsRepository');
const verifyToken = require('../utils/verifyToken');

const logger = new Logger();

// eslint-disable-next-line no-unused-vars
module.exports = (io) => {
	const addComment = async function (payload) {
		const socket = this;
		logger.log(
			`Event Received To Add Comment , Payload: ${JSON.stringify(payload)}`,
		);

		const validationResult =
			commentPayloadValidator.validateCommentCreateData(payload);

		const { errorMessage, isValidPayload, validatedPayload } = validationResult;

		if (!isValidPayload) {
			return socket.emit('comment:create:error', errorMessage);
		}

		// eslint-disable-next-line object-curly-newline
		const { userId, newsId, message, token } = validatedPayload;

		if (token) {
			const { isValidToken } = verifyToken(token);
			if (isValidToken) {
				const { error: errorInFindUser, user } =
					await userRepository.getUserById(validatedPayload.userId);

				if (errorInFindUser) {
					return socket.emit('comment:create:error', 'Something went wrong');
				}

				if (_.isEmpty(user)) {
					return socket.emit('comment:create:error', 'User not found');
				}

				const { error: errorInFindNews, news } =
					await newsRepository.getNewsById(newsId);

				if (errorInFindNews) {
					return socket.emit('comment:create:error', 'Something went wrong');
				}
				if (_.isEmpty(news)) {
					return socket.emit('comment:create:error', 'News not found');
				}
				const commentDTO = {
					userId,
					newsId,
					message,
				};
				const { error: errorInCreateComment, comment } =
					await commentRepository.createComment(commentDTO);

				if (errorInCreateComment) {
					return socket.emit('comment:create:success', comment);
				}
			}
			return socket.emit('comment:create:error', 'Invalid Token');
		}
		return socket.emit('comment:create:error', 'Missing Token');
	};

	const getAllCommentsOfaNews = async function (payload) {
		const socket = this;
		logger.log(
			`Event Received To Fetch All Comments Of a News , Payload: ${JSON.stringify(
				payload,
			)}`,
		);

		const validationResult =
			commentPayloadValidator.validateGetAllCommentsOfaNewsData(payload);

		const { errorMessage, isValidPayload, validatedPayload } = validationResult;

		if (!isValidPayload) {
			return socket.emit('comment:list:error', errorMessage);
		}

		// eslint-disable-next-line object-curly-newline
		const { newsId, token } = validatedPayload;

		if (token) {
			const { isValidToken } = verifyToken(token);
			if (isValidToken) {
				const { error: errorInFindNews, news } =
					await newsRepository.getNewsById(newsId);

				if (errorInFindNews) {
					return socket.emit('comment:list:error', 'Something went wrong');
				}
				if (_.isEmpty(news)) {
					return socket.emit('comment:list:error', 'News not found');
				}
				const { error, comments } =
					await commentRepository.getAllCommentsOfaNews(newsId);

				if (error) {
					return socket.emit('comment:list:error', 'Something went wrong');
				}
				return socket.emit('comment:list:success', { comments });
			}
			return socket.emit('comment:list:error', 'Invalid Token');
		}
		return socket.emit('comment:list:error', 'Missing Token');
	};
	return {
		addComment,
		getAllCommentsOfaNews,
	};
};
