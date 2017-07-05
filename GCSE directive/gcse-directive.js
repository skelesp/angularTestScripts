angular.module('gcse',[
  'ui.bootstrap'
])
  .directive('googleImageSearch', ['$uibModal', 'SearchService', function($uibModal, SearchService){
      return {
        scope: {
          query: '@',
          imageResult: '=',
          config: '@?'
        },
        templateUrl: 'gcse.html',
        restrict: 'AE',
        link: function ($scope, $element, $attrs) {
          var config = angular.fromJson($scope.config);
          $scope.type = config.type;
          $scope.content = config.content;

          $scope.search = function(){
          var googleImages = [];

          if ($scope.query){ //Search query has been entered

    				SearchService.getSearchResults($scope.query).then(function (results) {
  						if (results.data) { //images found, save all the links

                /*
                Steek alle searchResults waarin de key 'link' beschikbaar is in een array 'googleImages'
                GoogleImages is een array van urls naar images
                */
                //TODO: dit zou in de API call al moeten gebeuren. De directive zou meteen een lijst van urls moeten krijgen (tenzij ik er later meer wil mee doen... Dan is extra info nodig!)
                var searchResults = results.data;
  							searchResults.forEach(function(item){
  								if (item.link) {
  									googleImages.push(item.link);
  								}
  							});
                console.info("Images gevonden voor GCSE search: " + $scope.query);
  						}
  						else { //No images found, show default image
                googleImages.push("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTaO2OnPKQ3_p3RdI1KZkj6XP-8il5iRO9iGj9Xj8TT0KuKTE_Ynw");
                console.error("Geen images gevonden voor GCSE search: " + $scope.query);
  						}
            });

          } else {
            console.error("Geen zoekterm beschikbaar");
          }

          var popup = $uibModal.open({
            ariaLabelledBy: 'modal-title',
			      ariaDescribedBy: 'modal-body',
            templateUrl: 'gcse-popup.html',
            controller: 'popupController',
            controllerAs: 'popupCtrl',
            animation: true,
            size: 'lg|sm',
            resolve: {
              images: function () {
                return googleImages;
              }
            }
          }).result
          .then(function (selectedImage) {
            $scope.imageResult = selectedImage;
          })
          .catch(function () {
            // Modal dismissed.
            $scope.imageResult = "";
          });
        }
      }
    };
  }]);
