function toggleInfo(button) {
    const card = button.closest('.card');
    const infoBlock = card.querySelector('.more-info');
    button.classList.toggle('active');
    if (infoBlock.style.maxHeight) {
        infoBlock.style.maxHeight = null;
    } else {
        infoBlock.style.maxHeight = infoBlock.scrollHeight + "px";
    }
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(clickedBlock) {
    const imgInCard = clickedBlock.querySelector('img');

    if (imgInCard) {
        lightboxImg.src = imgInCard.src;
        
        lightbox.style.display = 'flex';
        
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
