---
layout: articles
show_title: false
show_date: false
permalink: /voyage
titles:
  en: &EN voyage
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
---

<div id="voyage-content">
    <h1>Thanks for logging in, Bon voyage xPlorer...</h1>
    <p id="user-info"></p> <!-- Placeholder for user role and email -->
    <p><a href="/voyage/profile">Go to your profile</a></p> <!-- Link to profile page -->

</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log('Retrieved JWT token from localStorage:', jwtToken);

    if (!jwtToken) {
        console.log('No JWT token found, redirecting to login.');
        window.location.href = '/login';
        return;
    }

    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    console.log('Retrieved userRole from localStorage:', userRole);
    console.log('Retrieved userName from localStorage:', userName);

    if (userRole && userName) {
        // Display user info without showing JWT token publicly
        displayUserInfo(userRole, userName);
    } else {
        // If user data is not available, potentially log out or handle accordingly
        console.error('User data not found, redirecting to login.');
        window.location.href = '/login';
    }
});

// Function to display user information
function displayUserInfo(userRole, userName) {
    const userInfoElement = document.getElementById('user-info');
    userInfoElement.innerHTML = `
        <strong>User Role:</strong> ${userRole}<br>
        <strong>User Name:</strong> ${userName}
    `;
}
</script>
