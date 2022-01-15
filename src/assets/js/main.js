// 
import $ from "jquery";

//
$(document).on('click', '.js-add-row', function() {  
    $('table').append($('table').find('tr:last').clone().find("textarea").val("").end());
    var rowCount = $('#testTable tr').length;
    if(rowCount > 3) {
       $('.js-del-row').show('fast');
    }
  });
  
  $(document).on('click', '.js-del-row', function() {  
    var rowCount = $('#testTable tr').length;
    if(rowCount > 3){
      $('table').find('tr:last').remove();
    }
    rowCount--;
    if(rowCount === 3) {
       $('.js-del-row').hide('fast');
    }
  });
  
  $('#testForm').on('submit', function() {
    alert('SUBMITTED');
    return false;
  });
// 
$(document).on('click', '.upload-field', function(){
  var file = $(this).parent().parent().parent().find('.input-file');
  file.trigger('click');
});
$(document).on('change', '.input-file', function(){
  $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
});

// 
$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
      // alert('zxzc');
      $('#sidebar').toggleClass('active');
      $('#sidebarCollapse').toggleClass('active');
  });
});

