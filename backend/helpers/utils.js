function addEmptyProperties(arr, obj) {
    const requiredProperties = arr;
    const newObj = { ...obj };
    requiredProperties.forEach(prop => {
        if (!(prop in newObj)) {
            newObj[prop] = '';
        }
    });
    return newObj;
}

function analyzeObject(arr, obj) {
    const requiredProperties = arr;
    let count = 0;
    let nonEmptyCount = 0;
    let value = 1;
    requiredProperties.forEach(prop => {
        if (prop in obj) {
            count += 1;
            if (obj[prop] !== '') {
                nonEmptyCount += 1;
            }
        }
    });
    console.log(nonEmptyCount);
    console.log(count);
    console.log(requiredProperties.length);
    if (nonEmptyCount === count && count === requiredProperties.length) {
        value = 4;
    } else if (nonEmptyCount > 8) {
        value = 3;
    } else if (nonEmptyCount >= 4 && count <= 7) {
        value = 2;
    } else if (nonEmptyCount > 3 && count <= 7) {
        value = 1;
    }
    return value;
}
module.exports = { addEmptyProperties, analyzeObject };
