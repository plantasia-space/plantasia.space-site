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

<div class="p-5"></div>

<div class="form-container">
  <div id="app">
    <h3>Maar World Records Login</h3>
    <form id="loginForm" class="contact-form">
      <input type="email" id="email" required placeholder="Enter your email" />

      <!-- Terms and Conditions Checkbox -->
      <div class="checkbox-container">
        <input type="checkbox" id="terms" required />
        <label for="terms">I accept the <a href="/terms-and-conditions" target="_blank">terms and conditions</a></label>
      </div>

      <!-- Subscription to Mailing List Checkbox -->
      <div class="checkbox-container">
        <input type="checkbox" id="subscribe" />
        <label for="subscribe">I want to receive updates and information from MW Records. You can unsubscribe at any time.</label>
      </div>

      <button type="submit">Send</button>
    </form>
    <p>Access secured by Magic</p>
    <p id="message"></p>
  </div>
</div>

<!-- Include Magic SDK -->
<script src="https://cdn.jsdelivr.net/npm/magic-sdk@latest/dist/magic.js"></script>

<script>
  // Initialize Magic SDK
  const magic = new Magic("pk_live_C8C6E40CF7E226B5");

  // Login User Function
  async function loginUser(email, subscribe) {
    try {
      await magic.auth.loginWithMagicLink({ email });
      const userMetadata = await magic.user.getMetadata();
      // Store the authentication state
      localStorage.setItem('user', JSON.stringify(userMetadata));

      // Handle subscription if checked
      if (subscribe) {
        // Implement your subscription logic here
        console.log("User subscribed to mailing list");
      }

      document.getElementById("message").innerText = "Login successful!";
      // Redirect to '/voyage' after successful login
      window.location.href = '/voyage';
    } catch (error) {
      console.error("Login failed:", error);
      document.getElementById("message").innerText = "Login failed: " + error.message;
    }
  }

  // Check User Login State
  function checkUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authSection = document.getElementById('auth-section');
    if (user) {
      // User is logged in, update UI accordingly
      authSection.innerHTML = `
        <p>Welcome, ${user.email}</p>
        <button onclick="logout()">Logout</button>
      `;
    } else {
      // User is not logged in, show login option
      authSection.innerHTML = `
        <p>You are not logged in.</p>
        <a href="/login">Login</a>
      `;
    }
  }

  // Logout Function
  async function logout() {
    try {
      await magic.user.logout();
      localStorage.removeItem('user');
      document.getElementById("message").innerText = "You have been logged out.";
      // Update the auth section
      checkUser();
      // Redirect to home page or login page
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed:", error);
      document.getElementById("message").innerText = "Logout failed: " + error.message;
    }
  }

  // Add event listener to the form
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const subscribe = document.getElementById("subscribe").checked;
    loginUser(email, subscribe);
  });

  // Check user authentication state on page load
  document.addEventListener("DOMContentLoaded", checkUser);
</script>
