const searchBox = document.getElementById("searchBox");
const resultsDiv = document.getElementById("results");

let debounceTimer;

// Simulated product database (JSON)
const products = [
    { name: "Laptop", price: 60000, category: "Electronics" },
    { name: "Mobile Phone", price: 20000, category: "Electronics" },
    { name: "Headphones", price: 3000, category: "Accessories" },
    { name: "Shoes", price: 2500, category: "Fashion" },
    { name: "T-Shirt", price: 1200, category: "Fashion" },
    { name: "Watch", price: 5000, category: "Accessories" }
];

// Debounced search
searchBox.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        searchProducts(searchBox.value.trim());
    }, 500); // 0.5 sec delay
});

// Simulated AJAX fetch
function searchProducts(query) {
    resultsDiv.innerHTML = "<div class='loading'>Searching...</div>";

    // Simulate server delay
    setTimeout(() => {
        try {
            if (query === "") {
                resultsDiv.innerHTML = "";
                return;
            }

            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase())
            );

            displayResults(filtered);

        } catch (error) {
            resultsDiv.innerHTML = "<div class='error'>Server Error! Try again.</div>";
            console.error("Error:", error);
        }
    }, 700);
}

// Display results dynamically
function displayResults(data) {
    resultsDiv.innerHTML = "";

    if (data.length === 0) {
        resultsDiv.innerHTML = "<div class='no-result'>No results found</div>";
        return;
    }

    data.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <span><b>Name:</b> ${product.name}</span>
            <span><b>Price:</b> ₹${product.price}</span>
            <span><b>Category:</b> ${product.category}</span>
        `;
        resultsDiv.appendChild(div);
    });
}
