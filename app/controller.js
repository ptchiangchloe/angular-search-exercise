(function() {
  'use strict';
  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope','$http','LocalStorage', 'QueryService'];

  function MainController($scope, $http,LocalStorage, QueryService) {
    $scope.results = [];
    $scope.result = 'No result';

    ////////////  function definitions

    $scope.search = function() {
      $http({
        method: 'GET',
        url: 'https://api.flickr.com/services/feeds/photos_public.gne',
        params:{
          format: 'json',
          nojsoncallback:1,
          tags: $scope.searchTerm,
        }
      }).then(function (res){
        if (res.status == 200) {
          return res.data;
        }else{
          throw 'Authorization error';
        }
     }).then(function(data){
       $scope.results = data;
       if ($scope.results !== []) {
         $scope.result = '';
       }
     }).catch(function (error){
       console.log(error);
       return;
     });
    }
  }
})();
