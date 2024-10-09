// Function to handle user login with email/password via backend proxy
async function loginUser(email, password) {
    try {
        const response = await fetch('http://media.maar.world:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),  // Send login details in request body
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Login response:', data);

        // Store the JWT token and userId in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);  // Assuming `data.user` contains the user info

        // Redirect or update UI to show login success
        window.location.href = '/voyage';  // Redirect after successful login
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('message').innerText = "Login failed. Please try again.";
    }
}


// Function to handle sending password reset email via backend proxy
async function forgotPassword(email) {
  try {
      const response = await fetch('http://media.maar.world:3001/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Password reset failed');
      }

      console.log('Password reset email sent to:', email);
  } catch (error) {
      console.error('Password reset error:', error);
      throw error;
  }
}

// Function to check if user is logged in and redirect if not via backend proxy
function checkAuth() {
  const token = localStorage.getItem('token');
  if (token) {
      console.log('User is logged in');
      // You can optionally decode and verify the token here
  } else {
      // Token doesn't exist, redirect to login
      window.location.href = '/login';
  }
}

// Function to handle user logout via backend proxy
async function logoutUser() {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://media.maar.world:3001/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Pass token in headers
            },
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        // Clear the token and userId from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');

        // Redirect to login page after logout
        window.location.href = '/login';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Expose functions globally if needed
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.forgotPassword = forgotPassword;

// Manage session persistence
function manageSessionPersistence() {
  const token = localStorage.getItem('token');
  if (token) {
      console.log('Session will persist with token.');
  }
  return token;
}
