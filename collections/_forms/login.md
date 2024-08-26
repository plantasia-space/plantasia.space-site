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

<div class="form-container">
    <h3>Maar World Login</h3>
    <form id="loginForm" class="contact-form">
        <input type="email" id="email" required placeholder="Enter your email" />
        <button type="submit">Send</button>
    </form>
    <p id="message"></p>
</div>

<script src="https://cdn.jsdelivr.net/npm/magic-sdk@latest/dist/magic.js"></script>
<script>
    const magic = new Magic('pk_live_C8C6E40CF7E226B5'); // Replace with your Magic public key

    async function loginUser(email) {
        try {
            // Log in the user and get the DID token
            await magic.auth.loginWithMagicLink({ email });
            const magicToken = await magic.user.getIdToken(); // Store the token

            // Debugging: Log and set magicToken
            console.log('Setting magicToken:', magicToken);
            localStorage.setItem('magicToken', magicToken);
            console.log('Retrieved magicToken:', localStorage.getItem('magicToken'));


            // Redirect to the voyage page
            window.location.href = '/voyage';
        } catch (error) {
            console.error("Login failed:", error);
            document.getElementById('message').innerText = "Login failed: " + error.message;
        }
    }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        loginUser(email); // Trigger the login process
    });
</script>
