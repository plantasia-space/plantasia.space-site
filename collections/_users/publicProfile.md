---
layout: articles
show_title: false
show_date: false
permalink: /xplorer/
titles:
  en: &EN xPlorer Public Profile
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: xPlorer
---

<div class="p-5"></div>

<div class="form-container">
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Back to Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
            </a>
        </div>
    </div>

    <h3>xPlorer Public Profile</h3>
    <div class="p-2"></div>

    <div id="profileView">
        <!-- Profile Image Display -->
        <div id="profileImagePreviewContainer">
            <img id="profileImagePreview" src="" alt="Profile Image">
        </div>

        <div class="p-2"></div>
        <!-- Displayed Profile Information -->
        <p><strong>Display Name:</strong> <span id="displayDisplayName"></span></p>


        <p><strong>Username:</strong> <span id="displayUsername"></span></p>
        <p><strong>Profile URL:</strong> 
        <a id="profileUrl" href="#">maar.world/xplorer/?username=<span id="displayProfileURL"></span></a>
        <button id="copyButton" class="btn button--outline-primary button--circle" title="Copy URL">
            <span class="material-symbols-outlined">content_copy</span>
        </button>
        </p>
        <p><strong>Role:</strong> <span id="displayRole"></span></p>


        <!-- Pronouns Fields -->
        <p id="pronounsDisplay" style="display: none;"><strong>Pronouns:</strong> <span id="displayPronouns"></span></p>
        <p id="otherPronounsDisplay" style="display: none;"><strong>Other Pronouns:</strong> <span id="displayOtherPronouns"></span></p>

        <!-- New Display Fields -->
        <p><strong>City:</strong> <span id="displayCity"></span></p>
        <p><strong>Country:</strong> <span id="displayCountry"></span></p>
        <p><strong>Bio:</strong> <span id="displayBio"></span></p>
        <p><strong>Custom Links:</strong>
        <div id="displayCustomLinks">
            <span id="customLink1Display"></span>
            <span id="separator1" style="display:none;"> | </span> <!-- Hide separator by default -->
            <span id="customLink2Display"></span>
            <span id="separator2" style="display:none;"> | </span> <!-- Hide separator by default -->
            <span id="customLink3Display"></span>
        </div>
        </p>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Extract the username from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (!username) {
        document.getElementById('profileView').innerHTML = '<p style="color:red;">Profile not found. Please provide a valid username.</p>';
        return;
    }

    // Fetch public user data based on the username
    fetch(`http://media.maar.world:3001/api/getPublicProfile?username=${username}`)
        .then(response => response.json())
        .then(data => {
            if (!data || data.error) {
                document.getElementById('profileView').innerHTML = '<p style="color:red;">Profile not found.</p>';
                return;
            }

            console.log('Received public user data:', data);

            // Populate display fields
            document.getElementById('displayDisplayName').innerText = data.displayName || 'Not provided';
            document.getElementById('displayUsername').innerText = data.username || 'Not provided';
            document.getElementById('displayProfileURL').innerText = username || 'Not provided';
            const profileUrl = `https://maar.world/xplorer/?username=${username}`;
            document.getElementById('profileUrl').href = profileUrl;
            document.getElementById('displayRole').innerText = data.role || 'Not provided';

            // Copy URL to clipboard functionality
            document.getElementById('copyButton').addEventListener('click', function() {
                const tempInput = document.createElement('input');
                tempInput.value = profileUrl;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            });

            // Display pronouns conditionally
            if (data.pronouns && data.pronouns !== 'Prefer not to say') {
                if (data.pronouns === 'Other') {
                    document.getElementById('displayPronouns').innerText = data.otherPronouns || 'Not provided';
                    document.getElementById('pronounsDisplay').style.display = 'block';
                    document.getElementById('otherPronounsDisplay').style.display = 'none';
                } else {
                    document.getElementById('displayPronouns').innerText = data.pronouns;
                    document.getElementById('pronounsDisplay').style.display = 'block';
                    document.getElementById('otherPronounsDisplay').style.display = 'none';
                }
            } else {
                document.getElementById('pronounsDisplay').style.display = 'none';
                document.getElementById('otherPronounsDisplay').style.display = 'none';
            }

            if (data.profileImage) {
                const profileImageUrl = `https://media.maar.world${data.profileImage}`;
                document.getElementById('profileImagePreview').src = profileImageUrl;
                document.getElementById('profileImagePreview').style.display = 'block';
            }

            // New fields
            document.getElementById('displayCity').innerText = data.city || 'Not provided';
            document.getElementById('displayCountry').innerText = data.country || 'Not provided';
            document.getElementById('displayBio').innerText = data.bio || 'Not provided';

            const customLinks = data.customLinks || [];

            if (customLinks[0]) {
                document.getElementById('customLink1Display').innerHTML = `<a href="${customLinks[0]}" target="_blank">${customLinks[0]}</a>`;
                document.getElementById('separator1').style.display = 'inline';
            }
            if (customLinks[1]) {
                document.getElementById('customLink2Display').innerHTML = `<a href="${customLinks[1]}" target="_blank">${customLinks[1]}</a>`;
                document.getElementById('separator2').style.display = 'inline';
            }
            if (customLinks[2]) {
                document.getElementById('customLink3Display').innerHTML = `<a href="${customLinks[2]}" target="_blank">${customLinks[2]}</a>`;
            }
        })
        .catch(error => console.error('Error fetching public user data:', error));
});
</script>
