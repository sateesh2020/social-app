var unirest = require('unirest');
var translator = require('../utils/translator');
var Feed = require('../models/feed');
var lodash = require('lodash');

var apiKey = 'Server-API-Key';

function getFeedsFromGoogle(req, res) {
    var userId = req.query.userId;
    var maxResults = req.query.maxResults || 20;
    var feedsResponse = {};
    if (userId) {
        var url = UrlBuilder(userId, maxResults, apiKey);
        unirest.get(url)
            .headers({
                'Accept': 'application/json'
            })
            .end(function(response) {
                if (!response.error) {
                    feedsResponse.success = true;
                    feedsResponse.feeds = translator.transformGoogleFeed(response.body);
                    res.json(feedsResponse);
                } else {
                    feedsResponse.success = false;
                    feedsResponse.feeds = response.body;
                    res.json(feedsResponse);
                }
            });
    } else {
        res.json({
            "success": false,
            "message": "Required User ID to get Posts"
        });
    }

}

function savePostIntoApp(req, res) {
    var feedData = req.body;
    var updateResponse = {};
    var query = {
        postId: feedData.postId
    }
    Feed.findOneAndUpdate(query, feedData, {
        upsert: true
    }, function(err, doc) {
        if (err) {
            updateResponse.success = false;
            updateResponse.error = err;
            return res.send(500, response);
        }
        updateResponse.success = true;
        updateResponse.message = 'Succesfully Saved';
        return res.send(updateResponse);
    });
}

function getFeedsFromApp(req, res) {
    var feedsResponse = {};
    var userId = req.query.userId;
    Feed.find({'actor.id':userId
    }, function(err, feeds) {
        if (err) {
            feedsResponse.success = false;
            feedsResponse.error = err;
        } else {
            feedsResponse.success = true;
            feedsResponse.feeds = feeds;
        }
        res.json(feedsResponse);
    });
}


function UrlBuilder(userId, maxResults) {
    var core = 'https://www.googleapis.com/plus/v1/people/' + userId + '/activities/public?maxResults=' + maxResults + '&key=' + apiKey;
    return core;
}

function filterResults(collection, query){
    var filteredData = [];
    filteredData = lodash.filter(collection, query);
    return filteredData;
}

module.exports = {
    getGoogleFeeds: getFeedsFromGoogle,
    savePost: savePostIntoApp,
    getPosts:getFeedsFromApp
}
