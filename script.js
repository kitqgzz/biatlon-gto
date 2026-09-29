// ============ ХЕДЕР ПРИ СКРОЛЛЕ ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// ============ МОБИЛЬНОЕ МЕНЮ ============
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
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
}

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

document.querySelectorAll('.hero-card, .stat-item, .faq-item, .project-card').forEach(el => {
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
        title: 'ШКОЛЬНИКИ И СТУДЕНТЫ',
        subtitle: 'Всероссийский марафон «Биатлон ГТО»',
        list: [
            'собрать команду и пройти отбор',
            'победить на муниципальном и региональном этапах',
            'выполнить нормативы ГТО и выйти в финал'
        ],
        percentTop: '100%',
        percentBottom: 'ПЕРСПЕКТИВЫ',
        bottom: 'Победители марафона получают ценные призы и путёвки в ВДЦ «Смена» и ВДЦ «Океан».',
        img: 'images/schoolboy.png'
    },
    {
        title: 'ВСЕРОССИЙСКИЙ КРУГЛОГОДИЧНЫЙ МАРАФОН «БИАТЛОН ГТО»',
        subtitle: 'Ты готов проверить свою точность и выносливость? Тогда это твой старт!',
        list: [
            'Собери команду (2 мальчика + 2 девочки или 4 юноши + 4 девушки — в зависимости от этапа',
            'Пройди отбор на школьном, муниципальном или региональном уровне',
            'Победи — и получи путёвку в финал на базе ВДЦ «Смена» или ВДЦ «Океан',
            'Выходи на старт, стреляй, беги, плыви — и становись лучшим.'
        ],
        percentTop: '100%',
        percentBottom: 'УВЕРЕННОСТИ',
        bottom: 'Присоединяйся к марафону «Биатлон ГТО» — стань частью самого масштабного спортивного движения страны!',
        img: 'images/biatlonguy.png'
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
        img: 'images/laska2.png'
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

    // Цвет карточки → цвет фона модального окна
    const card = document.querySelector('.element-card[data-element="' + index + '"]');
    if (card) {
        const cardColor = card.style.getPropertyValue('--color') || '#0D2B5C';
        elementModal.querySelector('.element-modal').style.setProperty('--modal-color', cardColor);
    }

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

if (elementModalClose) {
    elementModalClose.addEventListener('click', closeElementModal);
}
if (elementModal) {
    elementModal.addEventListener('click', (e) => {
        if (e.target === elementModal) closeElementModal();
    });
}

// ============ НАШИ ПРОЕКТЫ: ДАННЫЕ ============
const projectsData = [
    { img: 'images/project-1.jpg', title: 'Всероссийский финал «Биатлон ГТО» в ВДЦ «Смена»', desc: 'Стрельба из пневматической винтовки' },
    { img: 'images/project-2.jpg', title: 'Семинары-практикумы в школах и колледжах и патриотических организациях', desc: 'И патриотических организациях' },
    { img: 'images/urgpy.jpg', title: 'Всероссийский мировой «Биатлон Готов к Труду и Обороне»', desc: '' },
    { img: 'images/project-4.jpg', title: 'Всероссийские спортивные соревнования школьников', desc: '«Президентские состязания» (по зимним видам спорта)' },
    { img: 'images/project-5.jpg', title: 'Встреча студентов УРГПУ с олимпийским чемпионом по биатлону Александром Тихоновым', desc: 'Идейный руководитель «Биатлон ГТО» Юрий Громыко подарил УРГПУ сертификат «Биатлон в школу»' },
    { img: 'images/project-6.jpg', title: 'Эстафета Всероссийского проекта «Год биатлона».', desc: 'Торжественная часть завершилась пленарной, где ребята задавали вопросы почетным гостям' }
];
// ============ ФОТОГАЛЕРЕЯ: СЛАЙДЕР + ЛАЙТБОКС ============
const gallerySlides = Array.from(document.querySelectorAll('.gallery-slide'));
const galleryImages = gallerySlides.map(slide => slide.querySelector('img'));
let currentGalleryIndex = 0;

const gallerySlider = document.getElementById('gallerySlider');
const gallerySliderPrev = document.getElementById('gallerySliderPrev');
const gallerySliderNext = document.getElementById('gallerySliderNext');

function scrollSlider(direction) {
    if (!gallerySlider) return;
    const slide = gallerySlider.querySelector('.gallery-slide');
    if (!slide) return;
    const slideWidth = slide.offsetWidth + 16;
    gallerySlider.scrollBy({ left: direction * slideWidth * 2, behavior: 'smooth' });
}

if (gallerySliderPrev) gallerySliderPrev.addEventListener('click', () => scrollSlider(-1));
if (gallerySliderNext) gallerySliderNext.addEventListener('click', () => scrollSlider(1));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

function updateCounter() {
    if (lightboxCounter) {
        lightboxCounter.textContent = (currentGalleryIndex + 1) + ' / ' + galleryImages.length;
    }
}

function openLightbox(index) {
    currentGalleryIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    updateCounter();

    lightboxPrev.style.display = '';
    lightboxNext.style.display = '';
    if (lightboxCounter) lightboxCounter.style.display = '';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
    }
    document.body.style.overflow = '';
}

function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex].src;
    lightboxImg.alt = galleryImages[currentGalleryIndex].alt;
    updateCounter();
}

