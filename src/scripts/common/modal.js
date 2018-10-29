const modalInit = (function () {
  return {
    init: function () {
      $('.menu__link').on('click', function () {
        $('#modalMenu').toggleClass('in');
        $('body').toggleClass('hidden');
      });
    },
  };
}());

module.exports = modalInit;