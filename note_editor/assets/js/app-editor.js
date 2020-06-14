(function () {
  $(function () {
    var $preview, editor, mobileToolbar, toolbar;
    // Simditor.locale = 'en-US';
    Simditor.locale = 'zh-CN';
    toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment'];
    mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];
    if (mobilecheck()) {
      toolbar = mobileToolbar;
    }
    editor = new Simditor({
      textarea: $('#note-content'),
      placeholder: '',
      toolbar: toolbar,
      toolbarFloat: true,
      pasteImage: true,
      defaultImage: 'assets/images/image.png',
      upload: false
    });
    return editor.on('valuechanged', function (e) {
      refreshCatalog();
    });

  });


  let timer = null;
  clearInterval(timer)
  timer = setInterval(() => {
    refreshCatalog();
    clearInterval(timer)
  }, 50)


}).call(this);


function refreshCatalog() {
  var catalogHtml = '';
  var headerEl = 'h1,h2,h3,h4,h5';
  $(".simditor-body").children(headerEl).each(function (index, element) {
    var tagName = element.localName;
    var randomId = Math.random().toString(36).substr(2);
    element.setAttribute("id", randomId);

    var styleN = '';
    if (tagName == 'h1') {
      styleN = '1';
    } else if (tagName == 'h2') {
      styleN = '2';
    } else if (tagName == 'h3') {
      styleN = '3';
    } else if (tagName == 'h4') {
      styleN = '4';
    } else if (tagName == 'h5') {
      styleN = '5';
    }

    catalogHtml += '<a onclick="scrollDiv(this)" href="#' + randomId + '" class="catalog-style catalog-style-' + styleN + '">' + element.outerText + '</a><br/>';
  });
  // console.log(catalogHtml);
  $("#catalogBody").html("");
  $("#catalogBody").append(catalogHtml);
}


function scrollDiv(e) {
  /*
  var target = document.getElementById(e.hash.slice(1));
  console.log(target)
  if (!target) return;
  var targetOffset = $(target).offset().top - 50;
  $(target).scroll(targetOffset)
  */
}
