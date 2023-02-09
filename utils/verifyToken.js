const jwt = require('jsonwebtoken');
const Logger = require('./logger');

const logger = new Logger();

/**
 * Verifies JWT Token
 * @param {string} token
 * @returns {object}
 */
function verifyToken(token) {
	try {
		const userInfo = jwt.verify(token, process.env.JWT_SECRETE);
		logger.log('verifyToken: Token Verified', 'info');
		return {
			isValidToken: true,
			user: userInfo,
		};
	} catch (error) {
		logger.log(
			`verifyToken: Token Verification Failed ${error.message}`,
			'error',
		);
		return {
			isValidToken: false,
			user: null,
		};
	}
}

module.exports = verifyToken;
