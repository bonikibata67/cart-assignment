console.log('hello world')

usersURL = 'http://localhost:3000/users'
postsRL = 'http://localhost:3000/posts'

// get the various variables
const email = document.querySelector('email')
const username = document.querySelector('username')
const password = document.querySelector('password')
const signUp = document.querySelector('signup')

signUp.addEventListener('click',addUser)

function addUser(){
    console.log('helloe')
}
