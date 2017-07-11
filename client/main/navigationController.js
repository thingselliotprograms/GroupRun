// JavaScript source code
app
    .controller('navCtrl', navCtrl)

navCtrl.$inject = ['$rootScope', '$scope', '$window', '$http', 'authentication']

function navCtrl($rootScope, $scope, $window, $http, authentication) {
    $rootScope.currentuser = ""
    $rootScope.navigationbar = $window.localStorage['currentgroup']
    //$scope.currentuser = $window.localStorage['username']

    $http.get('/api/maingroupinfo')
        .then(function (response) {
            console.log(response.data)
            if (response.data.destroytoken) {
                authentication.logout()
                $rootScope.navigationbar = ""
                $location.path('/login')
            } else if (response.data.group) {
                $rootScope.currentgroup = response.data.group.name
                //$scope.currentgroup = response.data.group.name
                //$scope.members = response.data.group.members
            } else {
                $rootScope.navigationbar = ""
            }
            $rootScope.currentuser = response.data.user
        })
}
