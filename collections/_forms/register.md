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
        <input type="email" id="email" required placeholder="Enter your email" />
        <input type="password" id="password" required placeholder="Enter your password" />
        <input type="password" id="confirmPassword" required placeholder="Confirm your password" />
        <button type="submit">Register</button>
        <button type="button" id="loginAccount" class="btn button--outline-primary button--circle">Already an xPlorer?</button>
    </form>

    <!-- Server message displayed in red -->
    <p id="message" style="color: red;"></p>

    <!-- Smaller grey text for consent -->
    <p style="color: grey; font-size: 0.9em;">
        When registering, you agree that we may use your provided data for the registration and to send you notifications on our products. You can unsubscribe from notifications and delete your account at any time in your settings.
    </p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase client (Assumes Supabase SDK is already loaded globally)

    // Function to register user
    async function registerUser(email, password) {
        try {
            // Sign up with Supabase using email and password
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) {
                console.error("Registration failed:", signUpError.message);
                document.getElementById('message').innerText = "Registration failed: " + signUpError.message;
                return;
            }

            document.getElementById('message').innerText = "Registration successful! Please check your email to confirm your account.";
        } catch (error) {
            console.error("Registration failed:", error);
            document.getElementById('message').innerText = "Registration failed: " + error.message;
        }
    }

    // Handle form submission
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get input values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Check if passwords match
        if (password !== confirmPassword) {
            document.getElementById('message').innerText = "Passwords do not match!";
            return;
        }

        // If passwords match, proceed with registration
        registerUser(email, password);
    });

    // Redirect to login page when clicking the login button
    document.getElementById('loginAccount').addEventListener('click', function() {
        window.location.href = '/login';
    });
});
</script>
