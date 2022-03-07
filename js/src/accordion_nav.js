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
  var gnbLink = gnbLi.children('a');

  var accordionArea = gnb.children('.accordion_area');
  var accorWrap = accordionArea.children('.accor_wrap');

  var searchArea = $('.search_area');
  var searchBtn = searchArea.children('button');
  var searchInput = searchArea.children('input');

  var i = 0;
  var timed = 1000;

  // 헤더 검색 아이콘 관련 이벤트 수행 ===============================================
  /*
    검색 아이콘에 마우스를 올리면 검색창 input이 나타나도록 설정
    input에서 포커스가 벗어나거나 검색영역을 마우스가 벗어나면 다시 사라지도록 설정
  */
  // 기본 수행
  searchInput.hide();

  // 이벤트
  searchBtn.on('mouseenter', function(){
    searchInput.fadeIn(timed/4);
  });

  searchArea.on('mouseleave', function(){
    searchInput.fadeOut(timed/3);
  });

  searchInput.on('blur', function(){
    searchInput.fadeOut(timed/3);
  });

  // 아코디언메뉴를 나타내는 방법 첫번째 : addClass ====================================

  // gnbLi.on('mouseenter', function(){
  //   i = $(this).index();
  //   accorWrap.eq(i).addClass('on');
  //   accorWrap.eq(i).siblings().removeClass('on');
  // });

  // gnb.on('mouseleave', function(){
  //   i = $(this).index();
  //   accorWrap.removeClass('on');
  // });

  // gnbLink.on('focus', function(){
  //   i = $(this).parent().index();
  //   accorWrap.eq(i).addClass('on');
  //   accorWrap.eq(i).siblings().removeClass('on');
  // });
  
  // gnbLink.on('blur', function(){
  //   accorWrap.removeClass('on');
  // });

  /* 
    아코디언 메뉴를 나타내는 방법 두번째 : 먼저 아코디언메뉴를 기본 수행으로 js를 통해
    숨겨 놓은 뒤 이벤트를 통해 원하는 효과로 나타나도록 지정(slideDown, fadeIn ...)
  */
  // 기본 수행
  accorWrap.hide();

  // 이벤트
  gnbLi.on('mouseenter', function(){
    i = $(this).index();
    accorWrap.eq(i).stop().slideDown(timed/3);
    accorWrap.eq(i).siblings().stop().hide();
  });

  gnb.on('mouseleave', function(){
    i = $(this).index();
    accorWrap.stop().slideUp(timed/3);
  });

  gnbLink.on('focus', function(){
    i = $(this).parent().index();
    accorWrap.eq(i).stop().slideDown(timed/3);
    accorWrap.eq(i).siblings().stop().hide();
  });
  
  gnbLink.on('blur', function(){
    accorWrap.stop().slideUp(timed/3);
  });
 

})(jQuery);