const ProductsService = async (productsApi) => {
    let products = await productsApi.get()

    const getAllProducts = () => products

    const sum = () => {
        let sum = 0
        let tempArray

        tempArray = products.map((product) => {
            let priceStr = product.price.slice(1, product.price.length)
            let price
            price = Number.parseInt(priceStr)
            //console.log(price, product.count);
            return product.count * price
        })

        for (let arrayItem of tempArray) {
            sum += arrayItem
            //console.log(sum);
        }

        return sum
    }

    const avg = () => {
        let avg = 0
        let tempArray
        let countSum = 0

        tempArray = products.map((product) => product.count)

        for (let arrayItem of tempArray) {
            countSum += arrayItem
        }
        avg = sum() / countSum
        //console.log(avg);
        return avg
    }
    const lessthan = ({ count }) => {                        // a paramétert így adjuk meg, még ha egyedüli is
        let lessthan = 0
        let tempArray

        tempArray = products.map((product) => product.count < count ? true : false)
        //console.log(tempArray);

        for (let arrayItem of tempArray) {
            if (arrayItem === true) {
                lessthan += 1
            }
        }

        return lessthan
    }

    return {
        getAllProducts,
        sum,
        avg,
        lessthan
    }
}

module.exports = ProductsService