// 3-d tranformation

document.addEventListener("DOMContentLoaded", function () {
    const productData = [
        {
            selector: ".card-1",
            name: "Medusa 3D night light",
            description: [
                "- USB cable",
                "- Gift packaging",
                "- Thorough quality control"
            ],
            price: "10 €"
        },
        {
            selector: ".card-2",
            name: "Rabbit figure",
            description: [
                "- Material: polystone",
                "- Colour: red, white, brown",
                "- Size: 11*9*13 cm"
            ],
            price: "5,66€"
        },
        {
            selector: ".card-3",
            name: "Doormat with Cats",
            description: [
                "- Size: 38 x 58 cm",
                "- Material: 89% rubber, 11% polyester"
            ],
            price: "2,61€"
        },
        {
            selector: ".card-4",
            name: "Painting Mona Lisa",
            description: [
                "- Author: Leonardo da Vinci",
                "- Genre: Religion",
                "- Style: Renaissance",
                "- Colour: Yellow, brown"
            ],
            price: "11,88€"
        },
        {
            selector: ".card-5",
            name: "Owl on a stake - Wooden sculpture",
            description: [
                "- Size: height 1200 mm",
                "- Production time: 2–4 weeks"
            ],
            price: "113,12€"
        },
        {
            selector: ".card-6",
            name: "Painting Starry night",
            description: [
                "- Premium quality and handcrafted",
                "- Safe latex paints and eco-friendly materials"
            ],
            price: "7,66€"
        },
        {
            selector: ".card-7",
            name: "Hanging decoration Heart",
            description: [
                "- Material: rattan",
                "- Color: white with glitter",
                "- Size: 17 cm"
            ],
            price: "1,1€"
        },
        {
            selector: ".card-8",
            name: "Decorative figure Owl",
            description: [ 
                "- Size: 11 x 9 x 13 cm"
            ],
            price: "7,07€"
        },
        {
            selector: ".card-9",
            name: "Wall decor Blue sea wave",
            description: [
                "- Size: 50x25 cm"
            ],
            price: "12,93€"

        },
        {
            selector: ".card-10",
            name: "Crystal ball with 3D cat",
            description: [
                "- With wooden base",
                "- Size: 60mm diameter"
            ],
            price: "6,06€"
        },
        {
            selector: ".card-11",
            name: "Owl figure",
            description: [
                "- Size: 17 cm"
            ],
            price: "38,38€"
        },
        {
            selector: ".card-12",
            name: "Florarium Nature",
            description: [
                "- Retains its appearance for up to 5-7 years",
                "- Size: 10.5 cm * 9 cm"
            ],
            price: "103,02€"
        }
    ];

    const style = document.createElement("style");
    style.textContent = `
        .flip-container {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.8s ease;
            cursor: pointer;
        }
        .flip-front, .flip-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 15px;
            box-sizing: border-box;
        }
        .flip-front {
            background-color: transparent;
        }
        .flip-front img.photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;
            border: 4px solid #000000;
        }
        .flip-back {
            background-color: #D2BD96;
            transform: rotateY(180deg);
            border: 4px solid #000000;
            text-align: center;
            justify-content: space-around;
            overflow-y: auto;
        }
        .product-name {
            font-family: 'ABeeZee', sans-serif;
            font-size: 20px;
            font-weight: bold;
            color: #000;
            margin-bottom: 8px;
            text-align: center;
            line-height: 1.2;
        }
        .product-description {
            font-family: 'ABeeZee', sans-serif;
            font-size: 14px;
            color: #333;
            margin: 4px 0;
            text-align: left;
            width: 100%;
            padding-left: 10px;
            line-height: 1.3;
        }

        .product-price {
            font-family: 'ABeeZee', sans-serif;
            font-size: 22px;
            font-weight: bold;
            color: #000;
            margin-top: 8px;
            text-align: center;
        }
    `;
    document.head.appendChild(style);

    productData.forEach(product => {
        const card = document.querySelector(product.selector);
        if (!card) {
            console.warn(`Card not found: ${product.selector}`);
            return;
        }

        const photo = card.querySelector(".photo");
        if (!photo) {
            console.warn(`Photo not found in: ${product.selector}`);
            return;
        }

        const photoSrc = photo.src;
        const photoAlt = photo.alt;

        const flipContainer = document.createElement("div");
        flipContainer.className = "flip-container";

        const cardFront = document.createElement("div");
        cardFront.className = "flip-front";
        const frontImg = document.createElement("img");
        frontImg.src = photoSrc;
        frontImg.alt = photoAlt;
        frontImg.className = "photo";
        cardFront.appendChild(frontImg);

        const cardBack = document.createElement("div");
        cardBack.className = "flip-back";
        
        let backHTML = `<p class="product-name">${product.name}</p>`;
        
        if (product.size && product.size.trim() !== "") {
            backHTML += `<p class="product-size">${product.size}</p>`;
        }
        
        if (product.description && product.description.length > 0) {
            product.description.forEach(desc => {
                if (desc.trim() !== "") {
                    backHTML += `<p class="product-description">${desc}</p>`;
                }
            });
        }
        
        if (product.price && product.price.trim() !== "") {
            backHTML += `<p class="product-price">${product.price}</p>`;
        }
        
        cardBack.innerHTML = backHTML;

        card.innerHTML = "";
        flipContainer.appendChild(cardFront);
        flipContainer.appendChild(cardBack);
        card.appendChild(flipContainer);

        card.addEventListener("mouseenter", function () {
            flipContainer.style.transform = "rotateY(180deg)";
        });

        card.addEventListener("mouseleave", function () {
            flipContainer.style.transform = "rotateY(0deg)";
        });
    });
    
    console.log("Flip cards initialized for all 12 products");
});

