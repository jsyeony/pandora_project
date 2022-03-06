(function($){
// 시나리오
/*
1. 불러올 data : pandora_new_product_data.json
2. .product_modal_list_wrapper 내부에 li 생성하여 내부에
   .product_image 자리에 이미지(image), p자리에 가격 표시(price)

3-1. .modal_window 의 내부에 클릭한 소스의 내용을 미리 담아 처리
    sample : 'modal_product_data > dt'의 값을 처리

3-2. li 클릭시 modal(.modal_window) 나타나게 처리 (.none 제거)
*/

// code ============================================================================================
  // 변수
  var dataUrl = '/data/pandora_new_product_data.json';
  var modalWrapper = $('.product_modal_list_wrapper');
  var imgUrl = '/img/newbox/';
  
  // 모달 리스트 변수 ===========================================================
  var modalUl = modalWrapper.children('ul');
  var modalWindow = $('.modal_window');
  var modalContent = modalWindow.find('.modal_content');

  // 모달 리스트 버튼 변수 ======================================================
  var modalBtnArea = $('.newbox_btn_area');
  var modalNextBtn = modalBtnArea.children('.next_btn');
  var modalPrevBtn = modalBtnArea.children('.prev_btn');

  // 모달 윈도우 변수 ===========================================================
  var modalWinImg = modalContent.children('.modal_img');
  var modalDl = modalContent.children('dl');
  var modalDt = modalDl.children('dt');
  var modalDd = modalDl.children('dd');
  var modalPrNum = modalDd.find('.product_number');
  var modalPrNarr = modalDd.find('.product_narr');
  var modalPriceArea = modalDd.find('.modal_price');
  var modalPrice = modalPriceArea.children('span');
  
  // 모달 윈도우 클로즈 버튼 변수 =================================================
  var closeBtnArea = modalWindow.find('.close_btn');
  var closeBtn = closeBtnArea.children('button');

  var timed = 1000;

  // 기본 수행
  $.getJSON(dataUrl, function(data){
     
    // 변수
    var prData = data;
    var listContent, modalImg;
    var dataLen = data.length;

    // 함수
    var fnList = function(productName, imgNarr, price){
      return '<li class="new_product"><div class="product_name">'+productName+'</div><a href="#"><div class="product_image"><span class="blind">'+imgNarr+'</span></div><p>'+'&#8361;'+price+'</p></a></li>';
    };

    // 기본실행
    for(var i=0; i < dataLen; i += 1){
      listContent = fnList(prData[i].product, prData[i].description, prData[i].price);
      modalUl.append(listContent);
      modalImg = modalUl.children('li').eq(i).find('.product_image');
      modalImg.css({'backgroundImage':'url('+imgUrl+prData[i].image+')'});
    };


    // 변형 변수
    var modalList = modalUl.children('li');
    var modalLink = modalList.children('a');
    var x = 0;
    var modalProduct = modalList.find('.product_name');

    // 기본 실행
    // 모달리스트의 제품명은 마우스를 올리거나 포커스가 잡히지 않는 경우 보이지 않도록 기본적으로 숨겨놓음.
    modalProduct.hide();

    // 함수 ===========================================================================
    var modalCloseFn = function(){
      modalWinImg.empty();
      modalDt.empty();
      modalPrNum.empty();
      modalPrNarr.empty(); 
      modalPrice.empty();
    }; // modalCloseFn()

    // 이벤트
    // 모달 리스트 버튼 클릭 이벤트 ======================================================
    modalNextBtn.on('click', function(e){
      e.preventDefault();
      if(x > -2){
        x -= 1;
        modalUl.animate({'marginLeft' : (100*x) + '%'});
      };
    });

    modalPrevBtn.on('click', function(e){
      e.preventDefault();
      if(x < 0){
        x += 1;
        modalUl.animate({'marginLeft' : (100*x) + '%'});
      };
    });

    // 모달 리스트 클릭 이벤트 ============================================================
    // 모달 리스트에 마우스를 올렸을 때 이벤트 ------------------------
    modalLink.on('mouseenter', function(){
      var i = $(this).parent().index();
      modalProduct.eq(i).stop().slideDown(timed/4);
    });

    // 모달 리스트에 마우스가 벗어났을 때 이벤트 ----------------------
    modalLink.on('mouseleave', function(){
      var i = $(this).parent().index();
      modalProduct.eq(i).stop().slideUp(timed/3);
    });

    // 모달 리스트에 포커스가 됐을 때 이벤트 --------------------------
    modalLink.on('focus', function(){
      var i = $(this).parent().index();
      modalProduct.eq(i).stop().slideDown(timed/4);
    });

    // 모달 리스트에 포커스가 벗어났을 때 이벤트 ----------------------
    modalLink.on('blur', function(){
      var i = $(this).parent().index();
      modalProduct.eq(i).stop().slideUp(timed/3);
    });

    // 모달 리스트를 클릭했을 때 이벤트 ------------------------------
    modalLink.on('click', function(e){
      e.preventDefault();
      var idx = $(this).parent().index();
      var prListData = prData[idx];

      modalWinImg.css({'backgroundImage':'url('+imgUrl+prListData.image+')'});
      modalDt.append(prListData.product);
      modalPrNum.append(prListData.number);
      modalPrNarr.append(prListData.contents); 
      modalPrice.append(prListData.price);

      modalWindow.removeClass('none');
    });

    // 모달 윈도우창의 닫기 버튼을 눌렀을 때 이벤트 =================================================
    closeBtn.on('click', function(e){
      e.preventDefault();
      modalWindow.addClass('none');
      modalCloseFn();
    });


  })
})(jQuery);