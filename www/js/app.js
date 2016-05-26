var app=angular.module('myNotes', ['ionic','myNotes.NotesStore']);

app.config(function($stateProvider,$urlRouterProvider){
  $stateProvider.state('list',{
    url:'/list',
    templateUrl:"templates/list.html",
    controller: "mynotesCtrl"
 });
   $stateProvider.state('edit',{
     url:'/edit/:noteId',
     templateUrl:"templates/edit.html",
     controller:"editCtrl"

  });
    $stateProvider.state('add',{
    url:'/add',
    templateUrl:"templates/edit.html",
    controller:"addCtrl"
  });
  $urlRouterProvider.otherwise('/list');

});


app.controller("mynotesCtrl",function($scope,NotesStore){
    $scope.notes = NotesStore.list();
    $scope.reordering=false;

    $scope.delete=function(noteId){
    NotesStore.remove(noteId);
  }
    //console.log(noteId);
    $scope.move=function(item,fromIndex,toIndex){
     // console.log(fromIndex );
     NotesStore.move(item,fromIndex,toIndex);

    }
    $scope.toggleReordering=function(){
     $scope.reordering=! $scope.reordering;

    }


    
});

app.controller("editCtrl",function($scope,$state,NotesStore){

    $scope.noteId=$state.params.noteId;
    $scope.note = angular.copy(NotesStore.get($scope.noteId));

    $scope.save=function(){
      NotesStore.update($scope.note);
      $state.go('list');
    };  
});
app.controller("addCtrl",function($scope,$state,NotesStore){

  $scope.note={
    id: new Date().getTime().toString(),
    title:"",
    description:""  
  };
  $scope.save=function(){
    NotesStore.create($scope.note);
    $state.go('list');
  };
  
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
