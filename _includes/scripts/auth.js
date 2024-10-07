// Import the createClient function from the Supabase package (make sure the Supabase JS library is loaded)
const { createClient } = window.supabase; // Assuming 'supabase' is loaded globally via a script tag

// Initialize Supabase Client
const supabaseUrl = 'https://anahjzknhplcbhakwjdl.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuYWhqemtuaHBsY2JoYWt3amRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3Mjg2ODYsImV4cCI6MjA0MzMwNDY4Nn0.67uic887BZfBkMv2VlrCYqxpvmjNFQK2SCVIsx1EY4o'; // Replace with your actual Supabase anon key


// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to handle user login with email/password
async function loginUser(email, password) {
    try {
      const rememberMe = document.getElementById('rememberMe').checked; // Check if "Remember Me" is selected
  
      // Login with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) throw error;
  
      const session = data.session;
  
      if (session) {
        // Store the access token
        localStorage.setItem('supabaseToken', session.access_token);
  
        // If "Remember Me" is checked, store the "rememberMe" flag
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
  
        console.log('Login successful:', session);
        return session;
      } else {
        throw new Error('Login failed: No session returned.');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

// Function to handle sending password reset email
async function forgotPassword(email) {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        console.log('Password reset email sent to:', email);
    } catch (error) {
        console.error('Password reset error:', error);
        throw error;
    }
}

// Function to check if user is logged in and redirect if not
async function checkUser() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
        window.location.href = '/login';
    } else {
        const userInfo = data.user;
        localStorage.setItem('userRole', userInfo.role || 'Listener');
        return userInfo;
    }
}

// Function to handle user logout
async function logoutUser() {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('supabaseToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('rememberMe'); // Clear the "Remember Me" flag
      console.log('User logged out due to inactivity.');
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
    }
}

// Expose functions globally if needed
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.checkUser = checkUser;
window.forgotPassword = forgotPassword;

// Optional: Handle session persistence based on "Remember Me" flag
function manageSessionPersistence() {
    const rememberMe = localStorage.getItem('rememberMe');
    const supabaseToken = localStorage.getItem('supabaseToken');
  
    if (rememberMe === 'true') {
      console.log('Remember Me is active. Session will persist.');
    }

    return supabaseToken;
}
