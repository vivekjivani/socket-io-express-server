const Joi = require('joi');

const validatePayload = require('./eventPayloadValidator');

const emailSchema = Joi.string().email().lowercase().required();
const passwordSchema = Joi.string().min(6).required();
function validateUserRegistrationData(data) {
	const schema = Joi.object({
		firstName: Joi.string().min(3).required(),
		lastName: Joi.string(),
		email: emailSchema,
		password: passwordSchema,
	}).messages({
		'object.base': "payload should be a type of 'object'",
	});
	return validatePayload(data, schema);
}

function validateUserLoginData(data) {
	const schema = Joi.object({
		email: emailSchema,
		password: Joi.string().required(),
	}).messages({
		'object.base': "payload should be a type of 'object'",
	});
	return validatePayload(data, schema);
}

module.exports = {
	validateUserLoginData,
	validateUserRegistrationData,
};
