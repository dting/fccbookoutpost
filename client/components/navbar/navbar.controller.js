'use strict';

angular.module('fccbookoutpostApp').controller('NavbarCtrl',
    function($scope, $state, Auth) {
      $scope.isCollapsed = true;
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.isAdmin = Auth.isAdmin;
      $scope.getCurrentUser = Auth.getCurrentUser;

      $scope.logout = function() {
        Auth.logout();
        $state.go('main');
      };

      $scope.state = $state;

      var indexMap = Object.create(null);
      indexMap.browse = 0;
      indexMap.library = 1;
      indexMap.profile = 2;

      $scope.data = {
        selectedIndex: 0
      };

      $scope.$watch('state.current', function(newVal) {
        $scope.data.selectedIndex = indexMap[newVal.name];
      });
    });
