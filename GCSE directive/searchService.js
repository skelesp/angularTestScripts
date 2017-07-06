angular.module('gcse')
  .factory('gcseService', ['$http', '$q',
    function($http, $q){
      return {
        getImageLinks: function(query, resultCount) {
          var url = 'http://localhost:5000/api/gcse/' + query;
          var deferred = $q.defer();

    			$http.get(url).then(function(results){
            var googleImages = [];
            if (results.data) { //images found, save all the links

              /*
              Steek alle searchResults waarin de key 'link' beschikbaar is in een array 'googleImages'
              GoogleImages is een array van urls naar images
              */
              var imagesResults = results.data;
              imagesResults.forEach(function(item){
                if (item.link) {
                  googleImages.push(item.link);
                }
              });
              console.info("Images gevonden voor GCSE search: " + query);
            }
            else { //No images found, show default image
              googleImages.push("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTaO2OnPKQ3_p3RdI1KZkj6XP-8il5iRO9iGj9Xj8TT0KuKTE_Ynw");
              console.error("Geen images gevonden voor GCSE search: " + query);
            }
            deferred.resolve(googleImages);
    			});

    			return deferred.promise;
        }
      };
    }
  ])
  ;
