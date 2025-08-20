// --- TODO: ADD YOUR GALLERY IMAGE PATHS AND CAPTIONS HERE ---
const galleryData = [
    { src: "images/gallery1.jpg", caption: "Photo so cute, meri jaan le lega." },
    { src: "images/gallery2.jpg", caption: "This is legit my favourite pfp of yours." },
    { src: "images/gallery3.jpg", caption: "Blocked tha but, ngl you look the best here" },
    { src: "images/gallery4.jpg", caption: "Yea yea, tune pehnaya tha, march 2025 tak tha saath me.(dost ko dediya phir)" },
    { src: "images/gallery5.jpg", caption: "Ahem Ahem prank yaad hai? Pakad liya tha 😛" },
    { src: "images/gallery6.jpg", caption: "What were you called again? Her, 'Mau'😉" },
    { src: "images/gallery7.jpg", caption: "OHHH GODDD 😶💗" },
    { src: "images/gallery8.jpg", caption: "The smile is 🤌🏻" },
    { src: "images/gallery9.jpg", caption: "Ohk, so with this photo, it is the end of this gift. Gave it my absolute all to create this in months. Imma delete every single photo and memory of you from my phone and insta too (promised). Happy to know you are happy in your life. Keep Smiling, may it be me or someone else Wishing the best for your future. And here I let go all memories, happily! 💚" } // The last image.
];

// --- Global Variables & DOM Elements ---
let currentPage = 1; let candlesBlown = false; let openedGifts = 0;
let fireworks = []; let particles = []; let animationId = null;
const overlay = document.getElementById('lights-off-overlay');
let galleryCurrentIndex = 0;
let galleryItems;
let galleryContainer, galleryCarousel, galleryNav, galleryCaption, carouselWrapper, finaleImage, galleryTitle, gallerySubtitle;
let isGalleryInitialized = false;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    overlay.classList.add('hidden');
});

function initializeGallery() {
    if (isGalleryInitialized) return; // Prevent re-initialization

    galleryContainer = document.getElementById('gallery-container');
    galleryCarousel = document.querySelector('.gallery-carousel');
    galleryNav = document.querySelector('.gallery-nav');
    galleryCaption = document.getElementById('gallery-caption');
    carouselWrapper = document.querySelector('.gallery-carousel-wrapper');
    finaleImage = document.getElementById('finale-image');
    galleryTitle = document.getElementById('gallery-title');
    gallerySubtitle = document.getElementById('gallery-subtitle');

    document.getElementById('prev-btn').addEventListener('click', () => navigateGallery(-1));
    document.getElementById('next-btn').addEventListener('click', () => navigateGallery(1));
    
    // Clear any previous items before creating new ones
    galleryCarousel.innerHTML = ''; 
    
    // Create carousel items dynamically from all but the last image
    galleryData.slice(0, -1).forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = item.src;
        div.appendChild(img);
        galleryCarousel.appendChild(div);
    });
    galleryItems = document.querySelectorAll('.gallery-item');
    isGalleryInitialized = true;
}

// --- Page Navigation ---
function nextPage(pageNumber) {
    if(document.getElementById(`page${currentPage}`)) { document.getElementById(`page${currentPage}`).style.display = 'none'; }
    const nextPageElement = document.getElementById(`page${pageNumber}`);
    if (nextPageElement) {
        if (pageNumber === 3) { overlay.classList.remove('hidden'); }
        nextPageElement.style.display = 'block'; currentPage = pageNumber;
    }
    if (pageNumber === 7) { createFloatingHearts(); }
    if (pageNumber === 10) {
        if (!isGalleryInitialized) {
            initializeGallery();
        }
        showGallery();
    }
}

// --- FINAL GALLERY LOGIC ---
function navigateGallery(direction) {
    const newIndex = (galleryCurrentIndex + direction + galleryData.length) % galleryData.length;
    galleryCurrentIndex = newIndex;
    updateGalleryState();
}

function updateGalleryState() {
    const isFinale = galleryCurrentIndex === galleryData.length - 1;
    galleryContainer.classList.toggle('is-finale', isFinale);

    galleryCaption.style.opacity = '0';

    setTimeout(() => {
        if (isFinale) {
            galleryTitle.textContent = "And the last one...";
            gallerySubtitle.textContent = ""; 
            finaleImage.src = galleryData[galleryCurrentIndex].src;
        } else {
            galleryTitle.textContent = "A Walk Down Collection Lane";
            gallerySubtitle.textContent = "A few of my favorite pictures of you...";
            updateCarouselVisuals();
        }
        galleryCaption.textContent = galleryData[galleryCurrentIndex].caption;
        galleryCaption.style.opacity = '1';
    }, 400); 
}

function updateCarouselVisuals() {
    const carouselItems = galleryCarousel.querySelectorAll('.gallery-item');
    carouselItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next', 'hidden');
        let newIndex = (index - galleryCurrentIndex + carouselItems.length) % carouselItems.length;
        if (newIndex === 0) item.classList.add('active');
        else if (newIndex === 1) item.classList.add('next');
        else if (newIndex === carouselItems.length - 1) item.classList.add('prev');
        else item.classList.add('hidden');
    });
}

function showGallery() {
    galleryCurrentIndex = 0;
    updateGalleryState();
}

