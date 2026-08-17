// --- 1. FILTER COLLAPSE/EXPAND LOGIC ---
function toggleFilter(contentId, headerElement) {
    const content = document.getElementById(contentId);
    const icon = headerElement.querySelector('.filter-icon');
    content.classList.toggle('collapsed');
    icon.classList.toggle('rotated');
}

// --- 2. CATEGORY BOLD SELECTION LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const catRadios = document.querySelectorAll('input[name="cat"]');
    catRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            catRadios.forEach(r => {
                r.parentElement.classList.remove('text-dark', 'fw-medium');
                r.parentElement.classList.add('text-muted');
            });
            if (e.target.checked) {
                e.target.parentElement.classList.add('text-dark', 'fw-medium');
                e.target.parentElement.classList.remove('text-muted');
            }
        });
    });
});

// --- 3. PRICE SLIDER LOGIC ---
function updatePriceDisplay(val) {
    document.getElementById('priceVal').innerText = val;
    simulateGridUpdate();
}

// --- 4. PAGINATION & GRID SHUFFLE LOGIC ---
function changePage(pageNum, btnElement) {
    const allPageBtns = document.querySelectorAll('.page-btn');
    allPageBtns.forEach(b => {
        b.classList.remove('btn-success', 'text-white');
        b.classList.add('btn-light', 'bg-transparent', 'text-dark');
    });
    btnElement.classList.remove('btn-light', 'bg-transparent', 'text-dark');
    btnElement.classList.add('btn-success', 'text-white');
    
    simulateGridUpdate();
    window.scrollTo({ top: 300, behavior: 'smooth' });
}

function simulateGridUpdate() {
    const grid = document.getElementById('product-grid');
    grid.style.opacity = '0';
    setTimeout(() => {
        for (let i = grid.children.length; i >= 0; i--) {
            grid.appendChild(grid.children[Math.random() * i | 0]);
        }
        grid.style.opacity = '1';
    }, 300);
}

// --- 5. SHOPPING CART POPUP LOGIC ---
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

// --- 6. POPULAR TAG LOGIC ---
function selectTag(clickedTag) {
    const allTags = document.querySelectorAll('.pop-tag');
    allTags.forEach(tag => {
        tag.classList.remove('bg-success', 'text-white');
        tag.classList.add('bg-light', 'text-dark', 'border');
    });
    clickedTag.classList.remove('bg-light', 'text-dark', 'border');
    clickedTag.classList.add('bg-success', 'text-white');
    simulateGridUpdate();
}