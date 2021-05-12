const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('mongoose-type-email'); // type for email in Schema

var Schema = mongoose.Schema;

// hash password using bcrypt - variable setPassword used in Schema
function setPassword(value) {
    return bcrypt.hashSync(value, 10);
}

var userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: mongoose.SchemaTypes.Email
    },
    password: {
        type: String, 
        required: true,
        set: setPassword
    }
})

module.exports = mongoose.model('user', userSchema);