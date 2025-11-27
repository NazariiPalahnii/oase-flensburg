document.addEventListener("DOMContentLoaded", function () {
  fetch("/templates/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      const burger = document.querySelector(".burger-menu");
      const navMenu = document.querySelector("#main-nav");

      if (burger && navMenu) {
        burger.addEventListener("click", () => {
          burger.classList.toggle("is-open");
          navMenu.classList.toggle("is-open");
        });

        navMenu.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            burger.classList.remove("is-open");
            navMenu.classList.remove("is-open");
          });
        });
      }
    })
    .catch((error) => console.error("Error loading header:", error));

  fetch("/templates/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));
});

