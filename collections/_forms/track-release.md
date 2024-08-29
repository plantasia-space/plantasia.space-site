---
layout: articles
show_title: false
show_date: false
permalink: /voyage/track-release
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
        <label for="exoplanet">Which Exoplanet would you like to choose for this release?:</label>
        <select id="exoplanet" name="exoplanet" required>
            <option value="">Please select an exoplanet</option>
        </select><br><br>

        <!-- Cover Image Upload -->
        <label for="uploadCoverImage">Could you please upload the cover image for your release? (Best Size: 800x800 pixels, Max: 2MB, JPG or PNG):</label>
        <input type="file" id="uploadCoverImage" name="coverImage" accept=".jpg, .jpeg, .png" required><br><br>

        <!-- Cover Image Preview -->
        <div id="coverImagePreviewContainer" style="width: 256px; height: 256px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;">
            <img id="coverImagePreview" src="" alt="Cover Image Preview" style="max-width: 100%; max-height: 100%; display: none;">
        </div><br><br>

        <!-- Track Information -->
        <div id="artistsContainer">
            <label>What is the artist's name, and how do they identify?</label>
            <div class="artistEntry">
                <input type="text" name="artistNames[]" placeholder="Artist Name" required>
                <select name="genderIdentities[]" class="genderIdentitySelect" required>
                    <option value="Prefer not to reply">Prefer not to reply</option>
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                    <option value="Trans woman">Trans woman</option>
                    <option value="Trans man">Trans man</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Not Listed">Not Listed</option>
                </select>
                <input type="text" name="customGenderIdentities[]" class="customGenderIdentityInput" placeholder="Please specify" style="display: none;">
                <button type="button" class="removeArtistButton" style="display: none;">Remove</button>
            </div>
        </div>
        <button type="button" id="addArtistButton">Add Another Artist</button>
        <br><br>

        <!-- Track Name -->
        <label for="trackName">What is the name of the track?*</label>
        <input type="text" id="trackName" name="trackName" required><br><br>

        <!-- MP3 Audio Upload -->
        <label for="uploadMP3">Please upload MP3 Audio File (Max 256kbps, Max 10 minutes):</label>
        <input type="file" id="uploadMP3" name="audioFileMP3" accept=".mp3" required><br><br>

        <!-- WAV or AIF Audio Upload -->
        <label for="uploadWAV">Please upload WAV or AIF Audio File (Max 10 minutes):</label>
        <input type="file" id="uploadWAV" name="audioFileWAV" accept=".wav, .aif, .aiff" required><br><br>

        <p>Both audio files from the same track are required. The MP3 file is used for general playback, while the WAV or AIF file is used for high-quality playback. Each file must be no longer than 10 minutes.</p>

        <!-- Categories -->
        <label for="type">Given the following categories, what type of content is this?*</label>
        <select id="type" name="type" required>
            <option value="">Please select a type</option>
            <option value="Music">Music</option>
            <option value="Spoken Voice">Spoken Voice</option>
            <option value="Soundscape">Soundscape</option>
            <option value="Other">Other</option>
        </select><br><br>

        <label for="genre">Does this track belong to any genre? If yes, which ones?</label>
        <input type="text" id="genre" name="genre"><br><br>

        <label for="mood">What mood does this track inspire?</label>
        <input type="text" id="mood" name="mood"><br><br>

        <label for="additionalTags">Would you like to add any additional tags for this release?</label>
        <input type="text" id="additionalTags" name="additionalTags"><br><br>

        <!-- Description -->
        <label for="description">Please provide a description for this release.*</label>
        <textarea id="description" name="description" required rows="4" style="width: 100%;"></textarea><br><br>

        <!-- Collaborators -->
        <label for="credits">Who should be credited for this work?*</label>
        <input type="text" id="credits" name="credits" required><br><br>

        <!-- Privacy -->
        <label for="privacy">Would you like to make this release public or private?</label>
        <select id="privacy" name="privacy">
            <option value="public">Public</option>
            <option value="private">Private</option>
        </select><br><br>

        <!-- Metadata -->
        <label for="releaseDate">When would you like this track to be released?</label>
        <input type="date" id="releaseDate" name="releaseDate" required><br><br>

        <!-- License Selection -->
        <label for="licence">Which license would you like to apply to this work?</label>
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
        <label for="enableDirectDownloads">Would you like to enable free direct downloads for this release?</label>
        <input type="checkbox" id="enableDirectDownloads" name="enableDirectDownloads"><br><br>
        <!-- Rights Confirmation Checkbox -->
        <label>
            <input type="checkbox" id="confirmRights" name="confirmRights" required>
            I confirm that I own the rights to all uploaded content.
        </label><br><br>
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
    // Fetch exoplanet data and populate dropdown
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

    const addArtistButton = document.getElementById('addArtistButton');
    const artistsContainer = document.getElementById('artistsContainer');

    // Update the visibility of the remove buttons
    function updateRemoveButtons() {
        const removeButtons = artistsContainer.querySelectorAll('.removeArtistButton');
        removeButtons.forEach(button => {
            button.style.display = removeButtons.length > 1 ? 'inline-block' : 'none';
        });
    }

    // Load saved data from localStorage
    loadFormData();

    // Save data on input change
    const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm textarea');
    formElements.forEach(element => {
        element.addEventListener('input', saveFormData);
    });

    function saveFormData() {
        const trackData = {
            exoplanet: document.getElementById('exoplanet').value,
            artists: collectArtists(),
            trackName: document.getElementById('trackName').value,
            type: document.getElementById('type').value,
            genre: document.getElementById('genre').value,
            mood: document.getElementById('mood').value,
            additionalTags: document.getElementById('additionalTags').value,
            description: document.getElementById('description').value,
            credits: document.getElementById('credits').value,
            privacy: document.getElementById('privacy').value,
            releaseDate: document.getElementById('releaseDate').value,
            licence: document.getElementById('licence').value,
            enableDirectDownloads: document.getElementById('enableDirectDownloads').checked,
            confirmRights: document.getElementById('confirmRights').checked
        };
        localStorage.setItem('trackReleaseFormData', JSON.stringify(trackData));
    }

    function collectArtists() {
        const artistNames = Array.from(document.getElementsByName('artistNames[]')).map(input => input.value);
        const genderIdentities = Array.from(document.getElementsByName('genderIdentities[]')).map((select, index) => {
            const customInput = document.getElementsByName('customGenderIdentities[]')[index];
            return select.value === 'Not Listed' ? customInput.value : select.value;
        });

        return artistNames.map((name, index) => ({
            name: name,
            genderIdentity: genderIdentities[index]
        }));
    }

    function loadFormData() {
        const savedData = JSON.parse(localStorage.getItem('trackReleaseFormData'));
        if (savedData) {
            document.getElementById('exoplanet').value = savedData.exoplanet;
            savedData.artists.forEach((artist, index) => {
                if (index > 0) addArtist(); // Add extra artist fields if necessary
                document.getElementsByName('artistNames[]')[index].value = artist.name;
                document.getElementsByName('genderIdentities[]')[index].value = artist.genderIdentity;
                if (artist.genderIdentity === 'Not Listed') {
                    document.getElementsByName('customGenderIdentities[]')[index].value = artist.genderIdentity;
                    document.getElementsByName('customGenderIdentities[]')[index].style.display = 'inline-block';
                }
            });
            document.getElementById('trackName').value = savedData.trackName;
            document.getElementById('type').value = savedData.type;
            document.getElementById('genre').value = savedData.genre;
            document.getElementById('mood').value = savedData.mood;
            document.getElementById('additionalTags').value = savedData.additionalTags;
            document.getElementById('description').value = savedData.description;
            document.getElementById('credits').value = savedData.credits;
            document.getElementById('privacy').value = savedData.privacy;
            document.getElementById('releaseDate').value = savedData.releaseDate;
            document.getElementById('licence').value = savedData.licence;
            document.getElementById('enableDirectDownloads').checked = savedData.enableDirectDownloads;
            document.getElementById('confirmRights').checked = savedData.confirmRights;
        }
    }

    function addArtist() {
        const artistEntry = document.createElement('div');
        artistEntry.className = 'artistEntry';
        artistEntry.innerHTML = `
            <input type="text" name="artistNames[]" placeholder="Artist Name" required>
            <select name="genderIdentities[]" class="genderIdentitySelect" required>
                <option value="Prefer not to reply">Prefer not to reply</option>
                <option value="Woman">Woman</option>
                <option value="Man">Man</option>
                <option value="Trans woman">Trans woman</option>
                <option value="Trans man">Trans man</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Not Listed">Not Listed</option>
            </select>
            <input type="text" name="customGenderIdentities[]" class="customGenderIdentityInput" placeholder="Please specify" style="display: none;">
            <button type="button" class="removeArtistButton" style="display: none;">Remove</button>
        `;
        document.getElementById('artistsContainer').appendChild(artistEntry);
        updateRemoveButtons();
    }

    function updateRemoveButtons() {
        const removeButtons = artistsContainer.querySelectorAll('.removeArtistButton');
        removeButtons.forEach(button => {
            button.style.display = removeButtons.length > 1 ? 'inline-block' : 'none';
        });
    }


    // Add a new artist entry
    addArtistButton.addEventListener('click', function() {
        const artistEntry = document.createElement('div');
        artistEntry.className = 'artistEntry';
        artistEntry.innerHTML = `
            <input type="text" name="artistNames[]" placeholder="Artist Name" required>
            <select name="genderIdentities[]" class="genderIdentitySelect" required>
                <option value="Prefer not to reply">Prefer not to reply</option>
                <option value="Woman">Woman</option>
                <option value="Man">Man</option>
                <option value="Trans woman">Trans woman</option>
                <option value="Trans man">Trans man</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Not Listed">Not Listed</option>
            </select>
            <input type="text" name="customGenderIdentities[]" class="customGenderIdentityInput" placeholder="Please specify" style="display: none;">
            <button type="button" class="removeArtistButton" style="display: none;">Remove</button>
        `;
        artistsContainer.appendChild(artistEntry);
        updateRemoveButtons(); // Update remove buttons visibility after adding
    });

    // Handle dynamic elements
    artistsContainer.addEventListener('change', function(event) {
        if (event.target.classList.contains('genderIdentitySelect')) {
            const customInput = event.target.closest('.artistEntry').querySelector('.customGenderIdentityInput');
            customInput.style.display = event.target.value === 'Not Listed' ? 'inline-block' : 'none';
        }
    });

    artistsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('removeArtistButton')) {
            event.target.closest('.artistEntry').remove();
            updateRemoveButtons(); // Update remove buttons visibility after removing
        }
    });

    // Initialize the form with one artist entry by default
    updateRemoveButtons();

    document.getElementById('articleForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Collect artist names and gender identities
        const artistNames = Array.from(document.getElementsByName('artistNames[]')).map(input => input.value);
        const genderIdentities = Array.from(document.getElementsByName('genderIdentities[]')).map((select, index) => {
            const customInput = document.getElementsByName('customGenderIdentities[]')[index];
            return select.value === 'Not Listed' ? customInput.value : select.value;
        });

        const artists = artistNames.map((name, index) => ({
            name: name,
            genderIdentity: genderIdentities[index]
        }));

        // Check if the rights confirmation checkbox is checked
        const confirmRightsChecked = document.getElementById('confirmRights').checked;
        if (!confirmRightsChecked) {
            alert('You must confirm that you own the rights to all uploaded content.');
            return; // Stop form submission
        }
        
        const trackData = {
            exoplanet: document.getElementById('exoplanet').value,
            artists: artists,
            trackName: document.getElementById('trackName').value,
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
        console.log(trackData);

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
                'Content-Type': 'application/json',
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
                showError('Failed to submit track data, please try again.');
            }
        })
        .catch(error => {
            console.error('Failed to submit track data:', error);
            showError('Failed to submit track data, please try again.');
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
                    document.getElementById('coverImagePreview').src = '';  // Reset image preview
                    document.getElementById('coverImagePreview').style.display = 'none';
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
            // If form submission is successful, clear localStorage
            localStorage.removeItem('trackReleaseFormData');    
    });
});
</script>
