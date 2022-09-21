function numString(string) {
    if (typeof string !== 'string' || string === '') return res.sendStatus(400);

    return string.length;
}

module.exports = {
    numString,
}