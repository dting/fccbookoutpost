'use strict';

angular.module('fccbookoutpostApp').controller('ProfileCtrl',
    function($scope, User, $mdToast) {
      $scope.user = User.get();
      console.log($scope.user);
      $scope.errors = {};
      $scope.changeProfile = function() {
        $scope.submitted = true;
        if ($scope.profileForm.$valid) {
          User.changeProfile($scope.user).$promise.then(function(res) {
            console.log(res);
            $mdToast.show(
                $mdToast.simple()
                    .content('Profile successfully changed.')
                    .position('top right')
                    .hideDelay(2000)
            );
          }).catch(function(err) {
            console.log(err);
          });
        }
      };
    });
