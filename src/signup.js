document.addEventListener('DOMContentLoaded', () => {
    const signBtn = document.getElementById('signup');
    const usersUrl = "http://localhost:3000/users";
    const indexUrl = "http://127.0.0.1:5500/index.html"
    const popDiv = document.querySelector('.popup')
    const successDiv = document.querySelector('#success')
    const errorDiv = document.querySelector('#error')
    
   

    signBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

       
        const newUser = {
            email,
            username,
            password
        };

      
        try {
            const response = await fetch(usersUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                // console.log("User added successfully:", )
                await response.json()

                // set timer delay to allow viewing of pop notifs
                alertDiv.style.display = 'flex'
                successDiv.style.visibility = 'show'

                // window.location.href = indexUrl

                setTimeout(() => {

                    window.location.href = indexUrl
                },5000)
            } else {
                // console.error("Error adding user:", response.statusText);
                alertDiv.style.display = 'flex'
                errorDiv.style.visibility = 'show'
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});





