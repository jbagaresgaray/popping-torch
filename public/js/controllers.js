angular
    .module('app')
    .controller('loginCtrl', function($scope, $state) {
        $scope.login = function() {
            $state.go('main.dashboard');
        };
    })
    .controller('mainCtrl', function($scope, Code) {
        $scope.codes = [];
        Code.getAllCodes().then(function(response) {
            _.mapKeys(response, function(row, key) {
                $scope.codes.push({
                    key: key,
                    row: row
                });
            });
        });
    })
    .controller('detailCtrl', function($scope, $stateParams, Code) {
        $scope.details = {};
        $scope.dt = new Date();
        $scope.status = {
            opened: false
        };

        $scope.open = function($event) {
            $scope.status.opened = true;
        };

        if (!_.isUndefined($stateParams.id)) {
            Code.getAllCodes().then(function(response) {
                _.mapKeys(response, function(row, key) {
                    if($stateParams.id === key){
                        $scope.details = row;
                        $scope.details.id = key;
                    }
                });
            });
        }

    });
