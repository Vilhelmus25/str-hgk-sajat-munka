const mongoose = require('mongoose');
const Vaccine = require('./vaccine.model');

const PersonSchema = mongoose.Schema({      // séma, egy Person adatait milyen paraméterek szerint tároljuk
    _id: String,
    firstName: String,
    lastName: String,
    vaccine: {
        vaccine: Vaccine,
        count: Number
    }
}, {
    timeStamps: true            // egy másik objektum, ami időbéjegekkel látja el mit mikor hoztunk létre
});

module.exports = mongoose.model('Person', PersonSchema);
