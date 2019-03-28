KetabShow.controller('homeCtrl', function ($rootScope, $scope, $state, $translate, $http) {

    $rootScope.title = $translate('home Title');

    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
    this.gotoState = function (x) {
        $state.go(x);
    };

    $http.get("/api/search").then(function (data) {
        var x = data;
    });


});
