// ============ ХЕДЕР ПРИ СКРОЛЛЕ ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
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
        if (!isActive) item.classList.add('active');
    });
});

// ============ АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ ============
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hero-card, .stat-item, .faq-item, .project-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============ ПЛАВНЫЙ СКРОЛЛ ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ============ ЭЛЕМЕНТЫ ПРОЕКТА: МОДАЛЬНОЕ ОКНО ============
const elementsData = [
    {
        title: 'ШКОЛЬНИКИ',
        subtitle: 'Живой интерес и движение вперёд',
        list: [
            'совершенствовать навыки стрельбы на уроках физкультуры',
            'выступать на соревнованиях и выходить в финал',
            'выполнять спортивные нормативы'
        ],
        percentTop: '100%',
        percentBottom: 'ВОВЛЕЧЁННОСТИ',
        bottom: 'Энергию и мотивацию в школьном возрасте трудно переоценить. Биатлон ГТО — возможность получить яркие эмоции и показать себя.',
        img: 'images/schoolboy.png'
    },
    {
        title: 'СТУДЕНТЫ ВУЗОВ',
        subtitle: 'Наука и рекорды',
        list: [
            'разнообразить учебный процесс спортивной подготовкой',
            'защищать честь университета на соревнованиях',
            'изучать спортивно-методическое направление'
        ],
        percentTop: '100%',
        percentBottom: 'ПЕРСПЕКТИВЫ',
        bottom: 'Спорт становится неотъемлемой частью студенческой жизни, а кроме того Биатлон ГТО открывает возможность для исследований.',
        img: 'images/student.png'
    },
    {
        title: 'ПЕДАГОГИ И ТРЕНЕРЫ',
        subtitle: 'Наставники чемпионов',
        list: [
            'внедрять модуль «биатлон» в уроки физкультуры',
            'организовывать школьные спортивные клубы',
            'повышать квалификацию и посещать семинары'
        ],
        percentTop: '100%',
        percentBottom: 'ДОВЕРИЯ',
        bottom: 'Учителя и тренеры — главные проводники проекта. Более 100 семинаров-практикумов уже проведено по всей стране.',
        img: 'images/teacher.png'
    },
    {
        title: 'РОДИТЕЛИ',
        subtitle: 'Надёжный тыл и опора детей',
        list: [
            'вдохновлять детей личным спортивным примером',
            'поддерживать, мотивировать и болеть на соревнованиях',
            'выступать на семейных эстафетах'
        ],
        percentTop: '100%',
        percentBottom: 'ПОДДЕРЖКИ',
        bottom: 'Родители делают с детьми путь от первых выстрелов до пьедестала и медалей. Проект объединяет всю семью.',
        img: 'images/preschool.png'
    },
    {
        title: 'КОЛЛЕКТИВЫ ПРЕДПРИЯТИЙ',
        subtitle: 'Рабочее единство и корпоративный биатлон',
        list: [
            'формировать рабочие команды для выступлений на стартах',
            'проводить тренировки для укрепления здоровья сотрудников',
            'привлекать внимание к социально значимой инициативе'
        ],
        percentTop: '100%',
        percentBottom: 'ОТВЕТСТВЕННОСТИ',
        bottom: 'Предприятия-партнёры активно вовлечены в тренировочную и соревновательную деятельность. Совместные старты сплачивают коллектив.',
        img: 'images/worker.png'
    },
    {
        title: 'ДОШКОЛЬНИКИ',
        subtitle: 'Первое знакомство со спортом',
        list: [
            'наблюдать за спортивными занятиями родителей',
            'впервые знакомиться с пневматической биатлонной винтовкой',
            'играть в подвижные эстафеты'
        ],
        percentTop: '100%',
        percentBottom: 'ЛЮБОПЫТСТВА',
        bottom: 'В этом возрасте спорт открывается через игру и пример родителей. Проект адаптирует элементы биатлона для самых маленьких.',
        img: 'images/preschool.png'
    }
];

const elementModal = document.getElementById('elementModal');
const elementModalClose = document.getElementById('elementModalClose');
const emTitle = document.getElementById('emTitle');
const emSubtitle = document.getElementById('emSubtitle');
const emList = document.getElementById('emList');
const emImage = document.getElementById('emImage');
const emPercent = document.getElementById('emPercent');
const emBottom = document.getElementById('emBottom');

function openElementModal(index) {
    const data = elementsData[index];
    if (!data) return;

    emTitle.textContent = data.title;
    emSubtitle.textContent = data.subtitle;
    emImage.src = data.img;
    emImage.alt = data.title;
    emBottom.textContent = data.bottom;

    emList.innerHTML = '';
    data.list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        emList.appendChild(li);
    });

    emPercent.innerHTML = data.percentTop + '<small>' + data.percentBottom + '</small>';

    elementModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeElementModal() {
    elementModal.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.element-card').forEach(card => {
    card.addEventListener('click', () => {
        const index = parseInt(card.getAttribute('data-element'), 10);
        openElementModal(index);
    });
});

elementModalClose.addEventListener('click', closeElementModal);
elementModal.addEventListener('click', (e) => {
    if (e.target === elementModal) closeElementModal();
});

// ============ НАШИ ПРОЕКТЫ: ЛАЙТБОКС ============
const projectsData = [
    { img: 'images/project-1.jpg', title: 'Всероссийский финал «Биатлон ГТО» в ВДЦ «Смена»', desc: 'Стрельба из пневматической винтовки' },
    { img: 'images/project-2.jpg', title: 'Семинары-практикумы в школах и колледжах и патриотических организациях', desc: 'Заменить текст на свой' },
    { img: 'images/project-3.jpg', title: 'Встреча с легендой биатлона', desc: 'При поддержке УрГПУ' }
];

// ============ ФОТОГАЛЕРЕЯ: ЛАЙТБОКС ============
const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
let currentGalleryIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentGalleryIndex].src;
    lightboxImg.alt = galleryItems[currentGalleryIndex].alt;
}

function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentGalleryIndex].src;
    lightboxImg.alt = galleryItems[currentGalleryIndex].alt;
}

galleryItems.forEach((img, idx) => {
    img.parentElement.addEventListener('click', () => {
        currentGalleryIndex = idx;
        openLightbox(img.src, img.alt);
    });
});

document.querySelectorAll('.project-card').forEach((card, idx) => {
    card.addEventListener('click', () => {
        const data = projectsData[idx];
        if (data) openLightbox(data.img, data.title);
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// ============ КЛАВИАТУРА ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (elementModal.classList.contains('active')) closeElementModal();
        if (lightbox.classList.contains('active')) closeLightbox();
    }
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    }
});
