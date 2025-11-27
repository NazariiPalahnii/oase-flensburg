// ================= ДАННЫЕ =================
const menuDatabase = [
  // --- Салаты ---
  {
    id: 1,
    name: "Salad",
    category: "salads",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
    img: "https://placehold.co/300x200?text=Caesar",
  },
  {
    id: 2,
    name: "Salad2",
    category: "salads",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Olivier",
  },
  {
    id: 3,
    name: "Salad3",
    category: "salads",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Greek",
  },
  {
    id: 4,
    name: "Salad4",
    category: "salads",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Greek",
  },
  {
    id: 5,
    name: "Salad5",
    category: "salads",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Greek",
  },

  // --- Горячее ---
  {
    id: 6,
    name: "Steak 1",
    category: "main",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Ribeye",
  },
  {
    id: 7,
    name: "Steak 2",
    category: "main",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Salmon",
  },
  {
    id: 8,
    name: "Steak 3",
    category: "main",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Duck",
  },
  {
    id: 9,
    name: "Steak 4",
    category: "main",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Pork+BBQ",
  },
  {
    id: 10,
    name: "Steak 5",
    category: "main",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Beef",
  },

  // --- Гарниры ---
  {
    id: 11,
    name: "Etwas",
    category: "sides",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Fries",
  },
  {
    id: 12,
    name: "Etwas",
    category: "sides",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    img: "https://placehold.co/300x200?text=Veggies",
  },
];

// Состояние корзины
let cart = {};
let allDishElements = [];

// ================= ФУНКЦИИ =================

// 1. Создание кнопок категорий
function renderCategoryTabs() {
  const tabsContainer = document.getElementById("category-tabs");
  const categories = [
    { key: "all", name: "Alles" },
    { key: "salads", name: "Salat" },
    { key: "main", name: "Steak" },
    { key: "sides", name: "Etwas" },
  ];

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = cat.name;
    if (cat.key === "all") btn.classList.add("active");

    btn.onclick = (e) => filterMenu(cat.key, e.target);
    tabsContainer.appendChild(btn);
  });
}

// 2. Отрисовка блюд 
function renderMenu() {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";
  allDishElements = [];

  menuDatabase.forEach((dish) => {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.setAttribute("data-category", dish.category);

    card.innerHTML = `
            <img src="${dish.img}" class="dish-img" alt="${dish.name}">
            <div class="card-body">
                <h3>${dish.name}</h3>
                <p class="dish-desc">${dish.description}</p>
                <div class="card-footer" style="justify-content: flex-end;">
                    <button class="btn-add" onclick="addToCart(${dish.id})">
                        <span>+ Auf Bestellung</span>
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
  document
    .querySelectorAll(".category-btn")
    .forEach((b) => b.classList.remove("active"));
  btnElement.classList.add("active");

  allDishElements.forEach((card) => {
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
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
  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  let totalItems = 0;

  if (Object.keys(cart).length === 0) {
    list.innerHTML = '<div class="empty-cart">Der Warenkorb ist leer</div>';
  } else {
    for (const [id, qty] of Object.entries(cart)) {
      const dish = menuDatabase.find((d) => d.id == id);
      if (dish) {
        totalItems += qty;

        const item = document.createElement("div");
        item.className = "cart-item";
        item.innerHTML = `
                    <div class="item-info">
                        <span class="item-name">${dish.name}</span>
                        <span class="item-calc">Menge: ${qty} st.</span>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${id})">×</button>
                `;
        list.appendChild(item);
      }
    }
  }

  // Обновляем только счетчик блюд
  document.getElementById("total-count").innerText = totalItems;
}

// 5. Отправка заказа (БЕЗ ЦЕН)
function sendOrder() {
  const eventType = document.getElementById("eventType").value;
  const eventDate = document.getElementById("eventDate").value;
  const guestCount = document.getElementById("guestCount").value;
  const userEmail = document.getElementById("userEmail").value;

  if (!eventDate || !userEmail) {
    alert("Bitte geben Sie das Datum der Veranstaltung und die E-Mail-Adresse an.");
    return;
  }
  if (Object.keys(cart).length === 0) {
    alert("Ihr Warenkorb ist leer.");
    return;
  }

  // Сборка списка только с количеством
  let menuList = "";

  for (const [id, qty] of Object.entries(cart)) {
    const dish = menuDatabase.find((d) => d.id == id);
    menuList += `- ${dish.name}: ${qty} st.%0D%0A`;
  }

  const companyEmail = "info@banket-service.ru";
  const subject = `Заказ меню на ${eventDate} (${eventType})`;
  const body =
    `Здравствуйте!%0D%0A%0D%0A` +
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
