// JavaScript source code
app
    .controller('MsgCtrl', MsgCtrl)
    .directive('repeatDirective', repeatDirective)

MsgCtrl.$inject = ['$scope', '$http', '$window', '$location', 'authentication', 'chatsocket', 'userFilter', '$document']

function MsgCtrl($scope, $http, $window, $location, authentication, chatsocket, userFilter, $document) {

    var vm = this

    $scope.username = $window.localStorage['username']
    $scope.currentgroup = $window.localStorage['currentgroup']

    vm.msg = {
        body : ""
    }


    $http.get('/api/groupmessages')
        .then(function (response) {
            $scope.messages = response.data.messages
        })


    chatsocket.on('chat', function (msg) {
        $scope.messages.push(msg)
    })

    vm.newMsg = function () {
        if (vm.msg.body) {
            chatsocket.emit('chat',
                {
                    "message": vm.msg.body,
                    "sentAt": Date.now(),
                    "token": $window.localStorage['user-token'],
                    "group": $window.localStorage['currentgroup']
                }
                )
        }
        if (vm.msg.body) {
            $scope.messages.push({ "body": vm.msg.body, "sentBy": { "name": $scope.username }, "sentAt": Date.now() })
            $http.post('/api/newmessage', { "message": vm.msg.body })
                .then(function (response) {
                })
            vm.msg = {
                body: ""
            }
        }
        
    }

}


function repeatDirective() {
    return function (scope, element, attrs) {
        if (scope.$last) {
            var msgdiv = document.getElementById('messagelist')
            msgheight = msgdiv.scrollHeight
            console.log(msgdiv)
            console.log(msgdiv.scrollHeight)
            msgdiv.scrollTop = msgheight
        }
    }
}