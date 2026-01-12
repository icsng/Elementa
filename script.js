// cookie files
function setCookie(n,v,d=30){
    let e="";
    if(d){
        const t=new Date();
        t.setTime(t.getTime()+d*24*60*60*1000);
        e="; expires="+t.toUTCString();
    }
    document.cookie=n+"="+(v||"")+e+"; path=/; SameSite=Lax";
}

function getCookie(n){
    const r=n+"=";
    const a=document.cookie.split(';');
    for(let t=0;t<a.length;t++){
        let e=a[t];
        while(e.charAt(0)===' ')e=e.substring(1);
        if(e.indexOf(r)===0)return e.substring(r.length);
    }
    return null;
}

function deleteCookie(n){
    document.cookie=n+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function hasCookie(n){
    return getCookie(n)!==null;
}

function saveUserPreferences(){
    setCookie('user_currency','EUR',365);
    setCookie('user_language','en',365);
    setCookie('user_theme','light',365);
}

function backupCartToCookies(){
    try{
        const e=JSON.parse(localStorage.getItem('cart'))||[];
        const t=JSON.parse(localStorage.getItem('Quantities'))||{};
        if(e.length>0){
            const n=e.slice(0,10).map(t=>`${t.id}:${t.quantity}`).join(',');
            setCookie('cart_backup',n,7);
        }
        const n=JSON.parse(getCookie('viewed_products')||'[]');
        setCookie('viewed_products',JSON.stringify(n.slice(0,20)),30);
    }catch(e){}
}

function restoreCartFromCookies(){
    try{
        const e=getCookie('cart_backup');
        if(e&&(!localStorage.getItem('cart')||JSON.parse(localStorage.getItem('cart')).length===0)){
            const t=e.split(',').map(e=>{
                const[t,n]=e.split(':');
                const r=productCartData.find(e=>e.id===parseInt(t));
                if(r){
                    return{
                        id:r.id,
                        name:r.name,
                        price:r.price,
                        quantity:parseInt(n),
                        image:r.image
                    };
                }
                return null;
            }).filter(e=>e!==null);
            if(t.length>0){
                localStorage.setItem('cart',JSON.stringify(t));
            }
        }
    }catch(e){}
}

function trackUserSession(){
    let e=getCookie('user_session');
    if(!e){
        e='session_'+Date.now()+'_'+Math.random().toString(36).substr(2,9);
        setCookie('user_session',e,1);
    }
    const t=parseInt(getCookie('page_views')||'0')+1;
    setCookie('page_views',t.toString(),30);
    if(!getCookie('first_visit')){
        setCookie('first_visit',new Date().toISOString(),365);
        setCookie('returning_visitor','false',365);
    }else{
        setCookie('returning_visitor','true',365);
    }
    return e;
}

function initializeABTesting(){
    if(!getCookie('ab_test_group')){
        const e=['A','B','C'];
        const t=e[Math.floor(Math.random()*e.length)];
        setCookie('ab_test_group',t,30);
        applyABTestVariation(t);
    }else{
        const e=getCookie('ab_test_group');
        applyABTestVariation(e);
    }
}

function applyABTestVariation(e){
    switch(e){
        case 'B':
            setCookie('product_sort','popularity',30);
            break;
        case 'C':
            setCookie('product_sort','price_low_high',30);
            break;
    }
}

function trackShoppingBehavior(){
    const e=window.addToCart;
    window.addToCart=function(t){
        if(e)e.apply(this,arguments);
        const n=JSON.parse(getCookie('cart_actions')||'[]');
        n.push({
            productId:t,
            action:'add',
            timestamp:new Date().toISOString()
        });
        setCookie('cart_actions',JSON.stringify(n.slice(-50)),7);
    };
    document.addEventListener('DOMContentLoaded',function(){
        const e=document.querySelectorAll('.card');
        e.forEach(function(e){
            e.addEventListener('mouseenter',function(){
                let e=0;
                if(this.classList.contains('card-1'))e=1;
                else if(this.classList.contains('card-2'))e=2;
                else if(this.classList.contains('card-3'))e=3;
                else if(this.classList.contains('card-4'))e=4;
                else if(this.classList.contains('card-5'))e=5;
                else if(this.classList.contains('card-6'))e=6;
                else if(this.classList.contains('card-7'))e=7;
                else if(this.classList.contains('card-8'))e=8;
                else if(this.classList.contains('card-9'))e=9;
                else if(this.classList.contains('card-10'))e=10;
                else if(this.classList.contains('card-11'))e=11;
                else if(this.classList.contains('card-12'))e=12;
                if(e>0){
                    const t=JSON.parse(getCookie('product_views')||'[]');
                    if(!t.includes(e)){
                        t.push(e);
                        setCookie('product_views',JSON.stringify(t.slice(-20)),30);
                    }
                }
            });
        });
    });
}

function setAuthToken(e,t=false){
    if(t){
        setCookie('auth_token',e,30);
    }else{
        setCookie('auth_token',e,1);
    }
}

function getAuthToken(){
    return getCookie('auth_token');
}

function clearAuthToken(){
    deleteCookie('auth_token');
}

document.addEventListener('DOMContentLoaded',function(){
    restoreCartFromCookies();
    trackUserSession();
    initializeABTesting();
    trackShoppingBehavior();
    setInterval(backupCartToCookies,5*60*1000);
    window.addEventListener('beforeunload',backupCartToCookies);
});

function updateCartFunctionsWithCookies(){
    const e=window.displayCartItems;
    if(e){
        window.displayCartItems=function(){
            e.apply(this,arguments);
            backupCartToCookies();
        };
    }
}

function applyUserPreferences(){
    const e=getCookie('user_currency')||'EUR';
    const t=getCookie('user_theme')||'light';
    const n=getCookie('user_language')||'en';
    document.body.classList.add('user-theme-'+t);
}

// 3-d tranformation
document.addEventListener("DOMContentLoaded", function () {
    const productInfo = [
        { id: 1, name: "Medusa 3D night light", description: ["- USB cable", "- Gift packaging", "- Thorough quality control"], price: "10 €" },
        { id: 2, name: "Rabbit figure", description: ["- Material: polystone", "- Colour: red, white, brown", "- Size: 11*9*13 cm"], price: "5,66€" },
        { id: 3, name: "Doormat with Cats", description: ["- Size: 38 x 58 cm", "- Material: 89% rubber, 11% polyester"], price: "2,61€" },
        { id: 4, name: "Painting Mona Lisa", description: ["- Author: Leonardo da Vinci", "- Style: Renaissance", "- Colour: Yellow, brown"], price: "11,88€" },
        { id: 5, name: "Owl on a stake - Wooden sculpture", description: ["- Size: height 1200 mm", "- Production time: 2–4 weeks"], price: "113,12€" },
        { id: 6, name: "Painting Starry night", description: ["- Premium quality and handcrafted", "- Safe latex paints and eco-friendly materials"], price: "7,66€" },
        { id: 7, name: "Hanging decoration Heart", description: ["- Material: rattan", "- Color: white with glitter", "- Size: 17 cm"], price: "1,1€" },
        { id: 8, name: "Decorative figure Owl", description: ["- Size: 11 x 9 x 13 cm"], price: "7,07€" },
        { id: 9, name: "Wall decor Blue sea wave", description: ["- Size: 50x25 cm"], price: "12,93€" },
        { id: 10, name: "Crystal ball with 3D cat", description: ["- With wooden base", "- Size: 60mm diameter"], price: "6,06€" },
        { id: 11, name: "Owl figure", description: ["- Size: 17 cm"], price: "38,38€" },
        { id: 12, name: "Florarium Nature", description: ["- Retains its appearance for up to 5-7 years", "- Size: 10.5 cm * 9 cm"], price: "103,02€" }
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
        
        @media (max-width: 860px) {
            .flip-container.mobile-tapped {
                transform: rotateY(180deg);
            }
        }
    `;
    document.head.appendChild(style);

    function setupFlipCard(card, productId) {
        if (!card || card.querySelector('.flip-container')) return;
        
        const product = productInfo.find(p => p.id === productId);
        if (!product) return;
        
        const photo = card.querySelector(".photo");
        if (!photo) return;

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

        let isMobile = window.innerWidth <= 860;
        let isFlipped = false;

        if (isMobile) {
            card.addEventListener("click", function() {
                isFlipped = !isFlipped;
                flipContainer.classList.toggle('mobile-tapped', isFlipped);
            });
        } else {
            card.addEventListener("mouseenter", function () {
                flipContainer.style.transform = "rotateY(180deg)";
            });

            card.addEventListener("mouseleave", function () {
                flipContainer.style.transform = "rotateY(0deg)";
            });
        }

        window.addEventListener('resize', function() {
            isMobile = window.innerWidth <= 860;
            if (!isMobile) {
                flipContainer.classList.remove('mobile-tapped');
                flipContainer.style.transform = "rotateY(0deg)";
                isFlipped = false;
            }
        });
    }

    function initializeAllFlipCards() {
        for (let i = 1; i <= 12; i++) {
            const cards = document.querySelectorAll(`.card-${i}`);
            cards.forEach(card => {
                setupFlipCard(card, i);
            });
        }
    }

    initializeAllFlipCards();

    window.setupFlipCard = setupFlipCard;
});

// smart header
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
        adjustMainMargin();
        return;
    }

    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        header.classList.add('hide');
    } 
    else if (scrollTop < lastScrollTop) {
        header.classList.remove('hide');
    }

    lastScrollTop = scrollTop;
    adjustMainMargin();
}

function adjustMainMargin() {
    if (!mainContent) return;

    const isMobile = window.innerWidth <= 860;

    if (header.classList.contains('hide')) {
        mainContent.style.marginTop = '25px';
    } else {
        if (isMobile) {
            mainContent.style.marginTop = '195px';
        } else {
            mainContent.style.marginTop = '120px';
        }
    }
}

function initHeaderScroll() {
    window.addEventListener('scroll', throttle(handleHeaderScroll, 100));
    window.addEventListener('resize', adjustMainMargin);
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
    { id: 2, name: "Rabbit figure", price: 5.66, image: "product-2.jpg" },
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

function addToCart(productId){
    const t=productCartData.find(e=>e.id===productId);
    if(!t)return;
    const e=cart.find(e=>e.id===productId);
    if(e){
        e.quantity+=1;
    }else{
        cart.push({
            id:t.id,
            name:t.name,
            price:t.price,
            quantity:1,
            image:t.image
        });
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    setTimeout(backupCartToCookies,100);
    const n=JSON.parse(getCookie('cart_actions')||'[]');
    n.push({
        productId:productId,
        action:'add',
        timestamp:new Date().toISOString()
    });
    setCookie('cart_actions',JSON.stringify(n.slice(-50)),7);
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
            <div class='cart-item-all-thing">
                <img class="cart-item-img" src="${item.image}" alt="${item.name}" width="50" height="50">
                <p class="cart-item-name">${item.name}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus-btn" data-index="${index}">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn plus-btn" data-index="${index}">+</button>
                </div>
                <p class="cart-item-price">€${itemTotal.toFixed(2)}</p>
                <div class="cart-item-remove">
                    <button class="remove-btn" data-index="${index}">×</button>
                </div>
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

function removeFromCart(index){
    if(cart[index]){
        const e=cart[index];
        cart.splice(index,1);
        localStorage.setItem('cart',JSON.stringify(cart));
        setTimeout(backupCartToCookies,100);
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
                <img class="cart-it-img" src="${item.image}" alt="${item.name}">
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
        min-height: 80px;
        gap: 15px;
    }

    .cart-item-img {
        flex: 0 0 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cart-item-img img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        border: 2px solid #000000;
        object-fit: cover;
    }

    .cart-item-name {
        flex: 2;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        padding: 0 10px;
        word-break: break-word;
    }

    .cart-item-quantity {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        min-width: 120px;
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
        font-family: 'ABeeZee', sans-serif;
        color: #000000;
    }

    .quantity-btn:hover {
        background-color: #8A7755;
    }

    .quantity-display {
        min-width: 30px;
        text-align: center;
        font-weight: bold;
        font-size: 18px;
    }

    .cart-item-price {
        flex: 1;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        min-width: 80px;
    }

    .cart-item-remove {
        flex: 0 0 35px;
        display: flex;
        align-items: center;
        justify-content: center;
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
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'ABeeZee', sans-serif;
    }

    .remove-btn:hover {
        background-color: #cc0000;
    }

    .cart-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 20px;
        margin: 20px auto;
        background-color: #d3c5b2;
        border: 4px solid #000000;
        border-radius: 20px;
        font-family: 'ABeeZee', sans-serif;
        font-size: 18px;
        color: #000000;
        width: 80%;
        min-height: 60px;
        gap: 15px;
    }

    .header-pic {
        flex: 0 0 60px;
        text-align: center;
    }

    .header-item {
        flex: 2;
        text-align: left;
        padding: 0 10px;
        font-weight: bold;
    }

    .header-pcs {
        flex: 1;
        text-align: center;
        min-width: 120px;
        font-weight: bold;
    }

    .header-price {
        flex: 1;
        text-align: center;
        min-width: 80px;
        font-weight: bold;
    }

    .header-btn {
        flex: 0 0 35px;
        text-align: center;
    }
`;

document.head.appendChild(style);

// Clear the cart
function handleOrderSubmission() {
    const orderForm = document.querySelector('form.contact-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function() {
            cart = [];
            productQuantities = {};
            localStorage.removeItem('cart');
            localStorage.removeItem('productQuantities');
            
            console.log('Order submitted - cart cleared');
        });
    }
}

//SEARCH 
const searchProducts = productCartData.map(product => {
    const searchProps = {
        1: {
            description: "USB cable, Gift packaging, Thorough quality control",
            category: "lighting",
            tags: ["medusa", "night light", "3d", "lamp", "decorative lighting"]
        },
        2: {
            description: "Material: polystone, Colour: red, white, brown, Size: 11*9*13 cm",
            category: "figurines",
            tags: ["rabbit", "figure", "animal", "polystone", "decor"]
        },
        3: {
            description: "Size: 38 x 58 cm, Material: 89% rubber, 11% polyester",
            category: "home",
            tags: ["doormat", "cat", "cats", "mat", "entrance", "home decor"]
        },
        4: {
            description: "Author: Leonardo da Vinci, Genre: Religion, Style: Renaissance, Colour: Yellow, brown",
            category: "art",
            tags: ["mona lisa", "painting", "art", "renaissance", "leonardo da vinci"]
        },
        5: {
            description: "Size: height 1200 mm, Production time: 2–4 weeks",
            category: "sculptures",
            tags: ["owl", "wooden", "sculpture", "stake", "garden", "outdoor"]
        },
        6: {
            description: "Premium quality and handcrafted, Safe latex paints and eco-friendly materials",
            category: "art",
            tags: ["starry night", "painting", "art", "van gogh", "night", "stars"]
        },
        7: {
            description: "Material: rattan, Color: white with glitter, Size: 17 cm",
            category: "decorations",
            tags: ["heart", "hanging", "decoration", "rattan", "glitter", "wall decor"]
        },
        8: {
            description: "Size: 11 x 9 x 13 cm",
            category: "figurines",
            tags: ["owl", "figure", "decorative", "bird", "animal"]
        },
        9: {
            description: "Size: 50x25 cm",
            category: "wall decor",
            tags: ["blue sea", "wave", "wall decor", "sea", "ocean", "blue"]
        },
        10: {
            description: "With wooden base, Size: 60mm diameter",
            category: "figurines",
            tags: ["crystal ball", "cat", "3d", "ball", "magic", "decorative"]
        },
        11: {
            description: "Size: 17 cm",
            category: "figurines",
            tags: ["owl", "figure", "bird", "animal", "decorative"]
        },
        12: {
            description: "Retains its appearance for up to 5-7 years, Size: 10.5 cm * 9 cm",
            category: "plants",
            tags: ["florarium", "nature", "plants", "terrarium", "indoor plants"]
        }
    };
    
    return {
        ...product,
        description: searchProps[product.id]?.description || "",
        category: searchProps[product.id]?.category || "uncategorized",
        tags: searchProps[product.id]?.tags || []
    };
});

function performSearch(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        return [];
    }
    
    const term = searchTerm.toLowerCase().trim();
    const results = [];
    
    searchProducts.forEach(product => {
        let score = 0;
        
        if (product.name.toLowerCase().includes(term)) {
            score += 100;
        }
        
        if (product.description.toLowerCase().includes(term)) {
            score += 50;
        }
        
        product.tags.forEach(tag => {
            if (tag.toLowerCase().includes(term)) {
                score += 30;
            }
        });
        
        if (product.category.toLowerCase().includes(term)) {
            score += 20;
        }
        
        if (score > 0) {
            results.push({
                ...product,
                score: score
            });
        }
    });
    
    results.sort((a, b) => b.score - a.score);
    
    return results;
}

function displaySearchResults(results) {
    const resultsContainer = document.querySelector('.results-list');
    const noResultsDiv = document.querySelector('.no-results');
    const noMoreDiv = document.querySelector('.no-more');
    const backToShopDiv = document.querySelector('.back-to-shop');
    
    if (!resultsContainer || !noResultsDiv || !noMoreDiv || !backToShopDiv) {
        return;
    }
    
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        noResultsDiv.style.display = 'block';
        noMoreDiv.style.display = 'none';
        backToShopDiv.style.marginTop = '0';
        return;
    }
    
    noResultsDiv.style.display = 'none';
    noMoreDiv.style.display = 'block';
    backToShopDiv.style.marginTop = '0';
    
    results.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product pr-' + product.id;
        productElement.innerHTML = `
            <div class="card card-${product.id}">
                <img src="product-${product.id}.jpg" alt="${product.name}" class="photo">
            </div>
            <div class="btn-all">
                <button class="btn minus add clicked m-${product.id} clicked-${product.id}">-</button>
                <button class="cart-btn btn cart-${product.id}">
                    <img src="cart.png" class="cart-img">
                </button>
                <button class="btn plus add clicked clicked-${product.id} pl-${product.id}">+</button>
            </div>
        `;
        
        resultsContainer.appendChild(productElement);
        
        const card = productElement.querySelector(`.card-${product.id}`);
        if (card && window.setupFlipCard) {
            window.setupFlipCard(card, product.id);
        }
        
        const cartBtn = productElement.querySelector('.cart-btn');
        const plusBtn = productElement.querySelector('.plus');
        const minusBtn = productElement.querySelector('.minus');
        
        if (cartBtn) {
            cartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCartButtonClick(product.id);
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const currentQuantity = productQuantities[product.id] || 0;
                const newQuantity = currentQuantity + 1;
                productQuantities[product.id] = newQuantity;
                localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
                updateProductDisplay(product.id, newQuantity);
                updateCartQuantity(product.id, newQuantity);
            });
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const currentQuantity = productQuantities[product.id] || 0;
                if (currentQuantity <= 1) {
                    productQuantities[product.id] = 0;
                    localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
                    updateProductDisplay(product.id, 0);
                    removeProductFromCart(product.id);
                } else {
                    const newQuantity = currentQuantity - 1;
                    productQuantities[product.id] = newQuantity;
                    localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
                    updateProductDisplay(product.id, newQuantity);
                    updateCartQuantity(product.id, newQuantity);
                }
            });
        }
        
        const quantity = productQuantities[product.id] || 0;
        updateProductDisplay(product.id, quantity);
    });
}

function getSearchTermFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || '';
}

function initializeSearchResults() {
    if (!window.location.pathname.includes('search-result.html')) {
        return;
    }
    
    let searchTerm = getSearchTermFromURL();
    
    if (!searchTerm) {
        searchTerm = localStorage.getItem('lastSearch') || '';
        localStorage.removeItem('lastSearch');
    }
    
    if (!searchTerm) {
        const searchInput = document.querySelector('.search-input');
        if (searchInput && searchInput.value) {
            searchTerm = searchInput.value;
        }
    }
    
    const results = performSearch(searchTerm);
    
    displaySearchResults(results);
}

function handleSearchFormSubmission() {
    const searchForms = document.querySelectorAll('form.search');
    
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('.search-input');
            const searchTerm = searchInput ? searchInput.value.trim() : '';
            
            if (searchTerm) {
                localStorage.setItem('lastSearch', searchTerm);
                this.submit();
            } else {
                localStorage.setItem('lastSearch', '');
                this.submit();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    handleSearchFormSubmission();
    initializeSearchResults();
    
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        const storedSearch = localStorage.getItem('lastSearch');
        if (storedSearch) {
            searchInput.value = storedSearch;
        }
    }
});

const searchStyle = document.createElement('style');
searchStyle.textContent = `
    .search-result {
        margin: 20px;
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .search-results-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 60vh;
        padding: 20px;
    }
    
    .results-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 40px;
        width: 100%;
        margin: 0 auto;
    }
    
    .no-results {
        background-color: #D2BD96;
        border: 3px solid #000000;
        box-shadow: 0 2px 0 #000000;
        border-radius: 20px;
        padding: 20px;
        margin: 40px auto;
        font-family: 'ABeeZee', sans-serif;
        font-size: 18px;
        color: #000000;
        text-align: center;
        width: 80%;
        max-width: 500px;
    }
    
    .search-results-header {
        text-align: center;
        margin: 30px auto;
    }
    
    .no-more {
        text-align: center;
        margin: 30px auto;
    }
    
    .back-to-shop {
        text-align: center;
        margin: 30px auto 0 auto;
        display: block;
    }
    
    .back-btn {
        font-family: 'ABeeZee', sans-serif;
        color: #000;
        text-decoration: none;
        display: inline-block;
        padding: 10px 20px;
        transition: all 0.3s ease;
        text-align: center;
    }
    
    .search-results-container .product {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #d3c5b2;
        border-radius: 20px;
        padding: 25px;
        margin: 25px;
        border: 4px solid #000000;
        padding-bottom: 15px;
        box-shadow: 0 2px 0 #000000;
        width: 325px;
    }
    
    .search-results-container .product .card {
        width: 275px;
        height: 275px;
        margin-bottom: 10px;
        padding: 20px;
        background-color: #D2BD96;
        border: 4px solid #000000;
        box-shadow: 0 2px 0 #000000;
        border-radius: 20px;
    }
    
    .search-results-container .product .flip-front .photo {
        width: 225px;
        height: 225px;
        border: 4px solid #000000;
        border-radius: 20px;
    }
    
    .search-results-container .product .btn-all {
        margin: 10px;
        margin-top: 15px;
        margin-bottom: 10px;
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px 30px;
        margin: 15px auto;
        background-color: #EEE9E1;
        border: 3px solid #000000;
        border-radius: 20px;
        font-family: 'ABeeZee', sans-serif;
        width: 80%;
        min-height: 100px;
        gap: 25px;
    }
    
    .cart-item-img {
        flex: 0 0 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
    }
    
    .cart-item-img img {
        width: 80px;
        height: 80px;
        border-radius: 15px;
        border: 3px solid #000000;
        object-fit: cover;
        padding: 5px;
        background-color: white;
    }
    
    .cart-item-name {
        flex: 2;
        font-size: 17px;
        font-weight: bold;
        text-align: left;
        padding: 0 15px;
        word-break: break-word;
        line-height: 1.4;
    }
    
    .cart-item-quantity {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        min-width: 140px;
    }
    
    .quantity-btn {
        width: 35px;
        height: 35px;
        border: 3px solid #000000;
        border-radius: 50%;
        background-color: #9D8A66;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'ABeeZee', sans-serif;
        color: #000000;
        font-weight: bold;
    }
    
    .quantity-display {
        min-width: 40px;
        text-align: center;
        font-weight: bold;
        font-size: 22px;
    }
    
    .cart-item-price {
        flex: 1;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        min-width: 100px;
    }
    
    .cart-item-remove {
        flex: 0 0 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .remove-btn {
        width: 40px;
        height: 40px;
        border: 3px solid #000000;
        border-radius: 50%;
        background-color: #ff4444;
        color: white;
        font-size: 26px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'ABeeZee', sans-serif;
        font-weight: bold;
    }
    
    .cart-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 30px;
        margin: 25px auto;
        background-color: #d3c5b2;
        border: 4px solid #000000;
        border-radius: 20px;
        font-family: 'ABeeZee', sans-serif;
        font-size: 20px;
        color: #000000;
        width: 80%;
        min-height: 70px;
        gap: 25px;
        font-weight: bold;
    }
    
    .header-pic {
        flex: 0 0 80px;
        text-align: center;
        margin-right: 15px;
    }
    
    .header-item {
        flex: 2;
        text-align: left;
        padding: 0 15px;
        font-weight: bold;
    }
    
    .header-pcs {
        flex: 1;
        text-align: center;
        min-width: 140px;
        font-weight: bold;
    }
    
    .header-price {
        flex: 1;
        text-align: center;
        min-width: 100px;
        font-weight: bold;
    }
    
    .header-btn {
        flex: 0 0 40px;
        text-align: center;
    }
`;

document.head.appendChild(searchStyle);

document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    handleCountrySelection();
    handleOrderSubmission();
});

window.addEventListener('load', function() {
    adjustMainMargin();
});

window.addEventListener('resize', function() {
    adjustMainMargin();
});

updateCartFunctionsWithCookies();
applyUserPreferences();