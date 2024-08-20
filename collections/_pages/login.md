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

<h1>Processing...</h1>

<script>
    // Extract authorization code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        // Send the code to your proxy server
        fetch('https://your-proxy-server.com/exchange-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        })
        .then(response => response.json())
        .then(data => {
            // Store the access token securely (e.g., sessionStorage)
            sessionStorage.setItem('access_token', data.access_token);

            // Redirect or update the UI
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Error exchanging token:', error);
            alert('Failed to log in.');
        });
    } else {
        alert('Authorization code not found.');
    }
</script>
