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
        faqItems.forEach(i => i.classList.remove('active'));
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

document.querySelectorAll('.hero-card, .stat-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============ ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ ЭЛЕМЕНТЫ ПРОЕКТА: МОДАЛЬНОЕ ОКНО ============
const elementsData = [
    {
        title: 'Школьная лига',
        desc: 'Всероссийские соревнования школьной лиги проводятся в течение всего учебного года. Любая школа страны может принять участие в соревнованиях и стать участником ярких, массовых финалов, проводимых фондом «Биатлон ГТО» и Министерством спорта Российской Федерации. Заменить текст на свой.',
        img: 'images/champion.png',
        link: '#'
    },
    {
        title: 'Фестиваль',
        desc: 'Ежегодные фестивали биатлона ГТО собирают участников со всей страны. Это праздник спорта, где каждый может попробовать себя в стрельбе и показать свои навыки. Заменить текст на свой.',
        img: 'images/teacher.png',
        link: '#'
    },
    {
        title: 'Образование учителей',
        desc: 'Программа повышения квалификации «Школа тренеров: Биатлон ГТО» готовит педагогов к внедрению модуля «биатлон» в уроки физкультуры. Более 700 педагогов-тренеров уже прошли обучение. Заменить текст на свой.',
        img: 'images/student.png',
        link: '#'
    },
    {
        title: 'Урок физкультуры',
        desc: 'С 1 сентября 2024 года приказом Министра просвещения РФ модуль «Биатлон» включён в уроки физической культуры по всей стране. Заменить текст на свой.',
        img: 'images/schoolboy.png',
        link: '#'
    },
    {
        title: 'Биатлонная секция',
        desc: 'Школьные спортивные клубы и секции биатлона ГТО позволяют ребятам тренироваться регулярно и готовиться к соревнованиям. Заменить текст на свой.',
        img: 'images/college.png',
        link: '#'
    },
    {
        title: 'Дошкольный биатлон',
        desc: 'Первое знакомство со спортом через игру и пример родителей. Проект адаптирует элементы биатлона для самых маленьких участников. Заменить текст на свой.',
        img: 'images/preschool.png',
        link: '#'
    }
];

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImg = document.getElementById('modalImg');
const modalBtn = document.getElementById('modalBtn');

function openModal(index) {
    const data = elementsData[index];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalImg.src = data.img;
    modalImg.alt = data.title;
    modalBtn.href = data.link;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.element-card').forEach(card => {
    card.addEventListener('click', () => {
        const index = parseInt(card.getAttribute('data-element'), 10);
        openModal(index);
    });
});

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});
