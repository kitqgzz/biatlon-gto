// ============ ЗАПРЕТ ПЕРЕТАСКИВАНИЯ КАРТИНОК ============
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// ============ УНИВЕРСАЛЬНЫЕ ФУНКЦИИ ============

// Получение пути картинки (поддерживает и строки, и объекты)
const getImgPath = (item) => {
    if (!item) return '';
    return (typeof item === 'string') ? item : (item.image || '');
};

// Универсальная функция для открытия лайтбокса
function openDynamicLightbox(imgSrc, title = '') {
    // Ищем любой открытый лайтбокс на странице
    const lightbox = document.getElementById('lightbox') || 
                     document.getElementById('aquaLightbox') || 
                     document.getElementById('teachLightbox') || 
                     document.getElementById('schoolLightbox');
    
    if (lightbox) {
        const imgElement = lightbox.querySelector('img');
        if (imgElement) imgElement.src = imgSrc;
        
        const counter = lightbox.querySelector('.lightbox-counter');
        if (counter) counter.textContent = title;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Универсальная функция для настройки стрелок слайдера
function setupSliderArrows(sliderId, prevBtnId, nextBtnId, stepMultiplier = 1) {
    const slider = document.getElementById(sliderId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (slider && prevBtn && nextBtn) {
        const scrollAmount = () => {
            const slide = slider.firstElementChild;
            return slide ? slide.offsetWidth + 20 : 300;
        };

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -scrollAmount() * stepMultiplier, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: scrollAmount() * stepMultiplier, behavior: 'smooth' });
        });
    }
}

// ============ БАЗОВЫЕ СКРИПТЫ (ХЕДЕР, МЕНЮ, СКРОЛЛ) ============
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

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

// FAQ
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    }
});

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ============ МОДАЛЬНОЕ ОКНО ЭЛЕМЕНТОВ (Главная) ============
const elementsData = [
    { title: 'ШКОЛЬНИКИ И СТУДЕНТЫ', subtitle: 'Всероссийский марафон «Биатлон ГТО»', list: ['собрать команду и пройти отбор', 'победить на муниципальном и региональном этапах', 'выполнить нормативы ГТО и выйти в финал'], percentTop: '100%', percentBottom: 'ПЕРСПЕКТИВЫ', bottom: 'Победители марафона получают ценные призы и путёвки в ВДЦ «Смена» и ВДЦ «Океан».', img: 'images/schoolboy.png' },
    { title: 'ВСЕРОССИЙСКИЙ КРУГЛОГОДИЧНЫЙ МАРАФОН «БИАТЛОН ГТО»', subtitle: 'Ты готов проверить свою точность и выносливость? Тогда это твой старт!', list: ['Собери команду', 'Пройди отбор', 'Победи — и получи путёвку в финал', 'Выходи на старт и становись лучшим'], percentTop: '100%', percentBottom: 'УВЕРЕННОСТИ', bottom: 'Присоединяйся к марафону «Биатлон ГТО»!', img: 'images/biatlonguy.png' },
    { title: 'ПЕДАГОГИ И ТРЕНЕРЫ', subtitle: 'Наставники чемпионов', list: ['внедрять модуль «биатлон»', 'организовывать клубы', 'повышать квалификацию'], percentTop: '100%', percentBottom: 'ДОВЕРИЯ', bottom: 'Более 100 семинаров уже проведено.', img: 'images/teacher.png' },
    { title: 'РОДИТЕЛИ', subtitle: 'Надёжный тыл', list: ['вдохновлять детей', 'поддерживать', 'выступать на эстафетах'], percentTop: '100%', percentBottom: 'ПОДДЕРЖКИ', bottom: 'Проект объединяет всю семью.', img: 'images/preschool.png' },
    { title: 'КОЛЛЕКТИВЫ ПРЕДПРИЯТИЙ', subtitle: 'Корпоративный биатлон', list: ['формировать команды', 'проводить тренировки', 'привлекать внимание'], percentTop: '100%', percentBottom: 'ОТВЕТСТВЕННОСТИ', bottom: 'Совместные старты сплачивают коллектив.', img: 'images/worker.png' },
    { title: 'ДОШКОЛЬНИКИ', subtitle: 'Первое знакомство', list: ['наблюдать', 'знакомиться с винтовкой', 'играть в эстафеты'], percentTop: '100%', percentBottom: 'ЛЮБОПЫТСТВА', bottom: 'Проект адаптирует элементы биатлона для самых маленьких.', img: 'images/laska2.png' }
];

