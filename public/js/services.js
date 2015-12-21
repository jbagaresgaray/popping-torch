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
            updateCode: function(id,data){
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
