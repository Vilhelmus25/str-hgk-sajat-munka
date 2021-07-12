const express = require('express');
const data = require('./db.json');

const controller = express.Router();

controller.get('/count', (req, res) => {
    const filteredArray = data.person.filter((item) => item.vaccine !== "")
    res.json(`The number of veccinated persons in the database is: ${filteredArray.length}`);
});

controller.get('/vaccinated', (req, res) => {
    const filteredArray = data.person.filter((item) => item.vaccine !== "")
    res.json(`The people vaccinated are: ${JSON.stringify(filteredArray)}`);
});

module.exports = controller;