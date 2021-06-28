const http = require('http')
const SiteRouter = require('./router/site.router')

//const port = 8080       // mi van ha nem fixen beégetve akarjuk a port-ot, hanem környezeti változóból
const port = process.env.PORT || 8080       // abban az esetben, ha van olyan környezeti változónk, aminek van portszáma, akkor használja azt, ha nincs akkor a 8080 -at
// terminals: set PORT=8081

http.createServer((req, res) => {       // a { url } a req helyett van
    SiteRouter[req.url] ? SiteRouter[req.url](req, res) : SiteRouter['/404'](req, res)        // és akkor a req.url helyett url-t lehet írni
})
    .on('error', err => console.log(`Server error: ${err.message}`))
    .on('listening', () => console.log(`Server is running at http://127.0.0.1:${port}`))        // így elegánsabb ha netán hiba van
    .listen(port)
