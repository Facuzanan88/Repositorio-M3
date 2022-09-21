function pluck(array, prop) {
    return array.map(e => e[prop])
}

module.exports = {
    pluck
}