const { ok } = require('assert')
const http = require('http')
const url = require('url')

const SiteRouter = require('./router/site.router')
const logger = require('./utils/logger')

const port = 8080

const options = {
    hostname: '',
    port: port,
    path: '/',
    method: 'GET'
};


http.createServer((req, res) => {       // a { url } a req helyett van
    SiteRouter[req.url] ? SiteRouter[req.url](res) : SiteRouter['/404'](res)        // és akkor a req.url helyett url-t lehet írni
})
    .on('error', err => console.log(`Server error: ${err.message}`))
    .on('listening', () => {
        console.log(`Server running at http://127.0.0.1:${port}`)

    })
    .on('open', (req) => {
        console.log(req.protocol + '://' + req.get('host') + req.originalUrl)
    })
    .listen(port)

// http.get(options, (res) => {
//     res.on('data', (d) => {

//     })
// }).on('error', (e) => {
//     console.error(e);
// });
