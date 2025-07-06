 // Produk data
        const products = [
            {
                name: "60 Genesis Crystals",
                price: 15000,
                img: "https://tse3.mm.bing.net/th/id/OIP.abytyobkO-kueUmq2YkSagHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
                name: "300 + 30 Genesis Crystals",
                price: 75000,
                img: "https://tse3.mm.bing.net/th/id/OIP.abytyobkO-kueUmq2YkSagHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
                name: "980 + 110 Genesis Crystals",
                price: 230000,
                img: "https://tse3.mm.bing.net/th/id/OIP.abytyobkO-kueUmq2YkSagHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
                name: "1980 + 260 Genesis Crystals",
                price: 460000,
                img: "https://tse3.mm.bing.net/th/id/OIP.abytyobkO-kueUmq2YkSagHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
                name: "3280 + 600 Genesis Crystals",
                price: 750000,
                img: "https://tse3.mm.bing.net/th/id/OIP.abytyobkO-kueUmq2YkSagHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
                name: "6480 + 1600 Genesis Crystals",
                price: 1500000,
                img: "https://tse3.mm.bing.net/th/id/OIP.abytyobkO-kueUmq2YkSagHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            },
            {
                name: "Blessing of the Welkin Moon",
                price: 79000,
                img: "https://www.bing.com/th/id/OIP.DD7Zw1E0pysDIXOJGODr3gHaHa?w=179&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
            },
            {
                name: "2x Welkin Moon",
                price: 158000,
                img: "https://www.bing.com/th/id/OIP.DD7Zw1E0pysDIXOJGODr3gHaHa?w=179&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
            },
            {
                name: "3x Welkin Moon",
                price: 237000,
                img: "https://www.bing.com/th/id/OIP.DD7Zw1E0pysDIXOJGODr3gHaHa?w=179&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
            },
            {
                name: "Combo 300 GC + Welkin",
                price: 150000,
                img: "https://www.bing.com/th/id/OIP.DD7Zw1E0pysDIXOJGODr3gHaHa?w=179&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
            },
            {
                name: "Combo 980 GC + Welkin",
                price: 300000,
                img: "https://www.bing.com/th/id/OIP.DD7Zw1E0pysDIXOJGODr3gHaHa?w=179&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
            },
            {
                name: "Combo 1980 GC + Welkin",
                price: 500000,
                img: "https://www.bing.com/th/id/OIP.DD7Zw1E0pysDIXOJGODr3gHaHa?w=179&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
            },
        ];

        // Format harga
        function formatRupiah(num) {
            return "Rp " + num.toLocaleString("id-ID");
        }

        // Render produk
        function renderProducts() {
            const grid = document.getElementById("productsGrid");
            grid.innerHTML = "";
            products.forEach((p, i) => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
                    <img src="${p.img}" alt="${p.name}">
                    <div class="product-name">${p.name}</div>
                    <div class="product-price">${formatRupiah(p.price)}</div>
                    <button class="add-cart-btn" data-index="${i}">Tambah ke Keranjang</button>
                `;
                grid.appendChild(card);
            });
        }

        // Cart logic
        let cart = [];
        function updateCartCount() {
            document.getElementById("cartCount").textContent = cart.reduce((a, b) => a + (b.qty || 1), 0);
        }
        function openCart() {
            document.getElementById("cartModal").classList.add("open");
            document.getElementById("cartOverlay").classList.add("open");
            renderCart();
        }
        function closeCart() {
            document.getElementById("cartModal").classList.remove("open");
            document.getElementById("cartOverlay").classList.remove("open");
        }
        function renderCart() {
            const cartItems = document.getElementById("cartItems");
            cartItems.innerHTML = "";
            let total = 0;
            if (cart.length === 0) {
                cartItems.innerHTML = '<div style="text-align:center;color:#aaa;">Keranjang kosong.</div>';
                document.getElementById("checkoutBtn").disabled = true;
            } else {
                cart.forEach((item, idx) => {
                    total += item.price * item.qty;
                    const el = document.createElement("div");
                    el.className = "cart-item";
                    el.innerHTML = `
                        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${formatRupiah(item.price)} × ${item.qty}</div>
                        </div>
                        <button class="cart-item-remove" data-index="${idx}" title="Hapus">&#128465;</button>
                    `;
                    cartItems.appendChild(el);
                });
                document.getElementById("checkoutBtn").disabled = false;
            }
            document.getElementById("cartTotal").textContent = "Total: " + formatRupiah(total);
        }
        function addToCart(idx) {
            const prod = products[idx];
            const exist = cart.findIndex(item => item.name === prod.name);
            if (exist > -1) {
                cart[exist].qty += 1;
            } else {
                cart.push({...prod, qty: 1});
            }
            updateCartCount();
            renderCart();
            // animasi cart icon
            const icon = document.getElementById("cartIcon");
            icon.style.transform = "scale(1.2)";
            setTimeout(() => icon.style.transform = "", 180);
        }
        function removeFromCart(idx) {
            cart.splice(idx, 1);
            updateCartCount();
            renderCart();
        }

        // Form logic
        let formValid = false;
        document.getElementById("playerDataForm").addEventListener("submit", function(e){
            e.preventDefault();
            const uid = document.getElementById("uid").value.trim();
            const server = document.getElementById("server").value;
            let error = "";
            if (!/^\d{6,9}$/.test(uid)) {
                error = "Masukkan UID 6-9 digit angka.";
            } else if (!server) {
                error = "Pilih server Genshin Impact.";
            }
            document.getElementById("formError").textContent = error;
            if (!error) {
                formValid = true;
                document.getElementById("playerForm").scrollIntoView({behavior:'smooth'});
                // Optional: highlight products
                document.getElementById("productsGrid").style.boxShadow = "0 0 24px #7fd6ff55";
                setTimeout(() => {
                    document.getElementById("productsGrid").style.boxShadow = "";
                }, 800);
            } else {
                formValid = false;
            }
        });

        // Produk hanya bisa dipilih jika form valid
        document.getElementById("productsGrid").addEventListener("click", function(e){
            if (e.target.classList.contains("add-cart-btn")) {
                if (!formValid) {
                    document.getElementById("formError").textContent = "Silakan isi data pemain terlebih dahulu.";
                    document.getElementById("playerForm").scrollIntoView({behavior:'smooth', block:'center'});
                    return;
                }
                addToCart(Number(e.target.dataset.index));
            }
        });

        // Cart event
        document.getElementById("cartIcon").onclick = openCart;
        document.getElementById("cartCloseBtn").onclick = closeCart;
        document.getElementById("cartOverlay").onclick = closeCart;
        document.getElementById("cartItems").addEventListener("click", function(e){
            if (e.target.classList.contains("cart-item-remove")) {
                removeFromCart(Number(e.target.dataset.index));
            }
        });

        // Disable checkout
        document.getElementById("checkoutBtn").onclick = function(){
            alert("Checkout hanya tampilan. Pembayaran belum diproses.");
            closeCart();
        };

        // Inisialisasi
        renderProducts();
        updateCartCount();
        renderCart();