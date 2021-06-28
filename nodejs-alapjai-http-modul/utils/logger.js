const logger = (urlData, methodData) => {
    const date = new Date().toLocaleDateString('hu')
    console.log(`Date: ${date} Url: ${urlData} Method: ${methodData}`)
}

module.exports = Object.freeze(logger)