// smart header part-1

let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 70;
const mainContent = document.querySelector('main');

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function handleHeaderScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop === 0) {
        header.classList.remove('hide');
        return;
    }

    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        header.classList.add('hide');
    } 
    else if (scrollTop < lastScrollTop) {
        header.classList.remove('hide');
    }
    
    lastScrollTop = scrollTop;
}

function adjustMainMargin() {
    if (!mainContent) return;
    
    if (header.classList.contains('hide')) {
        mainContent.style.marginTop = '20px';
        mainContent.style.marginTop = '120px';
    }
}

function initHeaderScroll() {
    window.addEventListener('scroll', throttle(handleHeaderScroll, 100));
    
    window.addEventListener('scroll', throttle(adjustMainMargin, 100));

    window.addEventListener('load', adjustMainMargin);
    
    document.addEventListener('DOMContentLoaded', adjustMainMargin);
}

// other country input
function handleCountrySelection() {
    const countrySelect = document.querySelector('select.inp');
    const form = document.querySelector('.contact-form');
    
    if (!countrySelect || !form) return;
    
    const otherCountryInput = document.createElement('div');
    otherCountryInput.className = 'other-country-container';
    otherCountryInput.style.display = 'none';
    otherCountryInput.innerHTML = `
        <label for="other-country">Specify Country</label>
        <input type="text" class="inp" id="other-country" 
               placeholder="Enter your country name" 
               style="margin-top: 5px;">
    `;
    
    const countrySelectContainer = countrySelect.closest('div');
    if (countrySelectContainer) {
        countrySelectContainer.appendChild(otherCountryInput);
    }

    countrySelect.addEventListener('change', function() {
        if (this.value === 'other') {
            otherCountryInput.style.display = 'block';
            const otherInput = otherCountryInput.querySelector('#other-country');
            if (otherInput) otherInput.required = true;
        } else {
            otherCountryInput.style.display = 'none';
            const otherInput = otherCountryInput.querySelector('#other-country');
            if (otherInput) otherInput.required = false;
        }
    });
    
    if (form) {
        form.addEventListener('submit', function(e) {
            if (countrySelect.value === 'other') {
                const otherCountryValue = document.getElementById('other-country').value;
                if (!otherCountryValue || otherCountryValue.trim() === '') {
                    e.preventDefault();
                    alert('Please specify your country name');
                    document.getElementById('other-country').focus();
                }
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    handleCountrySelection();
});

// CART
const productCartData = [
    { id: 1, name: "Medusa 3D night light", price: 10.00, image: "product-1.jpg" },
    { id: 2, name: "Rabbit figure", price: 5.66, image: "prooduct-2.jpg" },
    { id: 3, name: "Doormat with Cats", price: 2.61, image: "product-3.jpg" },
    { id: 4, name: "Painting Mona Lisa", price: 11.88, image: "product-4.jpg" },
    { id: 5, name: "Owl on a stake - Wooden sculpture", price: 113.12, image: "product-5.jpg" },
    { id: 6, name: "Painting Starry night", price: 7.66, image: "product-6.jpg" },
    { id: 7, name: "Hanging decoration Heart", price: 1.10, image: "product-7.jpg" },
    { id: 8, name: "Decorative figure Owl", price: 7.07, image: "product-8.jpg" },
    { id: 9, name: "Wall decor Blue sea wave", price: 12.93, image: "product-9.jpg" },
    { id: 10, name: "Crystal ball with 3D cat", price: 6.06, image: "product-10.jpg" },
    { id: 11, name: "Owl figure", price: 38.38, image: "product-11.jpg" },
    { id: 12, name: "Florarium Nature", price: 103.02, image: "product-12.jpg" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initializeCartButtons() {
    const cartButtons = document.querySelectorAll('.cart-btn');
    
    cartButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(index + 1);
        });
    });
}

function addToCart(productId) {
    const product = productCartData.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    showCartNotification(product.name);
    
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
}

function showCartNotification(productName) {
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <span>✓ Added "${productName}" to cart!</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-family: 'ABeeZee', sans-serif;
        font-size: 16px;
        z-index: 10000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2s forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 2300);
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartDiv = document.querySelector('.empty-cart');
    const cartHeader = document.querySelector('.cart-header');
    const cartSummary = document.querySelector('.cart-summary');
    const cartActions = document.querySelector('.cart-actions');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        if (emptyCartDiv) emptyCartDiv.style.display = 'block';
        if (cartHeader) cartHeader.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'none';
        if (cartActions) cartActions.style.display = 'none';
        return;
    }
    
    if (emptyCartDiv) emptyCartDiv.style.display = 'none';
    if (cartHeader) cartHeader.style.display = 'flex';
    if (cartSummary) cartSummary.style.display = 'block';
    if (cartActions) cartActions.style.display = 'block';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}" width="50" height="50">
            </div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus-btn" data-index="${index}">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn plus-btn" data-index="${index}">+</button>
            </div>
            <div class="cart-item-price">€${itemTotal.toFixed(2)}</div>
            <div class="cart-item-remove">
                <button class="remove-btn" data-index="${index}">×</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    const summaryValue = document.querySelector('.summary-value');
    if (summaryValue) {
        summaryValue.textContent = `€${total.toFixed(2)}`;
    }
    
    addCartItemListeners();
}

