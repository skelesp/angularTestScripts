angular.module('test',[
  'gcse',
  'ui.bootstrap'
])
  .controller('testController', [function(){
    this.image = "";
    this.query = "";
    this.clear = function(){
      this.image = "";
      this.query = "";
    }
  }]);
