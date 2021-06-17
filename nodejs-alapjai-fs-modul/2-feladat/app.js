// 2. Feladat
// Az állományok archiválásához kell készítened egy egyszerű alkalmazást.
// Az alkalmazás egy paraméterként megadott útvonalon lévő fájlról készít egy másolatot ugyanabba a könyvtárba.
// A fájl útvonala/neve elég, ha egy változóban van tárolva.
// Az új fájl neve az eredeti fájl neve a végén a .bak kiegészítéssel.
// Ennek a fájlnak a tartalmát egy gz fájlba becsomagoljuk be.
// Amennyiben a minden művelet sikeres volt, az eredeti fájlt és a .bak fájlt is töröljük ki!

const { createReadStream, createWriteStream, rm } = require('fs')
const { createGzip } = require('zlib')

const path = "./szamarkohoges.txt"

const readableStream = createReadStream(path, {
    encoding: 'utf-8',
    highWaterMark: 11

})

const writeableStream = createWriteStream(`./${path}Copy.bak`)
const fileCopyPath = writeableStream.path.toString()

const createCompressedFile = createWriteStream(`./${fileCopyPath}.gz`)

readableStream.pipe(writeableStream)

readableStream.pipe(createGzip()).pipe(createCompressedFile)

rm(`./${path}Copy.bak`,
    () => { })
rm(`./${fileCopyPath}.gz`,
    () => { })



