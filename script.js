// script.js

// Initialize cart items and total
let cartItems = [];
let cartTotal = 0.00;

// Handle size selection
document.querySelectorAll('.sizes ul li').forEach(li => {
    li.addEventListener('click', function() {
        const size = this.getAttribute('data-size');
        this.closest('.sizes').querySelectorAll('li').forEach(el => el.classList.remove('selected-size'));
        this.classList.add('selected-size');
    });
});

// Function to add items to cart
function addToCart(item) {
    const itemName = item.querySelector('h3').textContent;
    const itemPrice = parseFloat(item.querySelector('.price').textContent);
    const selectedSize = item.querySelector('.sizes .selected-size')?.textContent || 'Not Selected';
    
    cartItems.push({ name: itemName, price: itemPrice, size: selectedSize });
    cartTotal += itemPrice;

    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');

    cartItemsDiv.innerHTML = '';

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `<p>${item.name} - $${item.price.toFixed(2)} - Size: ${item.size}</p>`;
        cartItemsDiv.appendChild(itemDiv);
    });

    cartTotalSpan.textContent = `$${cartTotal.toFixed(2)}`;
    cartCountSpan.textContent = cartItems.length;
}

// Add event listeners for Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        addToCart(this.closest('.product-item'));
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Redirect to checkout page
document.getElementById('checkout').addEventListener('click', function() {
    if (cartItems.length > 0) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartTotal', cartTotal.toFixed(2));
        window.location.href = 'checkout.html';
    } else {
        alert('Your cart is empty!');
    }
});
