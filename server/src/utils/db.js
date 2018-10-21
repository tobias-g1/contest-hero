const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true
    })
    .then(() => console.log('connecting to database successful'))
    .catch(err => console.error('could not connect to mongo DB', err))
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log("Connection Succeeded");
});