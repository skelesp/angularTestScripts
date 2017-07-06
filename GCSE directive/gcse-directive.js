angular.module('gcse',[
  'ui.bootstrap'
])
  .directive('googleImageSearch', ['$uibModal', 'gcseService', function($uibModal, gcseService){
      return {
        scope: {
          googleImageSearch: '@',
          imageResult: '='
        },
        replace: false,
        restrict: 'AE',
        link: function ($scope, $element, $attrs) {
          $element.on('click', function(){
            var googleImages = [];
            var query = $scope.googleImageSearch;

            if (query){ //Search query has been entered
      				gcseService.getImageLinks(query).then(function (results) {
    						googleImages = results;

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
                });
              });
            } else {
              console.error("Geen zoekterm beschikbaar");
            }
        });
      }
    };
  }]);
