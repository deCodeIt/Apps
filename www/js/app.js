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
        url:"img/kids_fashion.jpg"
      },
      {
        title:"Men's Fashion",
        url:"img/men_fashion.jpg"
      },
      {
        title:"Women's Fashion",
        url:"img/women_fashion.jpg"
      },
      {
        title:"Family Fashion",
        url:"img/family_fashion.jpg"
      },
      {
        title:"Home Decor",
        url:"img/home_decor.jpg"
      },
      {
        title:"Kitchenware",
        url:"img/kitchen_ware.jpg"
      },

      ];
      if(CategoryString){
        return CategoryString;
      }
      return [];
    },
    quote:function(){
      return "img/home_quote.jpg";
    }
  }
})
.directive('banner',function($window){
  return{
    restrict:"A",
    link:function($scope,$element,$attrs){
      var ht=$window.innerHeight;
      console.log('url("'+$attrs.banner+'") no-repeat cover');
      angular.element($element[0]).css({'background-image':' url("'+$attrs.banner+'")','height':'100vh'});
    }
  };
})
.controller('snapitCtrl',function($scope,$timeout,$window,$ionicModal, Category, $ionicSideMenuDelegate){
  
  $scope.mainQuote=Category.quote();

  $scope.Category=Category.all();

  $scope.activeCategory= "";

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