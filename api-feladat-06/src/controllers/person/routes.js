const express = require('express');
const createError = require('http-errors');
const Person = require('../../models/person.model');    // most innen jön az adat
const logger = require('../../config/logger')

const controller = express.Router();

controller.get('/', async (req, res) => {                   // az async await a mongoose-sal jött be
    // Person.find()
    const people = await Person.find();
    //.then(people => {
    logger.debug(`Get all people, returning ${people.length} items.`);
    res.json(people);
    //})
})

// // Get one person
// controller.get('/:id', async (req, res, next) => {            // kell a next ahol használom!!!!
//     const person = await Person.findById(req.params.id);
//     if (!person) {
//         return next(            // a next megszakítja a jelenlegi folyamatot és továbbdobja a következő middleware-nek a kérést
//             new createError.NotFound("Person is not found!")        // NotFound
//         );
//     }

//     res.json(person);
// });

// Get the number of vaccinated people
controller.get('/count', async (req, res, next) => {            // kell a next ahol használom!!!!
    // const person = await Person.filter((item) => {
    //     item.vaccine !== ""
    // });

    // if (!person) {
    //     return next(            // a next megszakítja a jelenlegi folyamatot és továbbdobja a következő middleware-nek a kérést
    //         new createError.NotFound("Person is not found!")        // NotFound
    //     );
    // }
    const person = await Person.countDocuments((count) => count);
    res.json(`The number of vaccinated persons in the database is: ${person}`);
});

// Get the only vaccinated people data
controller.get('/vaccinated', async (req, res, next) => {            // kell a next ahol használom!!!!
    const person = await Person.filter((item) => {
        item.vaccine !== ""
    });
    if (!person) {
        return next(            // a next megszakítja a jelenlegi folyamatot és továbbdobja a következő middleware-nek a kérést
            new createError.NotFound("Person is not found!")        // NotFound
        );
    }

    res.json(`The people vaccinated are: ${JSON.stringify(person)}`);
});



// Create a new person
controller.post('/', (req, res, next) => {
    const { firstName, lastName, vaccine } = req.body;
    if (!firstName || !lastName || !vaccine) {
        return next(            // a next megszakítja a jelenlegi folyamatot és továbbdobja a következő middleware-nek a kérést
            new createError.BadRequest("Missing properties!")
        )
    }

    const newPerson = new Person({
        firstName: firstName,
        lastName: lastName,
        email: vaccine
    })
    // // a ^jelenti azt hogy frissíthető, majd az index.js-ben kell egy bodyParser változó, amibe importáljuk a body-parsert.

    newPerson.save()
        .then(data => {                 // egy küldjük el az adatokat
            res.status(201);            // ez egy speciális státusz, amikor sikerült létrehozni az új erőforrást
            res.json(data);             // a data kell persze
        })

});

// Update a person
controller.put('/:id', async (req, res, next) => {         // így kell, ez egy url változó lesz így, vigyázzunk itt put metódus kell, nem post
    const id = req.params.id;                   // ami a kettőspont után van az egy változó és ezt így érem el.
    const { first_name, last_name, email } = req.body;          // egy ojjektumba pakolom

    if (!last_name || !first_name || !email) {
        return next(            // a next megszakítja a jelenlegi folyamatot és továbbdobja a következő middleware-nek a kérést
            new createError.BadRequest("Missing properties!")
        )
    }

    const update = {
        firstName: first_name,
        lastName: last_name,
        email: email
    }
    let person = {};
    try {
        person = await Person.findByIdAndUpdate(id, update, { new: true })           // ha nem létezik, akkor létrehozza {new: true}
    } catch (err) {
        return next(new createError.BadRequest(err));
    }
    return res.json(person);

});

// Delete a person
controller.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    let person = {};
    try {
        person = await Person.findByIdAndDelete(id)           // itt elég csak az id, mert nem update-elünk, hanem törlünk
    } catch (err) {
        return next(new createError.NotFound(err));
    }

    res.json({});               // egy üres objektumot küldök vissza válaszként, de nem is lenne feltétlen szükségválaszra
});

module.exports = controller;
