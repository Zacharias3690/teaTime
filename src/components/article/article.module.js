angular.module('tt.article', []).config(($stateProvider) => {
    $stateProvider
        .state('article', {
            parent: 'app',
            url: '/article',
            templateUrl: "components/article/article.html"
        });
});