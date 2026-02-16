

// Fetch all products
const loadAllProducts = () => {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(products => {
            allProducts = products;
            displayProducts(products);
            loadCategories(products);
        })
        .catch(err => console.error("Error loading products:", err));
};

// Display products
const displayProducts = (products) => {
    const container = document.getElementById("level-container");
    container.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
    container.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add(
            "bg-white",
            "rounded-xl",
            "shadow-lg",
            "overflow-hidden",
            "flex",
            "flex-col"
        );

        card.innerHTML = `
            <div class="w-full h-64 overflow-hidden">
                <img src="${product.image}" alt="${product.title}" class="w-full h-full object-contain">
            </div>

            <div class="p-4 flex flex-col gap-2">
                <div class="flex justify-between items-center text-sm">
                    <span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full uppercase font-medium">${product.category}</span>
                    <span class="flex items-center gap-1 text-yellow-500">
                        <i class="fas fa-star"></i> ${product.rating.rate} 
                        <span class="text-gray-400 text-xs">(${product.rating.count})</span>
                    </span>
                </div>

                <h2 class="font-semibold text-gray-800 text-lg truncate">${product.title}</h2>
                <p class="font-bold text-gray-900 text-xl">$${product.price}</p>

                <div class="flex gap-2 mt-3">
                    <button class="btn btn-outline btn-sm flex-1 shadow-sm flex items-center justify-center gap-1">
                        <i class="fas fa-eye"></i> Details
                    </button>

                    <button class="btn btn-primary btn-sm flex-1 flex items-center justify-center gap-1">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
};

// Generate category buttons dynamically
const loadCategories = (products) => {
    const categoryContainer = document.getElementById("category-buttons");
    categoryContainer.innerHTML = "";

    const categories = ["All", ...new Set(products.map(p => p.category))];

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "px-4 py-1 rounded-full border text-gray-700";
        btn.innerText = cat;

        // Default active for "All"
        if(cat === "All") btn.classList.add("bg-purple-600", "text-white", "border-purple-600");

        btn.addEventListener("click", () => {
            filterByCategory(cat);
            setActiveButton(btn);
        });

        categoryContainer.appendChild(btn);
    });
};

// Filter products by category
const filterByCategory = (category) => {
    if(category === "All") {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === category);
        displayProducts(filtered);
    }
};

// Highlight active category button
const setActiveButton = (activeBtn) => {
    const buttons = document.querySelectorAll("#category-buttons button");
    buttons.forEach(btn => {
        btn.classList.remove("bg-purple-600", "text-white", "border-purple-600");
        btn.classList.add("border", "text-gray-700");
    });

    activeBtn.classList.add("bg-purple-600", "text-white", "border-purple-600");
    activeBtn.classList.remove("border", "text-gray-700");
};

// Load products on page load
window.addEventListener("DOMContentLoaded", loadAllProducts);
