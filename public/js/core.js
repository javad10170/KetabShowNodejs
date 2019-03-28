var KetabShow = angular.module('KetabShow', [
    'ngMaterial',
    'ui.router',
    'pascalprecht.translate',
    'ngCookies',
    'ngStorage'
]);

KetabShow.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider, $mdThemingProvider ) {
    var neonRedMap = $mdThemingProvider.extendPalette('teal', {
        '500': '#607d8b',
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue-grey');


    $translateProvider.useStaticFilesLoader({
        prefix: '../lang/',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('fa');
    $translateProvider.useLocalStorage();
    $translateProvider.useCookieStorage();
    // $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.useSanitizeValueStrategy('escape');


    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'page/home/home.html',
            controller: 'homeCtrl',
            data: {
                pageTitle: 'Home'
            }
        });

    $locationProvider.html5Mode(true);
});

KetabShow.run(function ($rootScope, Language) {
    $rootScope.Language = Language;
});

KetabShow.factory('Language', function ($translate) {
    var rtlLanguages = ['fa' , 'ar'];
    var isRtl = function () {
        var languageKey = $translate.proposedLanguage() || $translate.use();
        for (var i = 0; i < rtlLanguages.length; i += 1) {
            if (languageKey.indexOf(rtlLanguages[i]) > -1)
                return true;
        }
        return false;
    };
    return {
        isRtl: isRtl
    };
});

