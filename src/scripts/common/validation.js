const validation = (function() {
      
  return {
    init: function(form) {
      let formName = form,
        thisElem = this;
      $('input, textarea').off().blur(function(){
        let that = this;
        valid(that);
      }); 

      function valid(param) {
        let 
          that = param,
          names = $(param).attr('name'), 
          val = $(param).val();

        switch (names) {
        case 'login':
          if (val != '') {
            $(that).parent().addClass('not_error').removeClass('error');
            $(that).next('.error-box').remove();
          } else {
            $(that).parent().addClass('error').removeClass('not_error');
            $(that).after('<div class="error-box">Вы не ввели логин</div>');
          }
          break;
        case 'password':
          if (val != '') {
            $(that).parent().addClass('not_error').removeClass('error');
            $(that).next('.error-box').remove();
          } else {
            $(that).parent().addClass('error').removeClass('not_error');
            $(that).after('<div class="error-box">Вы не ввели пароль</div>');
          }
          break;
        case 'name':
          if(val != '') {
            $(that).parent().addClass('not_error').removeClass('error');
            $(that).next('.error-box').remove();
          } else {
            $(that).parent().addClass('error').removeClass('not_error');
            $(that).after('<div class="error-box">Вы не ввели имя</div>');
          }
          break;
        case 'email':
          var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
          if (val != '' && rv_email.test(val)) {
            $(that).parent().addClass('not_error').removeClass('error');
            $(that).next('.error-box').remove();
          } else {
            $(that).parent().addClass('error').removeClass('not_error');
            $(that).after('<div class="error-box">Не верный email</div>');
          }
          break;
        case 'msg':
          if (val != '') {
            $(that).parent().addClass('not_error').removeClass('error');
            $(that).next('.error-box').remove();
          } else {
            $(that).parent().addClass('error').removeClass('not_error');
            $(that).after('<div class="error-box">Вы не заполнили</div>');
          }
          break;
        case 'children':
          if ($(that).is(':checked') ) {
            $(that).parent().addClass('not_error').removeClass('error');
            $(that).next('.error-box').remove();
          } else {
            $(that).parent().addClass('error').removeClass('not_error');
            $(that).after('<div class="error-box">Вы не отметили</div>');
          }
          break;
        }
      }

      formName.submit(function(e){
        e.preventDefault();
        allElem();

        if (!$('.error').length) {
          console.log('success');
          thisElem.close();
        }

      });

      function allElem() {
        $('input, textarea').each(function () {
          let that = this;
          valid(that);
        });
      }

    },
    close: function(){
      let
        modal = $('.modal-success'),
        button = modal.find('button');
      modal.show();
      button.on('click', function(){
        modal.hide();
      });
    },
  };

}());

module.exports = validation;