const elementModal = document.getElementById('elementModal');
const elementModalClose = document.getElementById('elementModalClose');

function openElementModal(index) {
    const data = elementsData[index];
    if (!data || !elementModal) return;
    
    const emTitle = document.getElementById('emTitle');
    const emSubtitle = document.getElementById('emSubtitle');
    const emImage = document.getElementById('emImage');
    const emBottom = document.getElementById('emBottom');
    const emList = document.getElementById('emList');
    const emPercent = document.getElementById('emPercent');

    if (emTitle) emTitle.textContent = data.title;
    if (emSubtitle) emSubtitle.textContent = data.subtitle;
    if (emImage) emImage.src = data.img;
    if (emBottom) emBottom.textContent = data.bottom;
    
    if (emList) {
        emList.innerHTML = '';
        data.list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            emList.appendChild(li);
        });
    }
    
    if (emPercent) {
        emPercent.innerHTML = data.percentTop + '<small>' + data.percentBottom + '</small>';
    }
    
    const card = document.querySelector('.element-card[data-element="' + index + '"]');
    if (card) {
        const cardColor = card.style.getPropertyValue('--color') || '#0D2B5C';
        elementModal.querySelector('.element-modal').style.setProperty('--modal-color', cardColor);
    }
    elementModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeElementModal() {
    if (elementModal) {
        elementModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.querySelectorAll('.element-card').forEach(card => {
    card.addEventListener('click', () => openElementModal(parseInt(card.getAttribute('data-element'), 10)));
});

if (elementModalClose) elementModalClose.addEventListener('click', closeElementModal);
if (elementModal) elementModal.addEventListener('click', (e) => { if (e.target === elementModal) closeElementModal(); });

// Клавиатура (Escape)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (elementModal && elementModal.classList.contains('active')) closeElementModal();
        const lightboxes = document.querySelectorAll('.lightbox');
        lightboxes.forEach(lb => { lb.classList.remove('active'); document.body.style.overflow = ''; });
    }
});

// ============ ВИДЕО-ФАСАД ============
const videoFacade = document.querySelector('.video-facade');
if (videoFacade) {
    videoFacade.addEventListener('click', () => {
        const src = videoFacade.getAttribute('data-video-src');
        if (!src) return;
        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        videoFacade.parentElement.innerHTML = '';
        videoFacade.parentElement.appendChild(iframe);
    });
}

// ============ ФОРМА СВЯЗИ ============
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
            const response = await fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { 'Accept': 'application/json' } });
            if (response.ok) {
                contactForm.reset();
                if (message) { message.classList.add('show'); setTimeout(() => message.classList.remove('show'), 6000); }
            } else { alert('Что-то пошло не так.'); }
        } catch (err) { alert('Ошибка соединения.'); }
        finally { submitBtn.textContent = originalText; submitBtn.disabled = false; }
    });
}

