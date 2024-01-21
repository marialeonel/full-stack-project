function toggleMenu(){
    const menu_mobile = document.getElementById("menu-mobile");

    if (menu_mobile.className == "menu-mobile-active") {
        menu_mobile.className = "menu-mobile";
    } else {
        menu_mobile.className = "menu-mobile-active";
    }
}