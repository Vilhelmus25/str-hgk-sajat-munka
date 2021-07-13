const express = require('express');
const data = require('./db.json');

const controller = express.Router();

controller.get('/:id/vaccinated', (req, res) => {
    const person = data.person.find(item => item.id === parseInt(req.params.id));
    console.log(person);
    //const filteredArray = data.person.filter((item) => item.vaccine !== "")
    if (person.vaccine !== "") {
        res.json(`${person.firstName} ${person.lastName} has the ${person.vaccine} vaccine.`);
    } else {
        res.json(`${person.firstName} ${person.lastName} does not have any vaccine.`);
    }
});

// controller.get('/vaccinated', (req, res) => {
//     const filteredArray = data.person.filter((item) => item.vaccine !== "")
//     res.json(`The people vaccinated are: ${JSON.stringify(filteredArray)}`);
// });

module.exports = controller;