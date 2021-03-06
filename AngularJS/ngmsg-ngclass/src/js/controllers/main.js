angular
  .module('portfolioApp')
  .controller('MainCtrl', MainCtrl)
  .controller('PropertiesIndexCtrl', PropertiesIndexCtrl)
  .controller('PropertiesShowCtrl', PropertiesShowCtrl);



///////////////////////////////////// MAIN /////////////////////////////////////

MainCtrl.$inject = ['$rootScope','$resource', '$state'];
function MainCtrl($rootScope, $resource, $state){
  const vm = this;

  vm.newProperty = {};

// __________________________________rootScope__________________________________
  function stateChange(e, toState) {
    // In english: every time you change pages using ui-router is gonna run this function and adapted the value of the property (vm.pageName) to be the name of our state. So in the router.js home, contact, about those will be the value of vm.pageName.
    vm.pageName = toState.name;
    console.log(vm.pageName);
  }
  $rootScope.$on('$stateChangeStart', stateChange);


// _____________________________propertiesCreate________________________________
  vm.create = propertiesCreate;

  function propertiesCreate() {
    const Property = new $resource('/api/properties/:id', { id: '@id' });

    Property
    .save(vm.newProperty)
    .$promise
    .then((property) => $state.go('showState', {id: property.id}));
  }
}

///////////////////////////////////// INDEX ////////////////////////////////////

PropertiesIndexCtrl.$inject = ['$resource'];
function PropertiesIndexCtrl($resource) {

  const vm = this;
  // Here is where we tell resource where on the object can find the id
  const Property = new $resource('/api/properties/:id', { id: '@id' });

  vm.all = Property.query(); // query is the equivalent of find. It's just gonna make a request to the index route.
  // since resource is very 'smart' we don't need to create an empty array anymore because resource will do the job for us. It will make an array and when the data comes back it will fill the array up with the data.
}

///////////////////////////////////// SHOW /////////////////////////////////////

PropertiesShowCtrl.$inject = ['$resource','$stateParams', '$state'];
function PropertiesShowCtrl($resource, $stateParams, $state) {

  const vm = this;
  const Property = new $resource('/api/properties/:id', { id: '@id' });

  vm.property = Property.get($stateParams);


  vm.curTemplate = 'msg1.html';
  vm.templates = ['msg1.html','msg2.html','msg3.html'];

  vm.switch = function(index){
    if(vm.templates.length > index){
      console.log(vm.templates.length);
      vm.curTemplate = vm.templates[index];
    }
  };

// DELETE
  function propertiesDelete() {
    vm.property
    .$remove()
    .then(() => $state.go('homeState'));
  }
  vm.delete = propertiesDelete;
}
