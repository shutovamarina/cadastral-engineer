// NAV
function toggleNav() {
    document.getElementById('nav').classList.toggle('open');
}

function closeNav() {
    document.getElementById('nav').classList.remove('open');
}
//serves
function openCard(card) {
    // Находим родительский ряд
    const row = card.parentElement;
    const cards = row.querySelectorAll('.service-card');

    // Если карточка уже активна — ничего не делаем (она остаётся открытой)
    if (card.classList.contains('active')) {
        return;
    }

    // Закрываем все карточки в ряду
    cards.forEach(c => c.classList.remove('active'));

    // Открываем выбранную
    card.classList.add('active');
}

// PRICE TOGGLE
function togglePrice(el) {
    el.parentElement.classList.toggle('open');
}

function scrollToPrice(idx) {
    const rows = document.querySelectorAll('.price-category');
    if (rows[idx]) {
        rows[idx].classList.add('open');
        rows[idx].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// FAQ
function toggleFaq(el) {
    el.parentElement.classList.toggle('open');
}

// MODAL
function openModal() {
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function submitModal(e) {
    e.preventDefault();
    alert('Запрос отправлен. Мы свяжемся с вами в ближайшее время.');
    closeModal();
    e.target.reset();
}

function submitFeedback(e) {
    e.preventDefault();
    alert('Сообщение отправлено. Спасибо!');
    e.target.reset();
}

// CAROUSEL
// CAROUSEL
let carouselPos = 0;
let touchStartX = 0;
let touchEndX = 0;

function getVisibleCards() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    const cards = track.children;
    const total = cards.length;
    const visible = getVisibleCards();
    const maxPos = Math.max(0, total - visible);

    if (carouselPos > maxPos) carouselPos = maxPos;
    if (carouselPos < 0) carouselPos = 0;

    const gap = 22;
    const viewportWidth = track.parentElement.offsetWidth;
    const cardWidth = (viewportWidth - (visible - 1) * gap) / visible;
    const offset = carouselPos * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    const centerIdx = carouselPos + Math.floor(visible / 2);
    Array.from(cards).forEach((c, i) => {
        c.classList.toggle('center', i === centerIdx);
    });
}

function moveCarousel(dir) {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    const total = track.children.length;
    const visible = getVisibleCards();
    const maxPos = Math.max(0, total - visible);

    carouselPos += dir;
    if (carouselPos < 0) carouselPos = maxPos;
    if (carouselPos > maxPos) carouselPos = 0;

    updateCarousel();
}

function initTouchEvents() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            moveCarousel(1);
        } else {
            moveCarousel(-1);
        }
    }
}

window.addEventListener('resize', () => {
    carouselPos = 0;
    updateCarousel();
});

updateCarousel();
initTouchEvents();


// LIGHTBOX
function openLightbox(el) {
    const img = el.querySelector('img');
    document.getElementById('lightboxImg').src = img.src;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Close modal on overlay click
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});