function addCartItemListeners() {
    document.querySelectorAll('.minus-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            updateQuantity(index, -1);
        });
    });
    
    document.querySelectorAll('.plus-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            updateQuantity(index, 1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            removeFromCart(index);
        });
    });
}

function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

function removeFromCart(index) {
    if (cart[index]) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        showRemovalNotification(removedItem.name);
        
        displayCartItems();
    }
}

function showRemovalNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <span>Removed "${productName}" from cart</span>`;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #ff4444;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-family: 'ABeeZee', sans-serif;
        font-size: 16px;
        z-index: 10000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2s forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 2300);
}

let productQuantities = JSON.parse(localStorage.getItem('productQuantities')) || {};

function initializeCartButtons() {
    const cartButtons = document.querySelectorAll('.cart-btn');
    
    cartButtons.forEach((button, index) => {
        const productId = index + 1;
        
        const currentQuantity = productQuantities[productId] || 0;
        
        updateProductDisplay(productId, currentQuantity);
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            handleCartButtonClick(productId);
        });
    });
    
    initializeQuantityButtons();
}

function handleCartButtonClick(productId) {
    const productElement = document.querySelector(`.pr-${productId}`);
    const cartButton = productElement.querySelector('.cart-btn');
    
    if (productQuantities[productId] && productQuantities[productId] > 0) {

    } else {
        productQuantities[productId] = 1;
        localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
        
        updateProductDisplay(productId, 1);
        
        addToCart(productId);
    }
}

function updateProductDisplay(productId, quantity) {
    const productElement = document.querySelector(`.pr-${productId}`);
    if (!productElement) return;
    
    const cartButton = productElement.querySelector('.cart-btn');
    const minusBtn = productElement.querySelector('.minus');
    const plusBtn = productElement.querySelector('.plus');
    
    if (quantity > 0) {
        if (minusBtn) minusBtn.style.display = 'flex';
        if (plusBtn) plusBtn.style.display = 'flex';
        
        updateCartButtonDisplay(cartButton, quantity);
        
        productElement.classList.add('has-items');
    } else {
        if (minusBtn) minusBtn.style.display = 'none';
        if (plusBtn) plusBtn.style.display = 'none';
        
        updateCartButtonDisplay(cartButton, 0);
        
        productElement.classList.remove('has-items');
    }
}

function updateCartButtonDisplay(button, quantity) {
    if (quantity > 0) {
        button.innerHTML = `<span class="quantity-number">${quantity}</span>`;
        button.classList.add('has-quantity');
        
        button.style.cssText = `
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #9D8A66;
            border: 4px solid #000;
            border-radius: 50%;
            font-family: 'Rammetto One', sans-serif;
            font-size: 24px;
            color: #000000;
            cursor: pointer;
            padding: 0;
        `;
    } else {
        button.innerHTML = `<img src="cart.png" class="cart-img">`;
        button.classList.remove('has-quantity');
        
        button.style.cssText = `
            width: 95px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #9D8A66;
            border: 4px solid #000;
            border-radius: 50px;
            cursor: pointer;
            padding: 0 ;
        `;
        
        const cartImg = button.querySelector('.cart-img');
        if (cartImg) {
            cartImg.style.width = '35px';
            cartImg.style.height = '35px';
        }
    }
}

function initializeQuantityButtons() {
    document.querySelectorAll('.plus').forEach((button, index) => {
        const productId = index + 1;
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const currentQuantity = productQuantities[productId] || 0;
            const newQuantity = currentQuantity + 1;
            
            productQuantities[productId] = newQuantity;
            localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
            
            updateProductDisplay(productId, newQuantity);
            
            updateCartQuantity(productId, newQuantity);
        });
    });
    
    document.querySelectorAll('.minus').forEach((button, index) => {
        const productId = index + 1;
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const currentQuantity = productQuantities[productId] || 0;
            
            if (currentQuantity <= 1) {
                productQuantities[productId] = 0;
                localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
                
                updateProductDisplay(productId, 0);
                
                removeProductFromCart(productId);
            } else {
                const newQuantity = currentQuantity - 1;
                productQuantities[productId] = newQuantity;
                localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
                
                updateProductDisplay(productId, newQuantity);
                
                updateCartQuantity(productId, newQuantity);
            }
        });
    });
}

function updateCartQuantity(productId, quantity) {
    const product = productCartData.find(p => p.id === productId);
    if (!product) return;
    
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (quantity > 0) {
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity = quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image
            });
        }
    } else {
        if (existingItemIndex !== -1) {
            cart.splice(existingItemIndex, 1);
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
}

function removeProductFromCart(productId) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        const removedItem = cart[existingItemIndex];
        cart.splice(existingItemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        showRemovalNotification(removedItem.name);
        
        if (window.location.pathname.includes('cart.html')) {
            displayCartItems();
        }
    }
}

function addToCart(productId) {
    const product = productCartData.find(p => p.id === productId);
    if (!product) return;
    
    const quantity = productQuantities[productId] || 1;
    
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    showCartNotification(product.name);
    
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartDiv = document.querySelector('.empty-cart');
    const cartHeader = document.querySelector('.cart-header');
    const cartSummary = document.querySelector('.cart-summary');
    const cartActions = document.querySelector('.cart-actions');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        if (emptyCartDiv) emptyCartDiv.style.display = 'block';
        if (cartHeader) cartHeader.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'none';
        if (cartActions) cartActions.style.display = 'none';
        return;
    }
    
    if (emptyCartDiv) emptyCartDiv.style.display = 'none';
    if (cartHeader) cartHeader.style.display = 'flex';
    if (cartSummary) cartSummary.style.display = 'block';
    if (cartActions) cartActions.style.display = 'block';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        productQuantities[item.id] = item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}" width="60" height="60">
            </div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus-btn" data-index="${index}" data-id="${item.id}">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn plus-btn" data-index="${index}" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-price">€${itemTotal.toFixed(2)}</div>
            <div class="cart-item-remove">
                <button class="remove-btn" data-index="${index}" data-id="${item.id}">×</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
    
    const summaryValue = document.querySelector('.summary-value');
    if (summaryValue) {
        summaryValue.textContent = `€${total.toFixed(2)}`;
    }
    
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        updateAllProductDisplays();
    }
    
    addCartItemListeners();
}

function updateAllProductDisplays() {
    const cartButtons = document.querySelectorAll('.cart-btn');
    
    cartButtons.forEach((button, index) => {
        const productId = index + 1;
        const quantity = productQuantities[productId] || 0;
        updateProductDisplay(productId, quantity);
    });
}

function addCartItemListeners() {
    document.querySelectorAll('.minus-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const productId = parseInt(this.dataset.id);
            
            if (cart[index]) {
                const newQuantity = cart[index].quantity - 1;
                
                if (newQuantity <= 0) {
                    const removedItem = cart[index];
                    cart.splice(index, 1);
                    
                    productQuantities[productId] = 0;
                    localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
                    
                    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                        updateProductDisplay(productId, 0);
                    }
                    
                    showRemovalNotification(removedItem.name);
                } else {
                    cart[index].quantity = newQuantity;
                    productQuantities[productId] = newQuantity;
                    localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
                    
                    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                        updateProductDisplay(productId, newQuantity);
                    }
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            }
        });
    });
    
    document.querySelectorAll('.plus-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const productId = parseInt(this.dataset.id);
            
            if (cart[index]) {
                const newQuantity = cart[index].quantity + 1;
                cart[index].quantity = newQuantity;
                productQuantities[productId] = newQuantity;
                
                localStorage.setItem('cart', JSON.stringify(cart));
                localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
                
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    updateProductDisplay(productId, newQuantity);
                }
                
                displayCartItems();
            }
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const productId = parseInt(this.dataset.id);
            
            if (cart[index]) {
                const removedItem = cart[index];
                cart.splice(index, 1);
                
                productQuantities[productId] = 0;
                localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
                
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    updateProductDisplay(productId, 0);
                }
                
                showRemovalNotification(removedItem.name);
                
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.cart-btn')) {
        document.querySelectorAll('.minus, .plus').forEach(button => {
            button.style.display = 'none';
        });
        
        initializeCartButtons();
        
        updateAllProductDisplays();
    }
    
    if (document.getElementById('cart-items')) {
        displayCartItems();
        initializeBuyButton();
    }
});

const style = document.createElement('style');

style.textContent =`
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; transform: translateX(100%); }
    }

    .cart-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 20px;
        margin: 10px auto;
        background-color: #EEE9E1;
        border: 3px solid #000000;
        border-radius: 15px;
        font-family: 'ABeeZee', sans-serif;
        width: 80%;
    }

    .cart-item-img img {
        border-radius: 10px;
        border: 2px solid #000000;
    }

    .cart-item-name {
        flex: 2;
        padding: 0 15px;
        font-size: 16px;
    }

    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .quantity-btn {
        width: 30px;
        height: 30px;
        border: 2px solid #000000;
        border-radius: 50%;
        background-color: #9D8A66;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .quantity-display {
        min-width: 30px;
        text-align: center;
        font-weight: bold;
    }

    .cart-item-price {
        font-weight: bold;
        min-width: 80px;
        text-align: right;
        font-size: 18px;
    }

    .remove-btn {
        width: 35px;
        height: 35px;
        border: 2px solid #000000;
        border-radius: 50%;
        background-color: #ff4444;
        color: white;
        font-size: 24px;
        cursor: pointer;
        margin-left: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
});


window.addEventListener('load', function() {
    adjustMainMargin();
});