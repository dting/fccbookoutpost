'use strict';

angular.module('fccbookoutpostApp').controller('MainCtrl',
    function($scope, $http, $window, Auth, $state) {
      if (Auth.isLoggedIn()) $state.go('browse');

      $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
      };
    });
