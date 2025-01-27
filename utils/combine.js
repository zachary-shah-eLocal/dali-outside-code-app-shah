function isMissingOrNull(value) {
	if (value === undefined || value === null) {
		return true
	}
	return false
}

function combine(item, template) {
	if (!item) {
		return template
	}
	const response = Object.keys(template).reduce((acc, key) => {
		const isMissing = isMissingOrNull(acc[key])

		if (isMissing) {
			acc[key] = template[key]
		} else if (Array.isArray(template[key])) {
			acc[key] = item[key] ? item[key] : []
		} else if (typeof acc[key] === 'object') {
			acc[key] = combine(acc[key], template[key])
		}
		return acc
	}, item)
	return { ...response }
}

export default combine
