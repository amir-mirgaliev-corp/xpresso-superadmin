const toCamelCase = str => str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

const convertKeysToCamelCase = obj => {
	if (obj && typeof obj === "object") {
		if (Array.isArray(obj)) {
			return obj.map(convertKeysToCamelCase);
		}

		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [toCamelCase(key), convertKeysToCamelCase(value)]),
		);
	}
	return obj;
};

export default convertKeysToCamelCase;
