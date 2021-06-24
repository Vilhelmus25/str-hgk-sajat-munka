const ProductsService = async (ProductsApi) => {
    let products = await ProductsApi.get()

    const getAllProducts = () => products

    const sum = async (products) => {
        let sum
        let multiplicatedProducts = products.map(product => {
            product.price * product.count
        })
        for (let mP of multiplicatedProducts) {
            sum += mP
        }
        // console.log(sum)
        return sum
    }

    // const findproductById = (id) => products.find(product => product.id === id)

    // const generateNewproductId = () => {
    //     const sortedProducts = [...products].sort((a, b) => a.id > b.id)
    //     return sortedProducts[sortedProducts.length - 1].id + 1
    // }

    // const createproduct = async ({ producer, title }) => {
    //     const product = { id: generateNewproductId(), producer, title }
    //     products = [...products, product]
    //     await ProductsApi.save(products)
    //     return product
    // }

    // const editproduct = async ({ id, title, producer }) => {
    //     products = products.map(product => product.id === id ? { id, producer, title } : product)
    //     await ProductsApi.save(products)
    //     return findproductById(id)
    // }

    // const removeproduct = async (id) => {
    //     products = products.filter(product => product.id !== id)
    //     await ProductsApi.save(products)
    // }
    return {
        getAllProducts,
        sum,
    }
}

module.exports = ProductsService