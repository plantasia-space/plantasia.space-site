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
    <p>Edit your profile information below.</p>



        <!-- Profile Image Preview -->
        <div id="profileImagePreviewContainer" style="width: 256px; height: 256px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;">
            <img id="profileImagePreview" src="" alt="Profile Image Preview" style="max-width: 100%; max-height: 100%; display: none;">
        </div><br><br>
        <!-- Profile Image Upload -->
        <label for="profileImage">Profile Image:</label>
        <input type="file" id="profileImage" name="profileImage" accept=".jpg, .jpeg, .png"><br><br>
    <form id="profileForm" class="contact-form">
        <!-- Username -->
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>

        <!-- Email (Read-Only) -->
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" readonly><br><br>

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

        <!-- Phone -->
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone"><br><br>



        <!-- Submit Button -->
        <button type="submit">Update Profile</button>
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
    const email = localStorage.getItem('userEmail');
    if (!email) {
        alert('No logged-in user found. Please log in first.');
        window.location.href = '/login';
        return;
    }

    // Fetch user data based on the email
    fetch(`http://media.maar.world:3001/api/getUserProfile?email=${email}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').value = data.username;
            document.getElementById('email').value = data.email;
            document.getElementById('genderIdentity').value = data.genderIdentity;
            if (data.genderIdentity === 'Not Listed') {
                document.getElementById('customGenderIdentity').value = data.customGenderIdentity;
                document.getElementById('customGenderLabel').style.display = 'block';
                document.getElementById('customGenderIdentity').style.display = 'block';
            }
            document.getElementById('pronouns').value = data.pronouns;
            if (data.pronouns === 'Other') {
                document.getElementById('otherPronouns').value = data.otherPronouns;
                document.getElementById('otherPronounsLabel').style.display = 'block';
                document.getElementById('otherPronouns').style.display = 'block';
            }
            document.getElementById('phone').value = data.phone;
            if (data.profileImage) {
                document.getElementById('profileImagePreview').src = data.profileImage;
                document.getElementById('profileImagePreview').style.display = 'block';
            }
        })
        .catch(error => console.error('Error fetching user data:', error));

    document.getElementById('genderIdentity').addEventListener('change', function() {
        if (this.value === 'Not Listed') {
            document.getElementById('customGenderLabel').style.display = 'block';
            document.getElementById('customGenderIdentity').style.display = 'block';
        } else {
            document.getElementById('customGenderLabel').style.display = 'none';
            document.getElementById('customGenderIdentity').style.display = 'none';
        }
    });

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

        const formData = new FormData();
        formData.append('username', document.getElementById('username').value);
        formData.append('email', document.getElementById('email').value);
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

        document.getElementById('loadingMessage').style.display = 'block';

        fetch('http://media.maar.world:3001/api/updateUserProfile', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loadingMessage').style.display = 'none';
            if (data.success) {
                alert('Profile updated successfully!');
                window.location.reload();
            } else {
                alert('Failed to update profile: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            document.getElementById('loadingMessage').style.display = 'none';
            alert('An error occurred while updating your profile.');
        });
    });
});
</script>
