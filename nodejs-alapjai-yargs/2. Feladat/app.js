const yargs = require('yargs')
const { id, name, price, count } = require('./option')
const ProductsApi = require('./products.api')
const ProductsService = require('./products.service')

const productsApi = ProductsApi('./products.json', 'products');
(async () => {
    const {
        getAllproducts,
        sum
    } = await ProductsService(productsApi)


    yargs
        .version('1.0.0')
        .usage('Usage: <command> [options]')

        .command({
            command: 'get',
            describe: 'Get all products',
            handler: () => console.log(getAllproducts())
        })
        .command({
            command: 'sum',
            describe: 'Sums the price * count',
            handler: () =>
                console.log(sum())
        })

        // })
        // .command({
        //     command: 'create',
        //     describe: 'Create a new movie',
        //     builder: { producer, title },
        //     handler: async (args) => {                                    
        //         console.log(await createMovie(args))

        //     }
        // })
        // .command({
        //     command: 'edit',
        //     describe: 'Edit a movie',
        //     builder: { id, producer, title },
        //     handler: async (args) => {
        //         console.log(await editMovie(args))
        //     }
        // })
        // .command({
        //     command: 'remove',
        //     describe: 'Remove a movie by ID',
        //     builder: { id },
        //     handler: async (args) => {
        //         await removeMovie(args.id)
        //         console.log('deleted')
        //     }
        // })
        .locale('en')
        .strict()
        .help()
        .parse()

})()
