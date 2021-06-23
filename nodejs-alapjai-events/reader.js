// Ez egy factory function
const { readFile } = require('fs').promises
const logger = require('./logger')

const reader = (eventEmitter) => {
    const readContent = async (file) => {
        console.log('Reading process started!\nFile:', file)
        try {
            const data = await readFile(file, 'utf8')                           // egy fájlból olvas ki
            const capital = data.toString().charAt(0).toUpperCase()
            console.log(data.toString().charAt(0).toUpperCase())
            console.log('Reading process done successfully')
            eventEmitter.emit('capitalize', capital)
        } catch (error) {
            eventEmitter.emit('error', error)
        }
    }

    const printContent = (content) => {
        console.log('Content: \n', content)
        eventEmitter.emit('close')
    }
    const errorHandler = (err) => {
        console.log('An error occured', err.message)
    }
    const close = () => {
        console.log('Printing process done. App closed!')
    }

    return {
        readContent,
        printContent,
        errorHandler,
        close
    }

}

module.exports = reader