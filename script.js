console.log('begin script execution')

let cartIcon = document.querySelector('#cart-icon')	//grab the cart menu icon
let sidebar = document.querySelector('.cart-sidebar')	//grab the sidebar

console.log('got the variables')

cartIcon.onclick = function() {
	sidebar.classList.toggle('active');
	console.log('status changed to active')
}
