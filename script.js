// Snacks, Sweets, and Accompainments scrolling effect
document.addEventListener("DOMContentLoaded", function() {
    const hero = document.querySelector(".hero-wrapper");

    if (!hero) {
        console.error("❌ .section-hero not found");
        return;
    }

    const images = [
        "./Accompainments/A-Guide-to-Savithrammas-Exotic-Pickles-and-Spices-1080x540.jpg",
        "./Sweets/Untitled-3-1080x540.jpg",
        "./Snacks/Warming-Up-Winter-Savithrammas-Guide-to-Cozy-Snacks-1080x540.jpg",
    ];

    let index = 0;

    // 🔹 PRELOAD FIRST IMAGE
    const firstImg = new Image();
    firstImg.src = images[0];


    firstImg.onload = function() {
        // ✅ APPLY FIRST IMAGE IMMEDIATELY
        hero.style.backgroundImage = `
      linear-gradient(
        rgba(28, 31, 38, 0.95),
        rgba(20, 18, 15, 0.65)
      ),
      url("${images[0]}")
    `;

        index = 1;

        // 🔁 START ROTATION AFTER FIRST IMAGE IS SHOWN
        setInterval(changeBackground, 6000);
    };

    function changeBackground() {
        hero.style.backgroundImage = `
      linear-gradient(
        rgba(28, 31, 38, 0.95),
        rgba(20, 18, 15, 0.65)
      ),
      url("${images[index]}")
    `;

        index = (index + 1) % images.length;
    }

});

//////////////////////////////////////////////////////////
// Make mobile natigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function() {
    headerEl.classList.toggle('nav-open');
});


//////////////////////////////////////////////////////////
// Smooth Scrolling Animation
const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = link.getAttribute('href');

        // Scroll back to top
        // if (href === '#') window.scrollTo({ top: 0, behavior: "smooth", });
        if (href === '#' || href === '#home') {
            document.body.classList.remove('sticky');

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

        // Scroll to other links
        if (href !== '#' && href.startsWith('#')) {
            const sectionEl = document.querySelector(href);
            sectionEl.scrollIntoView({ behavior: "smooth" });
        }

        // Close mobile navigation
        if (link.classList.contains('main-nav-link'))
            headerEl.classList.remove('nav-open');

        if (href === '#home') {
            document.body.classList.remove('sticky');
        }
    })
});

//////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(function(entries) {
    const ent = entries[0];
    console.log(ent);

    // Stop sticky behavior if cart is open
    if (cart.classList.contains("active")) return;

    if (ent.isIntersecting === false) {
        document.body.classList.add('sticky');
    }
}, {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-96px',
});
obs.observe(sectionHeroEl);

const obs2 = new IntersectionObserver(function(entries) {
    const ent = entries[0];
    console.log(ent);

    // Stop sticky behavior if cart is open
    if (cart.classList.contains("active")) return;

    if (ent.isIntersecting === true) {
        document.body.classList.remove('sticky');
    }
}, {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-41.5px',
});
obs2.observe(sectionHeroEl);


///////////////////////////////////////////////////////////////////
// let cart = [];

// function addToCart(name, price) {

//     let item = cart.find(p => p.name === name);

//     if (item) {
//         item.quantity += 1;
//     } else {
//         cart.push({
//             name: name,
//             price: price,
//             quantity: 1
//         });
//     }

//     console.log(cart);
// }

// ///////////////////////////////////////////////////////////////////
// document.querySelectorAll(".add-cart-btn").forEach(button => {

//     button.addEventListener("click", function() {

//         const product = this.dataset.product;
//         const price = this.dataset.price;

//         addToCart(product, price);

//     });

// });

// function addToCart(product, price) {
//     console.log(`Added ${product} - ₹${price} to cart`);
// }


///////////////////////////////////////////////////////////////////
// CART 
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

const header = document.querySelector(".header");
const mainNav = document.querySelector(".main-nav");
const mobileMenuIcon = document.querySelector(".icon-mobile-nav");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
    document.body.classList.remove('sticky');

    // CLOSE mobile navigation if open
    headerEl.classList.remove("nav-open");

    // hide header Options 
    mainNav.classList.add("hide-header");

    // hide header menu icon for mobile
    mobileMenuIcon.classList.add('hide-header');
});

cartClose.addEventListener("click", () => {
    cart.classList.remove("active");

    // Show header Options
    mainNav.classList.remove("hide-header");

    // ensure nav state is normal
    headerEl.classList.remove("nav-open");

    // add header menu icon for mobile
    mobileMenuIcon.classList.remove('hide-header');
});

const addCartButtons = document.querySelectorAll(".add-to-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const marqueeItem = event.target.closest(".marquee-item");
        addToCart(marqueeItem);
    });
});

const cartContent = document.querySelector(".cart-content");
const addToCart = marqueeItem => {
    const productImgSrc = marqueeItem.querySelector("img").src;
    const productTitle = marqueeItem.querySelector(".marquee-item-name").textContent;
    const productPrice = marqueeItem.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item is already in the cart.");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
                <img src="${productImgSrc}" class="cart-img">
                <div class="cart-detail">
                    <h2 class="cart-product-title">${productTitle}</h2>
                    <span class="cart-price">${productPrice}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart-remove"></i>
                `;

    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = '#b8bcc8';
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#e2e2e4";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();

    });

    updateCartCount(1);

    updateTotalPrice();
};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        // const price = priceElement.textContent.replace("₹", "");
        // const price = parseFloat(priceElement.textContent.replace(/[^\d.]/g, ""));
        const price = parseFloat(priceElement.textContent.match(/\d+/)[0]);
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `₹${total}`;
}

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCount.textContent = "";
    }
}

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelector(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Thank you for your purchase!")
});