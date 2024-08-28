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
    <h3>User Profile</h3>
    <p id="editMessage">View and edit your profile information below.</p>

    <div id="profileView">
        <!-- Profile Image Display -->
        <div id="profileImagePreviewContainer" style="width: 256px; height: 256px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;">
            <img id="profileImagePreview" src="" alt="Profile Image" style="max-width: 100%; max-height: 100%; display: none;">
        </div><br>

        <!-- Displayed Profile Information -->
        <p><strong>Username:</strong> <span id="displayUsername"></span></p>
        <p><strong>Email:</strong> <span id="displayEmail"></span></p>
        <p><strong>Gender Identity:</strong> <span id="displayGenderIdentity"></span></p>
        <p id="customGenderDisplay" style="display: none;"><strong>Custom Gender Identity:</strong> <span id="displayCustomGenderIdentity"></span></p>
        <p><strong>Pronouns:</strong> <span id="displayPronouns"></span></p>
        <p id="otherPronounsDisplay" style="display: none;"><strong>Other Pronouns:</strong> <span id="displayOtherPronouns"></span></p>
        <p><strong>Phone:</strong> <span id="displayPhone"></span></p>

        <!-- Edit Button -->
        <button id="editButton" class="btn btn-primary">
            <span class="material-symbols-outlined">edit</span> Edit Profile
        </button>
    </div>

    <form id="profileForm" class="contact-form" style="display: none;">
        <!-- Profile Image Upload -->
        <label for="profileImage">Profile Image:</label>
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

        <!-- Submit Button -->
        <button type="submit">Update Profile</button>
        <!-- Cancel Button -->
        <button type="button" id="cancelButton" class="btn btn-secondary">Cancel</button>
    </form>

    <div id="loadingMessage" style="display: none; text-align: center;">
        <p>Updating your profile, please wait...</p>
        <div class="progress-bar" style="width: 100%; background-color: lightgray;">
            <div id="progress" style="width: 0%; height: 20px; background-color: green;"></div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('No logged-in user found. Please log in first.');
        window.location.href = '/login';
        return;
    }

    // Fetch user data based on the userId
    fetch(`http://media.maar.world:3001/api/getUserProfile?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log('Received user data:', data); // Log the received data for inspection

            // Populate display fields
            document.getElementById('displayUsername').innerText = data.username;
            document.getElementById('displayEmail').innerText = data.email;
            document.getElementById('displayGenderIdentity').innerText = data.genderIdentity || 'Not provided';
            document.getElementById('displayPronouns').innerText = data.pronouns || 'Not provided';
            document.getElementById('displayPhone').innerText = data.phone || 'Not provided';
            if (data.profileImage) {
                document.getElementById('profileImagePreview').src = `https://media.maar.world${data.profileImage}`;
                document.getElementById('profileImagePreview').style.display = 'block';
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
    });

    // Cancel button functionality
    document.getElementById('cancelButton').addEventListener('click', function() {
        document.getElementById('profileForm').style.display = 'none';
        document.getElementById('profileView').style.display = 'block';
    });

    // Show/hide custom gender identity field based on selection
    document.getElementById('genderIdentity').addEventListener('change', function() {
        if (this.value === 'Not Listed') {
            document.getElementById('customGenderLabel').style.display = 'block';
            document.getElementById('customGenderIdentity').style.display = 'block';
        } else {
            document.getElementById('customGenderLabel').style.display = 'none';
            document.getElementById('customGenderIdentity').style.display = 'none';
        }
    });

    // Show/hide other pronouns field based on selection
    document.getElementById('pronouns').addEventListener('change', function() {
        if (this.value === 'Other') {
            document.getElementById('otherPronounsLabel').style.display = 'block';
            document.getElementById('otherPronouns').style.display = 'block';
        } else {
            document.getElementById('otherPronounsLabel').style.display = 'none';
            document.getElementById('otherPronouns').style.display = 'none';
        }
    });

    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        if (username === '') {
            alert('Username cannot be empty');
            return;
        }

        const userId = localStorage.getItem('userId');
        console.log('Retrieved userId:', userId); // Debugging

        const formData = new FormData();
        formData.append('userId', userId); // Ensure userId is included
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

        // Debugging: Log the FormData content
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        fetch('http://media.maar.world:3001/api/updateUserProfile', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Profile updated successfully!');
                window.location.reload();
            } else {
                alert('Failed to update profile: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating your profile.');
        });
    });
});
</script>
