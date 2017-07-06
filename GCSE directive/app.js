angular.module('test',[
  'gcse',
  'ui.bootstrap'
])
  .controller('testController', [function(){
    this.image = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTaO2OnPKQ3_p3RdI1KZkj6XP-8il5iRO9iGj9Xj8TT0KuKTE_Ynw";
    this.query = "Lamzac";

    this.clear = function(){
      this.image = "";
      this.query = "";
    }
  }]);
