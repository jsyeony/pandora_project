// accordion_nav.js

(function($){
  // 기능 설명
  /*
    1. .gnb 각각의 list에 마우스를 올리면
    2. 해당하는 list에 맞는 아코디언메뉴가 slideUp 으로 나타난다.
    3. .accordion_area에서 벗어나면 아코디언 메뉴가 slideDown으로 사라진다.
  */

  // 변수 설정
  var gnb = $('.gnb');
  var gnbUl = gnb.children('ul');
  var gnbLi = gnbUl.children('li');
  var gnbLiLen = gnbLi.length;

  var accordionArea = gnb.children('.accordion_area');
  var accorWrap = accordionArea.children('.accor_wrap');

  var i = 0;
  
  // 이벤트
  gnbLi.on('mouseenter', function(){
    i = $(this).index();
    accorWrap.eq(i).addClass('on');
    accorWrap.eq(i).siblings().removeClass('on');
  });

  accordionArea.on('mouseleave', function(){
    i = $(this).index();
    accorWrap.removeClass('on');
  });

  // gnbLi.on('mouseenter', function(){
  //   i = $(this).index();
  //   accorWrap.eq(i).stop().slideDown(500);
  //   accorWrap.eq(i).css({'display' : 'flex'});
  //   accorWrap.eq(i).siblings().css({'display' : 'none'});
  // })

  // accordionArea.on('mouseleave', function(){
  //   i = $(this).index()
  //   accorWrap.eq(i).slideUp();
  //   accorWrap.eq(i).css({'display':'none'});
  // });



})(jQuery);