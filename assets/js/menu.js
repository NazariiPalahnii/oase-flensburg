const menuDatabase = [
  { id: 1, name: "Salad Caesar", category: "salads", description: "Fresh salad with chicken.", img: "https://placehold.co/300x200" },
  { id: 2, name: "Salad Olivier", category: "salads", description: "Traditional salad.", img: "https://placehold.co/300x200" },
  { id: 6, name: "Steak Ribeye", category: "main", description: "Premium beef steak.", img: "https://placehold.co/300x200" },
  { id: 7, name: "Grilled Salmon", category: "main", description: "Fresh salmon fillet.", img: "https://placehold.co/300x200" },
  { id: 11, name: "French Fries", category: "sides", description: "Crispy fries.", img: "https://placehold.co/300x200" },
  { id: 12, name: "Grilled Veggies", category: "sides", description: "Mix of vegetables.", img: "https://placehold.co/300x200" },
];

let cart = {};

document.addEventListener('DOMContentLoaded', () => {
    renderCategoryTabs();
    renderMenu();
    updateCartDisplay();
    initBurgerMenu();
});

function initBurgerMenu() {
    const burgerBtn = document.getElementById('burger-btn');
    const nav = document.getElementById('main-nav');
    
    if (burgerBtn && nav) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('is-open');
            nav.classList.toggle('is-open');
            document.body.classList.toggle('no-scroll');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('is-open');
                nav.classList.remove('is-open');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}

function renderCategoryTabs() {
  const container = document.getElementById("category-tabs");
  const categories = [
    { key: "all", name: "Alles" },
    { key: "salads", name: "Salat" },
    { key: "main", name: "Steak" },
    { key: "sides", name: "Beilagen" },
  ];

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = cat.name;
    if (cat.key === "all") btn.classList.add("active");
    btn.onclick = (e) => filterMenu(cat.key, e.target);
    container.appendChild(btn);
  });
}

function renderMenu() {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

  menuDatabase.forEach((dish) => {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.setAttribute("data-category", dish.category);
    card.innerHTML = `
      <img src="${dish.img}" class="dish-img" alt="${dish.name}">
      <div class="card-body">
        <h3>${dish.name}</h3>
        <p class="dish-desc">${dish.description}</p>
        <button class="btn-add" onclick="addToCart(${dish.id})">+ Hinzufügen</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterMenu(category, btn) {
  document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  
  const cards = document.querySelectorAll(".dish-card");
  cards.forEach(card => {
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
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
  let total = 0;

  if (Object.keys(cart).length === 0) {
    list.innerHTML = '<div class="empty-cart">Der Warenkorb ist leer</div>';
  } else {
    for (const [id, qty] of Object.entries(cart)) {
      const dish = menuDatabase.find(d => d.id == id);
      total += qty;
      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <div class="item-info">
            <span class="item-name">${dish.name}</span>
            <span class="item-calc">${qty} st.</span>
        </div>
        <button class="btn-remove" onclick="removeFromCart(${id})">×</button>
      `;
      list.appendChild(item);
    }
  }
  document.getElementById("total-count").innerText = total;
}

function sendOrder() {
  const form = document.getElementById("orderForm");
  const eventType = document.getElementById("eventType").value;
  const date = document.getElementById("eventDate").value;
  const email = document.getElementById("userEmail").value;
  const guests = document.getElementById("guestCount").value;

  if (!date || !email) {
    alert("Bitte füllen Sie alle Felder aus.");
    return;
  }
  if (Object.keys(cart).length === 0) {
    alert("Warenkorb ist leer.");
    return;
  }

  let itemsText = "";
  for (const [id, qty] of Object.entries(cart)) {
    const dish = menuDatabase.find(d => d.id == id);
    itemsText += `- ${dish.name}: ${qty} st.\n`;
  }

  const subject = encodeURIComponent(`Neue Bestellung: ${eventType} am ${date}`);
  const body = encodeURIComponent(
    `Anlass: ${eventType}\nDatum: ${date}\nGäste: ${guests}\nEmail: ${email}\n\nBestellung:\n${itemsText}`
  );

  window.location.href = `mailto:info@oase-flensburg.de?subject=${subject}&body=${body}`;
}