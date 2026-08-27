// --- 1. JQUERY COUNTDOWN TIMER LOGIC ---
$(document).ready(function() {
    if ($('#jquery-countdown').length) {
        var targetDate = $('#jquery-countdown').data('date');
        $('#jquery-countdown').countdown(targetDate, function(event) {
            $(this).find('.days').text(event.strftime('%D'));
            $(this).find('.hours').text(event.strftime('%H'));
            $(this).find('.minutes').text(event.strftime('%M'));
            $(this).find('.seconds').text(event.strftime('%S'));
        });
    }
});

// --- 2. HEADER LAYOUT TOGGLE (DESKTOP SEARCH) ---
// ... (keep the rest of your shop2_script.js file exactly as it was) ...

// --- 2. HEADER LAYOUT TOGGLE (DESKTOP SEARCH) ---
function toggleHeaderLayout() {
    const defaultLayout = document.getElementById('header-layout-default');
    const searchLayout = document.getElementById('header-layout-search');
    
    if (defaultLayout && searchLayout) {
        if (defaultLayout.classList.contains('d-block')) {
            defaultLayout.classList.replace('d-block', 'd-none');
            searchLayout.classList.replace('d-none', 'd-block');
        } else {
            searchLayout.classList.replace('d-block', 'd-none');
            defaultLayout.classList.replace('d-none', 'd-block');
        }
    }
}

// --- 3. MOBILE SEARCH TOGGLE (OFFCANVAS) ---
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

// --- 4. DYNAMIC PAGINATION & GRID SHUFFLE ---
let currentPage = 1;
const totalPages = 21;

function changePage(pageNum, btnElement) {
    // Determine the new page number
    if (pageNum === 'prev') {
        if (currentPage > 1) currentPage--;
    } else if (pageNum === 'next') {
        if (currentPage < totalPages) currentPage++;
    } else {
        currentPage = pageNum;
    }

    const allPageBtns = document.querySelectorAll('.page-btn');
    allPageBtns.forEach(b => {
        b.classList.remove('btn-success', 'text-white', 'fw-bold', 'border-0');
        b.classList.add('btn-light', 'bg-transparent', 'text-dark', 'fw-normal');
    });
    const targetBtn = Array.from(allPageBtns).find(b => parseInt(b.innerText) === currentPage);
    if (targetBtn) {
        targetBtn.classList.remove('btn-light', 'bg-transparent', 'text-dark', 'fw-normal');
        targetBtn.classList.add('btn-success', 'text-white', 'fw-bold', 'border-0');
    }
    simulateGridUpdate();
    window.scrollTo({ top: 350, behavior: 'smooth' });
}

function simulateGridUpdate() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    grid.style.opacity = '0';
    setTimeout(() => {
        for (let i = grid.children.length; i >= 0; i--) {
            grid.appendChild(grid.children[Math.random() * i | 0]);
        }
        grid.style.opacity = '1';
    }, 300);
}
