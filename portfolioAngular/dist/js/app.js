'use strict';

angular.module('coddio', ['ui.router']).controller('MainCtrl', MainCtrl).controller('AboutCtrl', AboutCtrl).controller('ContactCtrl', ContactCtrl)
// ___________________________________ROUTER___________________________________
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('');

  $stateProvider.state('portfolio', {
    url: '/portfolio',
    templateUrl: '/src/views/portfolio.html'
  }).state('about', {
    url: '/about',
    templateUrl: '/src/views/about.html',
    controller: 'AboutCtrl as about'
  }).state('contact', {
    url: '/contact',
    templateUrl: '/src/views/contact.html',
    controller: 'ContactCtrl as contact'
  }).state('index', {
    url: '/'
  });
  $urlRouterProvider.otherwise('/');
});

// __________________________________MAIN CTRL________________________________
MainCtrl.$inject = ['$rootScope'];
function MainCtrl($rootScope) {
  var vm = this;

  // Here we reload the index page everytime we land on it
  vm.reload = function () {
    location.reload(true);
  };

  // When we click on the black circle...
  vm.onClick = function () {

    vm.menuOpen = true;
    // vm.menuOpen = !vm.menuOpen;

    var clickMe = document.getElementById('clickMe');
    clickMe.play();

    removeAttr();

    var black = document.getElementById('black');
    black.addEventListener('webkitTransitionEnd', function () {
      setAttr();
    });
  };

  // Here we animate the black circle only when the navbar is closed.
  function breakbeat() {
    var black = document.getElementById('black');
    var beat = document.getElementById('beat');
    // console.log('breakbeat', black);
    if (!black.classList.contains('active')) {
      black.classList.add('heart');
      beat.play();
      black.addEventListener('click', function () {
        black.classList.remove('heart');
        beat.pause();
      });
    }
  }

  // _____________________________JS ONCE FUNCTION_______________________________

  function once(fn, context) {
    var result;

    return function () {
      if (fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }

      return result;
    };
  }

  // REMOVE ATTRIBUTE
  var removeAttr = once(function () {
    var remove = document.getElementById('wow');
    remove.removeAttribute('href');
    // console.log('remove', remove);
  });

  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // PUT THE ATTRIBUTE BACK
  function setAttr() {
    var set = document.getElementById('wow');
    set.setAttribute('href', '/portfolio');
    // console.log('set', set);
  }

  // _________________________________MOUSE OVER_________________________________

  vm.hoverIn = function (event) {
    var menuClass = document.getElementById('black');
    var beat = document.getElementById('beat');
    // console.log(beat);
    var cursor = document.getElementById('cursor');
    var el = getElement(event);
    if (menuClass.classList.contains('active')) {
      el.addClass('heart');
      beat.play();
      removeSpanClass();
      // console.log('hoverIn', el);
    }
    cursor.play();
    breakbeat();
  };

  vm.hoverOut = function (event) {
    var beat = document.getElementById('beat');
    var el = getElement(event);
    el.removeClass('heart');
    beat.pause();
    addSpanClass();
    // console.log('hoverOut', el);
  };

  function getElement(event) {
    return angular.element(event.srcElement || event.target);
  }

  // SHOW AND HIDE THE SPAN
  var span = document.getElementsByTagName('span');
  var circle = document.getElementsByClassName('circle');

  function removeSpanClass() {
    for (var i = 0; i < circle.length; i++) {
      if (circle[i].classList.contains('heart')) {
        span[i].classList.remove('hidden');
      }
    }
  }

  function addSpanClass() {
    for (var i = 0; i < circle.length; i++) {
      if (!circle[i].classList.contains('heart')) {
        span[i].classList.add('hidden');
      }
    }
  }

  // _________________________________WATCH STATE_________________________________
  function stateChange(e, toState) {
    vm.pageName = toState.name;
    console.log(vm.pageName);

    vm.menuOpen = false;
  }
  $rootScope.$on('$stateChangeStart', stateChange);
  // $state.reload();
}

// _________________________________ABOUT CTRL_________________________________
function AboutCtrl() {
  var vm = this;

  function onloadFun() {
    var bars = document.getElementsByClassName('progress-bar');
    for (var i = 0; i < bars.length; i++) {
      bars[i].children[0].style.width = bars[i].dataset.percent;
      // console.log(bars[i].dataset);
      bars[i].children[1].innerHTML = bars[i].dataset.label;
    }
    var test = document.getElementById('test');
    test.addEventListener('webkitTransitionEnd', function () {
      for (var i = 0; i < bars.length; i++) {
        bars[i].children[0].style.width = '';
        // bars[i].children[1].innerHTML = '';
      }
    });
  }

  vm.onloadFun = onloadFun;

  setInterval(function () {
    console.log(onloadFun());
  }, 3000);
}
// ____________________________ CONTACT CTRL_________________________________
function ContactCtrl() {
  var vm = this;

  vm.hoverIn = function (event) {
    var el = getElement(event).parent();
    console.log(el);
    el.addClass('flipped');
    // console.log('hoverIn', el);
  };

  vm.hoverOut = function (event) {
    var el = getElement(event).parent().parent().parent();
    el.removeClass('flipped');
    console.log('hoverOut', el);
  };

  function getElement(event) {
    return angular.element(event.srcElement || event.target);
  }
}