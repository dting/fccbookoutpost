'use strict';

var app = angular.module('fccbookoutpostApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'ngMessages'
]);

var ocean = {
  base00: '#2b303b',
  base01: '#343d46',
  base02: '#4f5b66',
  base03: '#65737e',
  base04: '#a7adba',
  base05: '#c0c5ce',
  base06: '#dfe1e8',
  base07: '#eff1f5',
  base08: '#bf616a',
  base09: '#d08770',
  base0A: '#ebcb8b',
  base0B: '#a3be8c',
  base0C: '#96b5b4',
  base0D: '#8fa1b3',
  base0E: '#b48ead',
  base0F: '#ab7967'
};

app.config(function($stateProvider, $urlRouterProvider, $locationProvider,
    $httpProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authInterceptor');

  $mdThemingProvider.definePalette('oceanPrimary', {
    50: ocean.base08,
    100: ocean.base0A,
    200: ocean.base09,
    300: ocean.base0B,
    400: ocean.base0C,
    500: ocean.base0D,
    600: ocean.base0A,
    700: ocean.base0F,
    800: ocean.base00,
    900: ocean.base01,
    A100: ocean.base02,
    A200: ocean.base03,
    A400: ocean.base04,
    A700: ocean.base07,
    contrastDefaultColor: 'light',
    contrastDarkColors: [
      '50', '100',
      '200', '300', '400', 'A100'
    ]
  }).definePalette('oceanAccent',
      $mdThemingProvider.extendPalette('oceanPrimary', {}));

  $mdThemingProvider.theme('default')
      .primaryPalette('oceanPrimary', {
        default: '900',
        'hue-1': '100',
        'hue-2': 'A700',
        'hue-3': 'A700'
      })
      .accentPalette('oceanAccent', {
        default: '500',
        'hue-1': '100'
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
