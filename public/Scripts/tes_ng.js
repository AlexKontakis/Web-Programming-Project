angular.module('myApp',[])
.controller('myController', ['$scope', function($scope) {
                
                
    $scope.currentTemplate = 'main'; // Initial template URL

    $scope.changeTemplate = function(templateUrl) {
        $scope.currentTemplate = templateUrl; // Update the current template URL
    };
}]);