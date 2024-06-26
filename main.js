$(document).ready(function () {
    const audio = document.querySelector("audio");
    const loginButton = $(".login-button");
    const login = $(".login");
    const logo = login.find(".logo");
    const items = $(".items").children();
    const darkBg = $(".dark-bg");
    const homeButton = $(".home-button");
    const settingsButton = $(".settings-button");
    const settingsWindow = $("#settings");
    const addButton = $(".add-button");
    const addWindow = $("#add");
    const homeWindow = $("#home");
    const addPieceButton = $(".add-piece-button");
    const newOutfit = $(".new-outfit");
    const addNewOutfit = $(".add-new-outfit");
    const favorites = $("#outfits .items");
    const outfitsFilterButton = $("#outfits .filter-button");
    const outfitFilters = $("#outfits .filters");

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
    items.on("click", function() {
        favoriteOffset = openModal($(this), darkBg);
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
        const favoriteSelected = $(".selected");
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

    addPieceButton.on("click", function() {
        const piece = $(`<div class="new-piece bg-light shadow rounded-3 mb-3 p-3">
            <label for="select-part">Selecione o tipo da peça:</label>
            <select name="" id="select-part" class="outfit-part form-select mb-3">
                <option value=""></option>
                <option value="acessorios">Acessório</option>
                <option value="camisas">Camisa</option>
                <option value="vestidos">Vestido</option>
                <option value="bermudas">Bermuda</option>
                <option value="calcados">Calçado</option>
            </select>
            <label for="select-color">Selecione a cor da peça:</label>
            <select name="" id="select-color" class="part-color form-select">
                <option value=""></option>
                <option value="vermelho">Vermelho</option>
                <option value="rosa">Rosa</option>
                <option value="verde">Verde</option>
                <option value="amarelo">Amarelo</option>
                <option value="azul">Azul</option>
            </select>
            <button class="ready btn btn-secondary opacity-50 fs-5 mt-3">Pronto</button>
        </div>`);
        piece.find(".ready").on("click", function() {
            const part = piece.find("#select-part").val();
            const color = piece.find("#select-color").val();
            if (part != "" & color != "") {
                piece.html(`<img src="./outfit-parts/${part}/${color}.svg">`);
            }
        });

        newOutfit.append(piece);
    });

    addNewOutfit.on("click", function() {
        const pieces = newOutfit.children();
        if (pieces.length > 0) {
            const occasion = addWindow.find("#new-outfit-occasion").val();
            const item = $(
                `<div class="item position-relative">
                    <div class="pieces"></div>
                    <div class="item-header d-flex justify-content-between align-items-center position-relative">
                        <h2 class="occasion">${occasion}</h2>
                        <i class="item-options-button bi bi-three-dots-vertical fs-2 me-4"></i>
                        <div class="options position-absolute bg-light border top-0 d-none">
                            <ul class="list-group">
                                <li class="list-group-item text-danger">Excluir</li>
                                <li class="list-group-item">Editar</li>
                                <li class="list-group-item">Favoritar</li>
                            </ul>
                        </div>
                    </div>
                </div>`
            );
            for (let i = 0; i < pieces.length; i++) {
                const part = pieces.eq(i);
                const link = part.find("img").attr("src");
                const piece = $(`
                <div class="piece position-absolute rounded-4 bg-light shadow d-flex justify-content-around align-items-center">
                    <img src="${link}" alt="">
                </div>`);
                item.find(".pieces").prepend(piece);
            }
            item.on("click", function() {
                favoriteOffset = openModal($(this), darkBg);
            });
            const optionsButton = item.find(".item-options-button");
            optionsButton.on("click", function() {
                const options = item.find(".options");
                const offset = $(this).offset;
                options.css({
                    width: $(this).width(),
                    height: $(this).height(),
                    top: offset.top,
                    left: offset.left,
                    opacity: 0
                });
                options.removeClass("d-none");
                options.animate({
                    top: offset.top,
                    left: offset.left + $(this).width()
                }, 100);
            });

            favorites.append(item);
            newOutfit.html("");
            setTimeout(() => {
                showWindow(windows, 0, homeButton);
            }, 500);
        } 
    });
    let outfitFilterOffset;
    outfitsFilterButton.on("click", function() {
        outfitFilterOffset = $(this).offset();
        outfitFilters.css({
            top: outfitFilterOffset.top,
            left: outfitFilterOffset.left,
            height: $(this).height(),
            width: $(this).width(),
            opacity: 0.5
        });
        outfitFilters.removeClass("d-none");
        outfitFilters.animate({
            width: "180px",
            height: "400px",
            opacity: 1
        }, 300);
    });

    outfitsFilterButton.on("blur", function() {
        outfitFilters.animate({
            top: outfitFilterOffset.top,
            left: outfitFilterOffset.left,
            height: outfitsFilterButton.height(),
            width: outfitsFilterButton.width(),
            opacity: 0.5
        }, 300);
        setTimeout(() => {
            outfitFilters.removeClass("d-none");
        }, 500);
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

function openModal(item, darkBg) {
    const offset = item.offset();
    const selected = item.clone();
    const newWidth = $(window).width() * 0.75;
    const newHeight = $(window).height() * 0.3;

    const div = $(`<div class="selected position-absolute z-3"></div>`);
    div.css({
        top: offset.top, 
        left: offset.left
    });
    div.addClass("h-100");
    selected.css({
        height: "100vh", 
        width: newWidth,
    });
    div.append(selected);
    div.insertAfter(darkBg);
    darkBg.removeClass("d-none");

    const domFavoriteSelected = $(".selected");
    domFavoriteSelected.find(".item").addClass("overflow-y-auto").removeClass("me-5");
    domFavoriteSelected.animate({
        top: 0,
        left: ($(window).width() / 2) - (newWidth / 2)
    }, 200);
    const pieces = domFavoriteSelected.find(".item .pieces").children();
    const itemHeader = domFavoriteSelected.find(".item-header");
    const occasion = itemHeader.find(".occasion");
    const options = itemHeader.find(".item-options-button");
    itemHeader.css({
        top: "-100px", 
        width: "100%",
        left: 0,
        position: "absolute"
    });
    options.addClass("text-light");
    setTimeout(() => {
        const paddingValue = "30px";
        itemHeader.animate({
            paddingTop: paddingValue,
            paddingBottom: paddingValue,
            top: 0
        })
        occasion.animate({
            top: "50px",
            fontSize: "3em"
        }, 500);
        options.animate({
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

    return offset;
}