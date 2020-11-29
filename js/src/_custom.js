import './_loader';
import './_menu';
import './_form';

$(document).ready(function ($) {

    $(window).on('scroll', function () {
        //ADD .TIGHT
        if ($(window).scrollTop() + $(window).height() > $('.wrapper').outerHeight()) {
            $('body').addClass('tight');
            $('.arrow').hide();
        } else {
            $('body').removeClass('tight');
            $('.arrow').show();
        }
    });

});
$('.arrow').click(function(){
    $("html").animate({ scrollTop: $('html').prop("scrollHeight")}, 1200);
 });