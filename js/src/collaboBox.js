// collaboBox.js

(function($){
  // 기능 설명
  /*
    .next_btn을 눌렀을 때 .collabo_wrapper가 margin-left:-100%를 하면서 슬라이드 이미지를 변화
    .prev_btn을 눌렀을 때 .collabo_wrapper가 margin-left:100%를 하면서 슬라이드 이미지를 변화
    - 슬라이드가 변할 때 그에 맞는 인디케이터에 addClass('on')이 됨
    - 더해서 총 슬라이드 갯수를 불러오고 현재 슬라이드의 번호를 불러온다.
  */

  // 변수
  var collaboSlide = $('.collabo_slide');
  var collaboWrapper = collaboSlide.children('div');
  var collaboImg = collaboWrapper.find('div');
  var collaboImgLen = collaboImg.length;

  var nextBtn = $('.next_btn');
  var prevBtn = $('.prev_btn');

  var collaboIndi = $('.collabo_indicator');
  var collaboUl = collaboIndi.children('ul');
  var collaboLi = collaboUl.find('li');
  var collaboLink = collaboLi.children('a');

  var collaboIndiP = collaboIndi.children('p');
  var collaboEm = collaboIndiP.find('em');
  var collaboSpan = collaboIndiP.find('span');
  var totalSlide = collaboImgLen;

  var permission = true;
  var x = 0;

  var nowSlideFn = function(){
    collaboEm.text(x+1);
  };

  collaboSpan.text(totalSlide);
  nowSlideFn();
  
  // 함수
  var nextBtnFn = function(){
    if(x < collaboImgLen-1){
      if(permission){
        permission = false;
        x += 1;
        collaboWrapper.stop().animate({'marginLeft' : -(100 * x) + '%'}, function(){
          permission = true;
        });
      };
    };
  }; // nextBtnFn();

  var prevBtnFn = function(){
    if(x > 0){
      if(permission){
        permission = false;
        x -= 1;
        collaboWrapper.stop().animate({'marginLeft' : -(100 * x) + '%'}, function(){
          permission = true;
        });
      };
    };
  }; // prevBtnFn();

  var indicatorFn = function(){
    collaboLi.eq(x).addClass('on');
    collaboLi.eq(x).siblings().removeClass('on');
  };


  // 이벤트
  // 슬라이드가 혼자서 자동으로 저절로 넘어가는 오류 존재
  nextBtn.on('click', function(e){
    e.preventDefault();
    nextBtnFn();
    indicatorFn();
    nowSlideFn();
  });
  
  prevBtn.on('click', function(e){
    e.preventDefault();
    prevBtnFn();
    indicatorFn();
    nowSlideFn();
  });

  collaboLink.on('click', function(e){
    e.preventDefault();
    x = $(this).parent().index();
    collaboWrapper.stop().animate({'marginLeft' : -100 * x + '%'});
    indicatorFn();
    nowSlideFn();
  })



})(jQuery);