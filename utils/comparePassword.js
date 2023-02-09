const bcrypt = require('bcryptjs');
const Logger = require('./logger');

const logger = new Logger();

/**
 * Compares User Provided Password with Encrypted Password
 * @param {string} actualPassword
 * @param {string} expectedPassword
 * @returns {boolean} true if the password Matches
 */
function comparePassword(actualPassword, expectedPassword) {
	try {
		const isPasswordMatch = bcrypt.compareSync(
			actualPassword,
			expectedPassword,
		);
		logger.log('comparePassword: Password Comparison Success', 'info');
		return isPasswordMatch;
	} catch (error) {
		logger.log(
			`comparePassword: Could Not Compare Passwords, Error: ${error.message}`,
			'error',
		);
		return false;
	}
}

module.exports = comparePassword;
