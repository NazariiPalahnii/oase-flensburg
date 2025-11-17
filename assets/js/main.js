document.addEventListener('DOMContentLoaded', function() {
    fetch('/templates/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('/templates/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

const filterBox = document.querySelectorAll('.events_box');
const filterButtons = document.querySelectorAll('.events_block button');

document.querySelector('.events_block').addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return; 

    const clickedButton = event.target;
    const filterClass = clickedButton.dataset.filter; 
    const showAll = filterClass === 'all';

    filterButtons.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');

    filterBox.forEach(elem => {
        const shouldHide = !showAll && !elem.classList.contains(filterClass);
        
        if (shouldHide) {
            elem.classList.add('hide');
        } else {
            elem.classList.remove('hide');
        }
    });
});

// 1. Получаем все заголовки
const headers = document.querySelectorAll('.news_header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        // 2. Находим родительский элемент (весь блок аккордеона)
        const item = header.closest('.news_item');
        
        // 3. Переключаем класс 'active'
        item.classList.toggle('active1');

        // Опционально: Если нужно, чтобы был открыт только один элемент,
        // раскомментируйте код ниже.
        /*
        // 4. Закрываем все остальные элементы
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        */
    });
});
