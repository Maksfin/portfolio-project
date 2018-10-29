const slider = require('./common/slider');
const modalNav = require('./common/modal');
const flipInit = require('./common/flip');
const toggleInit = require('./common/toggle');
const scrollDownInit = require('./common/scroll-down');
const blogScrollMenuInit = require('./common/blog-scroll-menu');
const validationAuthInit = require('./common/validation');
const preloaderOne = require('./common/preloader');
const web = require('./common/webgl');



if ($('.b-works-form').length) {
  blur.init();
  
  window.onresize = function () {
    blur.init();
  };
}


if ($('#bg').length) {
  web.init();
}

// Preloader
if ($('.preloader').length) {
  preloaderOne.init();
}

// Slider
if ($('.slider').length) {
  slider.init();
}

// Validation
if ($('#authfo').length) {
  validationAuthInit.init($('#authfo'));
}

// Validation
if ($('#contact').length) {
  validationAuthInit.init($('#contact'));
}

// Menu
if ($('.menu__link').length) {
  modalNav.init();
}

// Flip page Index
if ($('#auth').length) {
  flipInit.init();
}

// Toggle aside page My-blog
if ($('.btn-aside').length) {
  toggleInit.init();
}

// Scroll button
if ($('.arrow-down__btn').length) {
  scrollDownInit.init();
}

//Blog scroll
if ($('.blog-block__right').length) {
  blogScrollMenuInit.init();
}