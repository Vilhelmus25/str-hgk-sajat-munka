const yargs = require('yargs')
const { id, name, price, count } = require('./option')
const ProductsApi = require('./products.api')
const ProductsService = require('./products.service')

const productsApi = ProductsApi('./products.json', 'products');
(async () => {
    const {
        getAllProducts,
        sum,
        avg,
        lessthan
    } = await ProductsService(productsApi)


    yargs
        .version('1.0.0')
        .usage('Usage: <command> [options]')

        .command({
            command: 'get',
            describe: 'Get all products',
            handler: () => console.log(getAllProducts())
        })
        .command({
            command: 'sum',
            describe: 'Sums the price * count',
            handler: (args) =>
                console.log(sum(args))
        })
        .command({
            command: 'avg',
            describe: 'Counts the total product average',
            handler: (args) =>
                console.log(avg(args))
        })
        .command({
            command: 'lessthan',
            describe: 'Lists the products that have less by given value at stock',
            builder: { count },
            handler: (args) =>
                console.log(lessthan(args))
        })


        .locale('en')
        .strict()
        .help()
        .parse()

})()
