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
public: false 
---

<div class="p-5"></div>

<div class="form-container">
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">brightness_6</span>
                </button>
            </a>
        </div>
    <div class="edit-button-container">
        <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Profile" data-mode="view">
            <span class="material-symbols-outlined" id="editButtonIcon">edit</span> 
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
            <span id="separator1" style="display:none;"> | </span> <!-- Hide separator by default --><br>
            <span id="customLink2Display"></span>
            <span id="separator2" style="display:none;"> | </span> <!-- Hide separator by default --><br>
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
        <button type="submit"> Update Profile</button>
        <div class="p-2"></div>

        <!-- Cancel Button -->
        <button type="button" id="cancelButton" class="btn btn-secondary">Cancel</button>
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
    let currentUsername = ''; // Store the current username
    let isEditMode = false; // Track current mode

    // Fetch profile data
    fetchUserProfile(userId);

    async function fetchUserProfile(userId, forceRefresh = false) {
        const cacheKey = `profile_${userId}`;
        try {
            const data = await fetchDataWithCache(
                `https://api.plantasia.space:443/api/users/profile?userId=${userId}`,
                cacheKey,
                5, // Cache for 5 minutes
                forceRefresh
            );
            populateUserProfile(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            document.getElementById('messageDisplay').innerText = 'Error fetching user data. Please try again.';
        }
    }

function populateUserProfile(data) {
    console.log("Received profile data:", data); // Log profile data to verify content

    currentUsername = data.username || '';

    // Define the default image URL
    const defaultImageURL = "https://mw-storage.fra1.digitaloceanspaces.com/default/default-profile_thumbnail_mid.webp";

    // Set profile image to thumbMidURL if available, or fallback to the default image
    const previewImageURL = data.thumbMidURL || defaultImageURL;

    // Assign thumbMidURL or default image URL to the profile image elements
    const profileImageElement = document.getElementById('profileImagePreview');
    const profileImageFormElement = document.getElementById('profileImagePreviewForm');

    if (profileImageElement) {
        profileImageElement.src = previewImageURL;
        profileImageElement.style.display = 'block';
    }
    if (profileImageFormElement) {
        profileImageFormElement.src = previewImageURL;
        profileImageFormElement.style.display = 'block';
    }

    // Populate view mode fields
    document.getElementById('displayUsername').innerText = data.username || '';
    document.getElementById('displayUsernameForUrl').innerText = data.username || '';
    document.getElementById('profileUrl').href = `https://maar.world/xplorer/?username=${data.username || ''}`;
    document.getElementById('displayEmail').innerText = data.email || '';
    document.getElementById('displayPhone').innerText = data.phone || 'Not provided';
    document.getElementById('displayRole').innerText = data.role || 'Not provided';

    // Populate form fields for edit mode
    document.getElementById('displayName').value = data.displayName || '';
    document.getElementById('username').value = data.username || '';
    document.getElementById('phone').value = data.phone || '';

    // Handle gender identity and pronouns
    handleCustomFields(data);

    // Populate additional fields
    document.getElementById('displayDisplayName').innerText = data.displayName || '';
    document.getElementById('city').value = data.city || '';
    document.getElementById('displayCity').innerText = data.city || '';
    document.getElementById('country').value = data.country || '';
    document.getElementById('displayCountry').innerText = data.country || '';
    document.getElementById('bio').value = data.bio || '';
    document.getElementById('displayBio').innerText = data.bio || '';
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

    // Toggle edit mode or cancel edit
    document.getElementById('editButton').addEventListener('click', toggleEditMode);
    document.getElementById('cancelButton').addEventListener('click', toggleEditMode);

    function toggleEditMode() {
        isEditMode = !isEditMode;
        const profileForm = document.getElementById('profileForm');
        const profileView = document.getElementById('profileView');
        const editButtonIcon = document.getElementById('editButtonIcon');

        if (isEditMode) {
            profileView.style.display = 'none';
            profileForm.style.display = 'block';
            editButtonIcon.textContent = 'visibility';
        } else {
            profileView.style.display = 'block';
            profileForm.style.display = 'none';
            resetProfileImage();
            fetchUserProfile(userId, true);
            editButtonIcon.textContent = 'edit';
        }
    }

    document.getElementById('profileImage').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => document.getElementById('profileImagePreviewForm').src = e.target.result;
            reader.readAsDataURL(file);
        }
    });

    function resetProfileImage() {
        document.getElementById('profileImagePreview').src = originalProfileImage;
        document.getElementById('profileImagePreviewForm').src = originalProfileImage;
    }

    // Submit profile form with image upload
    document.getElementById('profileForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const isUsernameValid = await checkUsername();
        if (!isUsernameValid) return;

        const profileImageFile = document.getElementById('profileImage').files[0];
        let profileImageKey = null;

        if (profileImageFile) {
            try {
                profileImageKey = await uploadProfileImage(profileImageFile);
            } catch (error) {
                document.getElementById('messageDisplay').innerText = 'Failed to upload profile image. Please try again.';
                return;
            }
        }

        finalizeUserProfileUpdate(profileImageKey);
    });

