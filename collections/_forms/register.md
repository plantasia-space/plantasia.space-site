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
public: true

---

<br><br>

<div class="form-container">
    <h3>Plantasia spacE Register</h3>
    <form id="registerForm" class="contact-form">
        <input type="email" id="email" required placeholder="Enter xPlorer email" />
        <input type="password" id="password" required placeholder="Enter password" />
        <input type="password" id="confirmPassword" required placeholder="Confirm password" />
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
    console.log('DOM fully loaded and parsed');

    const authLink = document.getElementById('auth-link');
    const currentPage = window.location.pathname;

    // Function to handle logout
    async function logoutUser() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found for logout.');
        return;
      }

      try {
        const response = await fetch('https://media.maar.world:443/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to log out');
        }

        // Clear the token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    // Check if a valid token exists
    function checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('User is logged in, showing logout link');
        return true;
      }
      console.log('No valid token found');
      return false;
    }

    // Update the auth link (login or logout)
    function updateAuthLink() {
      if (authLink) {
        if (checkAuth()) {
          authLink.innerHTML = 'Logout';
          authLink.onclick = function (event) {
            event.preventDefault();
            logoutUser();
          };
        } else {
          authLink.innerHTML = 'Login';
          authLink.href = '/login';
          authLink.onclick = null; // Ensure the onclick handler is cleared
        }
      }
    }

    // Function to prevent infinite redirect loop to the login page
    function checkUserSession() {
      const token = localStorage.getItem('token');
      console.log('Checking token in localStorage:', token);

      // Exclude /register and /login pages from the session check
      if (!token && currentPage !== '/login' && currentPage !== '/register') {
        console.log('No valid session, redirecting to login...');
        window.location.href = '/login';  // Redirect to login if no valid session
      }
    }

    // Initialize the page with session and auth link checks
    checkUserSession();  // Verify user session (but exclude register page)
    updateAuthLink();    // Update auth link on load

    // Handle storage changes (e.g., session updates in other tabs)
    window.addEventListener('storage', function () {
      console.log('Storage event detected, updating auth link');
      updateAuthLink();
    });

    // Handle form submission for registration
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();
      const messageElement = document.getElementById('message');

      // Check if passwords match
      if (password !== confirmPassword) {
        messageElement.innerText = "Passwords do not match!";
        return;
      }

      // Proceed with registration
      try {
        const response = await fetch('https://media.maar.world:443/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          messageElement.innerText = "Registration successful! Please check your email.";
          messageElement.style.color = 'green';
        } else {
          messageElement.innerText = "Registration failed: " + (data.message || 'Unknown error');
          messageElement.style.color = 'red';
        }
      } catch (error) {
        messageElement.innerText = "Registration failed: " + error.message;
        messageElement.style.color = 'red';
      }
    });

    // Redirect to login page when clicking the login button
    document.getElementById('loginAccount').addEventListener('click', function() {
      window.location.href = '/login';
    });
  });

</script>
