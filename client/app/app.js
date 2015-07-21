'use strict';

var app = angular.module('fccbookoutpostApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'ngMessages'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider,
    $httpProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authInterceptor');

  $mdThemingProvider.definePalette('ocean', {
    50: 'bf616a',
    100: 'ebcb8b',
    200: 'd08770',
    300: 'a3be8c',
    400: '96b5b4',
    500: '8fa1b3',
    600: 'ebcb8b',
    700: 'ab7967',
    800: '2b303b',
    900: '343d46',
    A100: '4f5b66',
    A200: '65737e',
    A400: 'a7adba',
    A700: 'eff1f5',
    contrastDefaultColor: 'light',
    contrastDarkColors: [
      '50', '100',
      '200', '300', '400', 'A100'
    ]
  });
  $mdThemingProvider.theme('default')
      .primaryPalette('ocean', {
        default: '900',
        'hue-1': '100',
        'hue-2': 'A700',
        'hue-3': 'A700'
      })
      .accentPalette('ocean', {
        default: '500',
        'hue-1': '100',
      });
});

app.factory('authInterceptor',
    function($rootScope, $q, $cookieStore, $location) {
      return {
        // Add authorization token to headers
        request: function(config) {
          config.headers = config.headers || {};
          if ($cookieStore.get('token')) {
            config.headers.Authorization =
                'Bearer ' + $cookieStore.get('token');
          }

          return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
          if (response.status === 401) {
            $location.path('/login');
            // remove any stale tokens
            $cookieStore.remove('token');
            return $q.reject(response);
          } else {
            return $q.reject(response);
          }
        }
      };
    });

app.run(function($rootScope, $location, Auth) {
  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function(event, next) {
    Auth.isLoggedInAsync(function(loggedIn) {
      if (next.authenticate && !loggedIn) {
        $location.path('/login');
      }
    });
  });
});
