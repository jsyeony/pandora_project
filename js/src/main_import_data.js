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


  // 메인영역 불러오기 --------------------------------------------
  var slideBox = $('#slideBox');
  var newBox = $('#newBox');
  var collaboBox= $('#collaboBox');
  var mainBaseUrl = '../page/main/'
  var importMainPage = ['slideBox.html', 'newBox.html', 'collaboBox.html'];

  // 기능수행
  slideBox.load(mainBaseUrl + importMainPage[0]);
  newBox.load(mainBaseUrl + importMainPage[1]);
  collaboBox.load(mainBaseUrl + importMainPage[2]);

})(jQuery);