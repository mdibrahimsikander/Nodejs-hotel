const mongoose = require('mongoose');

//Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    work:{
        type: String,
        enum: ['chef', 'waiter','manager'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salary:{
        type: Number,
        required: true
    }
});
// Create Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;