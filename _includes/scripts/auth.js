// _includes/scripts/auth.js
// Ensure Magic SDK is initialized properly
if (typeof Magic === 'undefined') {
    console.error('Magic SDK failed to load.');
    // Potentially redirect to an error page or inform the user
} else {
    console.log('Magic SDK loaded successfully.');
    window.magic = window.magic || new Magic('pk_live_C8C6E40CF7E226B5');
}

// Function to handle user login
async function loginUser(email) {
    try {
        await magic.auth.loginWithMagicLink({ email });
        const magicToken = await magic.user.getIdToken();
        console.log('Obtained magicToken:', magicToken); // Debug the received token
        localStorage.setItem('magicToken', magicToken);
        localStorage.setItem('userId', data.user.id);  // Store userId
        console.log('magicToken stored in localStorage:', localStorage.getItem('magicToken')); // Verify storage
        window.location.href = '/voyage';
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed: " + error.message);
    }
}

// Function to check if user is logged in and redirect if not
async function checkUser() {
    const magicToken = localStorage.getItem('magicToken');
    if (magicToken && await magic.user.isLoggedIn()) {
        try {
            const userInfo = await magic.user.getInfo();
            localStorage.setItem('userRole', userInfo.role || 'Listener');
            return userInfo;
        } catch (error) {
            console.error('Error checking user info:', error);
        }
    }
    window.location.href = '/login';
}

// Function to handle user logout
async function logoutUser() {
    try {
        await magic.user.logout();
        localStorage.removeItem('magicToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.href = '/login';
    } catch (error) {
        console.error("Logout failed:", error);
    }
}

// Expose functions globally if needed, or manage exports differently based on your project structure
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.checkUser = checkUser;
