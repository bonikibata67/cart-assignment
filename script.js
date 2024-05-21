console.log('begin script execution')

// toggle the cart sidebar
let cartIcon = document.querySelector('#cart-icon')	//grab the cart menu icon
let sidebar = document.querySelector('.cart-sidebar')	//grab the sidebar

console.log('got the variables')

cartIcon.onclick = function() {
	sidebar.classList.toggle('active');
	console.log('status changed to active')
}

// store the database
const productsURL = 'http://localhost:3000/products'
const usersURL = 'http://localhost:3000/users'
