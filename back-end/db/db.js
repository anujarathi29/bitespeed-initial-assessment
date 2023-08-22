const mongoose = require('mongoose')

mongoose.connect("mongodb://database:27018/database")
    .then(() => { console.log("connected to the database"); })
    .catch((err) => console.log("Failed to connect to the database", err))