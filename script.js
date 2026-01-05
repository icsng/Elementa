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






document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
});


window.addEventListener('load', function() {
    adjustMainMargin();
});