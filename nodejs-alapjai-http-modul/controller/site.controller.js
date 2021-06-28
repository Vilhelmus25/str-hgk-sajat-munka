const htmlResponse = require('../utils/htmlResponse')

const index = (req, res) => htmlResponse(req, res, 'index')             // a controller igazából csak meghívja a site-ot, nagyobb feladatban service-eket hív meg és visszaad valamit
const about = (req, res) => htmlResponse(req, res, 'about')
const contact = (req, res) => htmlResponse(req, res, 'contact')
const error404 = (req, res) => htmlResponse(req, res, '404')

module.exports = Object.freeze({
    index, about, contact, error404
})