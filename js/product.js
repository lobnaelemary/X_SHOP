// Product Functions
function showProducts() {
    const grid = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');

    if (!grid || !noProducts) return; 

    if (filteredProducts.length === 0) {
        grid.innerHTML = '';
        noProducts.classList.remove('hidden');
        return;
    } else {
        noProducts.classList.add('hidden');
        grid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }
}

function filterProducts() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    if (!searchInput || !categoryFilter) return; 

    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = category === '' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    showProducts();
}

function addToCart(productId) {
    if (!currentUser) {
        showToast('Please login to add items to cart', 'error');
        window.location.href = 'auth.html'; 
        return;
    }

    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(); 
    updateCartBadge();
    showToast(`${product.name} added to cart`);
}

//  products search fanctions
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) {
        searchInput.addEventListener('keyup', filterProducts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
});