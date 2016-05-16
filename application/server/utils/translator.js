var lodash = require('lodash');

function transformGoogleFeed(feeds) {
  var modifiedFeeds = [];
    if (lodash.isObject(feeds)) {
        var feedsArray = feeds.items;
        if (feedsArray.length > 0) {
            lodash.forEach(feedsArray, function(value, key) {
                var modifiedFeed = googleFeedMapper(value);
                modifiedFeeds.push(modifiedFeed);
            });
        }
    }
    return modifiedFeeds;
}

function googleFeedMapper(feed) {
    var requiredObj = {
        "postTitle": null,
        "postUrl": null,
        "postedOn": null,
        "postId": null,
        "actor": {
            "id": null,
            "name": null,
            "url": null,
            "thumbImage": null
        },
        "postData": {
            "name": null,
            "description": null,
            "url": null,
            "thumbImage": null
        }
    }

    requiredObj.postTitle = feed.title;
    requiredObj.postUrl = feed.url;
    requiredObj.postedOn = feed.published;
    requiredObj.postId = feed.id;
    requiredObj.actor.id = feed.actor.id;
    requiredObj.actor.name = feed.actor.displayName;
    requiredObj.actor.url = feed.actor.url;
    requiredObj.actor.thumbImage = feed.actor.image.url;

    if(feed['object'].attachments && feed['object'].attachments.length > 0 ){
      requiredObj.postData.name = feed['object'].attachments[0].displayName;
      requiredObj.postData.description = feed['object'].attachments[0].content;
      requiredObj.postData.url = feed['object'].attachments[0].url;
      if(feed['object'].attachments[0].image){
          requiredObj.postData.thumbImage = feed['object'].attachments[0].image.url;
      }
    }
    return requiredObj;
}

module.exports = {
  transformGoogleFeed:transformGoogleFeed
}
