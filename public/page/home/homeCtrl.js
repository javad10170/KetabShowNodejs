KetabShow.controller('homeCtrl', function ($rootScope, $scope, $state, $translate) {

    $rootScope.title = $translate('home Title');

    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
    this.gotoState = function (x) {
        $state.go(x);
    };

    
});
