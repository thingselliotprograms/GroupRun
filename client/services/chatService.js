// JavaScript source code
app
    .factory('chatsocket', chatsocket)

chatsocket.$inject = ['$rootScope', '$window']

function chatsocket($rootScope, $window) {
    var socket = io.connect("grouprun.thingselliotprograms.com:3000/", { query: "token="+$window.localStorage['user-token'] })
    var on = function (eventName, callback) {
        socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                callback.apply(socket, args)
            })
        })
    }
    var emit = function (eventName, data, callback) {
        console.log("emit")
        socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                if (callback) {
                    callback.apply(socket, args)
                }
            })
        })
    }
    return {
        on: on,
        emit: emit
    }
}
