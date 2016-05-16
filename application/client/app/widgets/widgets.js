(function() {
    angular.module('widgtes', [])
        .directive('appHeader', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/widgets/header.html',
                link: function(scope, elem, attrs) {

                },
                controller: HeaderController,
                controllerAs: 'vm'
            }
        })
        .directive('feedCard', function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/widgets/feed_card.html',
                scope: {
                    feed: '='
                },
                link: function(scope, elem, attrs) {

                },
                controller: CardController,
                controllerAs: 'vm'
            }
        });


    function HeaderController($rootScope, GooglePlus, $state, LoginService) {
        var vm = this;
        vm.isLoggedIn = false;
        $rootScope.$on('userLoggedIn', function(event, data) {
            vm.isLoggedIn = true;
            vm.name = data.userName;
            $rootScope.userId = data.userId;
        });
        vm.logout = function() {
            GooglePlus.logout();
            return LoginService.logoutUser().then(function(response) {
                if (response.success) {
                    console.log('Logged Out Successfully');
                    $state.go('login');
                    vm.isLoggedIn = false;
                } else {
                    $state.go('login');
                    vm.isLoggedIn = false;
                }
            });
        }
        activate();

        function activate() {
            return LoginService.verifyUserLogin().then(function(response){
                if (response.success) {
                    vm.isLoggedIn = true;
                    vm.name = response.user.userName;
                    $rootScope.userId = response.user.userId;
                } else {
                    $state.go('login');
                }
            });
        }
    }

    function CardController($scope) {
        var vm = this;
        vm.feed = $scope.feed;
        console.log($scope);
    }
})();