// ============ ЗАКРЫТИЕ ЛАЙТБОКСОВ ПО ФОНУ И КРЕСТИКУ ============
document.querySelectorAll('.lightbox').forEach(lightbox => {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ============ АНИМАЦИИ И СЛАЙДЕРЫ ============
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Настройка стрелок для всех слайдеров
    setupSliderArrows('gallerySlider', 'gallerySliderPrev', 'gallerySliderNext', 2); // Главная
    setupSliderArrows('aquaGalSlider', 'aquaGalPrev', 'aquaGalNext', 1);             // Аква
    setupSliderArrows('studentSlider', 'studentSliderPrev', 'studentSliderNext', 1); // Студенты
    setupSliderArrows('schoolSlider', 'schoolSliderPrev', 'schoolSliderNext', 1);    // Школьники

    // 2. Интерактивная мишень
    const target = document.getElementById('aquaTarget');
    if (target) {
        const hitCounter = document.getElementById('hitCounter');
        const resetBtn = document.getElementById('resetTargetBtn');
        let hits = 0;
        target.addEventListener('click', function(e) {
            if (hits >= 5) return;
            target.classList.remove('spring'); void target.offsetWidth; target.classList.add('spring');
            const rect = target.getBoundingClientRect();
            const hole = document.createElement('div');
            hole.classList.add('bullet-hole');
            hole.style.left = `${e.clientX - rect.left}px`;
            hole.style.top = `${e.clientY - rect.top}px`;
            target.appendChild(hole);
            hits++; if(hitCounter) hitCounter.textContent = hits;
            if (hits === 5) setTimeout(() => { alert("Отличная стрельба! 🎯"); }, 300);
        });
        if (resetBtn) resetBtn.addEventListener('click', function() { hits = 0; if(hitCounter) hitCounter.textContent = hits; target.querySelectorAll('.bullet-hole').forEach(h => h.remove()); });
    }

    // 3. Таймлайн
    const timeWrapper = document.querySelector('.timeline-scroll-wrapper');
    if (timeWrapper) {
        const timePrev = document.getElementById('timePrev');
        const timeNext = document.getElementById('timeNext');
        const isAtEnd = () => timeWrapper.scrollLeft + timeWrapper.clientWidth >= timeWrapper.scrollWidth - 10;
        const isAtStart = () => timeWrapper.scrollLeft <= 10;
        if (timePrev) timePrev.addEventListener('click', () => {
            if (isAtStart()) timeWrapper.scrollTo({ left: timeWrapper.scrollWidth, behavior: 'smooth' });
            else timeWrapper.scrollBy({ left: -300, behavior: 'smooth' });
        });
        if (timeNext) timeNext.addEventListener('click', () => {
            if (isAtEnd()) timeWrapper.scrollTo({ left: 0, behavior: 'smooth' });
            else timeWrapper.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // 4. Счетчики (Педагоги и Школьники)
    const statsBlocks = document.querySelectorAll('.teach-bento-grid, .school-stats-grid');
    if (statsBlocks.length > 0) {
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.count').forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        let startTimestamp = null;
                        const step = (ts) => {
                            if (!startTimestamp) startTimestamp = ts;
                            const progress = Math.min((ts - startTimestamp) / 2000, 1);
                            const easeOut = 1 - (1 - progress) * (1 - progress);
                            let current = Math.floor(easeOut * target);
                            counter.innerText = (target >= 1000) ? current.toLocaleString('ru-RU') : current;
                            if (progress < 1) window.requestAnimationFrame(step);
                            else counter.innerText = target.toLocaleString('ru-RU');
                        };
                        window.requestAnimationFrame(step);
                    });
                    o.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsBlocks.forEach(block => obs.observe(block));
    }

    // 5. Чат (Школьники)
    const chatSection = document.querySelector('.chat-section');
    if (chatSection) {
        const bubbles = document.querySelectorAll('.chat-bubble.bubble-in');
        const status = document.getElementById('chatStatus');
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (status) status.innerText = "Биатлон ГТО печатает...";
                    bubbles.forEach((bubble, index) => {
                        setTimeout(() => {
                            bubble.classList.add('show');
                            if (index === bubbles.length - 1) setTimeout(() => { if (status) status.innerText = "в сети"; }, 600);
                        }, index * 800);
                    });
                    o.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        obs.observe(chatSection);
    }
});

// ============ ДИНАМИЧЕСКАЯ ЗАГРУЗКА ИЗ АДМИНКИ (Decap CMS) ============
document.addEventListener("DOMContentLoaded", async () => {
    
    // 1. ГЛАВНАЯ: Наши проекты
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        try {
            const res = await fetch('content/projects.json');
            const data = await res.json();
            if (data && data.items) {
                projectsContainer.innerHTML = data.items.map((item, index) => `
                    <div class="project-card" data-project="${index}">
                        <div class="project-img">
                            <img src="${getImgPath(item)}" alt="${item.title}">
                        </div>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `).join('');

                // Делегирование клика на весь контейнер проектов
                projectsContainer.addEventListener('click', (e) => {
                    const card = e.target.closest('.project-card');
                    if (card) {
                        const img = card.querySelector('img');
                        const idx = card.getAttribute('data-project');
                        if (img) openDynamicLightbox(img.src, data.items[idx].title);
                    }
                });
            }
        } catch (e) { console.log('Ошибка загрузки проектов:', e); }
    }

    // 2. ГЛАВНАЯ: Фотографии с мероприятий
    const mainGallery = document.getElementById('gallerySlider');
    if (mainGallery) {
        try {
            const res = await fetch('content/gallery.json');
            const data = await res.json();
            if (data && data.images) {
                mainGallery.innerHTML = data.images.map(item => `
                    <div class="gallery-slide"><img src="${getImgPath(item)}" alt="Фото"></div>
                `).join('');

                mainGallery.addEventListener('click', (e) => {
                    const slide = e.target.closest('.gallery-slide');
                    if (slide) {
                        const img = slide.querySelector('img');
                        if (img) openDynamicLightbox(img.src);
                    }
                });
            }
        } catch (e) { console.log('Ошибка загрузки галереи:', e); }
    }

    // 3. АКВА БИАТЛОН: Фотографии
    const aquaGallery = document.getElementById('aquaGalSlider');
    if (aquaGallery) {
        try {
            const res = await fetch('content/aquathlon.json');
            const data = await res.json();
            if (data && data.images) {
                aquaGallery.innerHTML = data.images.map(item => `
                    <div class="gallery-slide"><img src="${getImgPath(item)}" alt="Фото"></div>
                `).join('');

                aquaGallery.addEventListener('click', (e) => {
                    const slide = e.target.closest('.gallery-slide');
                    if (slide) {
                        const img = slide.querySelector('img');
                        if (img) openDynamicLightbox(img.src);
                    }
                });
            }
        } catch (e) { console.log('Ошибка загрузки аква-галереи:', e); }
    }

    // 4. ШКОЛЬНИКАМ: Коллаж (Полароиды)
    const schoolPolaroids = document.getElementById('schoolPolaroidContainer');
    if (schoolPolaroids) {
        try {
            const res = await fetch('content/school.json');
            const data = await res.json();
            if (data && data.images && data.images.length > 0) {
                let html = `<div class="polaroid-big"><img src="${getImgPath(data.images[0])}" alt="Фото"></div>`;
                html += `<div class="polaroid-small-grid">`;
                for (let i = 1; i < data.images.length; i++) {
                    html += `<div class="polaroid-small"><img src="${getImgPath(data.images[i])}" alt="Фото"></div>`;
                }
                html += `</div>`;
                schoolPolaroids.innerHTML = html;

                schoolPolaroids.addEventListener('click', (e) => {
                    const card = e.target.closest('.polaroid-big, .polaroid-small');
                    if (card) {
                        const img = card.querySelector('img');
                        if (img) openDynamicLightbox(img.src);
                    }
                });
            }
        } catch (e) { console.log('Ошибка загрузки школьной галереи:', e); }
    }

    // 5. ПЕДАГОГАМ: Коллаж
    const teachMasonry = document.getElementById('teachMasonryContainer');
    if (teachMasonry) {
        try {
            const res = await fetch('content/teachers.json');
            const data = await res.json();
            if (data && data.images) {
                const classes = ['item-big', 'item-small-l1', 'item-small-l2', 'item-r1', 'item-r2', 'item-r3', 'item-r4'];
                teachMasonry.innerHTML = data.images.map((item, i) => `
                    <div class="teach-masonry-item ${classes[i] || ''}">
                        <img src="${getImgPath(item)}" alt="Фото">
                    </div>
                `).join('');

                teachMasonry.addEventListener('click', (e) => {
                    const item = e.target.closest('.teach-masonry-item');
                    if (item) {
                        const img = item.querySelector('img');
                        if (img) openDynamicLightbox(img.src);
                    }
                });
            }
        } catch (e) { console.log('Ошибка загрузки коллажа педагогов:', e); }
    }
});
