// JavaScript source code
app
    .filter('user', user)

user.$inject = ['$window']

function user($window) {
    return function (input) {
        if (input === $window.localStorage['username']) {
            input = "Me"
        }
        return input
    }
}