document.addEventListener("DOMContentLoaded", function () {
  // Инициализация AOS (оставляем, как было)
  AOS.init({
    offset: 120,
    delay: 0,
    duration: 800,
    easing: "ease-out-cubic",
    once: false,
    mirror: true,
  });

  const burgerMenu = document.querySelector(".burger-menu");
  const nav = document.getElementById("main-nav");
  const body = document.body;
  const html = document.documentElement;

  if (burgerMenu && nav) {
    const toggleScrollLock = () => {
      body.classList.toggle("no-scroll");
      html.classList.toggle("no-scroll");
    };

    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("is-open");
      nav.classList.toggle("is-open");

      toggleScrollLock();
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
          burgerMenu.classList.remove("is-open");
          nav.classList.remove("is-open");

          if (body.classList.contains("no-scroll")) {
            body.classList.remove("no-scroll");
            html.classList.remove("no-scroll");
          }
        }
      });
    });
  }
});
