angular
    .module('app')
    .controller('loginCtrl', function($scope, $state) {
        $scope.login = function() {
            $state.go('main.dashboard');
        };
    })
    .controller('signupCtrl', function($scope, $state, $injector) {
        var $validationProvider = $injector.get('$validation');

        $scope.signup = {
            checkValid: $validationProvider.checkValid,
            submit: function(form) {
                $validationProvider.validate(form)
                    .success($scope.success)
                    .error($scope.error);
            },
            reset: function(form) {
                $validationProvider.reset(form);
            }
        };


        $scope.success = function(message) {
            console.log('Success ' + message);
        };

        $scope.error = function(message) {
            console.log('Error ' + message);
        };
    });
