// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var snappit=angular.module('snapit',['ionic', 'ngCordova','ngStorage']);

snappit.factory('Category',function($http){
  return {
    all:function(){
      var CategoryString = [
      {
        onMain:false,
        title:"Home",
        stateUrl:"/home",
        stateName:"home",
        tempUrl:"home.html",
      },
      {
        onMain:true,
        title:"Boys",
        url:"img/kids_boy_fashion.jpg",
        stateName:"boys",
        stateUrl:"/boys",
        tempUrl:"boys.html",
        
      },
      {
        onMain:true,
        title:"Girls",
        url:"img/kids_girl_fashion.jpg",
        stateName:"girls",
        stateUrl:"/girls",
        tempUrl:"girls.html",
      },
      {
        onMain:true,
        title:"Men",
        url:"img/men_fashion.jpg",
        stateName:"men",
        stateUrl:"/men",
        tempUrl:"men.html",
      },
      {
        onMain:true,
        title:"Women",
        url:"img/women_fashion.jpg",
        stateName:"women",
        stateUrl:"/women",
        tempUrl:"women.html",
      },
      {
        onMain:true,
        title:"Family",
        url:"img/family_fashion.jpg",
        stateName:"family",
        stateUrl:"/family",
        tempUrl:"family.html",
      },
      {
        onMain:true,
        title:"Home Decor",
        url:"img/home_decor.jpg",
        stateName:"homedecor",
        stateUrl:"/homedecor",
        tempUrl:"homedecor.html",
      },
      {
        onMain:true,
        title:"Gadgets",
        url:"img/gadgets.jpg",
        stateName:"gadgets",
        stateUrl:"/gadgets",
        tempUrl:"gadgets.html",
      },
      {
        onMain:true,
        title:"Bedding",
        url:"img/bedding.jpg",
        stateName:"bedding",
        stateUrl:"/bedding",
        tempUrl:"bedding.html",
      },
      {
        onMain:true,
        title:"Kitchenware",
        url:"img/kitchen_ware.jpg",
        stateName:"kitchenware",
        stateUrl:"/kitchenware",
        tempUrl:"kitchenware.html",
        catId:"13905"
      }

      ];
      if(CategoryString){
        return CategoryString;
      }
      return [];
    },
    getData:function() {
        $http.get("http://open.api.ebay.com/shopping", { params: {"GLOBAL-ID":"EBAY-IN","version":"713","appid":"keyserSo-d024-4e11-bb75-33ad14e31063", "ResponseEncodingType": "JSON", "QueryKeywords": "Iphone","callname":"FindPopularItems" } })
            .success(function(data) {
              console.log(data.ItemArray.Item);
            })
            .error(function(data) {
                //alert("ERROR");
            });
    },
    getCategories:function() {
        $http.get("http://open.api.ebay.com/shopping", { params: {"GLOBAL-ID":"EBAY-IN","version":"713","appid":"keyserSo-d024-4e11-bb75-33ad14e31063", "ResponseEncodingType": "JSON", "callname":"GetCategoryInfo","CategoryID":"-1","IncludeSelector":"ChildCategories" } })
            .success(function(data) {
              console.log(JSON.stringify(data));
            })
            .error(function(data) {
                //alert("ERROR");
            });
    },
    getCategory:function(catId) {
        $http.get("http://open.api.ebay.com/shopping", { params: {"GLOBAL-ID":"EBAY-IN","version":"713","appid":"keyserSo-d024-4e11-bb75-33ad14e31063", "ResponseEncodingType": "JSON", "callname":"GetCategoryInfo","CategoryID":toString(catId),"IncludeSelector":"ChildCategories" } })
            .success(function(data) {
              console.log(JSON.stringify(data));
            })
            .error(function(data) {
                //alert("ERROR");
            });
    },
    
  }
});
snappit.factory('Cameraa', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
snappit.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider.state("home", {
  url: "/home",
  templateUrl: "home.html",
  
});
  $stateProvider.state("bedding", {
  url: "/bedding",
  templateUrl: "bedding.html",
  
});
  $stateProvider.state("imagefull", {
  url: "/imagefull",
  templateUrl: "imagefull.html",
  
});
  $stateProvider.state("gadgets", {
  url: "/gadgets",
  templateUrl: "gadgets.html",
  
});
  $stateProvider.state("kitchenware", {
  url: "/kitchenware",
  templateUrl: "kitchenware.html",
  
});
  $stateProvider.state("homedecor", {
  url: "/homedecor",
  templateUrl: "homedecor.html",
  
});
  $stateProvider.state("family", {
  url: "/family",
  templateUrl: "family.html",
  
});
  $stateProvider.state("women", {
  url: "/women",
  templateUrl: "women.html",
  
});
  $stateProvider.state("men", {
  url: "/men",
  templateUrl: "men.html",
  
});
  $stateProvider.state("girls", {
  url: "/girls",
  templateUrl: "girls.html",
  
});
  $stateProvider.state("boys", {
  url: "/boys",
  templateUrl: "boys.html",
  
});
  $stateProvider.state("newproduct", {
  url: "/newproduct",
  templateUrl: "newproduct.html",
  
});
  
});
snappit.directive('banner',function($window){
  return{
    restrict:"A",
    link:function($scope,$element,$attrs){
      var ht=$window.innerHeight;
      //console.log(ht)
      //console.log($window);
      angular.element($element[0]).css({'background-image':' url("'+$attrs.banner+'")','height':(ht-44)+'px','margin-top':'0px'});
    }
  };
});
snappit.controller('snapitCtrl',function($scope,$state,$window,$localStorage,
    $sessionStorage, Category,$cordovaCamera, $ionicSideMenuDelegate,$http,$ionicLoading){
  
  $scope.storage=$localStorage.$default({
    counter: 42
  });
  $scope.myImg={
    sourc:""
  };

  $scope.showFullscreen=function(items){
    // console.log(imageid.price);
    $scope.imageHolder="http://10.10.0.234/api/category/"+items.category+"/"+items.imgurl;
    $state.go('imagefull');
  };
  
  $scope.submitImage = function(my_image) {
    $scope.myImg.itemtitle = my_image.title;
    $scope.myImg.category=my_image.category;
    $scope.uploadPicture();
    console.log("BUtton Update done");
    $scope.myImg.itemtitle="";
    $scope.myImg.category="";
    
  };
  $scope.itemsData="";
  $scope.getItems = function(catg) {
        $http.get("http://10.10.0.234/api/query.php", { params: { "opt": catg } })
            .success(function(data) {
                $scope.itemsData=data;
                console.log(data);
            })
            .error(function(err) {
                console.log(err);
            });
    };

  $scope.Category=Category.all();
  //$scope.getData=Category.getData();
  //$scope.getCategories=Category.getCategories();
  //$scope.getCategory=Category.getCategory();
  

  $scope.activeCategory= Category[0];

  $scope.selectCategory = function(Ctg) {
    $scope.activeCategory = Ctg;
    $scope.getItems(Ctg.stateName);
  };
  $scope.data = { "ImageURI" :  "Select Image" };
    $scope.takePicture = function() {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: 0 
      };
    $cordovaCamera.getPicture().then(
    function(imageData) {
      $scope.picData = imageData;
      $scope.myImg.sourc=imageData;
      console.log(JSON.stringify($scope.myImg));
      $scope.ftLoad = true;

      $localStorage.$default({
        fotoUp: imageData
      });
      $ionicLoading.show({template: 'Photo Acquired...', duration:500});
      console.log("Photo Cached");
      // $scope.uploadPicture();
      console.log("Done Uploading");
    },
    function(err){
      $ionicLoading.show({template: 'Error Acquiring Photo...', duration:500});
      },options)
    };

    $scope.selectPicture = function() { 
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: 0 
    };

    $cordovaCamera.getPicture().then(
    function(imageURI) {
      window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
        $scope.picData = fileEntry.nativeURL;
        $scope.ftLoad = true;
        var image = document.getElementById('myImage');
        image.src = fileEntry.nativeURL;
        });
      $ionicLoading.show({template: 'Photo Acquired...', duration:500});
    },
    function(err){
      $ionicLoading.show({template: 'Error Acquiring Photo...', duration:500});
    },options)
  };

    var viewUploadedPictures = function() {
    $ionicLoading.show({template: 'Loading Your Snap'});
        server = "http://10.10.0.234/api/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {       
                      console.log("got-200")
                // document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                $state.go('home');
                    }
                    else { 
                      console.log("Error-200");
                      $ionicLoading.show({template: 'Error getting images...', duration: 1000});
          return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()};
    $ionicLoading.hide();
    }

    $scope.uploadPicture = function() {
    $ionicLoading.show({template: '...'});
    var fileURL = $scope.picData;
    console.log(fileURL);
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;

    var params = {};
    params.value1 = $scope.myImg.category;
    params.value2 = "upl";
    params.itemtitle=$scope.myImg.itemtitle;

    options.params =  params;

    var ft = new FileTransfer();
    console.log(fileURL);
    ft.upload(fileURL, encodeURI("http://10.10.0.234/api/upload.php"), viewUploadedPictures, function(error) {console.log(JSON.stringify(error));$ionicLoading.show({template: 'Error Connecting to server :(...'});
    $ionicLoading.hide();}, options);
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