function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex].src;
    lightboxImg.alt = galleryImages[currentGalleryIndex].alt;
    updateCounter();
}

gallerySlides.forEach((slide, idx) => {
    slide.addEventListener('click', () => openLightbox(idx));
});

document.querySelectorAll('.project-card').forEach((card, idx) => {
    card.addEventListener('click', () => {
        const data = projectsData[idx];
        if (data) {
            lightboxImg.src = data.img;
            lightboxImg.alt = data.title;
            if (lightboxCounter) lightboxCounter.textContent = data.title;

            // Скрываем стрелки и счётчик — в проектах только одно фото
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
            if (lightboxCounter) lightboxCounter.style.display = 'none';

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff < 0) showNextImage();
            else showPrevImage();
        }
    });
}

// ============ КЛАВИАТУРА ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (elementModal && elementModal.classList.contains('active')) closeElementModal();
        if (lightbox && lightbox.classList.contains('active')) closeLightbox();
    }
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    }
});

// ============ ВИДЕО-ФАСАД (RuTube) ============
const videoFacade = document.querySelector('.video-facade');
if (videoFacade) {
    const loadVideo = () => {
        const src = videoFacade.getAttribute('data-video-src');
        if (!src) return;
        const wrapper = videoFacade.parentElement;

        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'clipboard-write; autoplay; fullscreen');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('title', 'Хроника проекта «Биатлон ГТО»');

        wrapper.innerHTML = '';
        wrapper.appendChild(iframe);
    };

    videoFacade.addEventListener('click', loadVideo);
    videoFacade.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            loadVideo();
        }
    });
}

const applySection = document.querySelector('.apply-section');
if (applySection) {
    const applyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                applyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    applyObserver.observe(applySection);
}

// ============ ФОРМА СВЯЗИ (Formspree) ============
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const message = document.getElementById('contactFormMessage');
        const submitBtn = contactForm.querySelector('.contact-submit');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                if (message) {
                    message.classList.add('show');
                    setTimeout(() => message.classList.remove('show'), 6000);
                }
            } else {
                alert('Что-то пошло не так. Попробуйте ещё раз.');
            }
        } catch (err) {
            alert('Ошибка соединения. Попробуйте ещё раз.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
// ============ ПОЯВЛЕНИЕ ЛАСКИ В БЛОКЕ «СВЯЖИТЕСЬ С НАМИ» ============
const contactSection = document.querySelector('.contact-form-section');
if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    contactObserver.observe(contactSection);
}
