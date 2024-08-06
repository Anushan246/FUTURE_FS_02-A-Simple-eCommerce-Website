// checkout.js

document.getElementById('payment').addEventListener('change', function() {
    const paytmDetails = document.getElementById('paytm-details');
    if (this.value === 'paytm') {
        paytmDetails.style.display = 'block';
    } else {
        paytmDetails.style.display = 'none';
    }
});

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;
    const paytmNumber = paymentMethod === 'paytm' ? document.getElementById('paytm-number').value : 'N/A';

    // Simulate order submission
    alert(`Order placed successfully!\nName: ${name}\nAddress: ${address}\nPayment Method: ${paymentMethod}\nPaytm Number: ${paytmNumber}`);

    // Clear cart
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartTotal');

    // Redirect to home page
    window.location.href = 'index.html';
});
