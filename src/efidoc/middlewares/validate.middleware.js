const errors = require('../errors');

module.exports = (schema) => (req, res, next) => {
	const {
		error
	} = schema.validate(req.body, {
		abortEarly: false
	});
	if (error) {
		errors.badRequest(res, {
			type: 'Validation',
			errors: error.details.map(item => ({
				message: item.message,
				key: item.context.key
			}))
		}, error);
		return;
	}
	next();
}