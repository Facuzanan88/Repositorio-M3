function sumArray(array, n) {
    if (!Array.isArray(array)) throw new TypeError('array');
    if (typeof n !== 'number') throw new TypeError('number');
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] + array[j] === n) return true;
        }
    }
    return false;
}

module.exports = {
    sumArray,
}
