// grab the packages we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
    userName: String,
    userId: String,
    loggedInAt: {
        type: Date,
        default: Date.now
    }
});

// the schema is useless so far
// we need to create a model using it
var Login = mongoose.model('Login', loginSchema);
// make this available to our users in our Node applications
module.exports = Login;
