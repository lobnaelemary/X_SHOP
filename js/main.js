// Global Variables
let products = [
    { id: 1, name: "Casual Shirt ", price: 800, category:"Men's clothing" , image: "../image/Men's clothing/clo1.jpg" },
    { id: 2, name: "Leather Strap Watch ", price: 650, category:"watches" , image: "../image/watches/mens-watches (2).jpg" },
    { id: 3, name: "Sunglasses", price: 425, category:"glasses" , image: "../image/glasses/eye-glasses (3).jpg" },
    { id: 4, name: "Handmade Leather shoes", price: 895, category: "shoes" , image: "../image/shoes/shoe-2.jpg" },
    { id: 5, name: "Gold Bracelet ", price: 225, category: "accessories" , image: "../image/gold/1.jpg" },
    { id: 6, name: "Sharwal Pants", price: 750, category: "women's clothing" , image: "../image/women/1.jpg" },
    { id: 7, name: "Coat ", price: 1299, category: "Men's clothing" , image: "../image/Men's clothing/clo2.jpg" },
    { id: 8, name: "Silk Dress", price: 999, category: "women's clothing" , image: "../image/women/2.jpg" },
    { id: 9, name: "Classic Leather Watch ", price: 580, category: "watches" , image: "../image/watches/mens-watches (4).jpg" },
    { id: 10, name: "coco chanel", price: 670, category: "perfume" , "image": "../image/perfume/coco.jpg" },
    { id: 11, name: "gold Sunglasses", price: 275, category: "glasses" , image: "../image/glasses/eye-glasses (4).jpg" },
    { id: 12, name: "Jacket ", price: 495, category: "Men's clothing" , image: "../image/Men's clothing/clo3.jpg" },
    { id: 13, name: "Classic shose", price: 699, category: "shoes" , image: "../image/shoes/shoe-1.jpg" },
    { id: 14, name: "Shirt ", price: 199, category: "Men's clothing" , image: "../image/Men's clothing/clo4.jpg" },
    { id: 15, name: "black opium", price: 1399, category: "perfume" , image: "../image/perfume/blackopium.jpg" },
    { id: 16, name: "Jewelry Set ", price: 300, category: "accessories" , image: "../image/gold/3.jpg" },
    { id: 17, name: "Luxury Leather Watch ", price: 599, category: "watches" , image: "../image/watches/mens-watches (3).jpg" },
    { id: 18, name: "miss dior", price: 799, category: "perfume" , "image": "../image/perfume/missdior.jpg" },
    { id: 19, name: "Jewelry Set ", price: 299, category: "accessories" , image: "../image/gold/2.jpg" },
    { id: 20, name: "gucci bloom", price: 670, category: "perfume" , "image": "../image/perfume/4.jpg" },
    { id: 21, name: "grace", price: 400, category: "perfume", "image": "../image/perfume/5.jpg" },    
    { id: 22, name: "Bracelet with Ring", price: 279, category: "accessories", image: "../image/gold/4.jpg" },
    { id: 23, name: "Boots", price: 399, category: "shoes", image: "../image/shoes/shoe-4.jpg" },
    { id: 24, name: "Boho Palazzo Trousers", price: 777, category: "women's clothing", image: "../image/women/3.jpg" },
    { id: 25, name: "Kicks", price: 399, category: "shoes", image: "../image/shoes/sports-5.jpg" },
    { id: 27, name: "Sneakers", price: 475, category: "shoes", image: "../image/shoes/sports-6.jpg" },
];

// Local Storage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Example  for  admin user  (uncomment to use)
// let users = JSON.parse(localStorage.getItem('users')) || [
//     { email: "admin@shop.com", password: "123", name: "Admin", isAdmin: true },
//     { email: "user@shop.com", password: "123", name: "User", isAdmin: false }
// ];

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let filteredProducts = [...products];

// Local Storage Functions
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function saveCurrentUser() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function saveOrders() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// UI Update Functions
function updateUI() {
    const authLink = document.getElementById('authLink');
    const userInfo = document.getElementById('userInfo');
    const userDisplay = document.getElementById('userDisplay');
    const logoutLink = document.getElementById('logoutLink');
    const adminPanel = document.getElementById('adminPanel');

    if (authLink && userInfo && userDisplay && logoutLink) {
        if (currentUser) {
            authLink.classList.add('hidden');
            userInfo.classList.remove('hidden');
            logoutLink.classList.remove('hidden');
            userDisplay.textContent = currentUser.name;

            if (currentUser.isAdmin && adminPanel) {
                adminPanel.classList.remove('hidden');
            } else if (adminPanel) {
                adminPanel.classList.add('hidden');
            }
        } else {
            authLink.classList.remove('hidden');
            userInfo.classList.add('hidden');
            logoutLink.classList.add('hidden');
            if (adminPanel) {
                adminPanel.classList.add('hidden');
            }
        }
    }

    updateCartBadge();
}

function updateCartBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) { 
        cartBadge.textContent = total;
    }
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (toast && toastMessage) { 
        toast.style.background = type === 'error' ? '#ff4757' : '#28a745';
        toastMessage.textContent = message;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Event Listeners To Update UI on page load
document.addEventListener('DOMContentLoaded', function() {
    updateUI(); 

    if (document.getElementById('productsGrid')) {
        showProducts();
        filterProducts(); 
    }
    if (document.getElementById('cartItems')) {
        showCart();
    }
    if (document.getElementById('thankyou')) {
        const latestOrder = orders[orders.length - 1]; 
        if (latestOrder) {
            displayOrderSummary(latestOrder);
            showThankYouMessage(latestOrder);
        }
    }
});

// Admin panel (if needed)
function displayAllOrders() {
    const allOrdersList = document.getElementById('allOrdersList');
    if (allOrdersList && currentUser && currentUser.isAdmin) {
        if (orders.length === 0) {
            allOrdersList.innerHTML = '<p>No orders yet.</p>';
            return;
        }

        allOrdersList.innerHTML = orders.map(order => `
            <div class="order-item-admin">
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>User:</strong> ${order.user}</p>
                <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
                <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                <p><strong>Status:</strong> <span class="status status-${order.status}">${order.status}</span></p>
                <p><strong>Items:</strong></p>
                <ul>
                    ${order.items.map(item => `<li>${item.name} x ${item.quantity} ($${(item.price * item.quantity).toFixed(2)})</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }
}
// Call displayAllOrders if on the order management page and user is admin
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('adminPanel')) {
        displayAllOrders();
    }
});