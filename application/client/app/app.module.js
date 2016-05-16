(function() {

    angular.module('social-app', [
            'ngAnimate', 'ngCookies', 'ui.bootstrap',

            'app-routes', 'login-controller', 'widgtes', 'login-service', 'feeds-controller',

            'googleplus','feeds-service','ngDraggable'
        ])
        .config(function(GooglePlusProvider) {
            GooglePlusProvider.init({
                clientId: 'Your Client ID',
                apiKey: 'Your API Key'
            });

        });

})();
