// document.addEventListener("DOMContentLoaded", function () {
//     // 1. PRODUCT SELECTION (index.html)
//     const orderButtons = document.querySelectorAll(".order-btn");

//     if (orderButtons.length > 0) {
//         orderButtons.forEach(button => {
//             button.addEventListener("click", () => {
//                 const productDiv = button.closest(".product1");

//                 const name = productDiv.querySelector("h3").innerText.trim();
//                 const price = productDiv.querySelector(".new-price").innerText.replace("Ghs", "").trim();
//                 const img = productDiv.querySelector("img").getAttribute("src");

//                 const product = {
//                     name,
//                     price: parseFloat(price),
//                     img,
//                     quantity: 1
//                 };

//                 localStorage.setItem("checkoutProduct", JSON.stringify(product));
//                 window.location.href = "checkout.html";
//             });
//         });
//     }

//     // 2. CHECKOUT PAGE LOGIC
//     const isCheckoutPage = document.getElementById("product-details");

//     if (isCheckoutPage) {
//         const product = JSON.parse(localStorage.getItem("checkoutProduct"));

//         if (!product) {
//             alert("No product selected. Redirecting to home.");
//             window.location.href = "index.html";
//             return;
//         }

//         const productImg = document.getElementById("product-img");
//         const productName = document.getElementById("product-name");
//         const productPrice = document.getElementById("product-price");
//         const productQuantity = document.getElementById("product-quantity");
//         const totalPriceElem = document.getElementById("total-price");

//         productImg.src = product.img;
//         productName.textContent = product.name;
//         productPrice.textContent = product.price;
//         productQuantity.value = product.quantity;

//         function updateTotal() {
//             const qty = parseInt(productQuantity.value) || 1;
//             totalPriceElem.textContent = (product.price * qty).toFixed(2);
//         }

//         productQuantity.addEventListener("input", updateTotal);
//         updateTotal();

//         document.getElementById("pay-button").addEventListener("click", function () {
//             const quantity = parseInt(productQuantity.value);
//             const total = product.price * quantity;

//             const order = {
//                 productId: Math.floor(Math.random() * 1000000),
//                 productName: product.name,
//                 quantity,
//                 status: "Processing",
//                 payment: "Paid",
//                 totalPrice: total.toFixed(2),
//                 date: new Date().toLocaleDateString()
//             };

//             const orders = JSON.parse(localStorage.getItem("orders")) || [];
//             orders.push(order);
//             localStorage.setItem("orders", JSON.stringify(orders));
//             localStorage.removeItem("checkoutProduct");

//             window.location.href = "orders.html";
//         });

//         document.getElementById("back-button").addEventListener("click", function () {
//             window.location.href = "index.html";
//         });
//     }

//     // 3. ORDER PAGE LOGIC
//     const ordersTableBody = document.getElementById("ordersBody");
//     const noOrdersMsg = document.getElementById("noOrders");

//     if (ordersTableBody) {
//         const orders = JSON.parse(localStorage.getItem("orders")) || [];

//         if (orders.length === 0) {
//             noOrdersMsg.style.display = "block";
//         } else {
//             noOrdersMsg.style.display = "none";

//             orders.forEach(order => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${order.productId}</td>
//                     <td>${order.productName}</td>
//                     <td>${order.quantity}</td>
//                     <td>${order.date}</td>
//                     <td>${order.status}</td>
//                 `;
//                 ordersTableBody.appendChild(row);
//             });
//         }
//     }
// });
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
            });

            function updateTotal() {
                const qty = parseInt(quantityInput.value);
                totalPriceElem.textContent = (parseFloat(product.price) * qty).toFixed(2);
            }
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

