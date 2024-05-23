document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login');
    const usersUrl = "http://localhost:3000/users";
    const indexUrl = "http://127.0.0.1:5500/index.html"
    const alertDiv = document.querySelector('.alert')
    const successDiv = document.querySelector('#success')
    const errorDiv = document.querySelector('#error')
  

    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();    
        
        const email = document.getElementById('email').value;        
        const password = document.getElementById('password').value;

        const existingUser = {
            email,            
            password
        };

        let html = ''

        // Assuming you want to check if the user exists in the users list.
        try {
            const response = await fetch(usersUrl);
            const users = await response.json();
            
            const user = users.find(user => user.email === email && user.password === password);
            
            if (user) {
                // alert('Login successful');

                // set timer delay to allow viewing of pop notifs
                alertDiv.style.display = 'flex'
                successDiv.style.visibility = 'show'

                // window.location.href = indexUrl

                setTimeout(() => {

                    window.location.href = indexUrl
                },5000)
            
                // You can redirect the user to another page or perform some other action here
            } else {
                // set timer delay to allow viewing of pop notifs
                alertDiv.style.display = 'flex'
                errorDiv.style.visibility = 'show'

            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });
})