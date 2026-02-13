const body = document.body;
const oceanFloor = document.getElementById('ocean-floor');
const homeSection = document.getElementById('home-section');
let fishInterval;

// ============================================
// 1. GENERATE DEKORASI DASAR LAUT
// ============================================
function generateFloorDecoration() {
    // Rumput laut
    for (let i = 0; i < 50; i++) {
        let weed = document.createElement('div');
        weed.classList.add('seaweed');
        weed.style.left = Math.random() * 100 + '%';
        let height = 60 + Math.random() * 100;
        weed.style.height = height + 'px';
        weed.style.width = (10 + Math.random() * 8) + 'px';
        weed.style.animationDelay = '-' + (Math.random() * 5) + 's';
        oceanFloor.appendChild(weed);
    }
    
    // Batu karang
    for (let i = 0; i < 8; i++) {
        let rock = document.createElement('div');
        rock.classList.add('rock');
        rock.style.left = Math.random() * 95 + '%';
        let size = 50 + Math.random() * 80;
        rock.style.width = size * 1.5 + 'px';
        rock.style.height = size + 'px';
        oceanFloor.appendChild(rock);
    }
}

// ============================================
// 2. FUNGSI SPAWN IKAN
// ============================================
function spawnFish() {
    const fishTypes = ['🐠', '🐟', '🐡', '🐢'];
    const fish = document.createElement('div');
    fish.classList.add('fish');
    fish.innerText = fishTypes[Math.floor(Math.random() * fishTypes.length)];

    // Posisi
    fish.style.left = '105vw';
    fish.style.top = (Math.random() * 80 + 10) + 'vh';
    fish.style.transform = 'scaleX(1)';

    body.appendChild(fish);

    // Animasi
    let duration = 8000 + Math.random() * 12000;

    let animation = fish.animate([
        { left: '105vw' },
        { left: '-150px' }
    ], {
        duration: duration,
        easing: 'linear',
        fill: 'forwards'
    });

    animation.onfinish = () => fish.remove();
}

// ============================================
// 3. OBSERVER (FIX BUG IKAN HILANG TIBA-TIBA)
// ============================================
const observerOptions = {
    root: null,
    threshold: 0.2
};

const homeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start spawning
            if (!fishInterval) {
                spawnFish();
                fishInterval = setInterval(spawnFish, 2500);
            }
        } else {
            // STOP spawning BARU, tapi biarkan ikan lama berenang sampai selesai
            clearInterval(fishInterval);
            fishInterval = null;
        }
    });
}, observerOptions);

homeObserver.observe(homeSection);

// ============================================
// 4. GELEMBUNG BACKGROUND
// ============================================
function spawnBubbleBg() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble-bg');
    const size = 5 + Math.random() * 30;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + 'vw';
    body.appendChild(bubble);
    
    let duration = 5000 + Math.random() * 10000;
    let animation = bubble.animate([
        { bottom: '-50px', opacity: 0, transform: 'translateX(0)' },
        { opacity: 0.6, transform: `translateX(${Math.random() * 50 - 25}px)` },
        { bottom: '110vh', opacity: 0, transform: 'translateX(0)' }
    ], { duration: duration, easing: 'ease-out' });
    
    animation.onfinish = () => bubble.remove();
}

// ============================================
// 5. INISIALISASI SWIPER CAROUSEL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Pastikan Swiper sudah dimuat
    if (typeof Swiper !== 'undefined') {
        var projectSwiper = new Swiper(".myProjectSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            effect: "slide", // Bisa diganti "fade" jika ingin efek fade
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            // Pengaturan tambahan untuk mobile
            breakpoints: {
                // Ketika lebar layar >= 768px
                768: {
                    slidesPerView: 1,
                    spaceBetween: 30
                },
                // Ketika lebar layar < 768px (mobile)
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                }
            }
        });
        
        console.log('Swiper initialized successfully!');
    } else {
        console.error('Swiper library not loaded!');
    }
});

// ============================================
// 6. JALANKAN FUNGSI INISIALISASI
// ============================================
generateFloorDecoration();
setInterval(spawnBubbleBg, 800);

// ============================================
// 7. SMOOTH SCROLL UNTUK NAVIGASI (OPSIONAL)
// ============================================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});
