console.log('begin script execution')

const productsURL = 'http://localhost:3000/products'


const cartCount = document.querySelector('#cart-count')	//grab the cart menu icon
const mainDiv = document.querySelector('.main-content')
const cartBtn = document.querySelector('#add-cart')  //add to cart
let productHtml = document.querySelector('.card')   //adding html
const cartItem = document.querySelector('.cart-items')
const totalPrice = document.getElementById('total-cart-price')
const searchBar = document.querySelector('.search-bar')


//ADDING THE CART FUNCTIONALITY
// handle the data
let products = []
let cart = []; 

function fetchData(){
    fetch(productsURL).then(response => response.json())
    .then( data => {
        products = data
        //console.log(products)   //to see if data is fetched

        addDataToHtml()
    })
}

fetchData()

function addDataToHtml(){
    let html = ''

    if (products.length > 0){
        products.forEach( product => {
            html +=`
            <div class="card">
                <div class="image">
                    <img src=${product.image} alt="Image">
                </div>
                    <p class="title"> ${product.title} </p>
                <div class="price">
                    <label> Ksh. ${product.price}/= </label>
                </div>
                <div>
                    <button id="add-cart" onclick="addCartItems('${product.id}')" class="add-cart"> Add to Cart </button>
                </div>
            </div>`
        })
    } 
    mainDiv.innerHTML += html

}




function fetchCartItems(){
    fetch(productsURL).then(response => response.json())
    .then(data => {
        products = data
        // console.log(products)
        addCartItems()
    })
}



// Update the cart UI
function updateCartUI() {
    let html = ''
    let total = 0

    cartCount.innerHTML = cart.length   //increment counter on cart

    if (cart.length == 0){
        totalPrice.innerHTML = `<label> Ksh.${total} </label>`
    } else if (cart.length > 0){
    cart.forEach(product => {
        html += `
        <div class="items">
        <div class="cart-image">
            <img src="${product.image}" alt="cart-image">
        </div>
        <div class="cart-name">
            <label> ${product.title} </label>
        </div>
        <div class="cart-price">
            <label> Ksh.${product.price} </label>
        </div>
        <div class="quantity">
            <span class="cart-minus" onclick="incrementVal"><i class='bx bx-message-square-minus bx-xs'></i></span>
            <span> 0 </span>
            <span class="cart-plus" onclick="decrementVal"><i class='bx bx-message-square-add bx-xs'></i></span>
        </div>
        <div>
            <i class='bx bx-trash'></i>
        </div>
        </div>`

    // increment the total value also
    total += product.price
    totalPrice.innerHTML = `<label> Ksh.${total} </label>`

    })
    } else {
        html += `<div>
                    <label> There are no items in your cart</label>
                </div>`
    }
    cartItem.innerHTML = html; // Clear the existing cart items
}


// Add product to cart
function addCartItems(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        cart.push(product); // Add product to cart array
        updateCartUI(); // Update UI to reflect the changes in the cart
    }
}


// Add event listener to the "Add to Cart" buttons
mainDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-cart')) {
        const productId = event.target.dataset.productId;
        addCartItems(productId);
    }
});


fetchCartItems()

// add the search bar functionality
searchBar.addEventListener('keyup', (e)=>{
    let searchVal = e.target.value.toLowerCase()

    const filteredItems = products.filter( (product) => {
        return (product.title.toLowerCase().includes(searchVal) ) //|| product.price.includes(searchVal))
    })
    // console.log(filteredItems)
    renderProducts(filteredItems) //->not working
})

function renderProducts(filteredItems) {
    let html = '';
    filteredItems.forEach((product) => {
        // let mainDiv = document.createElement('div');
        // mainDiv.classList.add('item');
        html += `
        <div class="card">
        <div class="image">
            <img src=${product.image} alt="Image">
        </div>
            <p class="title"> ${product.title} </p>
        <div class="price">
            <label> Ksh. ${product.price}/= </label>
        </div>
        <div>
            <button id="add-cart" onclick="addCartItems('${product.id}')" class="add-cart"> Add to Cart </button>
        </div>
    </div>`
    mainDiv.innerHTML = html;
    });
}