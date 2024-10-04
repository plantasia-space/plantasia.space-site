---
layout: articles
show_title: false
show_date: false
permalink: /login
titles:
  en: &EN Login
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
---

<br><br>

<div class="form-container">
    <h3>Maar World Login</h3>
    <form id="loginForm" class="contact-form">
        <input type="email" id="email" required placeholder="Enter your email" />
        <input type="password" id="password" required placeholder="Enter your password" />
        <button type="submit">Login</button>
        <button type="button" id="createAccount" class="btn button--outline-primary button--circle">Create an account</button>
    </form>
    <p id="message"></p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {

    // Ensure loginUser is initialized
    if (typeof window.loginUser === 'undefined') {
        console.error('loginUser function is not defined or initialized.');
        document.getElementById('message').innerText = "Login functionality is unavailable at the moment.";
        return;
    }

    // Function to handle login with email and password
    async function loginUserHandler(event) {
        event.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            document.getElementById('message').innerText = "Please enter both email and password.";
            return;
        }

        try {
            await window.loginUser(email, password); // Use the updated loginUser function
        } catch (error) {
            console.error('Login failed:', error);
            document.getElementById('message').innerText = "Login failed. Please try again.";
        }
    }

    // Handle the form submission
    document.getElementById('loginForm').addEventListener('submit', loginUserHandler);

    // Redirect to the register page on button click
    document.getElementById('createAccount').addEventListener('click', function() {
        window.location.href = '/register';
    });
});
</script>
