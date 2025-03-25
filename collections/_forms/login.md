---
layout: articles
show_title: false
show_date: false
permalink: /login/
public: true
titles:
  en: &EN Login
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
---

<br><br>

<div class="web-container">
  <h3 id="loginTitle">plantasia space login</h3>

  <!-- Login Form (shown if no recovery token is present) -->
  <form id="loginForm" class="contact-form">
    <input
      type="email"
      id="loginEmail"
      name="email"
      autocomplete="email"
      required
      placeholder="Enter xPlorer email"
    />

    <input
      type="password"
      id="loginPassword"
      name="password"
      autocomplete="current-password"
      required
      placeholder="Enter password"
    />

    <label>
      <input type="checkbox" id="loginRememberMe" /> Remember Me
    </label>

    <button type="submit">Login</button>
    <button
      type="button"
      id="createAccountButton"
      class="btn button--outline-primary button--circle"
    >
      Create an account
    </button>
  </form>

  <!-- Reset Password Form (shown if recovery token is present) -->
  <form id="resetPasswordForm" class="contact-form" style="display: none;">
    <!-- Hidden email field for accessibility and password managers -->
    <input
      type="email"
      id="resetEmail"
      name="email"
      autocomplete="email"
      style="display: none;"
      tabindex="-1"
    />

    <input
      type="password"
      id="resetNewPassword"
      name="newPassword"
      autocomplete="new-password"
      required
      placeholder="Enter your new password"
    />

    <input
      type="password"
      id="resetConfirmNewPassword"
      name="confirmNewPassword"
      autocomplete="new-password"
      required
      placeholder="Confirm your new password"
    />

    <button type="submit">Reset Password</button>
  </form>

  <!-- Server message display -->
  <p id="message" style="color: red;"></p>

  <!-- Forgot password link -->
  <p><a href="#" id="forgotPasswordLink">Forgot your password?</a></p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const messageElement = document.getElementById('message');
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  const loginForm = document.getElementById('loginForm');
  const loginTitle = document.getElementById('loginTitle');

  // Function to parse URL hash (for reset password token)
  function parseHash() {
    const hash = window.location.hash.substring(1); // Get everything after '#'
    const params = new URLSearchParams(hash);
    return {
      accessToken: params.get('access_token'),
      type: params.get('type'),
    };
  }

  // Function to handle password reset
async function handleResetPassword(accessToken) {
  // IMPORTANT: Match the input IDs you have in the HTML
  const newPassword = document.getElementById('resetNewPassword').value.trim();
  const confirmPassword = document.getElementById('resetConfirmNewPassword').value.trim();

  if (newPassword !== confirmPassword) {
    messageElement.innerText = "Passwords do not match.";
    messageElement.style.color = 'red';
    return;
  }

  try {
    const response = await fetch('https://api.plantasia.space/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ accessToken, newPassword })
    });

    if (!response.ok) {
      let data = {};
      try {
        data = await response.json();
      } catch {
        // If response isn't valid JSON
        throw new Error(`Unexpected error occurred (${response.status})`);
      }

      // Combine the server's message + error into one
      const fullErrorMessage = `${data.message || 'Ops, password reset failed'}${data.error ? ': ' + data.error : ''}`;
      throw new Error(fullErrorMessage);
    }

    // Success
    messageElement.innerText = "Password reset successful! You can now log in with your new password.";
    messageElement.style.color = 'green';
    setTimeout(() => window.location.href = '/login', 1500);

  } catch (error) {
    console.error('Password reset error:', error);
    messageElement.innerText =
      typeof error === 'string'
        ? error
        : (error.message || 'An unexpected error occurred.');
    messageElement.style.color = 'red';
  }
}

  // Setup form handlers using auth.js's functions
  function setupLoginForm() {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      loginUser(email, password); // Use auth.js's loginUser function
    });
  }

  function setupCreateAccountButton() {
    document.getElementById('createAccountButton').addEventListener('click', function() {
      window.location.href = '/register';
    });
  }

  function setupForgotPasswordLink() {
    document.getElementById('forgotPasswordLink').addEventListener('click', async function(event) {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      if (!email) {
        messageElement.innerText = "Please enter your email to reset the password.";
        messageElement.style.color = 'red';
        return;
      }
      await forgotPassword(email); // Use auth.js's forgotPassword function
    });
  }

  // Initialize all form behaviors
  function initializeForms() {
    setupLoginForm();
    setupCreateAccountButton();
    setupForgotPasswordLink();
  }

  // Initialize the page logic
  function initializePage() {
    const { accessToken, type } = parseHash();

    if (type === 'recovery' && accessToken) {
      loginForm.style.display = 'none';
      resetPasswordForm.style.display = 'block';
      loginTitle.textContent = 'Reset Your Password';

      resetPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        handleResetPassword(accessToken);
      });
    } else {
      loginForm.style.display = 'block';
      resetPasswordForm.style.display = 'none';
    }

    initializeForms();
  }

  initializePage(); // Start page-specific logic
});
</script>
