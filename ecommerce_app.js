let cart = JSON.parse(localStorage.getItem('ecobazar_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('ecobazar_wishlist')) || [];

function saveCart() { localStorage.setItem('ecobazar_cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('ecobazar_wishlist', JSON.stringify(wishlist)); }

function updateHeaderBadges() {
    const cartBadges = document.querySelectorAll('.cart-badge');
    const headerTotals = document.querySelectorAll('.header-cart-total'); 
    const wishlistBadges = document.querySelectorAll('.wishlist-badge');

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += (item.price * item.quantity);
    });

    cartBadges.forEach(badge => badge.innerText = totalItems);
    headerTotals.forEach(total => total.innerText = `$${totalPrice.toFixed(2)}`);
    wishlistBadges.forEach(badge => badge.innerText = wishlist.length);
}

function addToCart(id, name, price, image, quantity = 1) {
    cart = JSON.parse(localStorage.getItem('ecobazar_cart')) || [];
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id, name, price, image, quantity });
    }
    
    saveCart();
    updateHeaderBadges();
    
    if (typeof renderCartPage === 'function') renderCartPage(); 
    if (typeof renderCheckoutPage === 'function') renderCheckoutPage();
    if (typeof renderPopupCart === 'function') renderPopupCart(); 
    
    alert(`${name} added to cart!`);
}

function removeFromCart(id) {
    cart = JSON.parse(localStorage.getItem('ecobazar_cart')) || [];
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateHeaderBadges();
    if (typeof renderCartPage === 'function') renderCartPage(); 
    if (typeof renderCheckoutPage === 'function') renderCheckoutPage();
    if (typeof renderPopupCart === 'function') renderPopupCart(); 
}

function updateQuantity(id, change) {
    cart = JSON.parse(localStorage.getItem('ecobazar_cart')) || [];
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateHeaderBadges();
            if (typeof renderCartPage === 'function') renderCartPage(); 
            if (typeof renderCheckoutPage === 'function') renderCheckoutPage();
            if (typeof renderPopupCart === 'function') renderPopupCart(); 
        }
    }
}

function addToWishlist(id, name, price, image, stockStatus = 'In Stock') {
    wishlist = JSON.parse(localStorage.getItem('ecobazar_wishlist')) || [];
    const existingItem = wishlist.find(item => item.id === id);
    if (!existingItem) {
        wishlist.push({ id, name, price, image, stockStatus });
        saveWishlist();
        updateHeaderBadges();
        if (typeof renderWishlistPage === 'function') renderWishlistPage();
        alert(`${name} added to wishlist!`);
    } else {
        alert(`${name} is already in your wishlist.`);
    }
}

