// grab the packages we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedSchema = new Schema({
    "postTitle": String,
    "postUrl": String,
    "postedOn": Date,
    "postId": String,
    "actor": {
        "id": String,
        "name": String,
        "url": String,
        "thumbImage": String
    },
    "postData": {
        "name": String,
        "description": String,
        "url": String,
        "thumbImage": String
    }
});

// the schema is useless so far
// we need to create a model using it
var Feed = mongoose.model('Feed', feedSchema);
// make this available to our users in our Node applications
module.exports = Feed;
