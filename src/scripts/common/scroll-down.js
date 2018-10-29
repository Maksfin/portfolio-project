const scrollDownInit = (function() {
  return {
    init: function() {
      $('.arrow-down__btn').on('click', function(){
        var scrollB = $(this).data('href');
        $('.wrapper').stop().animate({
          scrollTop: $(scrollB).offset().top + 115,
        }, 1500);
      });
    },
  };
}());

module.exports = scrollDownInit;