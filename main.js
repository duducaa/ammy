$(document).ready(function () {
    const audio = document.querySelector("audio");
    const loginButton = $(".login-button");
    const login = $(".login");
    const userPart = $(".user-part");
    const logo = login.find(".logo");
    const favorites = $("#favorites .items").children();
    const darkBg = $(".dark-bg");
    const homeButton = $(".home-button");
    const settingsButton = $(".settings-button");
    const settingsWindow = $("#settings");
    const addButton = $(".add-button");
    const addWindow = $("#add");
    const homeWindow = $("#home");

    loginButton.on("click", function(e) {
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

    let favoriteOffset;
    favorites.on("click", function() {
        favoriteOffset = $(this).offset();
        const selected = $(this).clone();
        const newWidth = $(window).width() * 0.75;
        const newHeight = $(window).height() * 0.3;

        const div = $(`<div class="favorite-selected position-absolute z-3"></div>`);
        div.css({
            top: favoriteOffset.top, 
            left: favoriteOffset.left
        });
        div.addClass("h-100");
        selected.css({
            height: "100vh", 
            width: newWidth,
        });
        div.append(selected);
        div.insertAfter(darkBg);
        darkBg.removeClass("d-none");

        const domFavoriteSelected = $(".favorite-selected");
        domFavoriteSelected.find(".item").addClass("overflow-y-auto").removeClass("me-5");
        domFavoriteSelected.animate({
            top: 0,
            left: ($(window).width() / 2) - (newWidth / 2)
        }, 200);
        const pieces = domFavoriteSelected.find(".item .pieces").children();
        const occasion = domFavoriteSelected.find(".occasion");
        occasion.css({top: "-100px", left: "50%"});
        setTimeout(() => {
            occasion.animate({
                top: "50px",
                fontSize: "3em"
            }, 500);
        }, 200);
        pieces.each(index => {
            const piece = pieces.eq(index);
            piece.animate({
                top: (pieces.length - index - 1) * (newHeight + 20) + 140,
                left: 0,
                width: newWidth,
                height: newHeight
            }, 200);
            piece.find("img").animate({
                height: newHeight * 0.8,
                width: newWidth * 0.8
            }, 200);
        });
    });

    const windows = [homeWindow, addWindow, settingsWindow];
    sessionStorage.setItem("actual_window", 0);

    homeButton.on("click", function() {
        showWindow(windows, 0, $(this));
    });

    addButton.on("click", function() {
        showWindow(windows, 1, $(this));
    });
   
    settingsButton.on("click", function() {
        showWindow(windows, 2, $(this));
    });

    darkBg.on("click", function() {
        darkBg.addClass("d-none");
        const favoriteSelected = $(".favorite-selected");
        const pieces = favoriteSelected.find(".item .pieces").children();
        const occasion = favoriteSelected.find(".occasion");

        occasion.animate({
            top: "-100px",
            opacity: 0
        }, 150);
        pieces.removeClass("shadow");

        favoriteSelected.animate({
            top: favoriteOffset.top,
            left: favoriteOffset.left
        }, {
            duration: 200,
            queue: false
        });
        let top = 0, left = 0;
        pieces.each(index => {
            const piece = pieces.eq(index);

            if (index == 5) top = left = 0;
            else if (index == 4) top = left = 7;
            else top = left = 14;
            
            piece.animate({
                opacity: (index != pieces.length - 1) ? 0.5 : 1,
                top: top - 14,
                left: left - 14,
                width: 120,
                height: 120
            }, 200);
            piece.find("img").animate({
                height: 100,
                width: 100
            }, 300);
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

function showWindow(windows, index, button) {
    const offset = button.offset();
    const actualWindow = sessionStorage.getItem("actual_window");
    if (actualWindow != index) {
        windows[index].css({
            top: offset.top + button.height() / 4,
            left: offset.left + button.width() / 4,
            height: button.height() / 2,
            width: button.width() / 2,
            opacity: 0.5,
            zIndex: 2
        });
        windows[actualWindow].css("z-index", 1);
        windows[index].removeClass("d-none");
        windows[index].animate({
            top: 0,
            left: 0,
            width: $(window).width(),
            height: $(window).height() * 0.91,
            opacity: 1
        }, 200);
        setTimeout(() => {
            windows[actualWindow].addClass("d-none");
            windows[actualWindow].css("z-index", 0);
            sessionStorage.setItem("actual_window", index);
        }, 200);
    }
}