document.addEventListener('DOMContentLoaded', () => {
    const signBtn = document.getElementById('signup');
    const usersUrl = "http://localhost:3000/users";
    
   

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
                console.log("User added successfully:", await response.json());
            } else {
                console.error("Error adding user:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});





