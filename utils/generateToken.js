const jwt = require('jsonwebtoken');
const appConfig = require('../config/appConfig');
const Logger = require('./logger');

const logger = new Logger();

/**
 * Generates a JWT Token
 * @param {object} userData
 * @param {string} userData.id
 * @param {string} userData.email
 * @returns {string} user signed token
 */
function generateToken(userData) {
	const { id: userId, email: userEmail } = userData;
	try {
		const token = jwt.sign(
			{ id: userId, email: userEmail },
			process.env.JWT_SECRETE,
			{
				expiresIn: appConfig.jwt.tokenExpiresIn,
			},
		);
		logger.log('generateToken: Token Generated!', 'info');
		return token;
	} catch (error) {
		logger.log(
			`generateToken: Could Not Generate Token, Error: ${error.message}`,
			'error',
		);
		return null;
	}
}

module.exports = generateToken;
