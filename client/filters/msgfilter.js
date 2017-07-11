// JavaScript source code
app
    .filter('msg', msg)

msg.$inject = ['$window']

function msg($window) {
    return function (input) {
        console.log(input)
        /*
        if (input === $window.localStorage['username']) {
            input = "Me"
        }
        */
        return input
    }
}
