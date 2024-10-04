---
layout: articles
show_title: false
show_date: false
permalink: /register
titles:
  en: &EN Register
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
---

<br><br>

<div class="form-container">
    <h3>Maar World Register</h3>
    <form id="registerForm" class="contact-form">
        <input type="text" id="username" required placeholder="Enter your username" />
        <input type="email" id="email" required placeholder="Enter your email" />
        <input type="password" id="password" required placeholder="Enter your password" />
        <button type="submit">Register</button>
        <button type="button" id="loginAccount" class="btn button--outline-primary button--circle">Are you already an xPlorer?</button>

    </form>

    <p><br>When registering, you agree that we may use your provided data for the registration and to send you notifications on our products and services. You can unsubscribe from notifications at any time in your settings. </p>

    <p id="message"></p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase client (assumes SDK is already loaded globally)

    async function registerUser(username, email, password) {
        try {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) {
                console.error("Registration failed:", signUpError.message);
                document.getElementById('message').innerText = "Registration failed: " + signUpError.message;
                return;
            }

            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: signUpData.user.id, username }]);

            if (profileError) {
                console.error("Profile creation failed:", profileError.message);
                document.getElementById('message').innerText = "Profile creation failed: " + profileError.message;
                return;
            }

            document.getElementById('message').innerText = "Registration successful! Please check your email to confirm your account.";
        } catch (error) {
            console.error("Registration failed:", error);
            document.getElementById('message').innerText = "Registration failed: " + error.message;
        }
    }

    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        registerUser(username, email, password);
    });
});

    // Redirect to the register page on button click
    document.getElementById('loginAccount').addEventListener('click', function() {
        window.location.href = '/login';
    });
</script>
