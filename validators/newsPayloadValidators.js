const Joi = require('joi');
const validatePayload = require('./eventPayloadValidator');

// { isValidPayload: true, validatedPayload, error: null }

const tokenSchema = Joi.string().required();

function validateGetAllNewsEventPayload(payload) {
	const schema = Joi.object({
		token: tokenSchema,
	}).messages({
		'object.base': "payload should be a type of 'object'",
	});
	return validatePayload(payload, schema);
}

function validateCreateNewsPayload(payload) {
	const schema = Joi.object({
		title: Joi.string().min(3).required(),
		subTitle: Joi.string().required(),
		description: Joi.string().required(),
		token: tokenSchema,
	}).messages({
		'object.base': "payload should be a type of 'object'",
	});
	return validatePayload(payload, schema);
}

function validateGetNewsByIdPayload(payload) {
	const schema = Joi.object({
		newsId: Joi.string().required(),
		token: tokenSchema,
	}).messages({
		'object.base': "payload should be a type of 'object'",
	});
	return validatePayload(payload, schema);
}
module.exports = {
	validateCreateNewsPayload,
	validateGetNewsByIdPayload,
	validateGetAllNewsEventPayload,
};
