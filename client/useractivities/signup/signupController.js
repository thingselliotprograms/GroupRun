// JavaScript source code
app
    .controller('signupCtrl', signupCtrl);

signupCtrl.$inject = ['$scope', '$http', '$location', '$window', 'authentication'];

function signupCtrl($scope, $http, $location, $window, authentication) {
    var vm = this;
    vm.signup = {
        username: "",
        password: ""
    }

    vm.onSubmit = function () {
        console.log(vm.signup)
        
        authentication
            .signup(vm.signup)
            
            .then(function () {
                //$window.localStorage.removeItem('user-token')
                console.log($window.localStorage['user-token'])
                if ($window.localStorage['user-token']) {
                    $location.path('mainpage')
                } else {
                    vm.signup = {
                        username: "",
                        password: ""
                    }
                }
                    
            })
        
    }
}
