angular
    .module('app')
    .controller('loginCtrl', function($scope, $rootScope, $state, $window, $injector, toastr, User, Auth) {

        function handleError(error) {
            switch (error.code) {
                case 'INVALID_EMAIL':
                    $scope.errorMessage = 'Invalid email';
                    break;
                case 'EMAIL_TAKEN':
                    $scope.errorMessage = 'Email already exists';
                    break;
                case 'INVALID_PASSWORD':
                    $scope.errorMessage = 'Invalid Password';
                    break;
                case 'INVALID_USER':
                    $scope.errorMessage = 'Email or password is incorrect';
                    break;
                default:
                    $scope.errorMessage = 'Error: [' + error.code + ']';
            }
            toastr.error($scope.errorMessage, 'Error');
        }

        function getCurrentUser() {
            $window.localStorage['currentUser'] = {};
            $scope.myPromise = User.loadCurrentUser().then(function(user) {
                console.log('currentUser: ', user);
                $rootScope.currentUser = user;
                $rootScope.displayName = user.displayName;
                $window.localStorage['currentUser'] = JSON.stringify(user);
                $state.go('main.dashboard');
            });
        }

        var $validationProvider = $injector.get('$validation');
        $scope.login = {
            checkValid: $validationProvider.checkValid,
            submit: function(form) {
                $validationProvider.validate(form)
                    .success($scope.loginAccnt)
                    .error($scope.error);
            }
        };

        $scope.loginAccnt = function() {
            if ($scope.login && $scope.login.email && $scope.login.password) {
                $scope.myPromise = Auth.login($scope.login.email, $scope.login.password)
                    .then(getCurrentUser)
                    .catch(handleError);
            } else {
                $ionicPopup.alert({
                    title: 'Authentication Error!',
                    template: "Please enter email and password both"
                });
            }
        };

        $scope.error = function(message) {
            console.log('Error ' + message);
        };
    })
    .controller('signupCtrl', function($scope, $state, $injector, toastr, Auth, User) {
        var $validationProvider = $injector.get('$validation');
        $scope.errorMessage = null;

        function handleError(error) {
            switch (error.code) {
                case 'INVALID_EMAIL':
                    $scope.errorMessage = 'Invalid email';
                    break;
                case 'EMAIL_TAKEN':
                    $scope.errorMessage = 'Email already exists';
                    break;
                case 'INVALID_PASSWORD':
                    $scope.errorMessage = 'Invalid Password';
                    break;
                case 'INVALID_USER':
                    $scope.errorMessage = 'Email or password is incorrect';
                    break;
                default:
                    $scope.errorMessage = 'Error: [' + error.code + ']';
            }
            toastr.error($scope.errorMessage, 'Error');
        }

        $scope.signup = {
            checkValid: $validationProvider.checkValid,
            submit: function(form) {
                $validationProvider.validate(form)
                    .success($scope.success)
                    .error($scope.error);
            }
        };


        $scope.success = function(message) {
            console.log('success: ' + message);
            console.log('$scope.signup: ' + $scope.signup);

            if ($scope.signup && $scope.signup.email && $scope.signup.password && $scope.signup.firstname && $scope.signup.lastname) {

                var user = {};
                user.displayName = $scope.signup.firstname + ' ' + $scope.signup.lastname;
                user.avatar = '';
                user.gender = '';
                user.firstname = $scope.signup.firstname;
                user.lastname = $scope.signup.lastname;
                user.middlename = '';
                user.google_id = '';
                user.google_profile = '';
                user.facebook_id = '';
                user.facebook_profile = '';

                $scope.myPromise = Auth.createUser({
                        email: $scope.signup.email,
                        password: $scope.signup.password
                    })
                    .then(function(authUser) {
                        console.log('authUser: ', authUser);
                        user.uid = authUser.uid;
                        return User.create(authUser.uid, user);
                    })
                    .then(function() {
                        toastr.success('User Successfully Created', 'Created...');
                        $state.go('login', {}, {
                            reload: true
                        });
                    })
                    .catch(handleError);
            } else {
                toastr.error('Please fill all details', 'Error');
            }
        };

        $scope.error = function(message) {
            console.log('Error ' + message);
        };
    });
