let bar = document.querySelectorAll('.burger-menu')[0].children
let menustate = 0;

function open() {
    bar[0].style.width = "5%";
    bar[2].style.width = "5%";
    bar[1].style.width = "5%";
    bar[1].style.left = "47.5%";
    setTimeout(() => {
        bar[0].style.transform = "rotateZ(45deg)";
        bar[2].style.transform = "rotateZ(45deg)";
        bar[1].style.transform = "rotateZ(135deg)";
        setTimeout(() => {
            bar[2].style.top = "47%";
            bar[0].style.top = "47%";
            bar[0].style.width = "100%";
            bar[2].style.width = "100%";
            bar[1].style.left = "0px";
            bar[1].style.width = "100%";
        }, 50);

    }, 100);
    document.getElementById("myNav").style.height = "100%";
    menustate = 1;
}

function close() {
    bar[0].style.top = "25px";
    bar[2].style.top = "45px";
    bar[0].style.width = "5%";
    bar[2].style.width = "5%";
    bar[1].style.left = "47.5%";
    bar[1].style.width = "5%";
    setTimeout(() => {
        bar[0].style.transform = "rotateZ(0deg)";
        bar[2].style.transform = "rotateZ(0deg)";
        bar[1].style.transform = "rotateZ(0deg)";
        setTimeout(() => {
            bar[0].style.width = "100%";
            bar[2].style.width = "100%";
            bar[1].style.width = "100%";
            bar[1].style.left = "0%";
        }, 50);

    }, 100);
    menustate = 0;
    document.getElementById("myNav").style.height = "0%";
}
document.querySelector(".burger-menu").addEventListener("click", () => {
    if (menustate === 0) {
        open()
    } else {
        close()
    }
});
$("#myNav a").on("click", function () {
    $('html,body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 1000);
    document.getElementById("myNav").style.height = "0%";
    close()
});