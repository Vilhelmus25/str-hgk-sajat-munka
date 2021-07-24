const mongoose = require('mongoose');

const VaccineSchema = mongoose.Schema({
    _id: String,
    name: String,
    efficiency: Number
}, {
    timeStamps: true
});

module.exports = mongoose.model('Vaccine', VaccineSchema);
