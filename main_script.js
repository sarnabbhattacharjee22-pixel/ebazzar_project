document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const modal = document.getElementById('newsletter-modal');
        if (modal) {
            modal.classList.add('show');
        }
    }, 1500); 

    // --- 2.COUNTDOWN TIMER LOGIC ---
    let timeRemaining = (2 * 24 * 3600) + (18 * 3600) + (46 * 60);

    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-mins');
    const secsEl = document.getElementById('timer-secs');
    if (daysEl && hoursEl && minsEl && secsEl) {
        setInterval(() => {
            let days = parseInt(timeRemaining / (3600 * 24), 10);
            let hours = parseInt((timeRemaining % (3600 * 24)) / 3600, 10);
            let minutes = parseInt((timeRemaining % 3600) / 60, 10);
            let seconds = parseInt(timeRemaining % 60, 10);

            daysEl.textContent = days < 10 ? "0" + days : days;
            hoursEl.textContent = hours < 10 ? "0" + hours : hours;
            minsEl.textContent = minutes < 10 ? "0" + minutes : minutes;
            secsEl.textContent = seconds < 10 ? "0" + seconds : seconds;

            if (--timeRemaining < 0) {
                timeRemaining = 0; 
            }
        }, 1000);
    }
});

function closePopup() {
    const modal = document.getElementById('newsletter-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// --- 3.HERO SLIDER ---
let currentSlide = 0;
const slides = [
    {
        image: 'assets/hero-basket.png',
        title: 'Fresh & Healthy<br>Organic Food',
        discount: '30% OFF',
        desc: 'Free shipping on all your order. we deliver, you enjoy'
    },
    {
        image: 'assets/hero-basket.png',
        title: 'Daily Fresh<br>Vegetables',
        discount: '40% OFF',
        desc: 'Farm to table delivery in under 24 hours.'
    },
    {
        image: 'assets/hero-basket.png',
        title: '100% Natural<br>Fresh Fruits',
        discount: '25% OFF',
        desc: 'Handpicked daily for the best quality and taste.'
    }
];

function changeSlide(direction) {
    if (typeof direction === 'number') {
        currentSlide = direction;
    } else {
        if (direction === 'right') {
            currentSlide++;
            if (currentSlide >= slides.length) currentSlide = 0;
        } else if (direction === 'left') {
            currentSlide--;
            if (currentSlide < 0) currentSlide = slides.length - 1;
        }
    }
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    const heroImg = document.getElementById('hero-img');
    const heroTitle = document.getElementById('hero-title');
    const heroDiscount = document.getElementById('hero-discount');
    const heroDesc = document.getElementById('hero-desc');
    heroImg.style.opacity = '0';
    heroTitle.style.opacity = '0';
    setTimeout(() => {
        heroImg.src = slides[currentSlide].image;
        heroTitle.innerHTML = slides[currentSlide].title;
        heroDiscount.innerHTML = slides[currentSlide].discount;
        heroDesc.innerHTML = slides[currentSlide].desc;
        heroImg.style.opacity = '1';
        heroTitle.style.opacity = '1';
    }, 300);
}

// --- 4.TESTIMONIAL CAROUSEL (3 SETS) ---
let currentTestimonialSet = 0;
const totalTestimonialSets = 3;

function slideTestimonials(direction) {
    const track = document.getElementById('testimonial-track');
    
    if (direction === 'right') {
        currentTestimonialSet++;
        if (currentTestimonialSet >= totalTestimonialSets) {
            currentTestimonialSet = 0; 
        }
    } else if (direction === 'left') {
        currentTestimonialSet--;
        if (currentTestimonialSet < 0) {
            currentTestimonialSet = totalTestimonialSets - 1; 
        }
    }
    const translateValue = -(currentTestimonialSet * (100 / totalTestimonialSets));
    track.style.transform = `translateX(${translateValue}%)`;
}

// --- 5. HEADER LAYOUT TOGGLE ---
function toggleHeaderLayout() {
    const defaultLayout = document.getElementById('header-layout-default');
    const searchLayout = document.getElementById('header-layout-search');
    
    if (defaultLayout.classList.contains('d-block')) {
        defaultLayout.classList.replace('d-block', 'd-none');
        searchLayout.classList.replace('d-none', 'd-block');
    } else {
        searchLayout.classList.replace('d-block', 'd-none');
        defaultLayout.classList.replace('d-none', 'd-block');
    }
    
    if (typeof updateHeaderBadges === 'function') {
        updateHeaderBadges();
    }
}

// --- 6. SHOPPING CART POPUP LOGIC ---
function openCart() {
    if (typeof renderPopupCart === 'function') renderPopupCart();
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('show');
    document.body.style.overflow = 'hidden'; 
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('show');
    document.body.style.overflow = 'auto'; 
}


// --- 6.CATEGORIES CAROUSEL (3 SETS OF 6) ---
let currentCategorySet = 0;
const totalCategorySets = 3;

function slideCategories(direction) {
    const track = document.getElementById('category-track');
    
    if (direction === 'right') {
        currentCategorySet++;
        if (currentCategorySet >= totalCategorySets) {
            currentCategorySet = 0; 
        }
    } else if (direction === 'left') {
        currentCategorySet--;
        if (currentCategorySet < 0) {
            currentCategorySet = totalCategorySets - 1; 
        }
    }
    
    const translateValue = -(currentCategorySet * (100 / totalCategorySets));
    track.style.transform = `translateX(${translateValue}%)`;
}


// --- 8. MOBILE SEARCH TOGGLE (OFFCANVAS) ---
function toggleMobileSearch() {
    const trigger = document.getElementById('mobileSearchTrigger');
    const searchBar = document.getElementById('mobileSearchBar');
    const navLinks = document.getElementById('mobileNavLinks');
    const bottomIcons = document.getElementById('mobileBottomIcons');
    
    if (searchBar && trigger && navLinks) {
        if (searchBar.classList.contains('d-none')) {
            searchBar.classList.remove('d-none');
            trigger.classList.add('d-none');
            navLinks.classList.add('d-none');
            if (bottomIcons) {
                bottomIcons.classList.remove('border-top', 'pt-4', 'mb-4');
                bottomIcons.classList.add('my-auto');
            }
        } else {
            searchBar.classList.add('d-none');
            trigger.classList.remove('d-none');
            navLinks.classList.remove('d-none');
            if (bottomIcons) {
                bottomIcons.classList.remove('my-auto');
                bottomIcons.classList.add('border-top', 'pt-4', 'mb-4');
            }
        }
    }
}