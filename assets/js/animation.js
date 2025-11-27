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
  const html = document.documentElement; // Получаем элемент <html>

  if (burgerMenu && nav) {
    const toggleScrollLock = () => {
      // Переключаем класс на <body> и <html>
      body.classList.toggle("no-scroll");
      html.classList.toggle("no-scroll");
    };

    // При клике на бургер
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("is-open");
      nav.classList.toggle("is-open");

      toggleScrollLock(); // Вызываем функцию блокировки
    });

    // Закрываем меню и разблокируем прокрутку при нажатии на любой пункт меню
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        // Если меню открыто, закрываем его
        if (nav.classList.contains("is-open")) {
          burgerMenu.classList.remove("is-open");
          nav.classList.remove("is-open");

          // Разблокируем прокрутку, если она была заблокирована
          if (body.classList.contains("no-scroll")) {
            toggleScrollLock();
          }
        }
      });
    });
  }
});
