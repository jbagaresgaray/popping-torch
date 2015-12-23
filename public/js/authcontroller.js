angular
    .module('app')
    .controller('loginCtrl', function($scope, $state) {
        $scope.login = function() {
            $state.go('main.dashboard');
        };
    });