angular.module('test', [])
  .controller('testController', [ function (){
    this.image="TestImage";
  }])
  .directive('clickMe', [function(){
    return {
      restrict: 'A',
      scope: {
        result: '='
      },
      link: function ($scope, $elem, $attr) {
        $elem.on('click', function(e){
          console.log($scope.result);
        });
      }
    }
  }]);
