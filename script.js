console.log('begin script execution')

// toggle the cart sidebar
const cartIcon = document.querySelector('#cart-icon')	//grab the cart menu icon
const sidebar = document.querySelector('.cart-sidebar')	//grab the sidebar
const closeBtn = document.getElementById('cart-close')
const mainDiv = document.querySelector('.main-content')
// const cartBtn = document.querySelector('.add-cart')  //add to cart
let productHtml = document.querySelector('.card')   //adding html
// const signBtn= document.getElementById('signup')
// const loginBtn = document.getElementById('login')



console.log('got the variables')

closeBtn.addEventListener('click', closeSideBar)    
cartIcon.addEventListener('click', closeSideBar)
// signBtn.addEventListener('click', signup)
// loginBtn.addEventListener('click', login)


function closeSideBar(){
    sidebar.classList.toggle('active');
    console.log('status changed to active')    
}


// function signup(e){
//     e.preventDefault()
//     console.log('signup clicked')    
// }


// store the database
const productsURL = 'http://localhost:3000/products'
const usersUrl = "http://localhost:3000/users";


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
                    <button id="add-cart" onclick="addToCart()" class="add-cart"> Add to Cart </button>
                </div>
            </div>`
        })
    }
    mainDiv.innerHTML += html

}

fetchData()

// adding to cart

function addToCart(e){
    alert('do you want to add item to cart?')
    let product_id = e.target.parentElement.products.id
    console.log(product_id )
}
