let basket = JSON.parse(localStorage.getItem("data")) || [];
const productUrl = "http://localhost:3000/products"

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    let ShoppingCart = document.getElementById('shopping-cart');
    if (basket.length !== 0) {
        ShoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let { img, name, price } = search;
            return `
                <div class="cart-item">
                    <img width="100" src=${img} alt="" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$${price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                        <h3>$${item * search.price}</h3>
                    </div>
                </div>
            `;
        }).join("");
    } else {
        ShoppingCart.innerHTML = '';
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to home</button>
            </a>
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    generateCartItems();
    update(selectedItem.id);

    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();

    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);

        label.innerHTML = `
            <h2>Total Bill : $${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else {
        return;
    }
};

TotalAmount();

// Adding functionality to Add to Cart button
// const addToCartButtons = document.querySelectorAll('.add-cart');

// addToCartButtons.forEach(button => {
//     button.addEventListener('click', (e) => {
//         const productElement = e.target.closest('.card');
//         const productId = productElement.getAttribute('data-id');
//         increment(productId);
//     });
// });let label = document.getElementById('label');
// let ShoppingCart = document.getElementById('shopping-cart');
document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.card');
        const productId = productElement.getAttribute('data-id');
        addToCart(productId);
    });
});

let basket = JSON.parse(localStorage.getItem("data")) || [];

function addToCart(productId) {
    let product = products.find(p => p.id == productId);
    let cartItem = basket.find(item => item.id == productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        basket.push({ id: productId, quantity: 1, product: product });
    }

    localStorage.setItem("data", JSON.stringify(basket));
    updateCart();
    saveCartToServer();
}

function updateCart() {
    const cartItemsElement = document.querySelector('.cart-items');
    cartItemsElement.innerHTML = '';
    
    basket.forEach(item => {
        cartItemsElement.innerHTML += `
            <div class="items">
                <div class="cart-image">
                    <img src="${item.product.image}" alt="cart-image">
                </div>
                <div class="cart-name">
                    <label>${item.product.title}</label>
                </div>
                <div class="cart-price">
                    <label>Ksh. ${item.product.price}</label>
                </div>
                <div class="quantity">
                    <span class="cart-minus" onclick="changeQuantity('${item.id}', -1)"><i class='bx bx-message-square-minus bx-sm'></i></span>
                    <span>${item.quantity}</span>
                    <span class="cart-plus" onclick="changeQuantity('${item.id}', 1)"><i class='bx bx-message-square-add bx-sm'></i></span>
                </div>
            </div>
        `;
    });
}

function changeQuantity(productId, change) {
    let cartItem = basket.find(item => item.id == productId);
    
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            basket = basket.filter(item => item.id != productId);
        }
    }
    
    localStorage.setItem("data", JSON.stringify(basket));
    updateCart();
    saveCartToServer();
}

function saveCartToServer() {
    fetch(productUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(basket),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Initialize cart on page load
updateCart();








