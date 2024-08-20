---
layout: articles
show_title: false
show_date: false
permalink: /track-release
titles:
  en: &EN Track Release
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
---

<div class="p-5"></div>

<div class="form-container">
    <h3>Track Release Form</h3>
    <p>Fill the form with details about your track.</p>

    <form id="articleForm" class="contact-form">
        <!-- New Artistic Exoplanet Selection -->
        <label for="exoplanet">Choose an Artistic Exoplanet for this release:</label>
        <select id="exoplanet" name="exoplanet" required>
            <option value="">Please select an exoplanet</option>
        </select><br><br>

        <!-- Cover Image Upload -->
        <label for="uploadCoverImage">Upload Cover Image (Best Size: 800x800 pixels, Max: 2MB, JPG or PNG):</label>
        <input type="file" id="uploadCoverImage" name="coverImage" accept=".jpg, .jpeg, .png" required><br><br>

        <!-- Cover Image Preview -->
        <div id="coverImagePreviewContainer" style="width: 256px; height: 256px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;">
            <img id="coverImagePreview" src="" alt="Cover Image Preview" style="max-width: 100%; max-height: 100%; display: none;">
        </div><br><br>


        <!-- Track Information -->
        <label for="artistName">Artist Name:*</label>
        <input type="text" id="artistName" name="artistName" required><br><br>

        <label for="songName">Song Name:*</label>
        <input type="text" id="songName" name="songName" required><br><br>

        <label for="uploadWAV">Upload Audio File (.WAV or .AIFF):</label>
        <input type="file" id="uploadWAV" name="audioFileWAV" accept=".wav, .aiff, .aif, .wave" required><br><br>

        <label for="uploadMP3">Upload Audio File (.MP3 256-KBPS):</label>
        <input type="file" id="uploadMP3" name="audioFileMP3" accept=".mp3" required><br><br>

        <!-- Categories -->
        <label for="type">Type:*</label>
        <select id="type" name="type" required>
            <option value="">Please select a type</option>
            <option value="Music">Music</option>
            <option value="Spoken Voice">Spoken Voice</option>
            <option value="Soundscape">Soundscape</option>
            <option value="Other">Other</option>
        </select><br><br>

        <label for="genre">Genre:</label>
        <input type="text" id="genre" name="genre"><br><br>

        <label for="mood">Mood:</label>
        <input type="text" id="mood" name="mood"><br><br>

        <label for="additionalTags">Additional Tags:</label>
        <input type="text" id="additionalTags" name="additionalTags"><br><br>

        <!-- Description -->
        <label for="description">Description:*</label>
        <textarea id="description" name="description" required rows="4" style="width: 100%;"></textarea><br><br>

        <!-- Collaborators -->
        <label for="credits">Credits:*</label>
        <input type="text" id="credits" name="credits" required><br><br>

        <label for="privacy">Privacy:</label>
        <select id="privacy" name="privacy">
            <option value="public">Public</option>
            <option value="private">Private</option>
        </select><br><br>

        <!-- Metadata -->
        <label for="releaseDate">Release Date:</label>
        <input type="date" id="releaseDate" name="releaseDate" required><br><br>

        <!-- License Selection -->
        <label for="licence">License:</label>
        <select id="licence" name="licence">
            <option value="regenerative">This work has Regenerative Music Copy Nibble 1.0</option>
            <option value="creative-commons">This work is licensed under CC BY-SA 4.0</option>
        </select><br><br>

        <!-- License Information Display -->
        <p>Regenerative Music Copy Nibble 1.0:</p>
        <a href="https://4fqic5ajlayeqxfzzlq2pamrrqfwc2hthgaklvw3y3jrjtniikba.arweave.net/4WCBdAlYMEhcucrhp4GRjAthaPM5gKXW28bTFM2oQoI" target="_blank">
            Read more about Regenerative Music Copy Nibble 1.0
        </a><br><br>

        <p>Creative Commons CC BY-SA 4.0:</p>
        <a href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank">
            Read more about CC BY-SA 4.0
        </a><br><br>

        <!-- Advanced -->
        <label for="enableDirectDownloads">Enable Direct Downloads:</label>
        <input type="checkbox" id="enableDirectDownloads" name="enableDirectDownloads"><br><br>

        <button type="submit">Submit</button>
    </form>

    <div id="loadingMessage" style="display: none; text-align: center;">
    <p>Uploading your track, please wait...</p>
    <div class="progress-bar" style="width: 100%; background-color: lightgray;">
        <div id="progress" style="width: 0%; height: 20px; background-color: green;"></div>
    </div>
</div>


