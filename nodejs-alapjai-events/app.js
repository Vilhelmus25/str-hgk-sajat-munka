const { createReadStream, createWriteStream, readFile } = require('fs');
const { Transform } = require('stream');
const { Logger } = require('./logger');
const path = require('path');

// Oszály a transzformáláshoz.
class TitleCaseStream extends Transform {
    constructor() {
        super();                // a Transform miatt
    }

    // A _transform metódus felel az átalakításért.
    _transform(chunk, enc, done) {
        // A chunk.toString azért kell, mert Buffert kapunk, ami nem 
        // karaktereket, hanem bájtokat tartalmaz.
        const output = chunk.toString('utf8').split(' ')
            .map(word => {
                return `${word[0].toUpperCase()}${word.slice(1)}`;
            })
            .join(' ');
        this.push(output);
        done();
    };
}

class JsonStream extends Transform {
    constructor() {
        super();
    }

    // A _transform metódus felel az átalakításért.
    _transform(chunk, enc, done) {
        // A chunk.toString azért kell, mert Buffert kapunk, ami nem 
        // karaktereket, hanem bájtokat tartalmaz.
        const output = JSON.stringify({ data: chunk.toString('utf8') });
        this.push(output);
        done();
    };
}

const rStream = createReadStream(
    path.join(__dirname, 'lóverkéz.txt'),
    {
        encoding: 'utf8',
        highWaterMark: 1024,
        function(error = new Error()) {
            if (error) {
                const logger = new Logger()
                logger.loggerError(error.message.toString())
            }
        }

    }

);

const wStream = createWriteStream(
    path.join(__dirname, 'försztáppörkéz.txt'),
    {
        encoding: 'utf8',
        function(error = new Error()) {
            if (error) {
                const logger = new Logger()
                logger.loggerError(error.message.toString())
            }
        }

    }
);

wStream.on('finish', () => {
    const logger = new Logger()
    logger.loggerSuccess('File transform successful.')
});

rStream.pipe(new TitleCaseStream()).pipe(new JsonStream()).pipe(wStream);