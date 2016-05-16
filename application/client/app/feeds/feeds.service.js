(function() {

    angular.module('feeds-service', [])
        .factory('FeedsService', function($http) {
            var services = {
                getGoogleFeeds: getGoogleFeeds,
                saveFeed: saveFeed,
                getFeeds: getFeeds
            }

            return services;


            function getGoogleFeeds(userId, maxResults) {
                var request = {
                    url: '/api/posts/google',
                    method: 'GET',
                    params: {
                        userId: userId,
                        maxResults: maxResults
                    }
                }
                return $http(request)
                    .then(sendGoogleFeeds)
                    .catch(function(err) {
                        console.log(err);
                    });

                function sendGoogleFeeds(response) {
                    return response.data;
                }
            }

            function saveFeed(feed) {
                var request = {
                    url: '/api/posts',
                    method: 'POST',
                    data: feed
                }
                return $http(request)
                    .then(saveResponse)
                    .catch(function(err) {
                        console.log(err);
                    });

                function saveResponse(response) {
                    return response.data;
                }
            }

            function getFeeds(userId) {
                var request = {
                    url: '/api/posts',
                    method: 'GET',
                    params: {
                        userId: userId
                    }
                }

                return $http(request)
                    .then(sendUserFeeds)
                    .catch(function(err) {
                        console.log(err);
                    });

                function sendUserFeeds(response) {
                    return response.data;
                }
            }

        });
})();
