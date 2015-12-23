angular
    .module('app', ['ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'angular-loading-bar', 'angularMoment', 'ncy-angular-breadcrumb', 'cgBusy', 'validation', 'validation.rule', 'toastr', 'ngDialog', 'firebase'])
    .constant('firebaseurl', 'https://popping-torch-5033.firebaseio.com')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'public/templates/auth/login.html',
                controller: 'loginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'public/templates/auth/signup.html',
                controller: 'signupCtrl'
            })
            .state('main', {
                url: '/main',
                abstract: true,
                templateUrl: 'public/templates/main.html',
                ncyBreadcrumb: {
                    label: 'Dashboard'
                }
            })
            .state('main.dashboard', {
                url: '/dashboard',
                views: {
                    'mainView': {
                        templateUrl: 'public/templates/dashboard.html',
                        controller: 'mainCtrl'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Dashboard'
                }
            })
            .state('main.dashdetails', {
                url: '/dashboard/:id',
                views: {
                    'mainView': {
                        templateUrl: 'public/templates/details.html',
                        controller: 'detailCtrl'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Details',
                    parent: 'main.dashboard'
                }
            });

        $urlRouterProvider.otherwise('/login');
    })
    .config(['$validationProvider', function($validationProvider) {
        var defaultMsg;
        var expression;

        $validationProvider
            .setExpression({
                matching: function(value, scope, element, attrs) {
                    return value === attrs.validatorPassword;
                }
            })
            .setDefaultMsg({
                matching: {
                    error: 'Passwords do not match.'
                }
            })
    }]);
