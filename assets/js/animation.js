document.addEventListener("DOMContentLoaded", function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
    });
  }

  const burgerMenu = document.querySelector(".burger-menu");
  const nav = document.getElementById("main-nav");
  const body = document.body;
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  const toggleMenu = () => {
    const isOpened = burgerMenu.classList.toggle("is-open");
    nav.classList.toggle("is-open");
    
    body.classList.toggle("no-scroll", isOpened);
    
    burgerMenu.setAttribute("aria-expanded", isOpened);
    burgerMenu.setAttribute("aria-label", isOpened ? "Menü schließen" : "Menü öffnen");
  };

  const closeMenu = () => {
    burgerMenu.classList.remove("is-open");
    nav.classList.remove("is-open");
    body.classList.remove("no-scroll");
    burgerMenu.setAttribute("aria-expanded", "false");
    burgerMenu.setAttribute("aria-label", "Menü öffnen");
  };

  if (burgerMenu && nav) {
    burgerMenu.addEventListener("click", (e) => {
      e.stopPropagation(); 
      toggleMenu();
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          closeMenu();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && nav.classList.contains("is-open")) {
        closeMenu();
      }
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('is-open') && 
          !nav.contains(e.target) && 
          !burgerMenu.contains(e.target)) {
        closeMenu();
      }
    });
  }
});