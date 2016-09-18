angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Data) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var param = "classify";
  $scope.titleList = Data.getMenuData(param);
  $scope.arr = [1,2,3,4,5,6,7];
})


  .controller("PlaylistsCtrl", function ($scope,$stateParams,Data,$rootScope) {
    // 1. 获得列表ID
    // 2. 根据列表ID获得数据
    var param = "list?id=" + $stateParams.menuId + "&page=1&rows=20";
    $scope.newsList = Data.getMenuData(param);
    // 3. 将分类名填入title
    $scope.id = $stateParams.menuId - 1;

  })


.controller('PlaylistCtrl', function($scope, $stateParams,Data) {
  //可以通过$stateParams来查找变量对应的值
  var param = "show?id="+$stateParams.newsId;
  $scope.detail = Data.getMenuData(param);

});
