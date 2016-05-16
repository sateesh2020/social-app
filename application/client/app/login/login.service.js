(function() {
    angular.module('login-service', [])
        .factory('LoginService', LoginService);

    function LoginService($http) {
        return {
            saveLoginDetails: saveLoginDetails,
            verifyUserLogin: verifyUserLogin,
            logoutUser: logoutUser
        }

        function saveLoginDetails(userDetails) {
            var request = {
                url: '/api/user',
                method: 'POST',
                data: userDetails
            }
            return $http(request)
                .then(sendSaveRes)
                .catch(function(err) {
                    console.log(err);
                });

            function sendSaveRes(response) {
                return response.data;
            }
        }

        function verifyUserLogin() {
            var request = {
                url: '/api/user',
                method: 'GET'
            }
            return $http(request)
                .then(sendUserDetails)
                .catch(function(err) {
                    console.log(err);
                });

            function sendUserDetails(response) {
                return response.data;
            }
        }

        function logoutUser() {
            var request = {
                url: '/api/logout',
                method: 'GET'
            }
            return $http(request)
                .then(logOutRes)
                .catch(function(err) {
                    console.log(err);
                });

            function logOutRes(response) {
                return response.data;
            }
        }

    }
})();
