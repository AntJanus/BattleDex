(function() {
  angular.module('BattleDex.routing', [
    'ui.router',
  ])
    .config(config)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

  function config($urlProvider, $locationProvider, $stateProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');


    //routes
    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'partials/home.html'
      })
    ;
  }


})();
