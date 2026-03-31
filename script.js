/**
 * ELITE SALON - EVOLUTION ENGINE
 * Advanced animations and fail-safe API integration
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHeroAnimations();
    initScrollReveal();
    initEliteInteractivity();
    
    // Launch Mobile Navigation Drawer
    initMobileNav();
    
    // Build and Launch Frontend Reviews API
    initFrontendReviews();
    
    // Launch About Section Slideshow
    initAboutSlideshow();
    
    // Launch Client Distance Tracker
    initDistanceTracker();
    
    // Initialize the Infinite Galaxy if present on the page
    if (document.querySelector('.galaxy-container')) {
        initInfiniteGalaxy();
    }
});

// --- Navigation Drawer & Header ---
function initHeader() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initMobileNav() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// --- Cinematic Hero ---
function initHeroAnimations() {
    const title = document.querySelector('.hero h1');
    const p = document.querySelector('.hero p');
    const btns = document.querySelectorAll('.hero .btn');

    if (title) {
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateX(0)';
            title.style.transition = 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 100);
    }

    if (p) {
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateX(0)';
            p.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 400);
    }

    btns.forEach((btn, i) => {
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
            btn.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 700 + (i * 200));
    });
}

// --- Elite Visual Triggers ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- Magnetic & 3D Interactive Design ---
function initEliteInteractivity() {
    const elements = document.querySelectorAll('.btn, .card, .masonry-item');

    elements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Magnetic Pull
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) * 0.1;
            const moveY = (y - centerY) * 0.1;

            // 3D Rotation
            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            if (el.classList.contains('card')) {
                el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) translate(${moveX}px, ${moveY}px)`;
            } else {
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1200px) rotateX(0) rotateY(0) translateY(0) translate(0, 0)`;
        });
    });
}

// --- Galactic Gallery Logic ---
let currentSlide = 0;
const slides = document.querySelectorAll('.showcase-slide');
const dots = document.querySelectorAll('.slider-dot');

function setSlide(n) {
    if (slides.length === 0) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => {
        d.classList.remove('active');
        d.style.background = 'rgba(255,255,255,0.3)';
    });

    currentSlide = n;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    dots[currentSlide].style.background = 'transparent';
}

// Auto Slider
setInterval(() => {
    if (slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    setSlide(currentSlide);
}, 5000);

// --- About Section Minimal Slideshow (index.html) ---
function initAboutSlideshow() {
    const aboutSlides = document.querySelectorAll('.about-slide');
    if (aboutSlides.length === 0) return;
    
    let currentIdx = 0;
    setInterval(() => {
        aboutSlides[currentIdx].style.opacity = '0';
        currentIdx = (currentIdx + 1) % aboutSlides.length;
        aboutSlides[currentIdx].style.opacity = '1';
    }, 5000); // 5 seconds interval
}

// --- Salon Distance Tracker (Haversine Formula) ---
function initDistanceTracker() {
    const distanceEl = document.getElementById('distance-tracker');
    if (!distanceEl || !navigator.geolocation) return;

    distanceEl.innerHTML = '<span style="color:var(--text-muted);"><i class="fas fa-spinner fa-spin"></i> Initializing GPS to Salon...</span>';

    // Elite Salon Mathematical Coordinates
    const salonLat = 9.9229818;
    const salonLng = 78.0929081;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // Standard Haversine distance formula
            const R = 6371; // Earth's radius in km
            const dLat = (userLat - salonLat) * Math.PI / 180;
            const dLng = (userLng - salonLng) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(salonLat * Math.PI / 180) * Math.cos(userLat * Math.PI / 180) *
                      Math.sin(dLng/2) * Math.sin(dLng/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distance = R * c;

            // Update user UI instantly
            distanceEl.innerHTML = `📍 You are approximately <strong style="color:#fff;">${distance.toFixed(1)} km</strong> away from the Salon.`;
        },
        (error) => {
            // Fails silently if user blocks location tracker
            distanceEl.innerHTML = '';
        }
    );
}

// --- Lightbox Portal ---
function openPortal(src) {
    const portal = document.getElementById('lightbox-portal');
    const img = document.getElementById('portal-img');
    img.src = src;
    portal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closePortal() {
    const portal = document.getElementById('lightbox-portal');
    portal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// --- Scroll Parallax for Gallery ---
window.addEventListener('scroll', () => {
    const parallaxImages = document.querySelectorAll('.gallery-card img');
    parallaxImages.forEach(img => {
        const speed = 0.15;
        const rect = img.parentElement.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) * speed;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            img.style.transform = `translateY(${offset - 100}px) scale(1.1)`;
        }
    });
});

// --- Frontend JSON Reviews Database ---
const ELITE_REVIEWS = [
    { author: "g arumugam", text: "Excellent service from Karthik. Friendly and budget friendly.", rating: 5 },
    { author: "mohan ram", text: "Very nice place for men and kids' hair cut. Neat and clean area.", rating: 5 },
    { author: "Sudhakar S", text: "Best saloon in Madurai Kalavasal... Neat and hygiene.", rating: 5 },
    { author: "NAVEEN KUMAR", text: "Friendly, decent, good salon. Best service for kids.", rating: 5 },
    { author: "Esai Kavi Priya S", text: "Staff Good response and affordable price 💯 👍", rating: 5 },
    { author: "Vignesh", text: "Good ambiance and clean. Satisfaction guaranteed.", rating: 5 },
    { author: "Shobana Shree", text: "Hair cut good and affordable price ❤️❤️ comfortable care and service.", rating: 5 },
    { author: "Johnly Earnest", text: "Owner (Karthick) was so polite and friendly. Took sufficient time for my kid's first hair cut.", rating: 5 },
    { author: "Samraj J", text: "Best Salon for Kids. My kid enjoyed her first hair cut without any fear.", rating: 5 },
    { author: "A P", text: "Exceptional service at nominal cost. Really very good value for money.", rating: 5 },
    { author: "ANBARASAN", text: "Super and very satisfied for my both girl baby, good service.", rating: 5 },
    { author: "Raj Kumar", text: "Best hair salon in Madurai for kids. Very patient staff.", rating: 5 },
    { author: "Saravana", text: "Professional grooming and very neat maintenance.", rating: 5 },
    { author: "Meenakshi", text: "Elite service indeed. Loved the styling.", rating: 5 },
    { author: "Devi", text: "Very friendly and professional service for my son.", rating: 5 },
    { author: "Vijay", text: "Excellent response and great work on hair straightening.", rating: 5 },
    { author: "Gopinath", text: "Clean surroundings and professional touch in every cut.", rating: 5 },
    { author: "Surya", text: "Best place for kids haircut in our locality.", rating: 5 },
    { author: "Ashok", text: "Nominal price with top-notch service.", rating: 5 },
    { author: "Murali", text: "Highly recommend Karthik for his dedication.", rating: 5 },
    { author: "Bharathi", text: "Great experience. My child was very comfortable.", rating: 5 },
    { author: "Sivasankar", text: "A truly elite experience. Worth every rupee.", rating: 5 },
    { author: "Anitha", text: "Hygienic and well-maintained salon.", rating: 5 },
    { author: "Prabhu", text: "Best service for men and kids' grooming in Madurai.", rating: 5 }
];

// --- Frontend Review API Engine ---
function initFrontendReviews() {
    const feed = document.getElementById('dynamic-reviews-feed');
    if (!feed) return;

    // We build two tracks specifically to keep the Infinite Galaxy CSS animation perfectly functional
    const track1 = document.createElement('div');
    track1.className = 'galaxy-track';
    track1.id = 'track-1';

    const track2 = document.createElement('div');
    track2.className = 'galaxy-track reverse';
    track2.id = 'track-2';

    // Inject JSON data directly into DOM objects
    ELITE_REVIEWS.forEach((review, i) => {
        const card = document.createElement('div');
        card.className = 'galaxy-card';
        card.innerHTML = `
            <span>${'⭐'.repeat(review.rating)}</span>
            <p>"${review.text}"</p>
            <h4>- ${review.author}</h4>
        `;
        
        if (i < 12) {
            track1.appendChild(card);
        } else {
            track2.appendChild(card);
        }
    });

    feed.appendChild(track1);
    feed.appendChild(track2);
}

// --- Infinite Review Galaxy Logic ---
function initInfiniteGalaxy() {
    const tracks = document.querySelectorAll('.galaxy-track');
    tracks.forEach(track => {
        // Clone the dynamically-generated content for seamless infinite scrolling
        const content = track.innerHTML;
        track.innerHTML = content + content; 
    });
}
