const mongoose = require('mongoose');

const AccountsSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    role: String
});

module.exports = mongoose.model('Accounts', AccountsSchema);