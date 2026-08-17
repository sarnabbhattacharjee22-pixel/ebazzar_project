function switchTab(target) {
    const allTabs = document.querySelectorAll('.tab-btn');
    const descPane = document.getElementById('tab-pane-desc');
    const infoPane = document.getElementById('tab-pane-info');
    const feedbackPane = document.getElementById('tab-pane-feedback');
    const videoBlock = document.getElementById('video-block');

    allTabs.forEach(tab => { tab.classList.remove('active'); tab.classList.add('text-muted'); });
    descPane.classList.replace('d-block', 'd-none');
    infoPane.classList.replace('d-block', 'd-none');
    feedbackPane.classList.replace('d-block', 'd-none');

    if (target === 'desc') {
        allTabs[0].classList.add('active'); allTabs[0].classList.remove('text-muted');
        descPane.classList.replace('d-none', 'd-block'); videoBlock.classList.replace('d-none', 'd-block');
    } else if (target === 'info') {
        allTabs[1].classList.add('active'); allTabs[1].classList.remove('text-muted');
        infoPane.classList.replace('d-none', 'd-block'); videoBlock.classList.replace('d-none', 'd-block');
    } else if (target === 'feedback') {
        allTabs[2].classList.add('active'); allTabs[2].classList.remove('text-muted');
        feedbackPane.classList.replace('d-none', 'd-block'); videoBlock.classList.replace('d-block', 'd-none');
    }
}

// --- 2. PRODUCT GALLERY LOGIC ---
function changeMainImage(element, newSrc) {
    document.getElementById('main-product-img').src = newSrc;
    const thumbnails = document.querySelectorAll('.thumb-img');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('border-success', 'active-thumb');
        thumb.classList.add('border-light-subtle');
    });
    element.classList.remove('border-light-subtle');
    element.classList.add('border-success', 'active-thumb');
}

function scrollThumbs(direction) {
    const container = document.getElementById('thumb-container');
    container.scrollBy({ top: direction * 100, behavior: 'smooth' });
}

// --- 3. PRODUCT QUANTITY LOGIC ---
let currentQty = 5;

function changeProductQty(change) {
    currentQty += change;
    if(currentQty < 1) currentQty = 1; 
    document.getElementById('product-qty').innerText = currentQty;
}

function addCurrentProductToCart() {
    if (typeof addToCart === 'function') {
        addToCart('prod_cabbage', 'Chinese Cabbage', 17.28, 'assets/cabbage-main.png', currentQty);
    } else {
        console.error("ecommerce_app.js is missing!");
    }
}

// --- 4. SHOPPING CART LOGIC ---
function openCart() {
    if (typeof renderPopupCart === 'function') {
        renderPopupCart();
    }
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('show');
    document.body.style.overflow = 'hidden'; 
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('show');
    document.body.style.overflow = 'auto'; 
}