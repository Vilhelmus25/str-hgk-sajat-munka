const express = require('express');
const createError = require('http-errors');
const personService = require('./person.service');

// Create a new person
exports.create = (req, res, next) => {
    const { last_name, first_name, vaccine } = req.body;
    if (!last_name || !first_name || !vaccine) {
        return next(
            new createError.BadRequest("Missing properties!")
        )
    }

    const newPerson = new Person({
        firstName: first_name,
        lastName: last_name,
        vaccine: vaccine
    })

    return personService.create(newPerson)
        .then(cp => {
            res.status(201);
            res.json(cp);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
};

exports.findAll = (req, res, next) => {
    return personService.findAll()
        .then(people => {
            res.json(people);
        })
};

exports.findOne = (req, res, next) => {
    return personService.findOne(req.params.id)
        .then(person => {
            if (!person) {
                return next(new createError.NotFound("Person is not found"));
            }
            // res.json(person); 
            return res.json(person);
        })
};

exports.update = (req, res, next) => {
    const id = req.params.id;                   // ami a kettőspont után van az egy változó és ezt így érem el.
    // mongoose után nem kell
    // const index = data.findIndex(p => p.id === Number(id))      // ez a Number konstruktorba tevés azért kell, hogy ne legyen gond a típusokkal, mert az url-ben stringként kapom, de a db-ben számként kezelem.
    const { first_name, last_name, vaccine } = req.body;          // egy ojjektumba pakolom

    if (!last_name || !first_name || !vaccine) {
        return next(            // a next megszakítja a jelenlegi folyamatot és továbbdobja a következő middleware-nek a kérést
            new createError.BadRequest("Missing properties!")
        );
    }

    const update = {
        firstName: first_name,
        lastName: last_name,
        vaccine: vaccine
    };

    return personService.update(req.params.id, up)
        .then(person => {
            res.json(person);
        })
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
};

exports.delete = (req, res, next) => {
    return personService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        })
}