function removeFromWishlist(id) {
    wishlist = JSON.parse(localStorage.getItem('ecobazar_wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== id);
    saveWishlist();
    updateHeaderBadges();
    if (typeof renderWishlistPage === 'function') renderWishlistPage();
}

function renderCartPage() {
    const cartContainer = document.getElementById('cart-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    if (!cartContainer) return;

    cart = JSON.parse(localStorage.getItem('ecobazar_cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = `<tr><td colspan="5" align="center" valign="middle" class="py-5 text-muted font-sm border-bottom">Your cart is empty. Please add some products.</td></tr>`;
        if(subtotalEl) subtotalEl.innerText = "$0.00";
        if(totalEl) totalEl.innerText = "$0.00";
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        total += itemSubtotal;
        
        cartHTML += `
        <tr>
            <td align="left" valign="middle" class="border-bottom py-4 px-0">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="80" align="center" valign="middle"><img src="${item.image}" width="60" alt="${item.name}"></td>
                        <td align="left" valign="middle" class="text-dark fw-medium ps-3 font-sm">${item.name}</td>
                    </tr>
                </table>
            </td>
            <td align="left" valign="middle" class="border-bottom py-4">
                <span class="text-dark font-sm">$${item.price.toFixed(2)}</span>
            </td>
            <td align="center" valign="middle" class="border-bottom py-4">
                <table width="120" border="0" cellpadding="0" cellspacing="0" align="center" class="border rounded-pill p-1">
                    <tr>
                        <td align="center" valign="middle"><button onclick="updateQuantity('${item.id}', -1)" class="btn btn-light rounded-circle shadow-none p-0 font-sm bg-light text-dark border d-flex align-items-center justify-content-center" style="width:28px;height:28px;"><i class="bi bi-dash"></i></button></td>
                        <td align="center" valign="middle" class="fw-bold font-sm text-dark">${item.quantity}</td>
                        <td align="center" valign="middle"><button onclick="updateQuantity('${item.id}', 1)" class="btn btn-light rounded-circle shadow-none p-0 font-sm bg-light text-dark border d-flex align-items-center justify-content-center" style="width:28px;height:28px;"><i class="bi bi-plus"></i></button></td>
                    </tr>
                </table>
            </td>
            <td align="left" valign="middle" class="border-bottom py-4">
                <span class="fw-bold text-dark font-sm">$${itemSubtotal.toFixed(2)}</span>
            </td>
            <td align="right" valign="middle" class="border-bottom py-4 pe-4">
                <button onclick="removeFromCart('${item.id}')" class="btn btn-light rounded-circle shadow-none border bg-white d-flex align-items-center justify-content-center cursor-pointer" style="width: 28px; height: 28px;"><i class="bi bi-x fs-5 text-muted"></i></button>
            </td>
        </tr>`;
    });

    cartContainer.innerHTML = cartHTML;
    if(subtotalEl) subtotalEl.innerText = `$${total.toFixed(2)}`;
    if(totalEl) totalEl.innerText = `$${total.toFixed(2)}`;
}

function renderWishlistPage() {
    const wishlistContainer = document.getElementById('wishlist-container');
    if (!wishlistContainer) return;

    wishlist = JSON.parse(localStorage.getItem('ecobazar_wishlist')) || [];

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `<tr><td colspan="4" align="center" valign="middle" class="py-5 text-muted">Your wishlist is empty.</td></tr>`;
        return;
    }

    let wishlistHTML = '';

    wishlist.forEach(item => {
        const badgeClass = item.stockStatus === 'In Stock' ? 'bg-success-light text-success' : 'bg-danger-light text-danger';
        const btnStatus = item.stockStatus === 'In Stock' ? 
            `<button class="btn btn-success rounded-pill px-4 py-2 fw-bold" onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}')">Add To Cart</button>` : 
            `<button class="btn btn-light rounded-pill px-4 py-2 fw-bold text-muted disabled">Add To Cart</button>`;

        wishlistHTML += `
        <tr>
            <td align="left" valign="middle" class="border-bottom">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="100" align="center" valign="middle"><img src="${item.image}" width="80" alt="${item.name}"></td>
                        <td align="left" valign="middle" class="text-dark fw-medium ps-3">${item.name}</td>
                    </tr>
                </table>
            </td>
            <td align="left" valign="middle" class="border-bottom">
                <span class="fw-bold text-dark fs-5">$${item.price.toFixed(2)}</span>
            </td>
            <td align="left" valign="middle" class="border-bottom">
                <span class="badge ${badgeClass} fw-medium font-sm px-3 py-2">${item.stockStatus}</span>
            </td>
            <td align="right" valign="middle" class="border-bottom">
                <table border="0" cellpadding="0" cellspacing="0" align="right">
                    <tr>
                        <td align="right" valign="middle" class="pe-3">${btnStatus}</td>
                        <td align="right" valign="middle">
                            <button onclick="removeFromWishlist('${item.id}')" class="btn btn-light rounded-circle shadow-none border bg-white d-flex align-items-center justify-content-center" style="width: 35px; height: 35px;"><i class="bi bi-x fs-5 text-muted"></i></button>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>`;
    });

    wishlistContainer.innerHTML = wishlistHTML;
}

function renderCheckoutPage() {
    const checkoutList = document.getElementById('checkout-order-list');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');

    if (!checkoutList) return;
    
    cart = JSON.parse(localStorage.getItem('ecobazar_cart')) || [];

    if (cart.length === 0) {
        checkoutList.innerHTML = `<p class="text-muted text-center py-3 font-sm">Your cart is empty.</p>`;
        if (checkoutSubtotal) checkoutSubtotal.innerText = "$0.00";
        if (checkoutTotal) checkoutTotal.innerText = "$0.00";
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        total += itemSubtotal;

        html += `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="mb-3">
            <tr>
                <td width="60" align="left" valign="middle"><img src="${item.image}" width="50" alt="${item.name}"></td>
                <td align="left" valign="middle" class="ps-2">
                    <span class="text-dark font-sm d-block">${item.name} <span class="text-muted ms-1">x${item.quantity}</span></span>
                </td>
                <td align="right" valign="middle">
                    <span class="text-dark fw-bold font-sm">$${itemSubtotal.toFixed(2)}</span>
                </td>
            </tr>
        </table>`;
    });

    checkoutList.innerHTML = html;
    if (checkoutSubtotal) checkoutSubtotal.innerText = `$${total.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.innerText = `$${total.toFixed(2)}`;
}

// ==============================================
// PARANOID POPUP RENDERER 
// ==============================================
function renderPopupCart() {
    const popupList = document.getElementById('popup-cart-list');
    const popupCount = document.getElementById('popup-cart-count');
    const popupTotal = document.getElementById('popup-cart-total');
    
    if(!popupList) return;
    cart = JSON.parse(localStorage.getItem('ecobazar_cart')) || [];

    if (cart.length === 0) {
        popupList.innerHTML = `<div class="text-center text-muted py-5">Cart is empty</div>`;
        if(popupCount) popupCount.innerText = "0";
        if(popupTotal) popupTotal.innerText = "$0.00";
        return;
    }

    let html = '';
    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {
        total += (item.price * item.quantity);
        totalItems += item.quantity;
        
        html += `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="mb-4 border-bottom pb-3">
            <tr>
                <td width="80" align="left" valign="middle"><img src="${item.image}" width="70" alt="${item.name}"></td>
                <td align="left" valign="middle" class="ps-2">
                    <h6 class="font-sm fw-medium mb-1 text-dark">${item.name}</h6>
                    <p class="font-sm text-muted mb-0">${item.quantity} x <span class="fw-bold text-dark">$${item.price.toFixed(2)}</span></p>
                </td>
                <td width="30" align="right" valign="middle">
                    <button onclick="removeFromCart('${item.id}')" class="btn btn-light rounded-circle p-1 border shadow-none bg-white d-flex align-items-center justify-content-center" style="width:25px;height:25px;"><i class="bi bi-x text-muted font-sm"></i></button>
                </td>
            </tr>
        </table>`;
    });

    popupList.innerHTML = html;
    if(popupCount) popupCount.innerText = totalItems;
    if(popupTotal) popupTotal.innerText = `$${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateHeaderBadges();
    if (typeof renderCartPage === 'function') renderCartPage(); 
    if (typeof renderWishlistPage === 'function') renderWishlistPage();
    if (typeof renderCheckoutPage === 'function') renderCheckoutPage();
    if (typeof renderPopupCart === 'function') renderPopupCart(); 
});