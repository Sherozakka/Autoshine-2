// cart.js - логика работы корзины

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartContent = document.getElementById('cart-content');
    const cartEmpty = document.getElementById('cart-empty');
    const cartItems = document.querySelector('.cart-items');
    const checkoutSection = document.getElementById('checkout-section');
    const orderSuccess = document.getElementById('order-success');
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderForm = document.getElementById('order-form');

    // Обновление счетчика корзины
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Обновляем счетчик в хедере на всех страницах
        const allCartCounts = document.querySelectorAll('.cart-btn span');
        allCartCounts.forEach(el => el.textContent = totalItems);
    }

    // Отображение содержимого корзины
    function renderCart() {
        if (cart.length === 0) {
            cartContent.style.display = 'none';
            cartEmpty.style.display = 'block';
            return;
        }

        cartEmpty.style.display = 'none';
        cartContent.style.display = 'flex';
        
        // Очищаем предыдущие товары
        cartItems.innerHTML = '';
        
        let subtotal = 0;
        
        // Добавляем товары в корзину
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <div class="cart-item-price">${item.price} ₽</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-index="${index}"><i class="fas fa-minus"></i></button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}"><i class="fas fa-plus"></i></button>
                </div>
                <div class="cart-item-total">${item.price * item.quantity} ₽</div>
                <button class="cart-item-remove" data-index="${index}"><i class="fas fa-times"></i></button>
            `;
            cartItems.appendChild(cartItem);
            
            subtotal += item.price * item.quantity;
        });
        
        // Рассчитываем доставку и итоговую сумму
        const delivery = subtotal > 10000 ? 0 : 500; // Бесплатная доставка от 10000 ₽
        const total = subtotal + delivery;
        
        // Обновляем суммы
        document.getElementById('subtotal').textContent = `${subtotal.toLocaleString()} ₽`;
        document.getElementById('delivery').textContent = `${delivery.toLocaleString()} ₽`;
        document.getElementById('total').textContent = `${total.toLocaleString()} ₽`;
        
        // Обновляем суммы в форме заказа
        document.getElementById('order-subtotal').textContent = `${subtotal.toLocaleString()} ₽`;
        document.getElementById('order-delivery').textContent = `${delivery.toLocaleString()} ₽`;
        document.getElementById('order-total').textContent = `${total.toLocaleString()} ₽`;
        
        // Обновляем список товаров в форме заказа
        const orderItems = document.querySelector('.order-items');
        orderItems.innerHTML = '';
        
        cart.forEach(item => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="order-item-name">${item.name} × ${item.quantity}</div>
                <div class="order-item-price">${(item.price * item.quantity).toLocaleString()} ₽</div>
            `;
            orderItems.appendChild(orderItem);
        });
    }

    // Обработчики событий для корзины
    cartItems.addEventListener('click', function(e) {
        // Уменьшение количества
        if (e.target.closest('.minus')) {
            const index = e.target.closest('.minus').dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            saveCart();
        }
        
        // Увеличение количества
        if (e.target.closest('.plus')) {
            const index = e.target.closest('.plus').dataset.index;
            cart[index].quantity++;
            saveCart();
        }
        
        // Удаление товара
        if (e.target.closest('.cart-item-remove')) {
            const index = e.target.closest('.cart-item-remove').dataset.index;
            cart.splice(index, 1);
            saveCart();
        }
    });

    // Сохранение корзины в localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }

    // Оформление заказа
    checkoutBtn.addEventListener('click', function() {
        checkoutSection.style.display = 'block';
        window.scrollTo({
            top: checkoutSection.offsetTop - 100,
            behavior: 'smooth'
        });
    });

    // Отправка формы заказа
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь должна быть логика отправки данных на сервер
        // Для демонстрации просто покажем сообщение об успехе
        
        // Генерируем случайный номер заказа
        const orderNumber = '#' + Math.floor(Math.random() * 100000);
        document.getElementById('order-number').textContent = orderNumber;
        
        // Показываем сообщение об успехе
        checkoutSection.style.display = 'none';
        orderSuccess.style.display = 'block';
        window.scrollTo({
            top: orderSuccess.offsetTop - 100,
            behavior: 'smooth'
        });
        
        // Очищаем корзину
        cart = [];
        saveCart();
    });

    // Инициализация
    updateCartCount();
    renderCart();
    checkoutSection.style.display = 'none';
    orderSuccess.style.display = 'none';
});

// Функция для добавления товара в корзину (вызывается со страниц товаров)
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Проверяем, есть ли товар уже в корзине
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем счетчик на всех страницах
    const allCartCounts = document.querySelectorAll('.cart-btn span');
    allCartCounts.forEach(el => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        el.textContent = totalItems;
    });
    
    return false;
}