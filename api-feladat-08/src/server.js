const express = require('express');
const app = express();
const config = require('config');
const logger = require('./config/logger');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { username, password, host } = config.get('database');

mongoose
    .connect(`mongodb+srv://${username}:${password}@${host}`, {    // ezt a mongoose odlalról másoltam ki amit előtte autogeneráltattam; Itt volt egy <password> rész, ami helyett bemásoltam a fenti jelszót, ez fontos!
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => logger.info('MongoDB connection has been established successfully.'))
    .catch(err => {
        logger.error(err);
        process.exit();
    });

app.use(morgan('combined', { stream: logger.stream }));

app.use(bodyParser.json());         // így használjuk a bodyparsert
app.use('/person', require('./controllers/person/routes'));

app.use((err, req, res, next) => {          // ez a hiba le kezelése, akkor amikor ha mégis meghívodna
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message                // le is kezeltem és vissza is küldtem a választ
    });
})