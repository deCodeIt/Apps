// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('snapit',['ionic'])
.factory('Category',function(){
  return {
    all:function(){
      var CategoryString = [
      {
        title:"Kid's Fashion",
      }
      ];
      if(CategoryString){
        return CategoryString;
      }
      return [];
    },
  }
})
.directive('banner',function(){
  return{
    restrict:"A",
    link:function($scope,$element,$attrs){
      console.log($element);
      angular.element($element[0]);
    }
  };
})
.controller('snapitCtrl',function($scope,$timeout,$window,$ionicModal, Category, $ionicSideMenuDelegate){
  
  $scope.bannerImgs=[
    {
      title:"Kid's Wear",
      img_url:"img/kids_wear.jpg"
    },
    {
      title:"Men's Wear",
      img_url:"img/mens_wear.jpg"
    },
    {
      title:"Women's Wear",
      img_url:"img/womens_wear.jpg"
    }
  ];
  $scope.mainQuote="img/home_quote.jpg";

  $scope.Category=Category.all();

  $scope.activeProject = "";

  $scope.selectCategory = function(Ctg) {
    $scope.activeCategory = Ctg;
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  $scope.toggleMenu= function(){
    $ionicSideMenuDelegate.toggleLeft();
  };
  

});

// angular.module('starter', ['ionic'])

// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if(window.StatusBar) {
//       StatusBar.styleDefault();
//     }
//   });
// })