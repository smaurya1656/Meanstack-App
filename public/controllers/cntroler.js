var app=angular.module('myapp',[]);
app.controller('AppCtrl',function($scope,$http){
 var refresh = function() {
       $http.get('/contactlist').then(function (response) {
         //  console.log(response.data);
         $scope.contactlist = response.data;
         //  console.log($scope.contactlist);

     });

 };
 refresh();
  $scope.add=function(){

     // console.log($scope.contacts);
      $http.post('/contactlist',$scope.contacts).then(function (res) {
          $scope.contactlist = res.data;
          $scope.contacts = {};
          refresh();
      });
  };

  $scope.remove=function(id){
     $http.delete('/contactlist/'+ id).then(function (res) {
         refresh();
     });
  };

  $scope.edit=function (id) {
      $http.get('/contactlist/'+ id).then(function (res) {
          $scope.contacts = res.data;
      });
  } ;

  $scope.update=function () {
      console.log("fgeht");
      $http.put('/contactlist/'+ $scope.contacts._id, $scope.contacts).then(function (res) {
        //  $scope.contacts = {};
         refresh();
      });
  };

  // $scope.deselect=function(){
  //    $scope.contacts ={};
  // };



});