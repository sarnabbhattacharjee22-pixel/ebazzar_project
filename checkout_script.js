document.addEventListener('DOMContentLoaded', () => {
    const placeOrderBtn = document.getElementById('place-order-btn');
    const billingForm = document.getElementById('billing-form');

    placeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentCart = JSON.parse(localStorage.getItem('ecobazar_cart')) || [];
        if (currentCart.length === 0) {
            alert("Your cart is currently empty! Please add products before placing an order.");
            return;
        }
        if (!billingForm.checkValidity()) {
            billingForm.reportValidity();
            return;
        }
        const modal = document.getElementById('order-success-modal');
        const timerSpan = document.getElementById('countdown-timer');
        modal.classList.add('show');
        
        let secondsLeft = 8;
        timerSpan.innerText = secondsLeft;
        
        const interval = setInterval(() => {
            secondsLeft--;
            timerSpan.innerText = secondsLeft;
            
            if (secondsLeft <= 0) {
                clearInterval(interval);
                localStorage.setItem('ecobazar_cart', JSON.stringify([]));
                window.location.href = 'index.html';
            }
        }, 1000);
    });

    // --- HEADER LAYOUT TOGGLE (DESKTOP SEARCH) ---
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

// --- MOBILE SEARCH TOGGLE (OFFCANVAS) ---
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
});