// ============ ЗАПРЕТ ПЕРЕТАСКИВАНИЯ КАРТИНОК ============
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

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
    if (!data) return;
    document.getElementById('emTitle').textContent = data.title;
    document.getElementById('emSubtitle').textContent = data.subtitle;
    document.getElementById('emImage').src = data.img;
    document.getElementById('emBottom').textContent = data.bottom;
    const emList = document.getElementById('emList');
    emList.innerHTML = '';
    data.list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        emList.appendChild(li);
    });
    document.getElementById('emPercent').innerHTML = data.percentTop + '<small>' + data.percentBottom + '</small>';
    
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
    card.addEventListener('click', () => openElementModal(parseInt(card.getAttribute('data-element'), 10)));
});

if (elementModalClose) elementModalClose.addEventListener('click', closeElementModal);
if (elementModal) elementModal.addEventListener('click', (e) => { if (e.target === elementModal) closeElementModal(); });

// ============ КЛАВИАТУРА ============
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

// ============ ПОЯВЛЕНИЕ ЛАСКИ ============
const applySection = document.querySelector('.apply-section');
if (applySection) {
    const applyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('is-visible'); applyObserver.unobserve(entry.target); }
        });
    }, { threshold: 0.2 });
    applyObserver.observe(applySection);
}
const contactSection = document.querySelector('.contact-form-section');
if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('is-visible'); contactObserver.unobserve(entry.target); }
        });
    }, { threshold: 0.2 });
    contactObserver.observe(contactSection);
}

// ============ УНИВЕРСАЛЬНЫЙ ЛАЙТБОКС ============
function openDynamicLightbox(imgSrc, title = '') {
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

document.querySelectorAll('.lightbox').forEach(lightbox => {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ============ СЛАЙДЕРЫ И ИГРЫ ============
document.addEventListener("DOMContentLoaded", function() {
    const studentSlider = document.getElementById('studentSlider');
    if (studentSlider) {
        const prev = document.getElementById('studentSliderPrev');
        const next = document.getElementById('studentSliderNext');
        const getScrollAmount = () => (studentSlider.querySelector('.student-card')?.offsetWidth || 300) + 24;
        if (prev) prev.addEventListener('click', () => studentSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' }));
        if (next) next.addEventListener('click', () => studentSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' }));
    }

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

    const schoolSlider = document.getElementById('schoolSlider');
    if (schoolSlider) {
        const prev = document.getElementById('schoolSliderPrev');
        const next = document.getElementById('schoolSliderNext');
        const getScrollAmount = () => (schoolSlider.querySelector('.school-card')?.offsetWidth || 300) + 24;
        if (prev) prev.addEventListener('click', () => {
            if (schoolSlider.scrollLeft <= 10) schoolSlider.scrollTo({ left: schoolSlider.scrollWidth, behavior: 'smooth' });
            else schoolSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
        if (next) next.addEventListener('click', () => {
            if (schoolSlider.scrollLeft + schoolSlider.clientWidth >= schoolSlider.scrollWidth - 10) schoolSlider.scrollTo({ left: 0, behavior: 'smooth' });
            else schoolSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }

    // Счетчики
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

    // Чат
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

// ==========================================
// ЗАГРУЗКА ДАННЫХ ИЗ АДМИНКИ (Decap CMS)
// ==========================================

// Универсальная функция для получения пути картинки (строки или объекта)
const getImgPath = (item) => {
    if (!item) return '';
    return (typeof item === 'string') ? item : (item.image || '');
};

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
                            <img src="${getImgPath(item)}" alt="${item.title}" class="dyn-project-img">
                        </div>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `).join('');

                projectsContainer.querySelectorAll('.dyn-project-img').forEach((img, idx) => {
                    img.addEventListener('click', () => openDynamicLightbox(img.src, data.items[idx].title));
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
                    <div class="gallery-slide"><img src="${getImgPath(item)}" alt="Фото" class="dyn-main-gal-img"></div>
                `).join('');
                
                mainGallery.querySelectorAll('.dyn-main-gal-img').forEach(img => {
                    img.addEventListener('click', () => openDynamicLightbox(img.src));
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
                    <div class="gallery-slide"><img src="${getImgPath(item)}" alt="Фото" class="dyn-aqua-img"></div>
                `).join('');
                
                aquaGallery.querySelectorAll('.dyn-aqua-img').forEach(img => {
                    img.addEventListener('click', () => openDynamicLightbox(img.src));
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
                let html = `<div class="polaroid-big"><img src="${getImgPath(data.images[0])}" alt="Фото" class="dyn-school-img"></div>`;
                html += `<div class="polaroid-small-grid">`;
                for (let i = 1; i < data.images.length; i++) {
                    html += `<div class="polaroid-small"><img src="${getImgPath(data.images[i])}" alt="Фото" class="dyn-school-img"></div>`;
                }
                html += `</div>`;
                schoolPolaroids.innerHTML = html;
                
                schoolPolaroids.querySelectorAll('.dyn-school-img').forEach(img => {
                    img.addEventListener('click', () => openDynamicLightbox(img.src));
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
                        <img src="${getImgPath(item)}" alt="Фото" class="dyn-teach-img">
                    </div>
                `).join('');

                teachMasonry.querySelectorAll('.dyn-teach-img').forEach(img => {
                    img.addEventListener('click', () => openDynamicLightbox(img.src));
                });
            }
        } catch (e) { console.log('Ошибка загрузки коллажа педагогов:', e); }
    }
});
