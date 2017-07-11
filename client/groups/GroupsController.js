// JavaScript source code
app
    .controller('userGroupsCtrl', userGroupsCtrl)


userGroupsCtrl.$inject = ['$rootScope', '$scope', '$http', '$window', '$location', 'authentication', 'groupsService', 'chatsocket']


function userGroupsCtrl($rootScope, $scope, $http, $window, $location, authentication, groupsService, chatsocket) {
    var vm = this;
    vm.submitButton = {
        newGroup: ""
    }

    vm.joinGroup = ""

    $scope.currentgroup = $window.localStorage['currentgroup']


    $http.get('/api/usergroups')
        .then(function (response) {
            $scope.groups = response.data.groups;
            console.log($scope.groups)
        })

    vm.onCreate = function () {
        if (vm.submitButton.newGroup) {

            groupsService
                .createGroup(vm.submitButton)
                .then(function () {
                    $window.localStorage.removeItem['currentgroup']
                    $window.localStorage['currentgroup'] = vm.submitButton.newGroup
                    $rootScope.navigationbar = vm.submitButton.newGroup
                    $location.path('mainpage')
                })
        }
    }

    vm.groupSearch = function () {
        console.log(vm.joinGroup)
        if (vm.joinGroup) {
            return $http.post('/api/searchgroups', { "text": vm.joinGroup })
                .then(function (response) {
                    console.log(response.data)
                    $scope.searchresults = response.data
                })
        } else {
            $scope.searchresults = ""
        }
    }

    $scope.switchGroup = function (group) {
        return $http.post('/api/switchgroup', { "switch": group.groupID })
            .then(function (response) {
                console.log(response.data)
                authentication.saveToken(response.data.token)
                $window.localStorage.removeItem['currentgroup']
                $window.localStorage['currentgroup'] = group.name
                $rootScope.navigationbar = group.name
                $location.path('mainpage')
            }).then(function () {
                console.log("Switching")
                chatsocket.emit('switch', { "token": $window.localStorage['user-token'] })
            })
    }

    $scope.joinGroup = function (group) {
        return $http.post('/api/joingroup', { "join": group._id })
            .then(function (response) {
                console.log(response)
                authentication.saveToken(response.data.token)
                $window.localStorage.removeItem['currentgroup']
                $window.localStorage['currentgroup'] = group.name
                $rootScope.navigationbar = group.name
                $location.path('mainpage')
            },
            function (err) {
                alert(err.data)
            }).then(function () {
                console.log("Adding to socket")
                chatsocket.emit('switch', { "token": $window.localStorage['user-token'] })
            })
    }
}


