const { News, User } = require('../db/models');

const Logger = require('../utils/logger');

const logger = new Logger();

async function getAllNews() {
	try {
		const newses = await News.findAll({
			include: [
				{
					model: User,
					attributes: ['firstName', 'lastName'],
				},
			],
			raw: true,
			order: [['createdAt', 'DESC']],
		});
		logger.log('getAllNews: Newses Fetched!!', 'info');
		return {
			newses,
			error: null,
		};
	} catch (error) {
		logger.log(
			`getAllNews: Could Not Get Newses, Error: ${error.message}`,
			'error',
		);
		return {
			newses: null,
			error,
		};
	}
}

async function getNewsById(id) {
	try {
		const news = await News.findOne({
			where: {
				id,
			},
			raw: true,
		});
		logger.log('getNewsById: News Fetched!!', 'info');
		return {
			news,
			error: null,
		};
	} catch (error) {
		logger.log(
			`getNewsById: Could Not Get News, Error: ${error.message}`,
			'error',
		);
		return {
			news: null,
			error,
		};
	}
}

async function createNews(newsDTO) {
	try {
		const news = await News.create(newsDTO);
		logger.log('createNews: News Created!!', 'info');
		return {
			news,
			error: null,
		};
	} catch (error) {
		logger.log(
			`getNewsById: Could Not Create News, Error: ${error.message}`,
			'error',
		);
		return {
			news: null,
			error,
		};
	}
}

async function updateNews(newsId, newsDTO) {
	try {
		const news = await News.update(newsDTO, {
			where: { id: newsId },
		});
		logger.log('updateNews: News Updated!!', 'info');
		return {
			news,
			error: null,
		};
	} catch (error) {
		logger.log(
			`updateNews: Could Not Update News, Error: ${error.message}`,
			'error',
		);
		return {
			news: null,
			error,
		};
	}
}

async function deleteNews(newsId) {
	try {
		const news = await News.destroy({
			where: { id: newsId },
		});
		logger.log('deleteNews: News Deleted!!', 'info');
		return {
			news,
			error: null,
		};
	} catch (error) {
		logger.log(
			`deleteNews: Could Not Delete News, Error: ${error.message}`,
			'error',
		);
		return {
			news: null,
			error,
		};
	}
}

module.exports = {
	getAllNews,
	getNewsById,
	createNews,
	updateNews,
	deleteNews,
};
