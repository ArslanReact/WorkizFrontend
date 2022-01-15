import $ from "jquery";
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        // alert('zxzc');
        $('#sidebar').toggleClass('active');
        $('#sidebarCollapse').toggleClass('active');
    });
});
// 
$(document).ready(function () {
    $('#sidebarCollapseRight').on('click', function () {
        // alert('zxzc');
        $('#sidebarRight').toggleClass('active');
        $('#sidebarCollapseRight').toggleClass('active');
    });
});