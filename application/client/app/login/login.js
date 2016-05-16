(function() {

    angular.module('login-controller', [])
        .controller('LoginController', LoginController);

    function LoginController($scope, $state, $rootScope, GooglePlus, LoginService) {
        var vm = this;
        vm.login = function() {
            GooglePlus.login().then(function(authResult) {
                console.log(authResult);
                refresh();

            }, function(err) {
                console.log(err);
            });
        }

        $rootScope.isLoggedIn = false;
        $rootScope.name = "";

        function refresh() {
            GooglePlus.getUser().then(function(user) {
                console.log(user);
                if (user.id) {
                    var userDetails = {
                        userName: user.name,
                        userId: user.id
                    };
                    $rootScope.userId = user.id;
                    $rootScope.$broadcast('userLoggedIn', userDetails);
                    return LoginService.saveLoginDetails(userDetails).then(function(response) {
                        if (response.success) {
                            $rootScope.isLoggedIn = true;
                            $state.go('feeds');
                        }
                    });

                } else {
                    $state.go('login');
                }
            });
        }
        //refresh();
    }

})();
