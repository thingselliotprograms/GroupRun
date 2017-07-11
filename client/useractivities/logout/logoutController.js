// JavaScript source code
app
    .controller('logoutCtrl', logoutCtrl);

logoutCtrl.$inject = ['$rootScope','$scope','$http', '$location', '$window', 'authentication'];

function logoutCtrl($rootScope, $scope, $http, $location, $window, authentication) {
    authentication
        .logout();
    $rootScope.navigationbar = ""
    $location.path('/login')
}