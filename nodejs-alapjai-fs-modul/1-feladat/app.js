// 1. Feladat
// Egy webes projekt esetében gyakran ugyanolyan, vagy hasonló mappástruktúrával dolgozunk. Ahhoz, hogy ne kelljen minden alkalommal manuálisan létrehozni a mappákat, és a fájlokat, készíts egy olyan alkalmazást, ami létrehozza az alábbi mappa/fájlstruktúrát:

// controllers
// site.controller.js
// routers
// site.router.js
// views
// index.html
// app.js
// Most nem kell ellenőrizni, hogy az adott mappák, fájlok léteznek e.

const { access, mkdir, writeFile, readdir/*, rmdir, rename*/ } = require('fs').promises

// const capitalizeFirstLetter = (str) =>
//     str.charAt(0).toUpperCase() + str.slice(1)      // az első betűt naggyá teszem és a többi karaktert hozzáfűzöm (slice)

const createStarterTemplate = () => {
    access('app.js')
        .then(() => mkdir('controllers'))
        .then(() => mkdir('routers'))
        .then(() => mkdir('views'))
        .then(() => writeFile('./controllers/site.controller.js', 'CONTROLLER'))
        .then(() => writeFile('./routers/site.router.js', 'ROUTER'))
        .then(() => writeFile('./views/index.html', 'INDEX'))
        .then(() => readdir('./controllers'))
        .then(() => readdir('./routers'))
        .then(() => readdir('./views'))
        .then(console.log)
        // .then(() => rmdir('tmp'))
        // .then(() => {
        //     const folder = 'controllers'
        //     rename(folder, capitalizeFirstLetter(fodler))       // params: régi és új
        // })
        .catch((err) => console.log('\x1b[31m', err.message))
}

createStarterTemplate()