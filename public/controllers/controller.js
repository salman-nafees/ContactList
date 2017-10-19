/**
 * Created by salman.nafees on 11/10/2017.
 */

function AppCtrl($scope, $http) {

    var refresh = function () {
        $http.get('/contactList').success(function (res) {
            console.log("I got response");
            $scope.contactList = res;
            $scope.contact = "";
        });
    }

    refresh();

    $scope.addContact = function () {
        if(!$scope.contact._id && $scope.contact.name && $scope.contact.name.trim().length > 0){
            console.log($scope.contact);
            $http.post('/contactList', $scope.contact).success(function(res){
                console.log(res);
                refresh();
            });
        }
    };

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/contactList/' + id).success(function (res) {
            refresh();
        });
    }

    $scope.edit = function (id) {
        $http.get('/contactList/' + id).success(function (res) {
            $scope.contact = res;
            console.log(res);
        });
    }

    $scope.updateContact = function () {

        if($scope.contact._id && $scope.contact._id.trim().length > 0) {
            console.log($scope.contact._id);
            $http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function (res) {
                refresh();
            });
        }
    }

    $scope.clearContact = function () {
        $scope.contact = "";
    }
}