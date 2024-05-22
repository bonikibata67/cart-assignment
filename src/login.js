document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login');
    const usersUrl = "http://localhost:3000/users";
    
    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();    
        
        const email = document.getElementById('email').value;        
        const password = document.getElementById('password').value;

        const existingUser = {
            email,            
            password
        };

        // Assuming you want to check if the user exists in the users list.
        try {
            const response = await fetch(usersUrl);
            const users = await response.json();
            
            const user = users.find(user => user.email === email && user.password === password);
            
            if (user) {
                alert('Login successful');
                // You can redirect the user to another page or perform some other action here
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });
});document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login');
    const usersUrl = "http://localhost:3000/users";
    
    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();    
        
        const email = document.getElementById('email').value;        
        const password = document.getElementById('password').value;

        const existingUser = {
            email,            
            password
        };

        // Assuming you want to check if the user exists in the users list.
        try {
            const response = await fetch(usersUrl);
            const users = await response.json();
            
            const user = users.find(user => user.email === email && user.password === password);
            
            if (user) {
                alert('Login successful');
                // You can redirect the user to another page or perform some other action here
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });
});
