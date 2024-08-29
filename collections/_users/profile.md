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
        <p><strong>Profile URL:</strong> maar.world/xplorer/<span id="displayProfileURL"></span></p>
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
        <label for="profileImage">Profile Image:</label>
        <div id="profileImagePreviewContainer">
            <img id="profileImagePreviewForm" src="" alt="Profile Image">
        </div>
        <input type="file" id="profileImage" name="profileImage" accept=".jpg, .jpeg, .png"><br><br>

        <!-- Display Name -->

        <strong><label for="displayName">Display Name:</label></strong>
        <input type="text" id="displayName" name="displayName" required><br><br>


        <!-- Username -->
        <strong><label for="username">Username:</label></strong>
        <input type="text" id="username" name="username" required><br><br>

        <!-- Profile URL -->

        <strong><label for="profileURL">Profile URL:</label></strong>
        <span>maar.world/xplorer/</span>
        <input type="text" id="profileURL" name="profileURL" pattern="[a-zA-Z0-9]+" required><br><br>


        <!-- Email (Read-Only) -->
        <strong><label for="email">Email:</label></strong>
        <input type="email" id="email" name="email" readonly><br><br>

        <!-- Phone -->
        <strong><label for="phone">Phone:</label></strong>
        <input type="tel" id="phone" name="phone"><br><br>

        <!-- Gender Identity -->
        <strong><label for="genderIdentity">Gender Identity: </label></strong> This won’t be part of your public profile 
        <select id="genderIdentity" name="genderIdentity" required>
            <option value="Prefer not to reply">Prefer not to reply</option>
            <option value="Woman">Woman</option>
            <option value="Man">Man</option>
            <option value="Trans woman">Trans woman</option>
            <option value="Trans man">Trans man</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Not Listed">Not Listed</option>
        </select><br>

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
        <input type="text" id="city" name="city" ><br><br>

        <strong><label for="country">Country:</label></strong>
        <input type="text" id="country" name="country" ><br><br>

        <strong><label for="bio">Bio: (200 characters max)</label></strong>
        <textarea id="bio" name="bio" maxlength="200" ></textarea><br><br>

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
    if (!userId) {
        document.getElementById('messageDisplay').innerText = 'No logged-in user found. Please log in first.';
        document.getElementById('messageDisplay').style.color = 'red';
        window.location.href = '/login';
        return;
    }

    let originalProfileImage = '';

    // Fetch user data based on the userId
    fetch(`http://media.maar.world:3001/api/getUserProfile?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log('Received user data:', data);

            // Populate display fields
            document.getElementById('displayUsername').innerText = data.username;
            document.getElementById('displayEmail').innerText = data.email;
            document.getElementById('displayPhone').innerText = data.phone || 'Not provided';
            document.getElementById('displayRole').innerText = data.role || 'Not provided';

            // Populate form fields (hidden until edit mode)
            document.getElementById('username').value = data.username || ''; // Username for edit view
            document.getElementById('email').value = data.email || ''; // Email for edit view
            document.getElementById('phone').value = data.phone || ''; // Phone for edit view

            // Handle custom gender identity if "Not Listed"
            if (data.genderIdentity === 'Not Listed') {
                document.getElementById('displayGenderIdentity').innerText = data.customGenderIdentity;
                document.getElementById('customGenderDisplay').style.display = 'block';
                document.getElementById('displayCustomGenderIdentity').innerText = data.customGenderIdentity;
            } else {
                document.getElementById('displayGenderIdentity').innerText = data.genderIdentity || 'Not provided';
                document.getElementById('customGenderDisplay').style.display = 'none';
            }

            // Handle other pronouns if "Other"
            if (data.pronouns === 'Other') {
                document.getElementById('displayPronouns').innerText = data.otherPronouns;
                document.getElementById('otherPronounsDisplay').style.display = 'block';
                document.getElementById('displayOtherPronouns').innerText = data.otherPronouns;
            } else {
                document.getElementById('displayPronouns').innerText = data.pronouns || 'Not provided';
                document.getElementById('otherPronounsDisplay').style.display = 'none';
            }

            if (data.profileImage) {
                originalProfileImage = `https://media.maar.world${data.profileImage}`;
                document.getElementById('profileImagePreview').src = originalProfileImage;
                document.getElementById('profileImagePreviewForm').src = originalProfileImage;
                document.getElementById('profileImagePreview').style.display = 'block';
                document.getElementById('profileImagePreviewForm').style.display = 'block';
            }

            // New fields

            // Ensure displayName is populated correctly, even with emojis
            const displayName = data.displayName || '';
            document.getElementById('displayName').value = displayName; // Edit mode
            document.getElementById('displayDisplayName').innerText = displayName; // View mode

            // Extract the part after "maar.world/xplorer/" for profileURL
            const profileURLPrefix = "maar.world/xplorer/";
            let profileURL = data.profileURL || '';

            if (profileURL.startsWith(profileURLPrefix)) {
                profileURL = profileURL.substring(profileURLPrefix.length);
            }

            // Populate the profileURL in both view and edit modes
            document.getElementById('profileURL').value = profileURL || ''; // Edit mode
            document.getElementById('displayProfileURL').innerText = profileURL || 'Not provided'; // View mode

            // City and Country
            const city = data.city || '';
            document.getElementById('city').value = city; // Edit mode
            document.getElementById('displayCity').innerText = city; // View mode

            const country = data.country || '';
            document.getElementById('country').value = country; // Edit mode
            document.getElementById('displayCountry').innerText = country; // View mode

            // Bio
            const bio = data.bio || '';
            document.getElementById('bio').value = bio; // Edit mode
            document.getElementById('displayBio').innerText = bio; // View mode

            // Custom Links
            const customLinks = data.customLinks || [];
            document.getElementById('customLink1').value = customLinks[0] || ''; // Edit mode
            document.getElementById('customLink1Display').innerHTML = customLinks[0] ? `<a href="${customLinks[0]}" target="_blank">${customLinks[0]}</a>` : ''; // View mode

            document.getElementById('customLink2').value = customLinks[1] || ''; // Edit mode
            document.getElementById('customLink2Display').innerHTML = customLinks[1] ? `<a href="${customLinks[1]}" target="_blank">${customLinks[1]}</a>` : ''; // View mode

            document.getElementById('customLink3').value = customLinks[2] || ''; // Edit mode
            document.getElementById('customLink3Display').innerHTML = customLinks[2] ? `<a href="${customLinks[2]}" target="_blank">${customLinks[2]}</a>` : ''; // View mode

            // Show/hide custom gender identity field
            toggleCustomGender(); // Ensure the correct display of the custom gender field
            toggleOtherPronouns(); // Ensure the correct display of the other pronouns field

            // Trigger the functions on page load to ensure correct display if pre-selected
            toggleCustomGender();
            toggleOtherPronouns();
        })
        .catch(error => console.error('Error fetching user data:', error));

    // Toggle edit mode or cancel edit if already in edit mode
    document.getElementById('editButton').addEventListener('click', function() {
        const profileForm = document.getElementById('profileForm');
        const profileView = document.getElementById('profileView');
        
        if (profileForm.style.display === 'block') {
            // If the form is already displayed, treat it as a cancel action
            profileForm.style.display = 'none';
            profileView.style.display = 'block';
            
            // Revert to the original profile image if the user cancels
            document.getElementById('profileImagePreview').src = originalProfileImage;
            document.getElementById('profileImagePreviewForm').src = originalProfileImage;
        } else {
            // Otherwise, enable edit mode
            profileView.style.display = 'none';
            profileForm.style.display = 'block';

            // Display the original image in edit mode
            if (originalProfileImage) {
                document.getElementById('profileImagePreviewForm').src = originalProfileImage;
                document.getElementById('profileImagePreviewForm').style.display = 'block';
            }
        }
    });

    // Cancel button functionality
    document.getElementById('cancelButton').addEventListener('click', function() {
        // Revert to the original profile image if the user cancels
        document.getElementById('profileImagePreview').src = originalProfileImage;
        document.getElementById('profileImagePreviewForm').src = originalProfileImage;

        document.getElementById('profileForm').style.display = 'none';
        document.getElementById('profileView').style.display = 'block';
    });

    // Image preview functionality during editing
    document.getElementById('profileImage').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profileImagePreviewForm').src = e.target.result;
                document.getElementById('profileImagePreviewForm').style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to show/hide custom gender identity field based on selection
    function toggleCustomGender() {
        const genderIdentityField = document.getElementById('genderIdentity');
        if (genderIdentityField.value === 'Not Listed') {
            document.getElementById('customGenderLabel').style.display = 'block';
            document.getElementById('customGenderIdentity').style.display = 'block';
        } else {
            document.getElementById('customGenderLabel').style.display = 'none';
            document.getElementById('customGenderIdentity').style.display = 'none';
            document.getElementById('customGenderIdentity').value = ''; // Clear the field if hidden
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
            document.getElementById('otherPronouns').value = ''; // Clear the field if hidden
        }
    }

    // Attach event listeners for change events
    document.getElementById('genderIdentity').addEventListener('change', toggleCustomGender);
    document.getElementById('pronouns').addEventListener('change', toggleOtherPronouns);

    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        if (username === '') {
            document.getElementById('messageDisplay').innerText = 'Username cannot be empty';
            document.getElementById('messageDisplay').style.color = 'red';
            return;
        }

        const userId = localStorage.getItem('userId');
        console.log('Retrieved userId:', userId); // Debugging

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('email', document.getElementById('email').value);
        formData.append('username', document.getElementById('username').value);
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

        // New fields
        formData.append('displayName', document.getElementById('displayName').value.trim());
        formData.append('profileURL', 'maar.world/xplorer/' + document.getElementById('profileURL').value.trim());
        formData.append('city', document.getElementById('city').value.trim());
        formData.append('country', document.getElementById('country').value.trim());
        formData.append('bio', document.getElementById('bio').value.trim());
        formData.append('customLinks', JSON.stringify([
            document.getElementById('customLink1').value.trim(),
            document.getElementById('customLink2').value.trim(),
            document.getElementById('customLink3').value.trim()
        ]));

        // Progress bar initialization
        const progressBar = document.getElementById('progress');
        progressBar.style.width = '0%';
        document.querySelector('.progress-bar').style.display = 'block';

        // AJAX request with progress event
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
                // Update localStorage with the new data
                localStorage.setItem('userEmail', response.user.email);
                localStorage.setItem('userName', response.user.username);

                document.getElementById('messageDisplay').innerText = 'Profile updated successfully!';
                document.getElementById('messageDisplay').style.color = 'green';

                // Update originalProfileImage with the newly uploaded image
                if (response.user.profileImage) {
                    originalProfileImage = `https://media.maar.world${response.user.profileImage}`;
                }

                // Reload the page
                window.location.reload();
            } else {
                document.getElementById('messageDisplay').innerText = 'Failed to update profile: ' + response.message;
                document.getElementById('messageDisplay').style.color = 'red';
            }
        };

        xhr.onerror = function() {
            document.getElementById('messageDisplay').innerText = 'An error occurred while updating your profile.';
            document.getElementById('messageDisplay').style.color = 'red';
        };

        xhr.send(formData);
    });

});
</script>
