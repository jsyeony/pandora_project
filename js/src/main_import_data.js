// main_import_data.js

(function($){
  // 기능설명
  /*
    분리된 html 문서를 하나로 합쳐서 사용 할 수 있도록 처리
  */
  // 공통영역 불러오기 --------------------------------------------
  // 변수
  var body = $('body');
  var headBox = $('#headBox');
  var footBox = $('#footBox');
  var baseUrl = '../page/common/';
  var importPage = ['headBox.html', 'footBox.html'];

  // 기능수행
  headBox.load(baseUrl + importPage[0]);
  footBox.load(baseUrl + importPage[1]);


})(jQuery);