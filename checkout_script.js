document.addEventListener('DOMContentLoaded', () => {
    const placeOrderBtn = document.getElementById('place-order-btn');
    const billingForm = document.getElementById('billing-form');

    placeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // 1. Check if the Cart is Empty
        const currentCart = JSON.parse(localStorage.getItem('ecobazar_cart')) || [];
        if (currentCart.length === 0) {
            alert("Your cart is currently empty! Please add products before placing an order.");
            return;
        }

        // 2. Validate Required Form Fields
        if (!billingForm.checkValidity()) {
            billingForm.reportValidity();
            return;
        }

        // 3. Show Success Modal & Start 8-Second Redirect Timer
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
});