async function uploadProfileImage(file) {
    const userId = localStorage.getItem('userId');

    console.log("Requesting presigned URL for image upload...");
    const presignedUrlResponse = await fetch('https://api.plantasia.space:443/api/users/generate-profile-image-upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, fileName: file.name, fileType: file.type })
    });
    const { uploadURL, fileKey } = await presignedUrlResponse.json();
    console.log("Presigned URL received:", { uploadURL, fileKey });

    await fetch(uploadURL, { method: 'PUT', body: file });
    return fileKey;
}

async function finalizeUserProfileUpdate(profileImageKey = null) {
    const userId = localStorage.getItem('userId');
    console.log("Finalizing profile with userId:", userId);

    if (!userId) {
        document.getElementById('messageDisplay').innerText = 'User ID is missing. Please log in again.';
        return;
    }

    const profileData = {
        userId,
        username: document.getElementById('username').value.trim().toLowerCase(),
        displayName: document.getElementById('displayName').value.trim(),
        phone: document.getElementById('phone').value,
        genderIdentity: document.getElementById('genderIdentity').value,
        customGenderIdentity: document.getElementById('customGenderIdentity').value || null,
        pronouns: document.getElementById('pronouns').value,
        otherPronouns: document.getElementById('otherPronouns').value || null,
        city: document.getElementById('city').value.trim(),
        country: document.getElementById('country').value.trim(),
        bio: document.getElementById('bio').value.trim(),
        customLinks: JSON.stringify([
            document.getElementById('customLink1').value.trim(),
            document.getElementById('customLink2').value.trim(),
            document.getElementById('customLink3').value.trim()
        ])
    };

    if (profileImageKey) {
        profileData.profileImageKey = profileImageKey;
    }

    const response = await fetch('https://api.plantasia.space:443/api/users/finalize-profile-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
    });

    const result = await response.json();
    console.log("Response from profile finalization:", result);

    if (result.success) {
        document.getElementById('messageDisplay').innerText = 'Profile updated successfully!';
        
        // Clear cache for the updated profile and fetch new data
        clearCachedData(`profile_${userId}`);
        
        // Wait a moment before re-fetching to ensure cache is cleared
        setTimeout(() => {
            fetchUserProfile(userId, true).then(() => {
                toggleEditMode(); // Switch back to view mode after refreshing profile data
            });
        }, 200); // Adjust delay if necessary
    } else {
        document.getElementById('messageDisplay').innerText = 'Failed to update profile. Please try again.';
    }
}

    // Validate username uniqueness
    const usernameInput = document.getElementById('username');
    const feedbackElement = document.getElementById('usernameFeedback');
    const validUsername = /^[a-z0-9_.]{1,30}$/;

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

        const isUnique = await checkUsernameUniqueness(username, userId);
        feedbackElement.innerText = isUnique ? 'Username is available!' : 'Username is already taken.';
        feedbackElement.style.color = isUnique ? 'green' : 'red';
        return isUnique;
    }

    const debouncedCheckUsername = debounce(checkUsername, 500);
    usernameInput.addEventListener('input', debouncedCheckUsername);

    async function checkUsernameUniqueness(username, currentUserId = null) {
        try {
            const url = new URL('https://api.plantasia.space:443/api/users/checkUsername');
            url.searchParams.append('username', username);
            if (currentUserId) {
                url.searchParams.append('currentUserId', currentUserId);
            }
            const response = await fetch(url.toString());
            const data = await response.json();
            return data.isUnique;
        } catch (error) {
            console.error('Error checking username uniqueness:', error);
            return false;
        }
    }

    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Initialize profile view on page load
    fetchUserProfile(userId);
});
</script>
