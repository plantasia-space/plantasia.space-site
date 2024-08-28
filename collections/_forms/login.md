---
layout: articles
show_title: false
show_date: false
permalink: /login
titles:
  en: &EN login
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
---
<br>
<br>

<div class="form-container">
    <h3>Maar World Login</h3>
    <form id="loginForm" class="contact-form">
        <input type="email" id="email" required placeholder="Enter your email" />
        <button type="submit">Send</button>
    </form>
    <p id="message"></p>
    <div id="serverResponse"></div>
    <div id="localStorageContent"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/magic-sdk@latest/dist/magic.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const magic = new Magic('pk_live_C8C6E40CF7E226B5'); // Ensure this is your actual key and it's kept secure

    async function loginUser(email) {
        try {
            console.log('Sending Magic Link...');
            await magic.auth.loginWithMagicLink({ email });

            console.log('Attempting to retrieve Magic token...');
            const magicToken = await magic.user.getIdToken();
            console.log('Retrieved Magic Token:', magicToken);

            if (!magicToken) {
                document.getElementById('message').innerText = "Failed to retrieve Magic token. Please try again.";
                return;
            }

            console.log('Preparing to send fetch request');
            const response = await fetch('http://media.maar.world:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': magicToken
                },
                body: JSON.stringify({ email })
            });

            console.log('Fetch request sent, waiting for response...');
            console.log('Response status:', response.status);

            const responseBody = await response.text(); // Retrieve the full response body as text
            console.log('Full Response Body:', responseBody); // Print the full response body

            if (!response.ok) {
                const errorMessage = `Authentication failed: ${response.status} - ${response.statusText}`;
                console.error(errorMessage);
                document.getElementById('message').innerText = errorMessage;
                return;
            }

            const data = JSON.parse(responseBody); // Parse the response body as JSON
            console.log('Response data:', data);

            if (!data.token) {
                throw new Error('No token in response data');
            }

            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('userRole', data.user.role);
            localStorage.setItem('userEmail', data.user.email);
            localStorage.setItem('userName', data.user.username);

           // window.location.href = '/voyage';

        } catch (error) {
            console.error("Login failed:", error);
            document.getElementById('message').innerText = "Login failed: " + error.message;
        }
    }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        loginUser(email);
    });
});
</script>
