function validatePayload(payload, payloadSchema) {
	const options = {
		abortEarly: false,
		allowUnknown: true,
		stripUnknown: true,
	};
	const { error, value: validatedPayload } = payloadSchema.validate(
		payload,
		options,
	);
	if (error) {
		const errorMessage = `Validation error: ${error.details
			.map((x) => x.message)
			.join(', ')}`;
		return { isValidPayload: false, validatedPayload: null, errorMessage };
	}
	return { isValidPayload: true, validatedPayload, errorMessage: null };
}

module.exports = validatePayload;
