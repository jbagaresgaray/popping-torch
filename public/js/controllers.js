angular
    .module('app')
    .controller('mainCtrl', function($scope, $uibModal, ngDialog, toastr, Code) {
        $scope.initCodes = function() {
            $scope.codes = [];
            $scope.myPromise = Code.getAllCodes().then(function(response) {
                _.mapKeys(response, function(row, key) {
                    $scope.codes.push({
                        key: key,
                        row: row
                    });
                });
            });
        };

        $scope.confirmDelete = function(id) {
            console.log('id: ', id);
            ngDialog.openConfirm({
                template: 'public/templates/confirm.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function(value) {
                Code.deleteCode(id).then(function(response) {
                    console.log('response: ', response);
                    toastr.success('Deleted...', 'Record Successfully Deleted');
                    $scope.initCodes();
                });
            }, function(value) {
                console.log('rejected:' + value);
            });;
        };

        $scope.openModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'public/templates/modal.html',
                controller: 'modalCtrl',
                size: 'modal-md'
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = 'save';
            }, function() {
                $scope.selected = 'close';
            });
        };

    })
    .controller('modalCtrl', function($scope, $uibModalInstance, toastr, Code) {
        $scope.details = {};
        $scope.dt = new Date();
        $scope.status = {
            opened: false
        };

        $scope.open = function($event) {
            $scope.status.opened = true;
        };

        $scope.saveCode = function() {
            console.log('saveCode: ', $scope.details);
            Code.saveCodes($scope.details).then(function(response) {
                console.log('response: ', response);
                toastr.success('Saved...', 'Record Successfully Saved');
                $scope.details = {};
            });
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

    })
    .controller('detailCtrl', function($scope,$state, $stateParams, toastr, Code) {
        $scope.details = {};
        $scope.dt = new Date();
        $scope.status = {
            opened: false
        };

        $scope.open = function($event) {
            $scope.status.opened = true;
        };

        $scope.updateCode = function() {
            console.log('updateCode: ', $scope.details);
            Code.updateCode($stateParams.id, $scope.details).then(function(response) {
                console.log('response: ', response);
                toastr.success('Updated...', 'Record Successfully Updated');
                $state.go($state.current, {}, {reload: true});
            });
        };

        if (!_.isUndefined($stateParams.id)) {
            $scope.myPromise = Code.getAllCodes().then(function(response) {
                _.mapKeys(response, function(row, key) {
                    if ($stateParams.id === key) {
                        $scope.details = row;
                        $scope.details.id = key;
                    }
                });
            });
        }

    });
