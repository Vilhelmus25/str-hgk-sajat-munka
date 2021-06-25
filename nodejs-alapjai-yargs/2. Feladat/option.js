const option = ({ alias, describe, type = 'string', demandOption = true } = {}) => ({
    alias, describe, type, demandOption
})

const id = option({
    alias: 'i',
    describe: 'Product ID',
    type: 'number'
})

const name = option({
    alias: 'n',
    describe: 'Product name'
})

const price = option({
    alias: 'p',
    describe: 'Product price',
    type: 'number'
})
const count = option({
    alias: 'c',
    describe: 'Product count',
    type: 'number'
})

module.exports = Object.freeze({
    id, name, price, count
})

