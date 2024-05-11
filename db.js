const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'

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