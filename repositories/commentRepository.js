const { Comment, User } = require('../db/models');
const Logger = require('../utils/logger');

const logger = new Logger();

async function createComment(commentDTO) {
	try {
		const comment = await Comment.create(commentDTO);
		logger.log('createComment: Comment Created!!', 'info');
		return {
			comment,
			error: null,
		};
	} catch (error) {
		logger.log(
			`createComment: Could Not Create Comment, Error: ${error.message}`,
			'error',
		);
		return {
			comment: null,
			error,
		};
	}
}

async function getAllCommentsOfaNews(newsId) {
	try {
		const comments = await Comment.findAll({
			where: {
				newsId,
			},
			include: [
				{
					model: User,
					attributes: ['firstName', 'lastName'],
				},
			],
			raw: true,
		});
		logger.log('createComment: Comments Fetched!!', 'info');
		return {
			comments,
			error: null,
		};
	} catch (error) {
		logger.log(
			`createComment: Could Not Fetch Comments, Error: ${error.message}`,
			'error',
		);
		return {
			comments: null,
			error,
		};
	}
}

module.exports = {
	createComment,
	getAllCommentsOfaNews,
};
