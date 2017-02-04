(function () {
  'use strict';

    angular
      .module('updatePost.component' , ['ui.router'])

      .component('updatePost' , {
        controller: Controller,
        templateUrl: '/posts/updatePost.template.html'
      });

      Controller.$inject = ['$http', '$stateParams', '$state', '$location'];

      function Controller($http, $stateParams, $state) {
        const vm = this;

        vm.$onInit = onInit;
        vm.classifieds = [];
        vm.updatePost = updatePost;
        vm.deletePost = deletePost;

      function onInit(){
        // console.log("connected to update Post component");
        $http.get(`/api/classifieds/${$stateParams.id}`)
        // console.log("stateParam = " , `${$stateParams.id}`)
          .then(results => {
            vm.post = results.data;
            console.log(vm.post);
          });
      }

      function updatePost() {
        // console.log(post);
        $http.patch (`/api/classifieds/${$stateParams.id}` , vm.post);
        console.log("patch post", vm.post)

          // .then(results => {
          //   console.log(results);
            // $state.href('/');
            $state.go('/')
            // $location.path('/');
          // });
      }

      function deletePost() {
        $http.delete (`/api/classifieds/${$stateParams.id}` , vm.post);
        console.log("deleting post ", vm.post)
          //
          // .then (results => {
          //   console.log(results);
            $state.href('/');
          // });
      }
    }
}());
