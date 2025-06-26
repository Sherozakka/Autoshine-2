// Анимации при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    // Навигация для мобильных устройств
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем меню на мобильных устройствах
                if (nav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Анимация элементов при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.catalog-item, .feature-item, .product-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Изначально скрываем элементы
    document.querySelectorAll('.catalog-item, .feature-item, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Инициализация при загрузке
    
    // Добавление товаров в корзину
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-btn span');
    let count = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            count++;
            cartCount.textContent = count;
            
            // Анимация кнопки
            this.textContent = 'Добавлено!';
            this.style.backgroundColor = '#4caf50';
            
            setTimeout(() => {
                this.textContent = 'Добавить в корзину';
                this.style.backgroundColor = '';
            }, 1500);
        });
    });
    
    // Анимация для кнопки "Смотреть все товары"
    const allProductsBtn = document.querySelector('.all-products .btn-large');
    
    allProductsBtn.addEventListener('mouseenter', function() {
        this.querySelector('i').style.transform = 'translateX(5px)';
    });
    
    allProductsBtn.addEventListener('mouseleave', function() {
        this.querySelector('i').style.transform = 'translateX(0)';
    });
});

// Добавим функционал для новых элементов

// ...

// Анимация для шагов установки
const steps = document.querySelectorAll('.step');
if(steps.length > 0) {
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
    });
    
    const animateSteps = function() {
        steps.forEach(step => {
            const stepPosition = step.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(stepPosition < screenPosition) {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateSteps);
    animateSteps(); // Инициализация при загрузке
}

// Анимация для цветовых вариантов
const colorItems = document.querySelectorAll('.color-item');
if(colorItems.length > 0) {
    colorItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    const animateColors = function() {
        colorItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }
        });
    };
    
    window.addEventListener('scroll', animateColors);
    animateColors(); // Инициализация при загрузке
}

// Обработчики для кнопок "Добавить в корзину"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const product = {
            id: productCard.dataset.id || Math.random().toString(36).substr(2, 9),
            name: productCard.querySelector('h3').textContent,
            price: parseInt(productCard.querySelector('.product-price').textContent.replace(/\D/g, '')),
            image: productCard.querySelector('img').src
        };
        
        addToCart(product);
        
        // Анимация кнопки
        this.textContent = 'Добавлено!';
        this.style.backgroundColor = '#4caf50';
        
        setTimeout(() => {
            this.textContent = 'Добавить в корзину';
            this.style.backgroundColor = '';
        }, 1500);
    });
});