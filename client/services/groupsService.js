// JavaScript source code
app
    .service('groupsService', groupsService)

groupsService.$inject = ['$http', '$window', 'authentication']

function groupsService($http, $window, authentication) {

    createGroup = function (group) {
        return $http.post('/api/creategroup', group).then(function (response) {
            authentication.saveToken(response.data.token)
        }, function (response) {
            console.log(response.data)
        })
    }
    /*
    switchGroup = function (groupID) {
        console.log(groupID)
        return $http.get('/api/swtichgroup', groupID).then(function (response) {
            console.log("Sucks Eggs")
            console.log(response)
        }, function (response) {
            console.log("Failure")
        }) 
    }
    */

    return {
        createGroup: createGroup
        //switchGroup: switchGroup
    }
}