(function() {

    angular.module('app-routes', ['ui.router'])
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            // catch all route
            // send users to the form page
            $urlRouterProvider.otherwise('/login');
            $stateProvider
            // route to show our basic login (/login)
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: "vm"
            })
            .state('feeds', {
                url: '/feeds',
                templateUrl: 'app/feeds/feeds.html',
                controller: 'FeedsController',
                controllerAs: "vm"
            })
        });

})();
