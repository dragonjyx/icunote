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

  refreshCatalog();

}).call(this);


function refreshCatalog() {
  var catalogHtml = '';
  var headerEl = 'h1,h2,h3,h4,h5';
  $(".simditor-body").children(headerEl).each(function (index, element) {
    // console.log(element)
    // console.log(element.innerHTML)
    // console.log(element.outerText)
    // console.log(element.localName)
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

    catalogHtml += '<a href="#' + randomId + '" class="catalog-style catalog-style-' + styleN + '">' + element.outerText + '</a><br/>';
  });
  // console.log(catalogHtml);
  $("#catalogBody").html("");
  $("#catalogBody").append(catalogHtml);
}

