// Order Functions
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }

    if (!currentUser) {
        showToast('Please login to checkout', 'error');
        window.location.href = 'auth.html'; 
        return;
    }

    // Create order
    const order = {
        id: Date.now(),
        date: new Date(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        user: currentUser.email,
        status: 'confirmed'
    };

    orders.push(order);
    saveOrders(); 

    // Clear cart after order
    cart = [];
    saveCart(); 
    updateCartBadge();
    window.location.href = 'thanks.html'; 
    showToast('Order placed successfully');
}

// Order Summary Function (for thanks.html)
function displayOrderSummary(order) {
    const orderSummary = document.getElementById('orderSummary');
    if (orderSummary && order) { 
        orderSummary.innerHTML = `
            <div class="order-details-summary">
                <h3>Order Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Order ID:</span>
                    <span class="detail-value">${order.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${new Date(order.date).toLocaleString()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value status-confirmed">${order.status}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Items:</span>
                    <span class="detail-value">${order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Amount:</span>
                    <span class="detail-value">$${order.total.toFixed(2)}</span>
                </div>
            </div>
            <div class="order-items">
                <h4>Order Items:</h4>
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
}