// script.js
// This script handles the checkout, success, and orders pages functionality
// and manages product selection from the index page.
// Ensure the script runs after the DOM is fully loaded
// and that localStorage is used to store product details and orders.

// const e = require("express");

// humberger menu toggle functionality
 function toggleMenu() {
        const navLinks = document.getElementById("navLinks");
        navLinks.classList.toggle("active");
 }
 document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.querySelector(".search-btn");

    // Map keywords to pages you want to open
    const routes = {
      phone: "index.html",
      phones: "index.html",
      laptop: "laptops.html",
      laptops: "laptops.html",
      tablet: "index.html",
      tablets: "index.html",
      accessories: "index.html",
    };

    const handleSearch = () => {
      const term = searchInput.value.trim().toLowerCase();

      if (!term) {
        alert("Please enter a search term");
        return;
      }

      if (routes[term]) {
        window.location.href = routes[term];
      } else {
        alert(`No results found for “${term}”`);
      }
    };

    // Click on button
    searchBtn.addEventListener("click", handleSearch);

    // Press Enter inside input
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSearch();
    });
  });



document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname;
    
    // === CHECKOUT PAGE ===
    if (currentPage.includes("checkout.html")) {
        const product = JSON.parse(localStorage.getItem("checkoutProduct"));
        if (product) {
            document.getElementById("product-img").src = product.img;
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-price").textContent = product.price;
            document.getElementById("product-quantity").value = product.quantity;

            const quantityInput = document.getElementById("product-quantity");
            const totalPriceElem = document.getElementById("total-price");

            quantityInput.addEventListener("input", updateTotal);
            updateTotal();

            

            document.getElementById("pay-now-btn").addEventListener("click", function () {
                const quantity = parseInt(quantityInput.value);
                const totalPrice = parseFloat(product.price) * quantity;

                const order = {
                    productId: Math.floor(Math.random() * 1000000),
                    productName: product.name,
                    quantity: quantity,
                    date: new Date().toLocaleDateString(),
                    status: "Processing",
                    payment: "Paid",
                    totalPrice: totalPrice.toFixed(2)
                };

                const orders = JSON.parse(localStorage.getItem("orders")) || [];
                orders.push(order);
                localStorage.setItem("orders", JSON.stringify(orders));

                localStorage.removeItem("checkoutProduct");
                window.location.href = "success.html";
                backBtn.window.location.href = "index.html"
            });
            document.getElementById("back-button").addEventListener("click", function () {
                window.location.href = "index.html";
            });
            function updateTotal() {
                const qty = parseInt(quantityInput.value);
                totalPriceElem.textContent = (parseFloat(product.price) * qty).toFixed(2);
            }
        }
    }
    else if(currentPage.includes("spec.html")){
        const backBtn = document.getElementById('back-button');
        if(backBtn){
            backBtn.addEventListener('click', function(){
                window.location.href = "index.html";
            })
        }
    

    }

    // === SUCCESS PAGE ===
    else if (currentPage.includes("success.html")) {
        const container = document.getElementById("success-container");
        container.innerHTML = `
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase. Redirecting to homepage...</p>
        `;
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    }

    // === ORDERS PAGE ===
    else if (currentPage.includes("orders.html")) {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const tbody = document.getElementById("ordersBody");
        const noOrdersDiv = document.getElementById("noOrders");

        if (orders.length === 0) {
            noOrdersDiv.style.display = "block";
        } else {
            noOrdersDiv.style.display = "none";
            orders.forEach(order => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${order.productId}</td>
                    <td>${order.productName}</td>
                    <td>${order.quantity}</td>
                    <td>${order.date}</td>
                    <td>${order.status}</td>
                `;
                tbody.appendChild(row);
            });
        }
    }

    // === PRODUCT SELECTION FROM INDEX PAGE ===
    const orderButtons = document.querySelectorAll(".order-btn");
    orderButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productDiv = button.closest(".product1");
            const name = productDiv.querySelector("h3").innerText.trim();
            const price = productDiv.querySelector(".new-price").innerText.replace("Ghs", "").trim();
            const img = productDiv.querySelector("img").getAttribute("src");

            const product = {
                name: name,
                price: price,
                img: img,
                quantity: 1
            };

            localStorage.setItem("checkoutProduct", JSON.stringify(product));
            window.location.href = "checkout.html";
        });
    });

    
});

// accont

function toggleForm(){
    return window.location.href = "Register.html"
}

// specification view function

function viewSpec(name, imageSrc, price) {
    const product = {
        name: name,
        image: imageSrc,
        price: price
    };
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'spec.html';
}
window.addEventListener('DOMContentLoaded', () => {
    const productData = localStorage.getItem('selectedProduct');
    if (!productData) return;

    const product = JSON.parse(productData);

    // Fill in name, brand, model dynamically
    const dds = document.querySelectorAll('.specs dd');
    if (dds.length >= 3) {
        dds[0].textContent = product.name;  // Device Name
        dds[1].textContent = 'Samsung';     // Set brand dynamically if needed
        dds[2].textContent = product.name + ' Pro'; // Mock model name
    }
    else{
        dds[0].textContent = product.name;  // Device Name
        dds[1].textContent = 'Iphone';     // Set brand dynamically if needed
        dds[2].textContent = product.name + ' Pro'; // Mock model name
    }

    // Show image
    const img = document.getElementById('product-image');
    if (img) {
        img.src = product.image;
        img.style.display = 'flex';
    }

    localStorage.removeItem('selectedProduct');

});

// Admin Dashboard
document.addEventListener("DOMContentLoaded", function () {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const ordersBody = document.getElementById("orders-body");

    const filterSelect = document.createElement("select");
    filterSelect.innerHTML = `
        <option value="all">All Orders</option>
        <option value="processing">Only Processing</option>
    `;
    filterSelect.style.margin = "10px 0";
    ordersBody.parentElement.insertBefore(filterSelect, ordersBody);

    filterSelect.addEventListener("change", () => renderOrders());

    function renderOrders() {
        const filter = filterSelect.value;
        ordersBody.innerHTML = "";

        const filteredOrders = orders.filter(order => {
            return filter === "all" || order.status === "Processing";
        });

        filteredOrders.forEach((order, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${order.productId}</td>
                <td>${order.productName}</td>
                <td>${order.quantity}</td>
                <td>${order.date}</td>
                <td>
                    ${order.status === "Processing"
                        ? `<span style="color: orange;">${order.status}</span>`
                        : `<span style="color: green;">${order.status}<br><small>${order.completedAt || ''}</small></span>`}
                </td>
                <td>${order.totalPrice}</td>
            `;

            const actionCell = document.createElement("td");
            if (order.status === "Processing") {
                const completeBtn = document.createElement("button");
                completeBtn.textContent = "Mark as Completed";
                completeBtn.style.backgroundColor = "#28a745";
                completeBtn.style.color = "#fff";
                completeBtn.onclick = function () {
                    const confirmed = confirm(`Mark order #${order.productId} as Completed?`);
                    if (confirmed) {
                        orders[index].status = "Completed";
                        orders[index].completedAt = new Date().toLocaleString();
                        localStorage.setItem("orders", JSON.stringify(orders));
                        renderOrders();
                    }
                };
                actionCell.appendChild(completeBtn);
            } else {
                actionCell.textContent = "No Action";
            }

            row.appendChild(actionCell);
            ordersBody.appendChild(row);
        });
    }

    renderOrders();

    // ========== Product Section Below (Unchanged) ==========
    let products = JSON.parse(localStorage.getItem("products")) || [];
    const productsBody = document.getElementById("products-body");

    const productForm = document.getElementById("product-form");
    const nameInput = document.getElementById("product-name");
    const priceInput = document.getElementById("product-price");
    const imgInput = document.getElementById("product-img");

    const orderedProductNames = new Set(orders.map(order => order.productName.trim().toLowerCase()));

    // Remove products that have already been ordered
    let removedCount = 0;
    products = products.filter(product => {
        const wasOrdered = orderedProductNames.has(product.name.trim().toLowerCase());
        if (wasOrdered) removedCount++;
        return !wasOrdered;
    });

    if (removedCount > 0) {
        alert(`${removedCount} product(s) have been ordered already and removed from the product list.`);
    }

    localStorage.setItem("products", JSON.stringify(products));

    function renderProducts() {
        productsBody.innerHTML = "";
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><img src="${product.img}" alt="${product.name}"></td>
                <td>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </td>
            `;
            productsBody.appendChild(row);
        });
    }

    renderProducts();

    productForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const price = priceInput.value.trim();
        const img = imgInput.value.trim();

        const alreadyOrdered = orderedProductNames.has(name.toLowerCase());
        if (alreadyOrdered) {
            alert("This product has already been ordered. Please upload a different product.");
            return;
        }

        const index = products.findIndex(p => p.name.toLowerCase() === name.toLowerCase());
        const newProduct = { name, price, img };

        if (index !== -1) {
            products[index] = newProduct;
            alert("Product updated successfully.");
        } else {
            products.push(newProduct);
            alert("Product added successfully.");
        }

        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
        productForm.reset();
    });

    window.deleteProduct = function (index) {
        if (confirm("Are you sure you want to delete this product?")) {
            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));
            renderProducts();
        }
    };
});

// account

 const formTitle  = document.getElementById('formTitle');
    const authForm   = document.getElementById('authForm');
    const extra      = document.getElementById('extraFields');
    const submitBtn  = document.getElementById('submitBtn');
    const toggleLink = document.getElementById('toggleLink');

    /* ---------- state ---------- */
    let loginMode = true;     // true = login, false = register

    /* ---------- helpers ---------- */
    const getUsers  = () => JSON.parse(localStorage.getItem('users') || '[]');
    const saveUsers = users => localStorage.setItem('users', JSON.stringify(users));

    /* ---------- UI‑mode switch ---------- */
    function toggleForm() {
      loginMode = !loginMode;

      // Heading & button label
      formTitle.textContent   = loginMode ? 'Login'     : 'Register';
      submitBtn.textContent   = loginMode ? 'Login'     : 'Register';

      // Toggle email field (animate via max-height and opacity)
      if (loginMode) {
        extra.style.maxHeight = '0';
        extra.style.opacity   = '0';
      } else {
        extra.style.maxHeight = '200px';
        extra.style.opacity   = '1';
      }

      // Toggle link text
      toggleLink.textContent  = loginMode
        ? "Don't have an account? Register"
        : 'Already have an account? Login';
    }
    toggleLink.addEventListener('click', toggleForm);

    /* ---------- core actions ---------- */
    function register(username, password, email) {
      if (!username || !password || !email) {
        alert('Please fill in every field.'); return;
      }

      const users = getUsers();
      if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        alert('Username already exists!'); return;
      }

      users.push({ username, password, email });
      saveUsers(users);

      // auto‑login
      sessionStorage.setItem('currentUser', JSON.stringify({ username, email }));
      alert('Account created — you are now logged in.');
      // For demo, simply reload; replace with redirect if needed
      window.location.reload();
    }

    function login(username, password) {
      const user = getUsers().find(
          u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );
      if (!user) { alert('Invalid username or password.'); return; }

      sessionStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
      alert(`Welcome back, ${user.username}!`);
      window.location.reload();
    }

    /* ---------- form submit ---------- */
    authForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const email    = document.getElementById('email').value.trim(); // empty in login mode

      loginMode ? login(username, password) : register(username, password, email);
    });

    /* ---------- auto‑redirect if already logged in ---------- */
    (function checkSession(){
      const current = sessionStorage.getItem('currentUser');
      if(current){
        const user = JSON.parse(current);
        formTitle.textContent=`Hi, ${user.username}!`;
        authForm.style.display='none';
        toggleLink.style.display='none';
        const logoutBtn=document.createElement('button');
        logoutBtn.textContent='Logout';
        logoutBtn.style.marginTop='1rem';
        logoutBtn.onclick=()=>{
          sessionStorage.removeItem('currentUser');
          window.location.reload();
        };
        document.querySelector('.container').appendChild(logoutBtn);
      }
    })();