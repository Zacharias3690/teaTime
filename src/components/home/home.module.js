angular.module('tt.home', []).config(($stateProvider) => {
    $stateProvider
        .state('home', {
            parent: 'app',
            url: '/home',
            templateUrl: "components/home/home.html",
            controller: "homeController",
            controllerAs: "vm"
        });
});