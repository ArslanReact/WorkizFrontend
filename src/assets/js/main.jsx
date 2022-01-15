$(document).ready(function () {
    console.log("document is ready");

    $(".navbar-nav").clone().prependTo("#off-canvas");

    $(function () {
        $(document).trigger("enhance");
    });
});

$(window).load(function () {
    console.log("window is loaded");
});