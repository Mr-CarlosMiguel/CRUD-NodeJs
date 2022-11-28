const mongoose = require('mongoose');

// metodo para criar uma tabela no MongoDB chamada Person
const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person