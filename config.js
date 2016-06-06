var configModule = angular.module('App.Config');

configModule.constant('AppConfig', {
    // @if ENVIRONMENT == 'production'
    toteApiURL: 'https://www.totestore.com'
    // @endif
    // @if ENVIRONMENT == 'development'
    toteApiURL: 'http://127.0.0.1:5000'
    // @endif
});
