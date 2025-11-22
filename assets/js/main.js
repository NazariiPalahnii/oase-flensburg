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

const filterBox = document.querySelectorAll(".events_box");
const filterButtons = document.querySelectorAll(".events_block button");

document.querySelector(".events_block").addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const clickedButton = event.target;
  const filterClass = clickedButton.dataset.filter;
  const showAll = filterClass === "all";

  filterButtons.forEach((btn) => btn.classList.remove("active"));
  clickedButton.classList.add("active");

  filterBox.forEach((elem) => {
    const shouldHide = !showAll && !elem.classList.contains(filterClass);

    if (shouldHide) {
      elem.classList.add("hide");
    } else {
      elem.classList.remove("hide");
    }
  });
});

const headers = document.querySelectorAll(".news_header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.closest(".news_item");

    item.classList.toggle("active1");

    document.querySelectorAll(".news_item").forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active1")) {
        otherItem.classList.remove("active1");
      }
    });
  });
});


/* ================================================
  1. ФУНКЦИЯ ДЛЯ АККОРДЕОНА (Кнопка Плюсик)
================================================
*/
function toggleInfo(button) {
    // 1. Находим карточку, внутри которой находится нажатая кнопка.
    // closest('.card') ищет ближайшего родителя с классом .card вверх по дереву.
    const card = button.closest('.card');

    // 2. Внутри этой найденной карточки ищем скрытый блок с классом .more-info
    const infoBlock = card.querySelector('.more-info');

    // 3. Переключаем класс 'active' на кнопке (чтобы она повернулась и покраснела)
    button.classList.toggle('active');

    // 4. Проверяем, открыт блок или закрыт, используя его CSS-свойство max-height
    if (infoBlock.style.maxHeight) {
        // Если max-height задан (значит блок открыт) -> Закрываем его (обнуляем высоту)
        infoBlock.style.maxHeight = null;
    } else {
        // Если max-height не задан (блок закрыт) -> Вычисляем его реальную высоту (scrollHeight) и задаем её.
        // Это создает плавную анимацию открытия.
        infoBlock.style.maxHeight = infoBlock.scrollHeight + "px";
    }
}


/* ================================================
  2. ФУНКЦИЯ ДЛЯ ЛАЙТБОКСА (Увеличение фото)
================================================
*/
// Находим элементы лайтбокса в HTML один раз при загрузке страницы
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Функция открытия (вызывается при клике на .card-image в HTML)
function openLightbox(clickedBlock) {
    // Внутри блока, по которому кликнули, ищем тег <img>
    const imgInCard = clickedBlock.querySelector('img');
    
    // Проверяем, нашли ли мы картинку (на всякий случай)
    if (imgInCard) {
        // Копируем путь (src) из маленькой картинки в большую картинку лайтбокса
        lightboxImg.src = imgInCard.src;
        
        // Показываем лайтбокс (меняем display: none на flex)
        lightbox.style.display = 'flex';
        
        // Используем небольшую задержку (10мс) перед добавлением класса 'show'.
        // Это нужно, чтобы браузер успел применить display: flex, и CSS-анимация opacity сработала плавно.
        setTimeout(() => {
            lightbox.classList.add('show');
        }, 10);

        // Блокируем прокрутку основной страницы, пока открыто фото
        document.body.style.overflow = 'hidden';
    } else {
        console.error("Ошибка: Не найдено изображение внутри блока .card-image");
    }
}

// Функция закрытия
function closeLightbox() {
    // Убираем класс 'show', запуская анимацию исчезновения
    lightbox.classList.remove('show');
    
    // Ждем окончания анимации (300мс, как указано в CSS transition), затем скрываем блок полностью
    setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = ""; // Очищаем src, чтобы не мелькало старое фото при следующем открытии
        document.body.style.overflow = ''; // Возвращаем прокрутку странице
    }, 300);
}

// Дополнительно: Закрытие по нажатию клавиши Escape на клавиатуре
document.addEventListener('keydown', function(e) {
    // Если нажата Esc И лайтбокс сейчас открыт (имеет display: flex)
    if (e.key === "Escape" && lightbox.style.display === 'flex') {
        closeLightbox();
    }
});
