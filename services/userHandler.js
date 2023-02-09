/* eslint-disable operator-linebreak */
/* eslint-disable func-names */

const _ = require('lodash');
const Logger = require('../utils/logger');
const generateToken = require('../utils/generateToken');
const comparePassword = require('../utils/comparePassword');
const userPayloadValidator = require('../validators/userPayloadValidators');
const userRepository = require('../repositories/userRepository');

const logger = new Logger();

// eslint-disable-next-line no-unused-vars
module.exports = (io) => {
	const register = async function (payload) {
		const socket = this;
		logger.log(
			`Event Received To Register User , Payload: ${JSON.stringify(payload)}`,
		);

		const validationResult =
			userPayloadValidator.validateUserRegistrationData(payload);

		const { errorMessage, isValidPayload, validatedPayload } = validationResult;

		if (!isValidPayload) {
			return socket.emit('user:register:error', errorMessage);
		}

		const { error: errorInGetUserByEmail, user: existingUser } =
			await userRepository.getUserByEmail(validatedPayload.email);

		if (errorInGetUserByEmail) {
			return socket.emit('user:register:error', 'Something went wrong');
		}

		if (!_.isEmpty(existingUser)) {
			return socket.emit('user:register:error', 'Email already in use');
		}

		const { error: errorInCreateUser, user } = await userRepository.createUser(
			validatedPayload,
		);

		if (errorInCreateUser) {
			return socket.emit('user:register:error', 'Something went wrong');
		}

		const token = generateToken({ id: user.id, email: user.email });

		if (token) {
			return socket.emit('user:register:success', { token, user });
		}
		return socket.emit('user:register:error', 'Something went wrong!');
	};

	const login = async function (payload) {
		const socket = this;
		logger.log(
			`Event Received To Authenticate User , Payload: ${JSON.stringify(
				payload,
			)}`,
		);

		const validationResult =
			userPayloadValidator.validateUserLoginData(payload);

		const { errorMessage, isValidPayload, validatedPayload } = validationResult;

		if (!isValidPayload) {
			return socket.emit('user:login:error', errorMessage);
		}

		const { error, user } = await userRepository.getUserByEmail(
			validatedPayload.email,
		);

		if (error) {
			return socket.emit('user:login:error', 'Something went wrong');
		}

		if (_.isEmpty(user)) {
			return socket.emit('user:login:error', 'Invalid credentials');
		}

		const passwordMatch = comparePassword(
			validatedPayload.password,
			user.password,
		);

		if (passwordMatch) {
			const token = generateToken({ id: user.id, email: user.email });

			if (token) {
				return socket.emit('user:login:success', { token, user });
			}
			return socket.emit('user:login:error', 'Something went wrong');
		}
		logger.log('User Password Mismatched');
		return socket.emit('user:login:error', 'Invalid credentials');
	};

	return {
		register,
		login,
	};
};
