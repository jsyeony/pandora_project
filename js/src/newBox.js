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

  // 기본 수행
  $.getJSON(dataUrl, function(data){
     
    // 변수
    var prData = data;
    var listContent, modalImg;
    var dataLen = data.length;
    
    // 함수
    var fnList = function(imgNarr, price){
      return '<li class="new_product"><a href="#"><div class="product_image"><span class="blind">'+imgNarr+'</span></div><p>'+'&#8361;'+price+'</p></a></li>';
    };

    // 기본실행
    for(var i=0; i < dataLen; i += 1){
      listContent = fnList(prData[i].description, prData[i].price);
      modalUl.append(listContent);
      modalImg = modalUl.children('li').eq(i).find('.product_image');
      modalImg.css({'backgroundImage':'url('+imgUrl+prData[i].image+')'});
    };

    var modalWinFn = function(i){
      for(var i=0; i < dataLen; i += 1){
        modalWinImg.eq(i).append(prListData.image);
        modalDt.eq(i).append(prListData.product);
        modalPrNum.eq(i).append(prListData.number);
        modalPrNarr.eq(i).append(prListData.contents);
        modalPrice.eq(i).append(prListData.price);
      };
    }

    // 변형 변수
    var modalList = modalUl.children('li');
    var modalLink = modalList.children('a');
    var permission = true;
    // 이벤트
    modalNextBtn.on('click', function(e){
      e.preventDefault();
      modalUl.animate({'marginLeft' : -100 + '%'});
    });

    modalPrevBtn.on('click', function(e){
      e.preventDefault();
      modalUl.animate({'marginLeft' : 100 + '%'});
    });

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

    closeBtn.on('click', function(e){
      e.preventDefault();
      var idx = $(this).parent().index();
      var prListData = prData[idx];
      
      modalWindow.addClass('none');

      modalWinImg.css({'backgroundImage':'none'});
      modalDt.remove();
      modalPrNum.remove();
      modalPrNarr.remove(); 
      modalPrice.remove();
    });


  })
})(jQuery);