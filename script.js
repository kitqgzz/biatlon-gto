// ============ ХЕДЕР ПРИ СКРОЛЛЕ ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============ МОБИЛЬНОЕ МЕНЮ ============
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    burger.classList.toggle('active');
});

// Закрыть меню при клике на ссылку
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        burger.classList.remove('active');
    });
});

// ============ FAQ АККОРДЕОН ============
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Закрыть все
        faqItems.forEach(i => i.classList.remove('active'));
        // Открыть текущий, если был закрыт
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ============ АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Применяем к карточкам
document.querySelectorAll('.stat-card, .audience-card, .step-card, .achieve-card, .doc-item, .geo-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============ ДУБЛИРОВАНИЕ ПАРТНЁРОВ ДЛЯ БЕСКОНЕЧНОЙ ПРОКРУТКИ ============
const partnersTrack = document.getElementById('partnersTrack');
if (partnersTrack) {
    // Дублируем содержимое для seamless loop
    partnersTrack.innerHTML += partnersTrack.innerHTML;
}

// ============ ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ ПОДСВЕТКА АКТИВНОГО РАЗДЕЛА В МЕНЮ ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
