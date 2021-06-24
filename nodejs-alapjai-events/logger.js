class Logger {
    constructor() {

    }

    loggerError(logType) {
        console.error(logType);
    }

    loggerSuccess(logType) {
        console.log(logType);
    }
}
// const logger = new Logger()
// logger.error('asd')
module.exports = Object.freeze({
    Logger
})
