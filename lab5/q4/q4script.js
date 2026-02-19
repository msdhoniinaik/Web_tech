let products = [];

// Load JSON using Fetch API
function loadProducts() {
    fetch("inventory.json")
        .then(res => res.json())
        .then(data => {
            products = data;
            displayProducts(products);
            calculateTotal();
            showMsg("Products loaded", "success");
        })
        .catch(() => {
            showMsg("JSON Load Error", "error");
        });
}

// Display Products
function displayProducts(list) {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    list.forEach(p => {
        let rowClass = p.stock < 5 ? "low-stock" : "";

        table.innerHTML += `
        <tr class="${rowClass}">
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>₹${p.price}</td>
            <td>${p.stock}</td>
            <td><button onclick="deleteProduct('${p.id}')">Delete</button></td>
        </tr>`;
    });
}

// Add Product
function addProduct() {
    const id = pid.value;
    const name = pname.value;
    const category = pcat.value;
    const price = parseFloat(pprice.value);
    const stock = parseInt(pstock.value);

    if (!id || !name || !category || isNaN(price) || isNaN(stock)) {
        showMsg("Invalid input data", "error");
        return;
    }

    products.push({ id, name, category, price, stock });
    displayProducts(products);
    calculateTotal();
    showMsg("Product added", "success");
}

// Update Product
function updateProduct() {
    const id = pid.value;
    const price = parseFloat(pprice.value);
    const stock = parseInt(pstock.value);

    const p = products.find(x => x.id === id);
    if (!p) {
        showMsg("Product not found", "error");
        return;
    }

    if (!isNaN(price)) p.price = price;
    if (!isNaN(stock)) p.stock = stock;

    displayProducts(products);
    calculateTotal();
    showMsg("Product updated", "success");
}

// Delete Product
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    displayProducts(products);
    calculateTotal();
    showMsg("Product deleted", "success");
}

// Search by Category
function searchProduct() {
    const cat = searchCat.value.toLowerCase();
    const result = products.filter(p => p.category.toLowerCase() === cat);
    displayProducts(result);
}

// Calculate Total Inventory Value
function calculateTotal() {
    let total = 0;
    products.forEach(p => {
        total += p.price * p.stock;
    });
    document.getElementById("totalValue").innerText = total;
}

// Message Function
function showMsg(text, type) {
    const msg = document.getElementById("msg");
    msg.className = type;
    msg.innerText = text;
}

// Load on Start
loadProducts();
