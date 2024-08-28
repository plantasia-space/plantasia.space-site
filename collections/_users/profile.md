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
    <h3>xPlorer Profile</h3>
<div class="p-2"></div>

<div id="profileView">
    <!-- Profile Image Display -->
    <div id="profileImagePreviewContainer">
        <img id="profileImagePreview" src="" alt="Profile Image">
    </div>
    <!-- Edit Button -->
    <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Profile">
        <span class="material-symbols-outlined">edit</span> 
    </button>
    <div class="p-2"></div>
    <!-- Displayed Profile Information -->
    <p><strong>Username:</strong> <span id="displayUsername"></span></p>
    <p><strong>Email:</strong> <span id="displayEmail"></span></p>
    <p><strong>Gender Identity:</strong> <span id="displayGenderIdentity"></span></p>
    <p id="customGenderDisplay" style="display: none;"><strong>Custom Gender Identity:</strong> <span id="displayCustomGenderIdentity"></span></p>
    <p><strong>Pronouns:</strong> <span id="displayPronouns"></span></p>
    <p id="otherPronounsDisplay" style="display: none;"><strong>Other Pronouns:</strong> <span id="displayOtherPronouns"></span></p>
    <p><strong>Phone:</strong> <span id="displayPhone"></span></p>
    <p><strong>Role:</strong> <span id="displayRole"></span></p> <!-- Added role display -->

</div>

<form id="profileForm" class="contact-form" style="display: none;">
    <!-- Profile Image Upload -->
    <label for="profileImage">Profile Image:</label>
    <div id="profileImagePreviewContainer">
        <img id="profileImagePreviewForm" src="" alt="Profile Image">
    </div>
    <input type="file" id="profileImage" name="profileImage" accept=".jpg, .jpeg, .png"><br><br>

<!-- Username -->
<label for="username">Username:</label>
<input type="text" id="username" name="username" required><br><br>

<!-- Email (Read-Only) -->
<label for="email">Email:</label>
<input type="email" id="email" name="email" readonly><br><br>

<!-- Phone -->
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone"><br><br>

<!-- Gender Identity -->
<label for="genderIdentity">Gender Identity:</label>
<select id="genderIdentity" name="genderIdentity" required>
    <option value="Prefer not to reply">Prefer not to reply</option>
    <option value="Woman">Woman</option>
    <option value="Man">Man</option>
    <option value="Trans woman">Trans woman</option>
    <option value="Trans man">Trans man</option>
    <option value="Non-Binary">Non-Binary</option>
    <option value="Not Listed">Not Listed</option>
</select><br><br>

<!-- Custom Gender Identity (Shown when "Not Listed" is selected) -->
<label for="customGenderIdentity" id="customGenderLabel" style="display: none;">Please specify:</label>
<input type="text" id="customGenderIdentity" name="customGenderIdentity" style="display: none;"><br><br>

<!-- Pronouns -->
<label for="pronouns">Pronouns:</label>
<select id="pronouns" name="pronouns" required>
    <option value="She/Her">She/Her</option>
    <option value="He/Him">He/Him</option>
    <option value="They/Them">They/Them</option>
    <option value="Ze/Hir">Ze/Hir</option>
    <option value="Ze/Zir">Ze/Zir</option>
    <option value="Prefer not to say">Prefer not to say</option>
    <option value="Other">Other</option>
</select><br><br>

<!-- Custom Pronouns (Shown when "Other" is selected) -->
<label for="otherPronouns" id="otherPronounsLabel" style="display: none;">Please specify:</label>
<input type="text" id="otherPronouns" name="otherPronouns" style="display: none;"><br><br>



<button type="submit"><span class="material-symbols-outlined">check_circle</span> Update Profile</button>
<div class="p-2"></div>

<button type="button" id="cancelButton" class="btn btn-secondary"><span class="material-symbols-outlined">cancel</span> Cancel</button>
<div class="p-5"></div>



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
            document.getElementById('displayGenderIdentity').innerText = data.genderIdentity || 'Not provided';
            document.getElementById('displayPronouns').innerText = data.pronouns || 'Not provided';
            document.getElementById('displayPhone').innerText = data.phone || 'Not provided';
            document.getElementById('displayRole').innerText = data.role || 'Not provided'; // Populate role

            if (data.profileImage) {
                originalProfileImage = `https://media.maar.world${data.profileImage}`;
                document.getElementById('profileImagePreview').src = originalProfileImage;
                document.getElementById('profileImagePreviewForm').src = originalProfileImage; // Update the form preview as well
                document.getElementById('profileImagePreview').style.display = 'block';
                document.getElementById('profileImagePreviewForm').style.display = 'block'; // Ensure form preview is displayed
            }

            // Populate form fields (hidden until edit mode)
            document.getElementById('username').value = data.username || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('genderIdentity').value = data.genderIdentity || '';
            document.getElementById('pronouns').value = data.pronouns || '';

            // Show/hide custom gender identity field
            if (data.genderIdentity === 'Not Listed') {
                document.getElementById('customGenderLabel').style.display = 'block';
                document.getElementById('customGenderIdentity').style.display = 'block';
                document.getElementById('customGenderIdentity').value = data.customGenderIdentity || '';
            }

            // Show/hide other pronouns field
            if (data.pronouns === 'Other') {
                document.getElementById('otherPronounsLabel').style.display = 'block';
                document.getElementById('otherPronouns').style.display = 'block';
                document.getElementById('otherPronouns').value = data.otherPronouns || '';
            }
        })
        .catch(error => console.error('Error fetching user data:', error));

    // Toggle edit mode
    document.getElementById('editButton').addEventListener('click', function() {
        document.getElementById('profileView').style.display = 'none';
        document.getElementById('profileForm').style.display = 'block';

        // Display the original image in edit mode
        if (originalProfileImage) {
            document.getElementById('profileImagePreviewForm').src = originalProfileImage;
            document.getElementById('profileImagePreviewForm').style.display = 'block';
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
