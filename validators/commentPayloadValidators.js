const Joi = require('joi');

const validatePayload = require('./eventPayloadValidator');

function validateCommentCreateData(data) {
	const schema = Joi.object({
		message: Joi.string().required(),
		newsId: Joi.string().uuid({ version: 'uuidv4' }).required(),
		userId: Joi.string().uuid({ version: 'uuidv4' }).required(),
		token: Joi.string().required(),
	}).messages({
		'object.base': "payload should be a type of 'object'",
	});
	return validatePayload(data, schema);
}

function validateGetAllCommentsOfaNewsData(data) {
	const schema = Joi.object({
		newsId: Joi.string().uuid({ version: 'uuidv4' }).required(),
		token: Joi.string().required(),
	}).messages({
		'object.base': "payload should be a type of 'object'",
	});
	return validatePayload(data, schema);
}

module.exports = {
	validateCommentCreateData,
	validateGetAllCommentsOfaNewsData,
};
