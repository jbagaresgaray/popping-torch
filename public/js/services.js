angular
    .module('app')
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
            }
        }
    });
