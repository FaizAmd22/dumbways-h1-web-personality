function openHamburger() {
    const navHamburger = document.querySelector(".hamburgerContainer")
    const iconHamburger = document.querySelector(".nav-container i")

    if (!navHamburger.classList.contains("responsive")) {
        iconHamburger.classList.remove("fa-bars")
        iconHamburger.classList.add("fa-x")
    } else {
        iconHamburger.classList.remove("fa-x")
        iconHamburger.classList.add("fa-bars")
    }

    navHamburger.classList.toggle("responsive")
}


