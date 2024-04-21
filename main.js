$(document).ready(function () {
    const audio = document.querySelector("audio");
    const loginButton = $(".login-button");
    const login = $(".login");
    const userPart = $(".user-part");
    const logo = login.find(".logo");
    const favorites = $("#favorites .items").children();
    const darkBg = $(".dark-bg");
    const settingsButton = $(".settings-button");
    const settingsWindow = $("#settings");
    const settingsBackButton = settingsWindow.find(".back-button");
    const addButton = $(".add-button");
    const addWindow = $("#add");
    const addBackButton = addWindow.find(".back-button");

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
            "top": favoriteOffset.top, 
            "left": favoriteOffset.left
        });
        div.addClass("h-100");
        selected.css({
            "height": "100vh", 
            "width": newWidth,
        });
        div.append(selected);
        div.insertAfter(darkBg);
        darkBg.removeClass("d-none");

        const domFavoriteSelected = $(".favorite-selected");
        domFavoriteSelected.find(".item").addClass("overflow-y-auto").removeClass("me-5");
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
            piece.find("img").animate({
                height: newHeight * 0.8,
                width: newWidth * 0.8
            });
        });
    });

    let settingsOffset, settingsClicked = false;
    settingsButton.on("click", function() {
        settingsOffset = $(this).offset();
        openBarWindow(settingsWindow, settingsOffset, settingsClicked);
        settingsClicked = true;
    });

    settingsBackButton.on("click", function() {
        closeBarWindow(settingsWindow, settingsOffset, settingsClicked, settingsButton);
        settingsClicked = false;
    });

    let addOffset, addClicked = false;
    addButton.on("click", function() {
        addOffset = $(this).offset();
        openBarWindow(addWindow, addOffset, addClicked);
        addClicked = true;
    });

    addBackButton.on("click", function() {
        closeBarWindow(addWindow, addOffset, addClicked, addButton);
        addClicked = false;
    });

    darkBg.on("click", function() {
        darkBg.addClass("d-none");
        const favoriteSelected = $(".favorite-selected");
        const pieces = favoriteSelected.find(".item").children();

        favoriteSelected.animate({
            top: favoriteOffset.top,
            left: favoriteOffset.left
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
            piece.find("img").animate({
                height: 100,
                width: 100
            });
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

function openBarWindow(barWindow, offset, clicked) {
    console.log("click")
    if (!clicked) {    
        const windowSelected = $(".window-selected");
        windowSelected.removeClass("d-none");
        windowSelected.css({
            "width": $(this).width(),
            "height": $(this).height(),
            "top": offset.top, 
            "left": offset.left,
            "opacity": 0.5,
            "z-index": ""
        });

        windowSelected.animate({
            top: 0,
            left: 0,
            width: $(window).width(),
            height: $(window).height() * 0.91,
            opacity: 1
        }, 200);

        setTimeout(() => {
            barWindow.css({
                "opacity": 1,
                "top": 0,
                "left": 0,
                "width": $(window).width(),
                "height": $(window).height() * 0.91,
            });
            barWindow.removeClass("d-none");
        }, 200);
    }
}

function closeBarWindow(barWindow, offset, clicked, button) {
    if (clicked) {
        const windowSelected = $(".window-selected");
        const obj = {
            top: offset.top,
            left: offset.left,
            width: button.width(),
            height: button.height(),
        };
        queueAnimation(barWindow, obj, 200, 0);
        obj.opacity = 0;
        queueAnimation(windowSelected, obj, 200, 0);
        queueAnimation(barWindow, {opacity: 0}, 100, 100);
        setTimeout(() => {
            barWindow.addClass("d-none");
            windowSelected.addClass("d-none");
        }, 200);
    }
}