console.log('hello world')
// get the various DOM elements
const form = document.querySelector('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm_password')

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

// username validation regex
function isValidUsername(username){
    const userUsername = String(username).toLowerCase()
    const usernameRegex = /^[A-Za-z][A-Za-z0-9_.]*$/

    return usernameRegex.test(userUsername)
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
    const usernameVal = username.value.trim()
    const emailVal = email.value.trim()
    const passwordVal = password.value.trim()
    const confirmPasswordVal = confirmPassword.value.trim()

    // validation for each value
    // username
    if(usernameVal === ''){
        setError(username, 'Username is required')
    } else if(!isValidUsername(usernameVal)){
        setError(username, 'Usernames must have only letters, numbers, dots or underscores')
    } else{
        setSuccess(username)
    }

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

    // confirm password
    if(confirmPasswordVal === ''){
        setError(confirmPassword, 'Confirm your password')
    } else if (confirmPasswordVal !== passwordVal){
        setError(confirmPassword, 'Passwords dont match')
    } else{
        setSuccess(confirmPassword)
    }

}


// // function for storing user data in the json database
// document.addEventListener('DOMContentLoaded', () => {
//     const signBtn = document.getElementById('signup');
//     const usersUrl = "http://localhost:3000/users";
//     const indexUrl = "http://127.0.0.1:5500/index.html"
//     const popDiv = document.querySelector('.popup')
//     const successDiv = document.querySelector('#success')

//     signBtn.addEventListener('click', async (e) => {
//         e.preventDefault();

        
//         const email = document.getElementById('email').value;
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

       
//         const newUser = {
//             email,
//             username,
//             password
//         };

      
//         try {
//             const response = await fetch(usersUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(newUser)
//             });

//             if (response.ok) {
//                 console.log("User added successfully:",await response.json())

//                 // set timer delay to allow viewing of pop notifs
//                 alertDiv.style.display = 'flex'
//                 successDiv.style.visibility = 'show'

//                 // window.location.href = indexUrl

//                 setTimeout(() => {

//                     window.location.href = indexUrl
//                 },3000)
//             } else {
//                 // console.error("Error adding user:", response.statusText);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     });
// });





