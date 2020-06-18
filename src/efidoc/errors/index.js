exports.badRequest = (res, details = null, error = null)  => {
	res.status(400).json(message('Bad Request', details, error));
}

exports.unauthorized = (res, details = null, error = null) => {
	res.status(401).json(message('Unauthorized', details, error));
}

exports.forbidden = (res, details = null, error = null) => {
	res.status(403).json(message('Forbidden', details, error));
}

exports.notFound = (res, details = null, error = null) => {
	res.status(404).json(message('Not Found', details, error));
}

exports.locked = (res, details = null, error = null) =>  {
	res.status(423).json(message('Locked', details, error));
}

exports.internal = (res, details = null, error = null)  => {
	res.status(500).json(message('Internal Server Error', details, error));
}

const message = (title, details = null, error = null) => {
	let result = (typeof details === 'string')
		? { title, details: { type: 'generic', message: details } }
		: { title, details }
	if (process.env.NODE_ENV === 'development') {
		result.error = error;
	}

	return result
}
