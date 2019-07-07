const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    phone: Number,
    password: String
});

module.exports = mongoose.model('User', userSchema);