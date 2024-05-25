console.log('hello world')
// get the various DOM elements
const form = document.querySelector('form')
const email = document.getElementById('email')
const password = document.getElementById('password')

// add an event listener to the form
form.addEventListener('submit',e =>{
    e.preventDefault()
    validateInputs()
})

// define error function
function setError(element, message){
    const inputControll = element.parentElement
    const displayError = inputControll.querySelector('.error')

    displayError.innerText = message
    inputControll.classList.add('error')
    inputControll.classList.remove('success')
}

// define the succes function
function setSuccess(element){
    const inputControll = element.parentElement
    const displayError = inputControll.querySelector('.error')

    displayError.innerText = ''
    inputControll.classList.add('success')
    inputControll.classList.remove('error')
}


// email validation regex
function isValidEmail(email){
    const userEmail = String(email).toLowerCase()
    // find a better regex
    const emailRegex = /^[A-Za-z0-9. _-]+@[A-za-z0-9.-]+\.[A-Za-z]{2,4}/
    
    return emailRegex.test(userEmail)
}

// password validation regex
function isValidPassword(password){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}/

    return passwordRegex.test(password)
}


// define the input validation form
function validateInputs(){
    // get values inputed 
    const emailVal = email.value.trim()
    const passwordVal = password.value.trim()

    // validation for each value
    // email
    if(emailVal === ''){
        setError(email,'Email is required')
    } else if(!isValidEmail(emailVal)){
        setError(email,'Please use a valid email address')
    } else{
        setSuccess(email)
    }

    // password
    if (passwordVal ===''){
        setError(password,'Password is required')
    } else if(!isValidPassword(passwordVal)){
        setError(password,'Password must have a minimum of 8 characters contain lowercase and uppercase letters, a digit and special characters')
    } else{
        setSuccess(password)
    }


}



// document.addEventListener('DOMContentLoaded', () => {
//     const loginBtn = document.getElementById('login');
//     const usersUrl = "http://localhost:3000/users";
//     const indexUrl = "http://127.0.0.1:5500/index.html"
//     const alertDiv = document.querySelector('.alert')
//     const successDiv = document.querySelector('#success')
  

//     loginBtn.addEventListener('click', async (e) => {
//         e.preventDefault();    
        
//         const email = document.getElementById('email').value;        
//         const password = document.getElementById('password').value;

//         const existingUser = {
//             email,            
//             password
//         };

//         let html = ''

//         // Assuming you want to check if the user exists in the users list.
//         try {
//             const response = await fetch(usersUrl);
//             const users = await response.json();
            
//             const user = users.find(user => user.email === email && user.password === password);
            
//             if (user) {
//                 // alert('Login successful');

//                 // set timer delay to allow viewing of pop notifs
//                 alertDiv.style.display = 'flex'
//                 successDiv.style.visibility = 'show'

//                 // window.location.href = indexUrl

//                 setTimeout(() => {

//                     window.location.href = indexUrl
//                 },3000)
            
//                 // You can redirect the user to another page or perform some other action here
//             } else {
//                 // set timer delay to allow viewing of pop notifs
//             }
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     });
// })