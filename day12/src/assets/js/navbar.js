const iconHamburger = document.querySelector(".nav-container i")

function openHamburger() {
    const navHamburger = document.querySelector(".hamburgerContainer")

    if (!navHamburger.classList.contains("responsive")) {
        iconHamburger.classList.remove("fa-bars")
        iconHamburger.classList.add("fa-x")
        iconHamburger.classList.add("animate__fadeIn")
    } else {
        iconHamburger.classList.remove("fa-x")
        iconHamburger.classList.add("fa-bars")
        iconHamburger.classList.add("animate__fadeIn")
    }

    navHamburger.classList.toggle("responsive")
}

setInterval(() => {
    if (iconHamburger.classList.contains("animate__fadeIn")) {
        iconHamburger.classList.remove("animate__fadeIn")
    }
}, 1000)

