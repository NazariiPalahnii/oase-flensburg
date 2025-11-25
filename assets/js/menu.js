// ================= ДАННЫЕ =================
const menuDatabase = [
    // --- Салаты ---
    { 
        id: 1, 
        name: "Цезарь с курицей", 
        category: "salads", 
        description: "Хрустящий айсберг, сочное филе, гренки и пармезан.", 
        img: "https://placehold.co/300x200?text=Caesar" 
    },
    { 
        id: 2, 
        name: "Оливье с говядиной", 
        category: "salads", 
        description: "Классический рецепт с отварной говядиной и горошком.", 
        img: "https://placehold.co/300x200?text=Olivier" 
    },
    { 
        id: 3, 
        name: "Греческий", 
        category: "salads", 
        description: "Свежие овощи, фета, орегано и оливковое масло.", 
        img: "https://placehold.co/300x200?text=Greek" 
    },
    { 
        id: 4, 
        name: "Салат с креветками", 
        category: "salads", 
        description: "Руккола, тигровые креветки, томаты черри и бальзамик.", 
        img: "https://placehold.co/300x200?text=Shrimp" 
    },
    { 
        id: 5, 
        name: "Капрезе", 
        category: "salads", 
        description: "Моцарелла, спелые томаты и свежий базилик.", 
        img: "https://placehold.co/300x200?text=Caprese" 
    },

    // --- Горячее ---
    { 
        id: 6, 
        name: "Стейк Рибай", 
        category: "main", 
        description: "Премиальная говядина зернового откорма на гриле.", 
        img: "https://placehold.co/300x200?text=Ribeye" 
    },
    { 
        id: 7, 
        name: "Лосось гриль", 
        category: "main", 
        description: "Стейк из лосося с лимоном и сливочным соусом.", 
        img: "https://placehold.co/300x200?text=Salmon" 
    },
    { 
        id: 8, 
        name: "Утка с яблоками", 
        category: "main", 
        description: "Запеченная утиная ножка с карамелизированным яблоком.", 
        img: "https://placehold.co/300x200?text=Duck" 
    },
    { 
        id: 9, 
        name: "Свиной шашлык", 
        category: "main", 
        description: "Сочная свиная шея в маринаде от шефа.", 
        img: "https://placehold.co/300x200?text=Pork+BBQ" 
    },
    { 
        id: 10, 
        name: "Бефстроганов", 
        category: "main", 
        description: "Кусочки говядины в сметанном соусе с грибами.", 
        img: "https://placehold.co/300x200?text=Beef" 
    },

    // --- Гарниры ---
    { 
        id: 11, 
        name: "Картофель фри", 
        category: "sides", 
        description: "Золотистые ломтики с солью.", 
        img: "https://placehold.co/300x200?text=Fries" 
    },
    { 
        id: 12, 
        name: "Овощи гриль", 
        category: "sides", 
        description: "Перец, кабачок, баклажан и лук на огне.", 
        img: "https://placehold.co/300x200?text=Veggies" 
    },
];

// Состояние корзины
let cart = {};
let allDishElements = [];

// ================= ФУНКЦИИ =================

// 1. Создание кнопок категорий
function renderCategoryTabs() {
    const tabsContainer = document.getElementById('category-tabs');
    const categories = [
        { key: 'all', name: 'Все меню' },
        { key: 'salads', name: '🥗 Салаты' },
        { key: 'main', name: '🍖 Горячее' },
        { key: 'sides', name: '🥔 Гарниры' }
    ];

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = cat.name;
        if(cat.key === 'all') btn.classList.add('active');
        
        btn.onclick = (e) => filterMenu(cat.key, e.target);
        tabsContainer.appendChild(btn);
    });
}

// 2. Отрисовка блюд (БЕЗ ЦЕН)
function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    allDishElements = [];

    menuDatabase.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.setAttribute('data-category', dish.category);

        card.innerHTML = `
            <img src="${dish.img}" class="dish-img" alt="${dish.name}">
            <div class="card-body">
                <h3>${dish.name}</h3>
                <p class="dish-desc">${dish.description}</p>
                <div class="card-footer" style="justify-content: flex-end;">
                    <button class="btn-add" onclick="addToCart(${dish.id})">
                        <span>+ В заказ</span>
                    </button>
                </div>
            </div>
        `;

        container.appendChild(card);
        allDishElements.push(card);
    });
}

// 3. Фильтрация
function filterMenu(category, btnElement) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    allDishElements.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 4. Логика корзины (ТОЛЬКО КОЛИЧЕСТВО)
function addToCart(id) {
    if (!cart[id]) cart[id] = 0;
    cart[id]++;
    updateCartDisplay();
}

function removeFromCart(id) {
    if (cart[id]) {
        cart[id]--;
        if (cart[id] === 0) delete cart[id];
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    
    let totalItems = 0;

    if (Object.keys(cart).length === 0) {
        list.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
    } else {
        for (const [id, qty] of Object.entries(cart)) {
            const dish = menuDatabase.find(d => d.id == id);
            if (dish) {
                totalItems += qty;

                const item = document.createElement('div');
                item.className = 'cart-item';
                item.innerHTML = `
                    <div class="item-info">
                        <span class="item-name">${dish.name}</span>
                        <span class="item-calc">Количество: ${qty} шт.</span>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${id})">×</button>
                `;
                list.appendChild(item);
            }
        }
    }

    // Обновляем только счетчик блюд
    document.getElementById('total-count').innerText = totalItems;
}

// 5. Отправка заказа (БЕЗ ЦЕН)
function sendOrder() {
    const eventType = document.getElementById('eventType').value;
    const eventDate = document.getElementById('eventDate').value;
    const guestCount = document.getElementById('guestCount').value;
    const userEmail = document.getElementById('userEmail').value;

    if (!eventDate || !userEmail) {
        alert("❗ Пожалуйста, укажите дату мероприятия и Email.");
        return;
    }
    if (Object.keys(cart).length === 0) {
        alert("❗ Ваша корзина пуста.");
        return;
    }

    // Сборка списка только с количеством
    let menuList = "";
    
    for (const [id, qty] of Object.entries(cart)) {
        const dish = menuDatabase.find(d => d.id == id);
        menuList += `- ${dish.name}: ${qty} шт.%0D%0A`;
    }

    const companyEmail = "info@banket-service.ru"; 
    const subject = `Заказ меню на ${eventDate} (${eventType})`;
    const body = `Здравствуйте!%0D%0A%0D%0A` +
                 `📝 ИНФОРМАЦИЯ О ЗАКАЗЕ:%0D%0A` +
                 `Повод: ${eventType}%0D%0A` +
                 `Дата: ${eventDate}%0D%0A` +
                 `Гостей: ${guestCount}%0D%0A` +
                 `Email: ${userEmail}%0D%0A%0D%0A` +
                 `🥗 ВЫБРАННЫЕ БЛЮДА:%0D%0A${menuList}%0D%0A` +
                 `-- Ждем согласования! --`;

    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
}

// ЗАПУСК
window.onload = () => {
    renderCategoryTabs();
    renderMenu();
    updateCartDisplay();
};
