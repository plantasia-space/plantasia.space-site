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
    <h3 id="loginTitle">Maar World Login</h3>

    <!-- Login Form (shown if no recovery token is present) -->
    <form id="loginForm" class="contact-form" style="display: none;">
        <input type="email" id="email" required placeholder="Enter your email" />
        <input type="password" id="password" required placeholder="Enter your password" />
        <button type="submit">Login</button>
        <button type="button" id="createAccount" class="btn button--outline-primary button--circle">Create an account</button>
    </form>

    <!-- Reset Password Form (shown if recovery token is present) -->
    <form id="resetPasswordForm" class="contact-form" style="display: none;">
        <input type="password" id="newPassword" required placeholder="Enter your new password" />
        <input type="password" id="confirmPassword" required placeholder="Confirm your new password" />
        <button type="submit">Reset Password</button>
    </form>

    <p id="message" style="color: red;"></p> <!-- For displaying server messages -->

    <!-- Forgot password link -->
    <p><a href="#" id="forgotPasswordLink">Forgot your password?</a></p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {

    const messageElement = document.getElementById('message');
    const loginForm = document.getElementById('loginForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const loginTitle = document.getElementById('loginTitle');

    // Ensure loginUser and forgotPassword functions are initialized
    if (typeof window.loginUser === 'undefined' || typeof window.forgotPassword === 'undefined') {
        messageElement.innerText = "Login functionality is unavailable at the moment.";
        return;
    }

    // Function to parse URL hash to get token
    function parseHash() {
        const hash = window.location.hash.substring(1);  // Get everything after '#'
        const params = new URLSearchParams(hash);
        return {
            accessToken: params.get('access_token'),
            type: params.get('type'),
        };
    }

    // Function to handle reset password
    async function handleResetPassword(accessToken) {
        const newPassword = document.getElementById('newPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (newPassword !== confirmPassword) {
            messageElement.innerText = "Passwords do not match.";
            return;
        }

        try {
            // Call Supabase API to update the password using the access token
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;

            messageElement.innerText = "Password reset successful! You can now log in with your new password.";
            messageElement.style.color = 'green'; // Success message
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        } catch (error) {
            console.error('Password reset failed:', error);
            messageElement.innerText = "Password reset failed. Please try again.";
        }
    }

    // Check for password reset token in the URL
    const { accessToken, type } = parseHash();

    if (type === 'recovery' && accessToken) {
        // If a reset token is found, show the reset password form
        loginForm.style.display = 'none';
        resetPasswordForm.style.display = 'block';
        loginTitle.textContent = 'Reset Your Password';

        // Handle reset password form submission
        resetPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleResetPassword(accessToken);
        });
    } else {
        // If no reset token, show the login form
        loginForm.style.display = 'block';
        resetPasswordForm.style.display = 'none';
    }

    // Function to handle login form submission
    async function loginUserHandler(event) {
        event.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            messageElement.innerText = "Please enter both email and password.";
            return;
        }

        try {
            await window.loginUser(email, password);
            messageElement.innerText = "Login successful! Redirecting...";
            messageElement.style.color = 'green';
            setTimeout(() => {
                window.location.href = '/voyage';
            }, 1500);
        } catch (error) {
            console.error('Login failed:', error);
            messageElement.innerText = "Login failed. Please try again.";
        }
    }

    // Handle the login form submission
    document.getElementById('loginForm').addEventListener('submit', loginUserHandler);

    // Redirect to the register page on button click
    document.getElementById('createAccount').addEventListener('click', function() {
        window.location.href = '/register';
    });

    // Handle forgot password link click
    async function handleForgotPassword() {
        const email = document.getElementById('email').value.trim();

        if (!email) {
            messageElement.innerText = "Please enter your email to reset your password.";
            return;
        }

        try {
            await window.forgotPassword(email);
            messageElement.innerText = "Password reset email sent! Please check your inbox.";
            messageElement.style.color = 'green';
        } catch (error) {
            console.error('Password reset failed:', error);
            messageElement.innerText = "Password reset failed. Please try again.";
        }
    }

    // Attach click event for "Forgot password?" link
    document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
        event.preventDefault();
        handleForgotPassword();
    });
});
</script>