</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://media.maar.world:3001/api/fetchExoplanetData')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('exoplanet');
            selectElement.innerHTML = '<option value="">Please select an exoplanet</option>';
            data.forEach(item => {
                Object.keys(item).forEach(ipId => {
                    const exoplanet = item[ipId];
                    if (exoplanet.artName && exoplanet.artName !== "null") {
                        const option = document.createElement('option');
                        option.value = ipId;
                        option.textContent = `${ipId}: ${exoplanet.artName} - ${exoplanet.sciName}`;
                        selectElement.appendChild(option);
                    }
                });
            });
        })
        .catch(error => console.error('Error loading or parsing the JSON data:', error));

    // Handle Cover Image Preview and Validation
    const coverImageInput = document.getElementById('uploadCoverImage');
    const coverImagePreview = document.getElementById('coverImagePreview');
    const coverImagePreviewContainer = document.getElementById('coverImagePreviewContainer');

    coverImageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert('Invalid file type. Please upload a JPG or PNG image.');
                coverImageInput.value = '';
                return;
            }

            // Validate file size (2MB = 2097152 bytes)
            if (file.size > 2097152) {
                alert('File size exceeds 2MB. Please upload a smaller image.');
                coverImageInput.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                coverImagePreview.src = e.target.result;
                coverImagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            coverImagePreview.src = '';
            coverImagePreview.style.display = 'none';
        }
    });
});

document.getElementById('articleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const trackData = {
        exoplanet: document.getElementById('exoplanet').value,
        artistName: document.getElementById('artistName').value,
        songName: document.getElementById('songName').value,
        type: document.getElementById('type').value,
        genre: document.getElementById('genre').value,
        mood: document.getElementById('mood').value,
        additionalTags: document.getElementById('additionalTags').value,
        description: document.getElementById('description').value,
        credits: document.getElementById('credits').value,
        privacy: document.getElementById('privacy').value,
        releaseDate: document.getElementById('releaseDate').value,
        licence: document.getElementById('licence').value,
        enableDirectDownloads: document.getElementById('enableDirectDownloads').checked
    };

    // Disable form elements and show loading message
    const loadingMessage = document.getElementById('loadingMessage');
    const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm button, #articleForm textarea');
    const submitButton = document.querySelector('#articleForm button[type="submit"]');
    formElements.forEach(element => element.disabled = true);
    submitButton.textContent = 'Submitting...';
    loadingMessage.style.display = 'block';

    // Send metadata as JSON
    fetch('http://media.maar.world:3001/api/submitTrackData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trackData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.trackId) {
            // If track data is accepted, proceed with file upload
            uploadFiles(data.trackId);
        } else {
            console.error('Error submitting track data:', data);
            showError('Failed to submit track data.');
        }
    })
    .catch(error => {
        console.error('Failed to submit track data:', error);
        showError('Failed to submit track data.');
    });

    function uploadFiles(trackId) {
        const formData = new FormData();
        formData.append('audioFileWAV', document.getElementById('uploadWAV').files[0]);
        formData.append('audioFileMP3', document.getElementById('uploadMP3').files[0]);
        formData.append('coverImage', document.getElementById('uploadCoverImage').files[0]); // Add cover image to the upload

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://media.maar.world:3001/api/uploadTrackFiles/${trackId}`, true);

        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                const progress = document.getElementById('progress');
                progress.style.width = percentComplete + '%';
            }
        };

        xhr.onload = function() {
            loadingMessage.style.display = 'none';
            formElements.forEach(element => element.disabled = false); // Re-enable the form elements
            submitButton.textContent = 'Submit'; // Reset the submit button text

            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log('Files uploaded successfully:', response);
                document.getElementById('articleForm').reset();  // Reset form fields
                showSuccess('Track released successfully!');
                coverImagePreview.src = '';  // Reset image preview
                coverImagePreview.style.display = 'none';
            } else {
                console.error('Error uploading files:', xhr.responseText);
                showError('Failed to upload files.');
            }
        };

        xhr.onerror = function() {
            loadingMessage.style.display = 'none';
            formElements.forEach(element => element.disabled = false); // Re-enable the form elements
            submitButton.textContent = 'Submit'; // Reset the submit button text
            console.error('Error during upload:', xhr.responseText);
            showError('Failed to upload files.');
        };

        xhr.send(formData);
    }

    function showError(message) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
        document.querySelector('.form-container').appendChild(errorMessage);
        formElements.forEach(element => element.disabled = false);
        submitButton.textContent = 'Submit';
        loadingMessage.style.display = 'none';
    }

    function showSuccess(message) {
        const successMessage = document.createElement('p');
        successMessage.textContent = message;
        successMessage.style.color = 'green';
        document.querySelector('.form-container').appendChild(successMessage);
        formElements.forEach(element => element.disabled = false);
        submitButton.textContent = 'Submit';
        loadingMessage.style.display = 'none';
    }
});


</script>
