const express = require('express');
const data = require('./db.json');

const controller = express.Router();

controller.get('/', (req, res) => {
    console.log(data.person);
    const filteredArray = data.person.filter((item) => item.vaccine !== "")
    res.json(`The number of veccinated persons in the database is: ${filteredArray.length}`);
});

module.exports = controller;