// Cart Functions
function showCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');

    if (!cartItems || !emptyCart || !cartSummary) {
        return;
    }

    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCart.classList.remove('hidden');
        cartSummary.classList.add('hidden');
        return;
    }

    emptyCart.classList.add('hidden');
    cartSummary.classList.remove('hidden');

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    updateTotalPrice();
    saveCart();
}

// Cart Counter
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        saveCart(); 
        updateCartBadge();
        showCart(); 
    }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart(); 
    updateCartBadge();
    showCart();
    showToast('Item removed from cart');
}

// Function to update the total price in the cart summary
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = `${total.toFixed(2)}`; 
    }
}

// Function to clear the cart
function clearCart() {
    cart = [];
    saveCart(); 
    updateCartBadge();
    showCart();
    showToast('Cart cleared');
}

// Event listener to show the cart when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('cartItems')) {
        showCart();
    }
});