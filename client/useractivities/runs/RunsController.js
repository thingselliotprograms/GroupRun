// JavaScript source code
app
    .controller('runsCtrl', runsCtrl)

runsCtrl.$inject = ['$scope', '$http', '$window', '$location', 'authentication', 'dateFilter']

function runsCtrl($scope, $http, $window, $location, authentication, dateFilter) {

    $scope.newRun = {
        "date": "",
        "miles":""
    }

    $scope.curDate = new Date()

    $scope.cD = new Date()

   // var mm = String(cD.getMonth())
    

    var months = {
        "0": "January",
        "feb": "February",
        "2": "March",
        "3": "April",
        "4": "May",
        "5": "June",
        "6": "July",
        "7": "August",
        "8": "September",
        "9": "October",
        "10": "November",
        "11":"December"
    }

    $scope.reqDateStr = {

    }

    $http.post('/api/userruns', $scope.reqDate)
        .then(function (response) {
            $scope.runs = response.data
        })

    $scope.addRun = function () {
        return $http.post('/api/addrun', $scope.newRun)
            .then(function (response) {
                console.log(response.data)
                $scope.runs.push(response.data)
                $scope.newRun = {
                    "date": "",
                    "miles":""
                }
            })
    }

    $scope.addNewRun = function () {
        console.log("adding new run")
    }
}