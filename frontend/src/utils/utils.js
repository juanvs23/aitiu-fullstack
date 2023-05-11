export function addEmptyProperties(arr, obj) {
	const requiredProperties = arr;
	const newObj = { ...obj };
	requiredProperties.forEach(prop => {
		if (!(prop in newObj)) {
			newObj[prop] = '';
		}
	});
	return newObj;
}

export function hasProperties(obj, props) {
	for (let prop of props) {
		if (!(prop in obj) || obj[prop] === '') {
			return false;
		}
	}
	return true;
}
