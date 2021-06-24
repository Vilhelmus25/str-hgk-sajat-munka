// const { readFileSync, writeFileSync } = require('fs')
const { readFile, writeFile } = require('fs').promises              // ez fontos, ha nem sync

const MoviesApi = (path, prop) => ({        // egy objectet adunk vissza, ezért kell a () és azon belül vanaz object {}

    async get() {
        const dataString = await readFile(path)
        return JSON.parse(dataString)[prop]               // nem kell az egész fájl parse-olni, hanem elég csak egy adott propertyjű részt kell, amit paraméterül kap
    },

    async save(data) {
        await writeFile(path, JSON.stringify({ [prop]: data }))               // melyik fájlt, valamint paraméterül egy tömböt fogok kapni, ami objecteket tartalmaz, ezeket stringesíteni kell egy JSON fájlba; a [prop] helyére kerül mondjuk egy movies és a data pedig egy tömb, ami az összes objectet tartalmazza

    }

})
module.exports = MoviesApi                                       // ha egy van akkor nem kell a freeze
