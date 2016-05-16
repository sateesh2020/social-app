(function() {
    angular.module('feeds-controller', [])
        .controller('FeedsController', FeedsController);

    function FeedsController(FeedsService, $rootScope, LoginService,$state) {
        var vm = this;
        vm.googlePosts = [];
        vm.savedPosts = [];
        activate();
        var userId = $rootScope.userId;
        vm.onFeedDrop = function(event, data) {
            var droppedFeed = data.data;
            return FeedsService.saveFeed(droppedFeed).then(function(response) {
                if (response.success) {
                    getSavedFeeds();
                }
            });
        }

        function activate() {
            if (!userId) {
                return LoginService.verifyUserLogin().then(function(response) {
                    if (response.success) {
                        $rootScope.userId = response.user.userId;
                        userId = response.user.userId;
                        getFeedsFromGoogle(userId);
                        getSavedFeeds(userId);
                    } else {
                        $state.go('login');
                    }
                });
            }else{
              getFeedsFromGoogle(userId);
              getSavedFeeds(userId);
            }


        }

        function getFeedsFromGoogle(userId) {
            return FeedsService.getGoogleFeeds(userId, 20).then(function(response) {
                if (response.success) {
                    vm.googlePosts = response.feeds;
                }
            });
        }

        function getSavedFeeds() {
            return FeedsService.getFeeds(userId).then(function(response) {
                if (response.success) {
                    vm.savedPosts = response.feeds;
                }
            });
        }

    }
})();
