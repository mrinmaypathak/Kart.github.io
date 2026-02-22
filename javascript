// 1. YOUR SUPABASE CONFIG (Get these from Project Settings > API)
const SUPABASE_URL = 'https://your-project-url.supabase.co';
const SUPABASE_KEY = 'your-anon-public-key';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const productGrid = document.getElementById('product-grid');

// 2. FETCH PRODUCTS FROM SUPABASE
async function getProducts() {
    // Note: You must create a table named 'products' in Supabase first!
    const { data: products, error } = await _supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching products:', error);
        productGrid.innerHTML = "<p>Error loading products. Check console.</p>";
        return;
    }

    renderProducts(products);
}

// 3. DISPLAY PRODUCTS ON PAGE
function renderProducts(products) {
    productGrid.innerHTML = ''; // Clear loading text
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <button class="add-btn" onclick="addToCart('${product.name}')">Add to Cart</button>
        `;
        productGrid.append(card);
    });
}

function addToCart(name) {
    alert(name + " added to Mkart basket!");
}

// Run the function when page loads
getProducts();