// --- Other Scene Functions ---
function openGift(giftBoxElement, imageId) { if (giftBoxElement.classList.contains('opened')) return; giftBoxElement.classList.add('opened'); document.getElementById(imageId).classList.add('revealed'); openedGifts++; if (openedGifts === 4) { setTimeout(triggerCircleAnimation, 500); } }
function triggerCircleAnimation() { document.querySelectorAll('.gift-image').forEach(img => img.classList.add('in-circle')); document.getElementById('gifts-next-btn').classList.add('visible'); }
function turnLightsOn() { overlay.classList.add('hidden'); setTimeout(() => { nextPage(4); }, 1000); }
function addBalloons(button) { button.disabled = true; const colors = ['#ff6b35', '#ffd700', '#fd79a8', '#74b9ff', '#00b894']; for (let i = 0; i < 10; i++) { const balloon = document.createElement('div'); balloon.className = 'balloon'; balloon.style.backgroundColor = colors[i % colors.length]; balloon.style.left = Math.random() * 90 + 'vw'; balloon.style.animationDelay = Math.random() * 2 + 's'; document.body.appendChild(balloon); setTimeout(() => balloon.remove(), 6000); } setTimeout(() => { nextPage(5); }, 2000); }
function blowCandles() { if (candlesBlown) return; candlesBlown = true; document.querySelectorAll('.flame').forEach(flame => flame.classList.add('blown')); document.getElementById('cake-next').style.opacity = '1'; document.getElementById('cake-next').style.pointerEvents = 'auto'; startConfetti(); showCustomAlert('🎉 WISH GRANTED! Go ahead sharayu! 🎉'); }
function createFloatingHearts() { for (let i = 0; i < 20; i++) { setTimeout(() => { const heart = document.createElement("div"); heart.className = "sg-heart"; heart.style.left = Math.random() * 100 + "vw"; heart.style.animationDuration = Math.random() * 2 + 3 + "s"; document.body.appendChild(heart); setTimeout(() => heart.remove(), 5000); }, i * 150); } }
function startConfetti() { const container = document.createElement('div'); container.className = 'confetti-container'; document.body.appendChild(container); const colors = ['#ff6b35', '#ffd700', '#74b9ff', '#fd79a8', '#00b894']; for (let i = 0; i < 70; i++) { const confetti = document.createElement('div'); confetti.className = 'confetti'; confetti.style.left = Math.random() * 100 + '%'; confetti.style.animationDelay = Math.random() * 4 + 's'; confetti.style.backgroundColor = colors[Math.floor(Math.random() * 5)]; container.appendChild(confetti); } setTimeout(() => container.remove(), 5000); }

function launchFireworks(button) {
    button.disabled = true;
    const canvas = document.getElementById('fireworks-canvas'); if (!canvas) return; const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    for (let i = 0; i < 8; i++) { setTimeout(() => launchFirework(canvas, ctx), i * 700); }
    setTimeout(() => {
        showCustomAlert('🎆 Fireworks weren\'t as spectacular as you! Absolutely Enchanting');
        button.style.display = 'none'; document.getElementById('gallery-next-btn').style.display = 'block';
    }, 8000);
}

function launchFirework(canvas, ctx) { const firework = { x: Math.random() * canvas.width, y: canvas.height, targetY: Math.random() * canvas.height * 0.4 + canvas.height * 0.1, vy: -8 - Math.random() * 4, color: `hsl(${Math.random() * 360}, 100%, 60%)`, exploded: false }; fireworks.push(firework); if (animationId === null) animate(ctx, canvas); }
function animate(ctx, canvas) { ctx.clearRect(0, 0, canvas.width, canvas.height); fireworks = fireworks.filter(f => { if (!f.exploded) { f.vy += 0.2; f.y += f.vy; if (f.y <= f.targetY || f.vy >= 0) { f.exploded = true; explodeFirework(f); return false; } ctx.fillStyle = f.color; ctx.beginPath(); ctx.arc(f.x, f.y, 3, 0, Math.PI * 2); ctx.fill(); } return !f.exploded; }); particles = particles.filter(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life--; const alpha = Math.max(0, p.life / p.maxLife); ctx.fillStyle = p.color.replace('1)', `${alpha})`); ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill(); return p.life > 0; }); if (fireworks.length > 0 || particles.length > 0) { animationId = requestAnimationFrame(() => animate(ctx, canvas)); } else { animationId = null; } }
function explodeFirework(firework) { const pCount = 60; for (let i = 0; i < pCount; i++) { const angle = (i / pCount) * Math.PI * 2; const speed = Math.random() * 7 + 2; particles.push({ x: firework.x, y: firework.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, color: firework.color.replace('60%)', '60%, 1)'), life: 150, maxLife: 150 }); } }
function showCustomAlert(message) { setTimeout(() => alert(message), 100); }

function restartJourney() {
    document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
    overlay.classList.add('hidden'); document.getElementById('page1').style.display = 'block'; currentPage = 1;
    candlesBlown = false; document.querySelectorAll('.flame').forEach(f => f.classList.remove('blown')); document.getElementById('cake-next').style.opacity = '0.5'; document.getElementById('cake-next').style.pointerEvents = 'none';
    document.getElementById('decorate-btn').disabled = false;
    document.getElementById('fireworks-launch-btn').style.display = 'block'; document.getElementById('fireworks-launch-btn').disabled = false; document.getElementById('gallery-next-btn').style.display = 'none';
    fireworks = []; particles = []; if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
    openedGifts = 0;
    document.querySelectorAll('.gift-box').forEach(box => box.classList.remove('opened'));
    document.querySelectorAll('.gift-image').forEach(img => { img.classList.remove('revealed'); img.classList.remove('in-circle'); });
    document.getElementById('gifts-next-btn').classList.remove('visible');
    showGallery();
                }
