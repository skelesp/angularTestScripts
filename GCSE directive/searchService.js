angular.module('gcse')
  .factory('SearchService', ['$http', '$q',
    function($http, $q){
      return {
        getSearchResults: function(searchTerm, resultCount) {
          var url = 'http://localhost:5000/api/gcse/' + searchTerm;
          var deferred = $q.defer();

    			$http.get(url).then(function(results){
            deferred.resolve(results);
    			});

    			return deferred.promise;
        }
      };
    }
  ])
  ;
