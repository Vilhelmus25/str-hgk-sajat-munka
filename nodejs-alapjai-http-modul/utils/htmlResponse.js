const { createReadStream } = require('fs')
const logger = require('./logger')                          // a logoláshoz

const { join } = require('path')

const htmlResponse = (req, res, file, statusCode = 200) => {
    res.writeHead(statusCode, {
        'Content-Type': 'text/html'
    })
    createReadStream(join(__dirname, `../views/${file}.html`)).pipe(res)
    //console.log(req)
    logger(req.url, req.method)                 // a htmlResponse fv-be a req paramétert fel kellett venni és felfelé a meghívásban mindenhol

}

module.exports = htmlResponse