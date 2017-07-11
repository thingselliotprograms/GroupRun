// JavaScript source code
app
    .factory('interceptService', interceptService)

interceptService.$inject = ['$window']

function interceptService($window) {
    console.log("Intercepting")
    console.log($window.localStorage['user-token'])
    return {
        'request': function (config) {
            config.headers.token = $window.localStorage['user-token']
            return config
        }

    }
}