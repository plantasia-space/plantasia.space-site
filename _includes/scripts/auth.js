// auth.js

/**
 * Function to handle user login with email/password via backend proxy
 * Uses HTTP-only cookies for JWT management
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
async function loginUser(email, password) {
    try {
       // const csrfToken = await getCsrfToken(); // If implementing CSRF protection
        const response = await fetch('http://media.maar.world:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'CSRF-Token': csrfToken, // Uncomment if using CSRF tokens
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify({ email, password }),  // Send login details in request body
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed. Please try again.');
        }

        const data = await response.json();
        console.log('Login response:', data);

        // Optionally store non-sensitive user info if needed
        localStorage.setItem('userId', data.userId);  // Assuming `data.userId` contains the user ID

        // Update the auth link to reflect logged-in status
        updateAuthLink(true);

        // Redirect to voyage page after successful login
        //window.location.href = '/voyage';
    } catch (error) {
        console.error('Login error:', error);
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerText = error.message;
            messageElement.style.color = 'red';
        }
    }
}

/**
 * Function to handle sending password reset email via backend proxy
 * @param {string} email - User's email
 */
async function forgotPassword(email) {
    try {
       // const csrfToken = await getCsrfToken(); // If implementing CSRF protection
        const response = await fetch('http://media.maar.world:3001/api/auth/forgot-password', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // 'CSRF-Token': csrfToken, // Uncomment if using CSRF tokens
            },
            credentials: 'include', // Include cookies if necessary
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Password reset failed');
        }

        console.log('Password reset email sent to:', email);
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerText = "Password reset email sent! Please check your inbox.";
            messageElement.style.color = 'green';
        }
    } catch (error) {
        console.error('Password reset error:', error);
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerText = "Password reset failed. Please try again.";
            messageElement.style.color = 'red';
        }
    }
}

/**
 * Function to check if user is authenticated by verifying session with backend
 * Updates the auth link based on authentication status
 */

async function checkAuth() {
    try {
        const response = await fetch('http://media.maar.world:3001/api/auth/check-session', {
            method: 'GET',
            credentials: 'include', // Include cookies
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.user !== null;
        } else {
            console.warn('Session check failed:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error during authentication check:', error);
        return false;
    }
}

/**
 * Function to handle user logout via backend proxy
 * Clears the HTTP-only cookie by requesting the server to logout
 */
async function logoutUser() {
    try {
        const response = await fetch('http://media.maar.world:3001/api/auth/logout', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            localStorage.clear();
            updateAuthLink(false);
            window.location.href = '/login';
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert('Logout failed. Please try again.');
    }
}

/**
 * Function to update the login/logout link in the header based on authentication status
 * @param {boolean} isLoggedIn - Whether the user is logged in
 */
function updateAuthLink(isLoggedIn) {
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        if (isLoggedIn) {
            authLink.innerHTML = '<span class="material-symbols-outlined">logout</span> Logout';
            authLink.onclick = (event) => {
                event.preventDefault();
                logoutUser();
            };
            authLink.href = '#'; // Prevent default navigation
        } else {
            authLink.innerHTML = '<span class="material-symbols-outlined">login</span> Login';
            authLink.onclick = null;
            authLink.href = '/login';
        }
    }
}

/**
 * (Optional) Function to fetch CSRF token if implementing CSRF protection

async function getCsrfToken() {
    try {
        const response = await fetch('http://media.maar.world:3001/api/get-csrf-token', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CSRF token.');
        }

        const data = await response.json();
        return data.csrfToken;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
    }
}
 */
/**
 * Function to initialize authentication checks on page load
 */
function initializeAuth() {
    checkAuth();
}

// Initialize authentication when the script loads
document.addEventListener('DOMContentLoaded', initializeAuth);

// Expose functions globally if needed
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.forgotPassword = forgotPassword;
window.checkAuth = checkAuth;
