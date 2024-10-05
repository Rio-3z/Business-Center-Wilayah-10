document.addEventListener("DOMContentLoaded", function () {
    const cart = {};
    const cartItemsElement = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartButton = document.getElementById("cart-btn");
    const cartSection = document.getElementById("cart");
    const confirmOrderButton = document.getElementById("confirm-order");
    const menuLink = document.getElementById("menu-link");
    const profileLink = document.getElementById("profile-link");
    const menuSection = document.getElementById("menu-section");
    const profileSection = document.getElementById("profile-section");

    // Add product to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productElement = this.closest('.product');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseInt(productElement.getAttribute('data-price'));

            // Add product to cart or increase quantity
            if (cart[productName]) {
                cart[productName].quantity += 1; // Increase quantity
            } else {
                cart[productName] = { price: productPrice, quantity: 1 }; // Add new product
            }
            updateCart();
        });
    });

    // Show cart
    cartButton.addEventListener('click', function () {
        cartSection.classList.remove('hidden');
        cartSection.classList.add('visible');
        menuSection.style.display = 'none';
        if (profileSection) {
            profileSection.style.display = 'none';
        }
    });

    // Return to menu when menu is clicked
    menuLink.addEventListener('click', function () {
        cartSection.classList.add('hidden');
        cartSection.classList.remove('visible');
        menuSection.style.display = 'flex';
    });

    // Switch to profile when profile is clicked
    profileLink.addEventListener('click', function () {
        cartSection.classList.add('hidden');
        cartSection.classList.remove('visible');
        if (menuSection) {
            menuSection.style.display = 'none';
        }
        if (profileSection) {
            profileSection.style.display = 'flex';
        }
    });

    // Close cart
    document.getElementById('close-cart').addEventListener('click', function () {
        cartSection.classList.add('hidden');
        cartSection.classList.remove('visible');
        menuSection.style.display = 'flex';
    });

    // Update cart
    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        for (const [productName, item] of Object.entries(cart)) {
            const li = document.createElement('li');
            li.innerHTML = `${productName} - Rp ${item.price} x <span class="quantity">${item.quantity}</span>
                <button class="increase">+</button>
                <button class="decrease">-</button>`;
            cartItemsElement.appendChild(li);
            total += item.price * item.quantity;

            // Add event listeners for increase and decrease buttons
            li.querySelector('.increase').addEventListener('click', function () {
                item.quantity += 1;
                updateCart();
            });
            li.querySelector('.decrease').addEventListener('click', function () {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    updateCart();
                } else {
                    delete cart[productName]; // Remove item if quantity is 0
                    updateCart();
                }
            });
        }

        totalPriceElement.textContent = `Rp ${total}`;
    }

    // Confirm order
    confirmOrderButton.addEventListener('click', function () {
      document.getElementById('data').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
  

    // Validasi manual, mencegah submit jika salah satu input kosong
    if (name === "" || address === "") {
        alert("Semua bidang harus diisi!");
        event.preventDefault(); // Mencegah form untuk berpindah ke URL lain
    }
});
        const itemsList = Object.entries(cart)
            .map(([name, item]) => `${name} - Rp ${item.price} x ${item.quantity}`)
            .join(', ');
            const name = document.getElementById('name').value.trim();
            const address = document.getElementById('address').value.trim();
        const total = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
        const message = `Konfirmasi Pemesan Di Business Center Wilayah 10\n\nNama: ${name} \nPesanan: ${itemsList}\nAlamat: ${address} \nTotal: Rp ${total}\nBukti Pembayaran: `;

        const phoneNumber = "+6285819743320"; // Replace with the desired phone number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank'); // Open WhatsApp chat
    });
});

function fadeIn(element) {
    element.classList.add('fade', 'in');
}

function fadeOut(element) {
    element.classList.remove('in');
    setTimeout(() => {
        element.classList.remove('fade');
    }, 500); // Sesuaikan dengan durasi transisi
}

// Contoh penggunaan pada menu link
menuLink.addEventListener('click', function () {
    fadeOut(cartSection);
    // Lanjutkan dengan menampilkan menu
    fadeIn(menuSection);
});

document.getElementById("search-input").addEventListener("input", function () {
    const query = this.value.toLowerCase(); // Ambil nilai pencarian dan ubah menjadi huruf kecil
    const products = document.querySelectorAll(".product"); // Ambil semua elemen produk

    // Gulir ke atas setiap kali ada input baru
    window.scrollTo({ top: 0, behavior: 'smooth' });

    products.forEach(product => {
        const productName = product.getAttribute("data-name").toLowerCase(); // Ambil nama produk dan ubah menjadi huruf kecil
        // Tampilkan produk jika nama mengandung query pencarian
        if (productName.includes(query)) {
            product.style.display = "block"; // Tampilkan produk
        } else {
            product.style.display = "none"; // Sembunyikan produk
        }
    });
});

