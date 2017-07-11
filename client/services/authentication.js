// JavaScript source code
app
    .service('authentication', authentication)

authentication.$inject = ['$http', '$window', '$rootScope'];
function authentication($http, $window, $rootScope) {

    var saveToken = function (token) {
        $window.localStorage['user-token'] = token
    }

    var getToken = function () {
        return $window.localStorage['user-token'];
    }

    var isLoggedIn = function () {
        var token = getToken();
        var payload;

        if (token) {
            payload = token.split('.')[1]
            payload = $window.atob(payload);
            payload = JSON.parse(payload)

            return payload.exp > Date.now() / 1000

        } else {
            return false
        }
    }

    signup = function (user) {
        console.log("auth-signup start")
        return $http.post('/api/signup', user).then(function (response) {
            saveToken(response.data.token)
            console.log(response.data)
        },
            function (response) {
                console.log(response.data)
                alert(response.data)
            }
        )
    }

    login = function (user) {
        return $http.post('/api/login', user).then(function (response) {
            console.log("Not an error: "+response)
            console.log(response.data.token)
            saveToken(response.data.token)
            
        },
            function (response) {
                console.log("Error: "+response.data)
                alert(response.data)
            }
        )
    }

    logout = function () {
        $window.localStorage.removeItem('user-token')
        $window.localStorage.removeItem('username')
        $window.localStorage.removeItem('currentgroup')
        $rootScope.currentuser = ""
    }

    return {
        saveToken: saveToken,
        login: login,
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        logout: logout,
        signup: signup
    }
}