console.log('begin script execution')

const productsURL = 'http://localhost:3000/products'
const cartURL = 'http://localhost:3000/cart'


const cartIcon = document.querySelector('#cart-icon')	//grab the cart menu icon
const mainDiv = document.querySelector('.main-content')
const cartBtn = document.querySelector('#add-cart')  //add to cart
let productHtml = document.querySelector('.card')   //adding html
const cartItem = document.querySelector('.cart-items')


//ADDING THE CART FUNCTIONALITY
// handle the data
let products = []

function fetchData(){
    fetch(productsURL).then(response => response.json())
    .then( data => {
        products = data
        //console.log(products)   //to see if data is fetched

        addDataToHtml()
    })
}

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
                    <label> Ksh. ${product.price} </label>
                </div>
                <div>
                    <button id="add-cart" onclick="addCartItems()" class="add-cart"> Add to Cart </button>
                </div>
            </div>`
        })
    }
    mainDiv.innerHTML += html

}

fetchData()

// adding to cart
let cart_items = []

function fetchCartItems(){
    fetch(cartURL).then(response => response.json())
    .then(data => {
        cart_items = data
        console.log(cart_items)

        addCartItems()
    })
}


function addCartItems(){
    let html = ''

    if(cart_items.length > 0){
        cart_items.forEach(cart_item => {
            html += `
            <div class="items">
            <div class="cart-image">
                <img src="${cart_item.image}" alt="cart-image">
            </div>
            <div class="cart-name">
                <label> ${cart_item.title} </label>
            </div>
            <div class="cart-price">
                <label> Ksh.${cart_item.price} </label>
            </div>
            <div class="quantity">
                <span class="cart-minus" onclick="incrementVal"><i class='bx bx-message-square-add bx-xs'></i></span>
                <span> 0 </span>
                <span class="cart-minus" onclick="decrementVal"><i class='bx bx-message-square-minus bx-xs'></i></span>
            </div>
        </div>`
        })
    } else{
        html += `<div>
                    <label> There are no items in your cart</label>
                </div>`
    }
    // console.log(cartItem.innerHtml += html)
    cartItem.innerHTML += html
}


fetchCartItems()


