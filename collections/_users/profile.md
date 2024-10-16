---
layout: articles
show_title: false
show_date: false
permalink: /voyage/profile
titles:
  en: &EN xPlorer Profile
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
            <a href="/voyage" title="Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
            </a>
        </div>
        <div class="edit-button-container">
            <button id="editButton" class="btn button--outline-primary button--circle" title="View/Edit Profile">
                <span class="material-symbols-outlined">edit</span> 
            </button>
        </div>
    </div>

    <h3>xPlorer Profile</h3>
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
        <a id="profileUrl" href="#">maar.world/xplorer/?username=<span id="displayUsernameForUrl"></span></a>
        <button id="copyButton" class="btn button--outline-primary button--circle" title="Copy URL">
            <span class="material-symbols-outlined">content_copy</span>
        </button>
        </p>
        <p><strong>Email:</strong> <span id="displayEmail"></span></p>

        <p><strong>Gender Identity:</strong> <span id="displayGenderIdentity"></span></p>
        <p id="customGenderDisplay" style="display: none;"><strong>Custom Gender Identity:</strong> <span id="displayCustomGenderIdentity"></span></p>
        <p><strong>Pronouns:</strong> <span id="displayPronouns"></span></p>
        <p id="otherPronounsDisplay" style="display: none;"><strong>Other Pronouns:</strong> <span id="displayOtherPronouns"></span></p>
        <p><strong>Phone:</strong> <span id="displayPhone"></span></p>
        <p><strong>Role:</strong> <span id="displayRole"></span></p>

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

    <form id="profileForm" class="contact-form" style="display: none;">
        <!-- Profile Image Upload -->
        <label for="profileImage">Choose your Profile Image:</label>
        <div id="profileImagePreviewContainer">
            <img id="profileImagePreviewForm" src="" alt="Profile Image">
        </div>
        <input type="file" id="profileImage" name="profileImage" accept=".jpg, .jpeg, .png"><br><br>

        <!-- Display Name -->
        <strong><label for="displayName">Display Name:</label></strong>
        <input type="text" id="displayName" name="displayName" required><br><br>

        <!-- Username -->
        <strong><label for="username">Username:</label></strong>
        <input type="text" id="username" name="username" required>
        <small style="color: grey;">
            Username can’t exceed 30 characters, must be lowercase, and can only contain letters, numbers, and periods.
        </small>
        <div id="usernameFeedback" style="color: red;"></div><br>
        
        <!-- Phone -->
        <strong><label for="phone">Phone:</label></strong>
        <input type="tel" id="phone" name="phone"><br><br>

        <!-- Gender Identity -->
        <strong><label for="genderIdentity">Gender Identity: </label></strong>         
        <select id="genderIdentity" name="genderIdentity" required>
            <option value="Prefer not to reply">Prefer not to reply</option>
            <option value="Woman">Woman</option>
            <option value="Man">Man</option>
            <option value="Trans woman">Trans woman</option>
            <option value="Trans man">Trans man</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Not Listed">Not Listed</option>
        </select><br>
        <small style="color: grey;">This won’t be part of your public profile</small>
        
        <!-- Custom Gender Identity (Shown when "Not Listed" is selected) -->
        <strong><label for="customGenderIdentity" id="customGenderLabel" style="display: none;">Please specify:</label></strong>
        <input type="text" id="customGenderIdentity" name="customGenderIdentity" style="display: none;"><br><br>

        <!-- Pronouns -->
        <strong><label for="pronouns">Pronouns:</label></strong>
        <select id="pronouns" name="pronouns" required>
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="She/Her">She/Her</option>
            <option value="He/Him">He/Him</option>
            <option value="They/Them">They/Them</option>
            <option value="Ze/Hir">Ze/Hir</option>
            <option value="Ze/Zir">Ze/Zir</option>
            <option value="Other">Other</option>
        </select><br>

        <!-- Custom Pronouns (Shown when "Other" is selected) -->
        <strong><label for="otherPronouns" id="otherPronounsLabel" style="display: none;">Please specify:</label></strong>
        <input type="text" id="otherPronouns" name="otherPronouns" style="display: none;"><br><br>

        <!-- New Editable Fields -->
        <strong><label for="city">City:</label></strong>
        <input type="text" id="city" name="city"><br><br>

        <strong><label for="country">Country:</label></strong>
        <input type="text" id="country" name="country"><br><br>

        <strong><label for="bio">Bio: (200 characters max)</label></strong>
        <textarea id="bio" name="bio" maxlength="200"></textarea><br><br>

        <strong><label for="customLinks">Custom Links (Up to 3):</label></strong>
        <input type="url" id="customLink1" name="customLink1"><br><br>
        <input type="url" id="customLink2" name="customLink2"><br><br>
        <input type="url" id="customLink3" name="customLink3"><br><br>

        <!-- Submit Button -->
        <button type="submit"><span class="material-symbols-outlined">check_circle</span> Update Profile</button>
        <div class="p-2"></div>

        <!-- Cancel Button -->
        <button type="button" id="cancelButton" class="btn btn-secondary"><span class="material-symbols-outlined">cancel</span> Cancel</button>
        <div class="p-2"></div>

        <!-- Progress Bar -->
        <div class="progress-bar" style="width: 100%; background-color: lightgray;">
            <div id="progress" style="width: 0%; height: 20px; background-color: green;"></div>
        </div>

        <!-- Message Display -->
        <p id="messageDisplay" style="text-align: center;"></p>
    </form>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    let originalProfileImage = '';
    let currentUsername = ''; // To store the current username

    // Check if cached profile data is still valid (5 min timeout)
    function getCachedProfile() {
        const cachedProfile = JSON.parse(localStorage.getItem('profileData'));
        const cacheTime = localStorage.getItem('profileCacheTime');
        const cacheExpiryTime = 5 * 60 * 1000; // 5 minutes in milliseconds

        if (cachedProfile && (Date.now() - cacheTime) < cacheExpiryTime) {
            return cachedProfile;
        }
        return null;
    }

    // Cache profile data for future use
    function cacheProfileData(data) {
        localStorage.setItem('profileData', JSON.stringify(data));
        localStorage.setItem('profileCacheTime', Date.now());
    }

    // Fetch profile data from the server or use cached data if available
    function fetchUserProfile(userId) {
        const cachedProfile = getCachedProfile();
        if (cachedProfile) {
            console.log('Using cached profile data:', cachedProfile);
            populateUserProfile(cachedProfile); // Use cached data
        } else {
            fetch(`http://media.maar.world:3001/api/profile?userId=${userId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Received fresh profile data:', data);
                    cacheProfileData(data); // Cache the fresh data
                    populateUserProfile(data); // Populate UI with fresh data
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    document.getElementById('messageDisplay').innerText = 'Error fetching user data. Please try again.';
                });
        }
    }

    function populateUserProfile(data) {
        // Populate display fields
        document.getElementById('displayUsername').innerText = data.username;
        document.getElementById('displayUsernameForUrl').innerText = data.username;
        document.getElementById('profileUrl').href = `https://maar.world/xplorer/?username=${data.username}`;
        document.getElementById('displayEmail').innerText = data.email;
        document.getElementById('displayPhone').innerText = data.phone || 'Not provided';
        document.getElementById('displayRole').innerText = data.role || 'Not provided';

        // Populate form fields for edit mode
        document.getElementById('username').value = data.username || '';
        document.getElementById('phone').value = data.phone || '';

        // Handle gender identity and pronouns
        handleCustomFields(data);

        // Display the profile image
        if (data.profileImage) {
            originalProfileImage = `https://media.maar.world${data.profileImage}`;
            document.getElementById('profileImagePreview').src = originalProfileImage;
            document.getElementById('profileImagePreviewForm').src = originalProfileImage;
            document.getElementById('profileImagePreview').style.display = 'block';
            document.getElementById('profileImagePreviewForm').style.display = 'block';
        }

        // Handle additional fields like displayName, city, country, bio
        document.getElementById('displayName').value = data.displayName || '';
        document.getElementById('displayDisplayName').innerText = data.displayName || '';
        document.getElementById('city').value = data.city || '';
        document.getElementById('displayCity').innerText = data.city || '';
        document.getElementById('country').value = data.country || '';
        document.getElementById('displayCountry').innerText = data.country || '';
        document.getElementById('bio').value = data.bio || '';
        document.getElementById('displayBio').innerText = data.bio || '';

        // Handle custom links
        handleCustomLinks(data.customLinks || []);
    }

    function handleCustomFields(data) {
        // Handle custom gender identity if "Not Listed"
        if (data.genderIdentity === 'Not Listed') {
            document.getElementById('displayGenderIdentity').innerText = data.customGenderIdentity;
            document.getElementById('customGenderDisplay').style.display = 'block';
        } else {
            document.getElementById('displayGenderIdentity').innerText = data.genderIdentity || 'Not provided';
            document.getElementById('customGenderDisplay').style.display = 'none';
        }

        // Handle other pronouns if "Other"
        if (data.pronouns === 'Other') {
            document.getElementById('displayPronouns').innerText = data.otherPronouns;
            document.getElementById('otherPronounsDisplay').style.display = 'block';
        } else {
            document.getElementById('displayPronouns').innerText = data.pronouns || 'Not provided';
            document.getElementById('otherPronounsDisplay').style.display = 'none';
        }
    }

    function handleCustomLinks(links) {
        document.getElementById('customLink1').value = links[0] || '';
        document.getElementById('customLink1Display').innerHTML = links[0] ? `<a href="${links[0]}" target="_blank">${links[0]}</a>` : '';
        document.getElementById('customLink2').value = links[1] || '';
        document.getElementById('customLink2Display').innerHTML = links[1] ? `<a href="${links[1]}" target="_blank">${links[1]}</a>` : '';
        document.getElementById('customLink3').value = links[2] || '';
        document.getElementById('customLink3Display').innerHTML = links[2] ? `<a href="${links[2]}" target="_blank">${links[2]}</a>` : '';
    }

    // Toggle edit mode or cancel edit if already in edit mode
    document.getElementById('editButton').addEventListener('click', function() {
        toggleEditMode();
    });

    document.getElementById('cancelButton').addEventListener('click', function() {
        toggleEditMode(false);
    });

    function toggleEditMode(showEdit = true) {
        const profileForm = document.getElementById('profileForm');
        const profileView = document.getElementById('profileView');

        if (showEdit) {
            profileView.style.display = 'none';
            profileForm.style.display = 'block';
        } else {
            profileView.style.display = 'block';
            profileForm.style.display = 'none';
            resetProfileImage();
        }
    }

    // Image preview functionality during editing
    document.getElementById('profileImage').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profileImagePreviewForm').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function resetProfileImage() {
        document.getElementById('profileImagePreview').src = originalProfileImage;
        document.getElementById('profileImagePreviewForm').src = originalProfileImage;
    }

    // Function to show/hide custom gender identity field based on selection
    function toggleCustomGender() {
        const genderIdentityField = document.getElementById('genderIdentity');
        if (genderIdentityField.value === 'Not Listed') {
            document.getElementById('customGenderLabel').style.display = 'block';
            document.getElementById('customGenderIdentity').style.display = 'block';
        } else {
            document.getElementById('customGenderLabel').style.display = 'none';
            document.getElementById('customGenderIdentity').style.display = 'none';
        }
    }

    // Function to show/hide other pronouns field based on selection
    function toggleOtherPronouns() {
        const pronounsField = document.getElementById('pronouns');
        if (pronounsField.value === 'Other') {
            document.getElementById('otherPronounsLabel').style.display = 'block';
            document.getElementById('otherPronouns').style.display = 'block';
        } else {
            document.getElementById('otherPronounsLabel').style.display = 'none';
            document.getElementById('otherPronouns').style.display = 'none';
        }
    }

    document.getElementById('genderIdentity').addEventListener('change', toggleCustomGender);
    document.getElementById('pronouns').addEventListener('change', toggleOtherPronouns);

    // Copy URL to clipboard functionality
    document.getElementById('copyButton').addEventListener('click', function() {
        const profileUrl = document.getElementById('profileUrl').href;
        const tempInput = document.createElement('input');
        tempInput.value = profileUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    });

    // Validate username format and uniqueness
    const usernameInput = document.getElementById('username');
    const feedbackElement = document.getElementById('usernameFeedback');
    const validUsername = /^[a-z0-9_-]{1,30}$/;

    async function checkUsername() {
        const username = usernameInput.value.trim().toLowerCase();

        if (!validUsername.test(username)) {
            feedbackElement.innerText = 'Invalid username format.';
            feedbackElement.style.color = 'red';
            return false;
        }

        if (username === currentUsername) {
            feedbackElement.innerText = 'This is your current username.';
            feedbackElement.style.color = 'green';
            return true;
        }

        const isUnique = await checkUsernameUniqueness(username);
        if (!isUnique) {
            feedbackElement.innerText = 'Username is already taken.';
            feedbackElement.style.color = 'red';
            return false;
        }

        feedbackElement.innerText = 'Username is available!';
        feedbackElement.style.color = 'green';
        return true;
    }

    async function checkUsernameUniqueness(username) {
        try {
            const response = await fetch(`http://media.maar.world:3001/api/checkUsername?username=${username}`);
            const data = await response.json();
            return data.isUnique;
        } catch (error) {
            console.error('Error checking username uniqueness:', error);
            return false;
        }
    }

    usernameInput.addEventListener('input', checkUsername);

    // Submit profile form
    document.getElementById('profileForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const isUsernameValid = await checkUsername();
        if (!isUsernameValid) return;

        const formData = new FormData();
        populateFormData(formData);

        // Handle form submission with progress
        submitFormData(formData);
    });

    function populateFormData(formData) {
        formData.append('userId', userId);
        formData.append('username', usernameInput.value.trim().toLowerCase());
        formData.append('genderIdentity', document.getElementById('genderIdentity').value);
        if (document.getElementById('genderIdentity').value === 'Not Listed') {
            formData.append('customGenderIdentity', document.getElementById('customGenderIdentity').value);
        }
        formData.append('pronouns', document.getElementById('pronouns').value);
        if (document.getElementById('pronouns').value === 'Other') {
            formData.append('otherPronouns', document.getElementById('otherPronouns').value);
        }
        formData.append('phone', document.getElementById('phone').value);
        if (document.getElementById('profileImage').files[0]) {
            formData.append('profileImage', document.getElementById('profileImage').files[0]);
        }

        formData.append('displayName', document.getElementById('displayName').value.trim());
        formData.append('city', document.getElementById('city').value.trim());
        formData.append('country', document.getElementById('country').value.trim());
        formData.append('bio', document.getElementById('bio').value.trim());
        formData.append('customLinks', JSON.stringify([
            document.getElementById('customLink1').value.trim(),
            document.getElementById('customLink2').value.trim(),
            document.getElementById('customLink3').value.trim()
        ]));
    }

    function submitFormData(formData) {
        const progressBar = document.getElementById('progress');
        progressBar.style.width = '0%';
        document.querySelector('.progress-bar').style.display = 'block';

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://media.maar.world:3001/api/updateUserProfile', true);

        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                progressBar.style.width = percentComplete + '%';
            }
        };

        xhr.onload = function() {
            const response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && response.success) {
                // Invalidate cached data after successful update
                localStorage.removeItem('profileData');
                document.getElementById('messageDisplay').innerText = 'Profile updated successfully!';
                document.getElementById('messageDisplay').style.color = 'green';
                window.location.reload();
            } else {
                document.getElementById('messageDisplay').innerText = `Failed to update profile: ${response.message}`;
                document.getElementById('messageDisplay').style.color = 'red';
            }
        };

        xhr.onerror = function() {
            document.getElementById('messageDisplay').innerText = 'An error occurred while updating your profile.';
            document.getElementById('messageDisplay').style.color = 'red';
        };

        xhr.send(formData);
    }

    // Initial call to fetch profile
    fetchUserProfile(userId);


    // Function to check if the username is unique
    async function checkUsernameUniqueness(username) {
        try {
            const response = await fetch(`http://media.maar.world:3001/api/checkUsername?username=${username}`);
            const data = await response.json();
            return data.isUnique; // Assuming server returns { isUnique: true/false }
        } catch (error) {
            console.error('Error checking username uniqueness:', error);
            return false;
        }
    }

});
</script>
