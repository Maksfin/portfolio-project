const slider = (function() {
  let
    flag = true,
    timer = 0,
    slider = $('.slider'),
    durationTimer = 5000;
        
  return {
    init: function() {
      const thisElem = this;
      const btn = slider.find('.slider-btn__control');
      //play slider
      thisElem.autoPlay();
      
      btn.on('click', function(e){
        e.preventDefault();
        let 
          $this = $(this),
          elems = slider.find('.slider-list__item'),
          activeElem = elems.filter('.active'),
          nextElem = activeElem.next(),
          prevElem = activeElem.prev(),
          firstElem = elems.first(),
          lastElem = elems.last();

        thisElem.clearPlay();
        
               
        if ($this.hasClass('slider-btn__control_left')) {
          nextElem.length ? thisElem.move(nextElem, 'next') : thisElem.move(firstElem, 'next'); 
        }else{
          prevElem.length ? thisElem.move(prevElem, 'next') : thisElem.move(lastElem, 'back');
        }

        thisElem.btnPlay();

      });

    },
    move: function(elem, dir){
      const thisElem = this;
      let 
        block = elem.parents('.slider'),
        elems = block.find('.slider-list__item'),
        activeElem = elems.filter('.active'),
        elemWidth = elems.width(),
        posElem = 0,
        posMoveElem = 0,
        elemNext = elem.next(),
        duration = 600;

      if (flag) {
        
        flag = false;

        if (dir === 'next'){
          posElem = elemWidth;
          posMoveElem = -elemWidth;
        }else if(dir === 'back'){
          posElem = -elemWidth;
          posMoveElem = elemWidth;
        }

        elem.css('left', posElem).addClass('in-active');
        elems.removeClass('next').removeClass('prev');

        if(elemNext.length){
          elem.next().addClass('next');
          elem.prev().addClass('prev');
          if (!elem.prev().length) {
            elems.last().addClass('prev');
          }
        }else{
          elem.prev().addClass('prev');
          elems.first().addClass('next');
        }

        let inActiveMove = elems.filter('.in-active');
        activeElem.animate({left: posMoveElem}, duration);

        inActiveMove.animate({left: 0}, duration, function(){
          var $this = $(this);
          elems.css('left', '0').removeClass('active');
          $this.toggleClass('in-active active');
          flag = true;
        });
        thisElem.moveContent(inActiveMove);
      }
      
    },
    btnPlay: function(){
      let 
        leftBgBtn = slider.find('.bg-left').empty(),
        rightBgBtn = slider.find('.bg-right').empty(),
        next = slider.find('.next'),
        prev = slider.find('.prev');

      next.children().clone().appendTo(leftBgBtn);
      prev.children().clone().appendTo(rightBgBtn);
    },
    moveContent: function(activeElem){
      let 
        block = slider.find('.slider-inform').empty(),
        item = activeElem.find('.slider-desc');
        
      item.clone().appendTo(block).animate({opacity: '.5'}, 'slow').animate({opacity: '1'}, 'fast');
    },
    autoPlay: function(){
      let thisElem = this;
      timer = setInterval(function(){
        let
          elems = $('.slider-list__item'),
          activeElem = elems.filter('.active'),
          nextElem = activeElem.next(),
          firstElem = elems.first();
        
        nextElem.length ? thisElem.move(nextElem, 'next') : thisElem.move(firstElem, 'next'); 
        
        thisElem.btnPlay();  

      }, durationTimer);

    },
    clearPlay: function(){
      if (timer) {
        clearInterval(timer);
        this.autoPlay();
      }
    },
  };
}());

module.exports = slider;