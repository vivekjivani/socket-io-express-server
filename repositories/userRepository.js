const { User } = require('../db/models');
const Logger = require('../utils/logger');

const logger = new Logger();

async function getUserById(userId) {
	try {
		const user = await User.findOne({
			where: { id: userId },
			raw: true,
		});
		logger.log('getUserById: User Fetched!!', 'info');
		return {
			user,
			error: null,
		};
	} catch (error) {
		logger.log(
			`getUserById: Could Not Get User, Error: ${error.message}`,
			'error',
		);
		return {
			user: null,
			error,
		};
	}
}

async function getUserByEmail(userEmail) {
	try {
		const user = await User.findOne({
			where: { email: userEmail },
			raw: true,
		});
		logger.log('getUserByEmail: User Fetched!!', 'info');
		return {
			user,
			error: null,
		};
	} catch (error) {
		logger.log(
			`getUserByEmail: Could Not Get User, Error: ${error.message}`,
			'error',
		);
		return {
			user: null,
			error,
		};
	}
}

async function createUser(userDTO) {
	try {
		const user = await User.create(userDTO);
		logger.log('createNews: User Created!!', 'info');
		return {
			user,
			error: null,
		};
	} catch (error) {
		logger.log(
			`createUser: Could Not Create User, Error: ${error.message}`,
			'error',
		);
		return {
			user: null,
			error,
		};
	}
}

module.exports = {
	getUserById,
	getUserByEmail,
	createUser,
};
