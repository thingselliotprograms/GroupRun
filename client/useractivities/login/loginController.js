// JavaScript source code
app
    .controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$rootScope', '$scope', '$http', '$location', '$window', 'authentication'];

function loginCtrl($rootScope, $scope, $http, $location, $window, authentication) {
    var vm = this;
    vm.logins = {
        username: "",
        password: ""
    }


    vm.onSubmit = function () {
        authentication
            .login(vm.logins)
            .then(function () {
                if ($window.localStorage['user-token']) {
                    $location.path('mainpage')
                    $window.localStorage['username'] = vm.logins.username
                    $rootScope.currentuser = vm.logins.username
                    console.log($rootScope.currentuser)
                    console.log($window.localStorage)
                } else {
                    vm.logins = {
                        username: "",
                        password:""
                    }
                }

            })
    }
}