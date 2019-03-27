KetabShow.controller('headerCtrl', function ($scope, $state, $translate, $mdSidenav) {

    $scope.getCurrentLanguage = function () {

        return $translate.use();
    };

    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
    $scope.gotoState = function (x) {
        $state.go(x);
    };

    var currentLang = $translate.proposedLanguage() || $translate.use();

    switch (currentLang) {
        case 'fa':
            {
                $scope.toggleRight = buildToggler('right');
                break;
            }
        case 'en':
            {
                $scope.toggleRight = buildToggler('left');
                break;
            }
        case 'ar':
            {
                $scope.toggleRight = buildToggler('right');
                break;
            }
        default:
            break;
    }

    $scope.isOpenRight = function () {

        var currentLang = $translate.proposedLanguage() || $translate.use();

        switch (currentLang) {
            case 'fa':
                {
                    $scope.toggleRight = buildToggler('right');
                    break;
                }
            case 'en':
                {
                    $scope.toggleRight = buildToggler('left');
                    break;
                }
            case 'ar':
                {
                    $scope.toggleRight = buildToggler('right');
                    break;
                }
            default:
                break;
        }

        switch (currentLang) {
            case 'fa':
                {
                    return $mdSidenav('right').isOpen();
                    break;
                }
            case 'en':
                {
                    return $mdSidenav('left').isOpen();
                }
            case 'ar':
                {
                    return $mdSidenav('right').isOpen();
                }
            default:
                break;
        }

    };

    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                });
        };
    }


});
