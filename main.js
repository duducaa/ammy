$(document).ready(function () {
    const audio = document.querySelector("audio");
    const button = $(".login-button");
    const login = $(".login");
    const userPart = $(".user-part");
    const logo = login.find(".logo");
    const favorites = $("#favorites .items").children();
    const darkBg = $(".dark-bg");

    button.on("click", function(e) {
        e.preventDefault();

        queueAnimation(
            login.find(".content"),
            {opacity: 0},
            300);

        queueAnimation(
            logo, {top: (login.height() / 2) - (logo.height() / 2)},
            500, 300);

        queueAnimation(
            logo,
            {width: logo.width() * 2, opacity: 0},
            200, 800);
        setTimeout(() => {
            
        }, 800);

        queueAnimation(
            login, {
            opacity: 0},
            500, 800);

        setTimeout(() => {
            audio.play();
        }, 350);

        setTimeout(() => {
            login.addClass("d-none");
        }, 1300);
    });

    let offset;
    favorites.on("click", function() {
        offset = $(this).offset();
        const selected = $(this).clone();
        const newWidth = $(window).width() * 0.75;
        const newHeight = $(window).height() * 0.3;

        const div = $(`<div class="favorite-selected position-absolute z-3"></div>`);
        div.css("top", offset.top)
        div.css("left", offset.left);
        div.addClass("h-100");
        selected.css({
            "height": "100vh", 
            "width": newWidth,
        });
        div.append(selected);
        div.insertAfter(darkBg);
        darkBg.removeClass("d-none");

        const domFavoriteSelected = $(".favorite-selected")
        domFavoriteSelected.find(".item")
        .removeClass("me-5")
        .addClass("overflow-y-auto");
        domFavoriteSelected.animate({
            top: 0,
            left: ($(window).width() / 2) - (newWidth / 2)
        }, 500);
        const pieces = domFavoriteSelected.find(".item").children();
        pieces.each(index => {
            const piece = pieces.eq(index);
            piece.animate({
                top: (pieces.length - index - 1) * (newHeight + 20) + 40,
                left: 0,
                width: newWidth,
                height: newHeight
            }, 500);
        });
    });
    darkBg.on("click", function() {
        darkBg.addClass("d-none");
        const favoriteSelected = $(".favorite-selected");
        const pieces = favoriteSelected.find(".item").children();

        favoriteSelected.animate({
            top: offset.top,
            left: offset.left
        }, {
            duration: 400,
            queue: false
        });
        let top = 0, left = 0, zIndex;
        pieces.each(index => {
            const piece = pieces.eq(index);
            if (index == 5) {
                top = left = 0;
                zIndex = 2;
            }
            else if (index == 4) {
                top = left = 7;
                zIndex = 1;
            }
            else {
                top = left = 14;
                zIndex = 0
            }
            piece.animate({
                top: top,
                left: left,
                width: 120,
                height: 120
            }, 400).animate({opacity: 0}, 450);
        });
        setTimeout(() => {
            favoriteSelected.remove();
        }, 400);
    });
});

function queueAnimation(elem, obj, duration, delay=0) {
    let time = false;
    setTimeout(() => {
        time = true;
        if (time) elem.animate(obj, duration);
    }, delay);
}