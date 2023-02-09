/* eslint-disable operator-linebreak */
/* eslint-disable func-names */
const _ = require('lodash');
const Logger = require('../utils/logger');
const verifyToken = require('../utils/verifyToken');
const newsPayloadValidator = require('../validators/newsPayloadValidators');
const newsRepository = require('../repositories/newsRepository');

const logger = new Logger();

// eslint-disable-next-line no-unused-vars
module.exports = (io) => {
	const createNews = async function (payload) {
		const socket = this;
		logger.log(
			`Event Received To Create News, Payload: ${JSON.stringify(payload)}`,
		);

		const validationResult =
			newsPayloadValidator.validateCreateNewsPayload(payload);

		const { errorMessage, isValidPayload, validatedPayload } = validationResult;

		if (!isValidPayload) {
			return socket.emit('news:create:error', errorMessage);
		}

		const { token } = validatedPayload;

		if (token) {
			const { isValidToken, user } = verifyToken(token);
			if (isValidToken) {
				const newsDTO = {
					title: payload.title,
					subTitle: payload.subTitle,
					description: payload.description,
					userId: user.id,
				};
				const { error, news } = await newsRepository.createNews(newsDTO);
				if (error) {
					return socket.emit('news:create:error', 'Something went wrong');
				}
				return socket.emit('news:create:success', { news });
			}
			return socket.emit('news:create:error', 'Invalid Token');
		}
		return socket.emit('news:create:error', 'Missing Token');
	};

	const getNewsById = async function (payload) {
		const socket = this;

		logger.log(
			`Event Received To Get News By ID, Payload: ${JSON.stringify(payload)}`,
		);

		const validationResult =
			newsPayloadValidator.validateGetNewsByIdPayload(payload);

		const { errorMessage, isValidPayload, validatedPayload } = validationResult;

		if (!isValidPayload) {
			return socket.emit('news:view:error', errorMessage);
		}

		const { newsId, token } = validatedPayload;

		if (token) {
			const { isValidToken } = verifyToken(token);
			if (isValidToken) {
				const { error, news } = await newsRepository.getNewsById(newsId);
				if (error) {
					return socket.emit('news:view:error', 'Something went wrong');
				}
				if (_.isEmpty(news)) {
					return socket.emit('news:view:error', 'News not found');
				}
				return socket.emit('news:view:success', { news });
			}
			return socket.emit('news:view:error', 'Invalid Token');
		}
		return socket.emit('news:view:error', 'Missing Token');
	};

	const getAllNews = async function (payload) {
		const socket = this;
		logger.log(
			`Event Received To Fetch All News, Payload: ${JSON.stringify(payload)}`,
		);

		const validationResult =
			newsPayloadValidator.validateGetAllNewsEventPayload(payload);

		const { errorMessage, isValidPayload, validatedPayload } = validationResult;

		if (!isValidPayload) {
			return socket.emit('news:list:error', errorMessage);
		}
		const { token } = validatedPayload;

		if (token) {
			const { isValidToken } = verifyToken(token);
			if (isValidToken) {
				const { error, newses } = await newsRepository.getAllNews();
				if (error) {
					return socket.emit('news:list:error', 'Something went wrong');
				}
				return socket.emit('news:list:success', { newses });
			}
			return socket.emit('news:list:error', 'Invalid Token');
		}

		return socket.emit('news:list:error', 'Missing Token');
	};

	return {
		createNews,
		readNews: getNewsById,
		listNews: getAllNews,
	};
};
