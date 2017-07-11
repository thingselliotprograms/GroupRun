// JavaScript source code
app
    .controller('MainCtrl', MainCtrl)

MainCtrl.$inject = ['$rootScope','$scope', '$http', '$window', 'authentication']

function MainCtrl($rootScope, $scope, $http, $window, authentication) {
    $scope.currentgroup = ""
    $scope.username = ""
    $http.get('/api/maingroupinfo')
        .then(function (response) {
            console.log(response)
            if (response.data.group) {
                $rootScope.currentgroup = response.data.group.name
                $scope.currentgroup = response.data.group.name
                $scope.members = response.data.group.members
            }
            console.log($window.localStorage)
            $scope.username = response.data.user
        })
    $scope.scrape = function () {
        $http.post('/api/scrape')
            .then(function (response) {
                console.log(response)
            })
    }

}