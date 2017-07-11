// JavaScript source code
app
    .controller('RoutesCtrl', RoutesCtrl)

RoutesCtrl.$inject = ['$rootScope', '$scope', '$http', '$window', '$location', 'authentication', 'groupsService', 'chatsocket']

function RoutesCtrl($rootScope, $scope, $http, $window, $location, authentication, groupsService, chatsocket) {
    $scope.currentgroup = $window.localStorage['currentgroup']
    $scope.newRoute = {
        routeName: "",
        distance: "",
        date: ""
    }


    $scope.addRoute = function () {
        console.log("Add Route")
    }


    $http.get('/api/grouproutes')
        .then(function (response) {
            $scope.routes = response.data.routes
        })
}