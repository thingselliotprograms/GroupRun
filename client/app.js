// JavaScript source code
var app = angular.module('runApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider','$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/client/main/mainpage.html',
                controller: 'MainCtrl'
            })
            .when('/logout', {
                templateUrl: '/client/useractivities/login/login.html',
                controller: 'logoutCtrl'
            })
            .when('/groups', {
                templateUrl: '/client/groups/groups.html',
                controller: 'userGroupsCtrl',
                controllerAs:'vm'
            })
            .when('/login', {
                templateUrl: '/client/useractivities/login/login.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/signup', {
                templateUrl: '/client/useractivities/signup/signup.html',
                controller: 'signupCtrl',
                controllerAs: 'vm'
            })
            .when('/groupconversation', {
                templateUrl: '/client/main/conversation.html',
                controller: 'MsgCtrl',
                controllerAs:'vm'
            })
            .when('/userruns', {
                templateUrl: '/client/useractivities/runs/runs.html',
                controller: 'runsCtrl'
            })
            .when('/videochat', {
                templateUrl:'/client/main/videochat.html'
            })
            .when('/groupcalendar', {
                templateUrl: '/client/groups/groupcalendar.html',
                controller:'MainCtrl'
            })
            .when('/challenges', {
                templateUrl: '/client/groups/groupchallenges.html',
                controller:'MainCtrl'
            })
            .when('/routes', {
                templateUrl: '/client/groups/grouproutes.html',
                controller: 'RoutesCtrl'
            })
            .otherwise('/', {
                redirectTo: '/'
            })
        $locationProvider.html5Mode(true);
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('interceptService')
    }])
    .run(['$rootScope', '$location', 'authentication', function ($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            if (($location.path() !== '/login') && ($location.path() !== '/signup') && !authentication.isLoggedIn()) {
                $location.path('/login')
            } else if ((($location.path() === '/login') || ($location.path() === '/signup')) && authentication.isLoggedIn()) {
                $location.path('mainpage')
            }
        })
    }])
