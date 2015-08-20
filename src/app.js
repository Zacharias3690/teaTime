angular.module('app', [
    //Third Party
    'ui.router',


    //Components
    "teatime.templates",
    "tt.home",
    "tt.article"
])
.config(($locationProvider) => {
    $locationProvider.html5Mode(true);
})
.config(($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.when('/', '/home');

    $stateProvider
        .state('app', {
            abstract: true,
            views: {
                "topbar@app": {
                    templateUrl: "components/topbar/topbar.html"
                },
                "": {
                    templateUrl: "components/layout/layout.html"
                }
            }
        });
}).run(($state) => {

});