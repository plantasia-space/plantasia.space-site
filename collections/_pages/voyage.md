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

<div class="p-5"></div>

<h1>Thanks for logging in, Bon voyage xPlorer...</h1>

<div id="admin-section" style="display: none;">
  <h2>Admin Dashboard</h2>
  <p>Welcome, Admin! Here you can manage the platform.</p>
</div>

<div id="moderator-section" style="display: none;">
  <h2>Moderator Dashboard</h2>
  <p>Welcome, Moderator! Here you can manage content and community.</p>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      // Display different sections based on the user's role
      if (user.role === 'Admin' || user.role === 'Super Admin') {
        document.getElementById('admin-section').style.display = 'block';
      }
      if (user.role.includes('Moderator')) {
        document.getElementById('moderator-section').style.display = 'block';
      }
    } else {
      // Redirect to login if no user data is found
      window.location.href = '/login';
    }
  });
</script>
