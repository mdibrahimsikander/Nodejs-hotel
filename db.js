const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
// const mongoURL = process.env.mongoDB_URL_local
const mongoURL = process.env.mongoDB_URL;

//Setup mongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection
//mongoose maintains a default connection object representing the mongoDB connection.
const db = mongoose.connection;

//define event listeners for database connections

db.on('connected',() => {
    console.log('Connected to MongoDB');
})

db.on('error',(err) => {
    console.log("mongodb connection error: " + err);
})

db.on('disconnected',() => {
    console.log('Disconnected from MongoDB');
})