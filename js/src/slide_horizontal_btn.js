// slide_horizontal_btn.js

(function($){
  // 기능 설명
  /*
    다음버튼을 클릭시 .slide_wrapper가 움직이도록 처리
    ---------------------------------------------------------------------------
    수행전, .slide_wrapper 내부에 있는 요소(div)의 마지막 요소를 복제하여 앞으로 이동
    .slide_wrapper 영역은 내부 기존 갯수보다 +1된 값 만큼 가로값을 늘려주기
    보이는 내용은 무조건 1번째 내용이 보이도록 처리
  */

  // 변수
  var slideSet = $('.slide_set');

  var btnArea = slideSet.find('.slide_btn_area');
  var nextBtn = btnArea.find('.next_btn');
  var prevBtn = btnArea.find('.prev_btn');

  var indiArea = slideSet.find('.slide_indicator');
  var indiUl = indiArea.children('ul');
  var indiLi = indiUl.children('li');

  var slideArea = slideSet.find('.slide');
  var slideWrapper = slideArea.children('div');
  var slideDiv = slideWrapper.children('div');
  var originSlideLen = slideDiv.length;

  var permission = true;
  var i = 0;
  var timed = 1000;
  var play;

  // 함수
  var slideGoFn = function(){
    play = setInterval(function(){
      nextBtn.trigger('click', timed);
    }, timed * 3);
  };

  var slideStopFn = function(){
    clearInterval(play);
  };

  var nextBtnFn = function(){
    if(permission){
      permission = false;
      i += 1;
      if(i >= originSlideLen){
        slideWrapper.css({'marginLeft' : 100 * i + '%'});
        i = 0;
      };
      slideWrapper.stop().animate({'marginLeft' : -100 * i + '%'}, function(){
        permission = true;
      });
    };
  };

  var prevBtnFn = function(){
    if(permission){
      permission = false;
      i -= 1;
      slideWrapper.stop().animate({'marginLeft' : -100 * i + '%'}, function(){
        if(i < 0){
          i = originSlideLen - 1;
          slideWrapper.css({'marginLeft' : -100 * i + '%'});
        };
        permission = true;
      });
    };
  };

  var indicatorFn = function(){
    indiLi.eq(i).addClass('on');
    indiLi.eq(i).siblings().removeClass('on');
  };

  // 기능수행
  var cloneDiv = slideDiv.eq(-1).clone();
  slideWrapper.prepend(cloneDiv);

  var newSlideDiv = slideWrapper.children('div');
  var newSlideLen = newSlideDiv.length;

  slideWrapper.css({'width': ( 100 * newSlideLen ) + '%', 'left' : -100 + '%' });
  newSlideDiv.css({'width' : ( 100 / newSlideLen ) + '%' });

  // slideGoFn();

  // 이벤트 ======================================================================
  nextBtn.on('click', function(e){
    e.preventDefault();
    nextBtnFn();
    indicatorFn();
  });
  prevBtn.on('click', function(e){
    e.preventDefault();
    prevBtnFn();
    indicatorFn();
  });

  // slideSet.on('mouseenter', function(){
  //   slideStopFn();
  // });

  // slideSet.on('mouseleave', function(){
  //   slideGoFn();
  // });


})(jQuery);