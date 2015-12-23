angular
    .module('app')
    .factory('Auth', function($q, $window, $firebaseAuth, firebaseurl) {
        var self = this;
        var usersRef = new Firebase(firebaseurl);
        var auth = $firebaseAuth(usersRef);

        this.currentUser = null;

        this.getCurrentUser = function() {
            var defer = $q.defer();
            auth.$onAuth(function(user) {
                self.currentUser = user;
                if (user === null) {
                    defer.resolve(null);
                } else {
                    defer.resolve(user);
                }
            });
            return defer.promise;
        };

        this.createUser = function(user) {
            console.info('createUser: ', user);
            var defer = $q.defer();
            auth.$createUser(user).then(
                function(user) {
                    self.currentUser = user;
                    defer.resolve(user);
                },
                function(error) {
                    self.currentUser = null;
                    defer.reject(error);
                });
            return defer.promise;
        };

        this.login = function(email, password) {
            var defer = $q.defer();
            auth.$authWithPassword({
                email: email,
                password: password
            }).then(
                function(user) {
                    self.currentUser = user;
                    defer.resolve(user);
                },
                function(error) {
                    self.currentUser = null;
                    defer.reject(error);
                });
            return defer.promise;
        };

        this.logout = function() {
            auth.$unauth();
            this.currentUser = null;
            $window.localStorage['currentUser'] = {};
        };

        this.sendPasswordResetEmail = function(email) {
            return auth.$sendPasswordResetEmail(email);
        };

        this.changePassword = function(oldPassword, newPassword) {
            return auth.$changePassword(this.currentUser.email, oldPassword, newPassword);
        };

        this.waitForAuth = function() {
            return auth.$waitForAuth();
        };

        return this;
    })
    .factory('User', function($q, $rootScope, $window, $firebaseObject, $firebaseArray, $firebaseAuth, firebaseurl, Auth) {
        var usersRef = new Firebase(firebaseurl + '/users');
        var currentUser = null;

        this.loadCurrentUser = function() {
            var defer = $q.defer();
            var currentUserRef = usersRef.child(Auth.currentUser.uid);
            currentUserRef.once("value", function(snapshot) {
                defer.resolve(snapshot.val());
            });
            return defer.promise;
        };

        this.create = function(id, user) {
            var defer = $q.defer();
            var user = usersRef.child(id).set(user);
            defer.resolve(user);
            return defer.promise;
        };

        return this;
    })
    .factory('Address', function($http) {
        return {
            getStates: function() {
                return $http({
                    url: 'app/address/address.php',
                    method: 'GET'
                }).then(function(res) {
                    return res.data;
                });
            },
            getSuburbs: function(value) {
                return $http({
                    url: 'app/address/suburb.php/' + value,
                    method: 'GET'
                }).then(function(res) {
                    return res.data;
                });
            }
        }
    })
    .factory('Code', function($http) {
        return {
            getAllCodes: function() {
                return $http({
                    url: 'app/code/code.php',
                    method: 'GET'
                }).then(function(res) {
                    return res.data;
                });
            },
            saveCodes: function(data) {
                return $http({
                    url: 'app/code/code.php',
                    data: data,
                    method: 'POST'
                }).then(function(res) {
                    return res.data;
                });
            },
            updateCode: function(id, data) {
                return $http({
                    url: 'app/code/code.php',
                    params: {
                        id: id
                    },
                    data: data,
                    method: 'PUT'
                }).then(function(res) {
                    return res.data;
                });
            },
            deleteCode: function(id) {
                return $http({
                    url: 'app/code/code.php',
                    params: {
                        id: id
                    },
                    method: 'DELETE'
                }).then(function(res) {
                    return res.data;
                });
            }
        }
    });
