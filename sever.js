const express = require("express");
const mongoose = require("mongoose");
var app = express();
var cors = require('cors');

app.use(cors()); // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const dbConfig = require('./config/DatabaseConfig.js');
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log(dbConfig);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
require('./app/routes/HotelRoute.js')(app);
app.listen(5000, () => {
    console.log("Listening at :5000...");
});
