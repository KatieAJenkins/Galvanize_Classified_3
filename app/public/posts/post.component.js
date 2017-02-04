(function() {
  'use strict';

  angular
    .module('post.component' , ['ui.router'])

    .component('postMessage' , {
      controller: Controller,
      templateUrl: '/posts/post.template.html'
    });

    Controller.$inject = ['$http'];

    function Controller($http) {
      const vm = this;

      vm.$onInit = onInit;
      vm.submitNewPost = submitNewPost;
      vm.setPropertyName = setPropertyName;
      vm.classifieds = [];

      function onInit(){
        // console.log("we made it to onInit");
        $http.get('/api/classifieds')
          .then(results => {
            vm.classifieds = results.data;
            // console.log(results.data);
          });
      }

      function submitNewPost (title, description, price, item_image) {
        var post = {title: title, description: description, price: price, item_image: item_image};
        // console.log(post);
        $http.post('/api/classifieds' , post)
          .then(response => {
            vm.classifieds.push(post);
            delete vm.post;
          });
      }

      function setPropertyName(property){
        vm.sort = property;
      }
    }
}());
