const express = require('express');
const data = require('./db.json');
const createError = require('http-errors');

const controller = express.Router();

controller.get('/', (req, res) => {
    res.json(data);
});

controller.get('/:id/vaccinated', (req, res, next) => {
    const person = data.person.find(item => item.id === Number(req.params.id));             // mivel egy person tömbben vannak az objektumok, ezért
    if (!person) {
        return next(            // a next megszakítja a jelenlegi folyamatot és továbbdobja a következő middleware-nek a kérést
            new createError.BadRequest("Person is not found!")
        )
    }
    if (person.vaccine !== "") {
        res.json(`${person.firstName} ${person.lastName} has the ${person.vaccine} vaccine.`);
    } else {
        res.json(`${person.firstName} ${person.lastName} does not have any vaccine.`);
    }
});

// Create
controller.post('/', (req, res, next) => {
    if (!last_name || !first_name || !email) {
        return next(            // a next megszakítja a jelenlegi folyamatot és továbbdobja a következő middleware-nek a kérést
            new createError.BadRequest("Missing properties!")
        )
    }

    const newPerson = req.body;

    newPerson.id = data.person[data.person.length - 1].id + 1;
    data.person.push(newPerson);

    res.status(201);            // ez egy speciális státusz, amikor sikerült létrehozni az új erőforrást
    res.json(newPerson);
});

// Update
controller.put('/:id/:vaccine', (req, res, next) => {         // így kell, ez egy url változó lesz így, vigyázzunk itt put metódus kell, nem post
    const id = req.params.id;                   // ami a kettőspont után van az egy változó és ezt így érem el.
    //const vaccine = req.params.vaccine;
    const index = data.person.findIndex(p => p.id === Number(id))      // ez a Number konstruktorba tevés azért kell, hogy ne legyen gond a típusokkal, mert az url-ben stringként kapom, de a db-ben számként kezelem.

    const { firstName, lastName, vaccine } = req.body;

    if (!firstName || !lastName || !vaccine) {
        return next(            // a next megszakítja a jelenlegi folyamatot és továbbdobja a következő middleware-nek a kérést
            new createError.BadRequest("Missing properties!")
        )
    }

    data.person[index] = {
        id,
        //first_name: req.body                                  // így kellene, ha nem lenne a fenti objektum
        firstName: firstName,                                             // req.body.firstName,
        lastName: lastName,
        vaccine
    }

    res.json(data.person[index]);
});

// Delete
controller.delete('/:vaccine', (req, res, next) => {
    const vaccine = req.params.vaccine;
    const index = data.person.find(p => p.vaccine === vaccine);
    if (index === undefined) {         // a find undefined-al tér vissza ha nincs találata
        return next(            // a next megszakítja a jelenlegi folyamatot és továbbdobja a következő middleware-nek a kérést
            new createError.BadRequest("Person is not found!")
        )
    }
    data.person.forEach((item, index) => {
        if (item.vaccine === vaccine) {
            data.person.splice(index, 1);                   // így kell megadni, hogy azt törölje, ahol van találat és ne máshol
        }
    });
    res.json({});
});


module.exports = controller;