(function() {
  'use strict';
  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  MainController.$inject = ['$http','LocalStorage', 'QueryService'];

  function MainController($http,LocalStorage, QueryService) {
    var vm = this; //Removes any issues of dealing with this scoping or binding (i.e. closures in nested functions)
    vm.results = []; // Using an array to store the results
    vm.result = '';
    vm.isSearching = false;
    vm.searchbar = true;

    ////////////  function definitions

    vm.search = function() {

      vm.isSearching = true;

      $http({
        method: 'GET',
        url: 'https://api.flickr.com/services/feeds/photos_public.gne',
        params:{
          format: 'json',
          nojsoncallback:1,
          tags: vm.searchTerm,
        }
      }).then(function (res){
        if (res.status == 200) {
          return res.data;
        }else{
          throw 'Authorization error';
        }
     }).then(function(data){
       vm.results = data;
       vm.isSearching = false;
       if (vm.results.items.length == 0) {
         vm.result = 'No results';
       }
     }).catch(function(error){
       vm.isSearching = false;
       console.log(error);
       return;
     });
    }
  }
})();
