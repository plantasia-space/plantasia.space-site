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
public: false

---

<div class="form-container">
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Back to Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
            </a>
        </div>
        <div class="edit-button-container">
            <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Sound Engine" style="display: none;">
                <span class="material-symbols-outlined">edit</span> 
            </button>
        </div>
    </div>
    <h3>Track Release Form</h3>
    <p>Fill the form with details about your track.</p>

    <!-- View Mode -->
    <div id="interplanetaryPlayerView">







    </div> 

    <!-- Edit/Create Mode -->

    <form id="articleForm" class="contact-form">
        <!-- New Artistic Exoplanet Selection -->
        <label for="exoplanet">Which Exoplanet would you like to choose for this release?:</label>
        <select id="exoplanet" name="exoplanet" required>
            <option value="">Please select an exoplanet</option>
        </select><br><br>

        <!-- Sonic Engine Selection -->
        <label for="soundEngine">Which sonic engine would you like to use as the default for your Interplanetary Player?</label>
        <select id="soundEngine" name="soundEngine" >
            <option value="">Please select a sound engine</option>
        </select><br><br>
        <ul class="soundEngine-list" id="sound-engines-list"></ul>


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
    <!-- Toast Container -->
    <div id="toastContainer" style="position: fixed; top: 20px; right: 20px; z-index: 1000;"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Fetch the userId from localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
        showToast('You must be logged in to release a track.', 'error');
        window.location.href = '/login'; 
        return;
    }

    // Fetch exoplanet data and populate dropdown
    fetch('http://media.maar.world:3001/api/interplanetaryplayers/fetchExoplanetData')
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
        .catch(error => showToast('Error loading exoplanet data.', 'error'));
         fetchAvailableSoundEngines(userId);



function fetchAvailableSoundEngines(ownerId) {
    fetch(`http://media.maar.world:3001/api/soundEngines/available/${ownerId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Available Sound Engines:', data.soundEngines);
                soundEngineData = data.soundEngines; // Adjust based on actual API response structure
                populateSoundEngineDropdown();
            } else {
                console.error('Error fetching sound engines:', data.message);
            }
        })
        .catch(error => console.error('Error loading or parsing the sound engine data:', error));
}

function populateSoundEngineDropdown() {
    const selectElement = document.getElementById('soundEngine');
    selectElement.innerHTML = '<option value="">Please select a sound engine</option>';

    // Populate the dropdown with sound engines
    soundEngineData.forEach(engine => {
        const option = document.createElement('option');
        option.value = engine.soundEngineId; // Use the unique ID for the value
        option.textContent = `🎛️ ${engine.soundEngineName} 👤 ${engine.developerUsername} ${engine.isPublic ? "🔐 Exclusive" : "🌍 Shared"}`;

        selectElement.appendChild(option);
    });
}

function updateSoundEngineDetails() {
    const selectedEngineId = document.getElementById('soundEngine').value;
    console.log('Selected Engine ID:', selectedEngineId);
    console.log('Sound Engine Data:', soundEngineData);

    // Find the selected sound engine from the fetched data using soundEngineId
    const soundEngine = soundEngineData.find(engine => engine.soundEngineId === selectedEngineId);

    const soundEngineListElement = document.getElementById('sound-engines-list');
    soundEngineListElement.innerHTML = ''; // Clear previous details

    if (soundEngine) {
        const imageUrl = soundEngine.soundEngineImage 
            ? `https://media.maar.world${soundEngine.soundEngineImage}` 
            : 'https://media.maar.world/uploads/default/default-soundEngine.jpg';

        const engineElement = document.createElement('li');
        engineElement.classList.add('soundEngine-list-item');
        engineElement.innerHTML = `
            <div class="soundEngine-profile-pic">
                <img src="${imageUrl}" alt="${soundEngine.soundEngineName}" />
            </div>
            <div class="soundEngine-details">
                <div class="soundEngine-name"><strong>Name:</strong> ${soundEngine.soundEngineName}</div>
                <div class="soundEngine-credits"><strong>Developer:</strong> ${soundEngine.developerUsername}</div>
                <div class="soundEngine-availability"><strong>Availability:</strong> ${soundEngine.isPublic ? '🌍 Shared' : '🔐 Exclusive'}</div>
                <div class="soundEngine-params">
                    <strong>X Parameter:</strong> ${soundEngine.xParamLabel} 
                    (Min: ${soundEngine.xParamMin}, Max: ${soundEngine.xParamMax}, Init: ${soundEngine.xParamInit})<br>
                    <strong>Y Parameter:</strong> ${soundEngine.yParamLabel} 
                    (Min: ${soundEngine.yParamMin}, Max: ${soundEngine.yParamMax}, Init: ${soundEngine.yParamInit})<br>
                    <strong>Z Parameter:</strong> ${soundEngine.zParamLabel} 
                    (Min: ${soundEngine.zParamMin}, Max: ${soundEngine.zParamMax}, Init: ${soundEngine.zParamInit})
                    <div class="soundEngine-credits"><strong>Credits:</strong> ${soundEngine.credits}</div>

                </div>
            </div>

            </div>
        `;

        soundEngineListElement.appendChild(engineElement);
    } else {
        // If no sound engine is selected or found, display a default message
        soundEngineListElement.innerHTML = '<li>Please select a sound engine to view its details.</li>';
    }
}

    document.getElementById('soundEngine').addEventListener('change', updateSoundEngineDetails);



    // Handle image preview
    document.getElementById('uploadCoverImage').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('coverImagePreview');
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            const preview = document.getElementById('coverImagePreview');
            preview.src = '';
            preview.style.display = 'none';
        }
    });

    // Add Artist button functionality
    document.getElementById('addArtistButton').addEventListener('click', function() {
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
            <button type="button" class="removeArtistButton" style="display: inline-block;">Remove</button>
        `;
        document.getElementById('artistsContainer').appendChild(artistEntry);
    });

    // Remove artist functionality
    document.getElementById('artistsContainer').addEventListener('click', function(event) {
        if (event.target.classList.contains('removeArtistButton')) {
            event.target.closest('.artistEntry').remove();
        }
    });

    // Submit form
    document.getElementById('articleForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const trackData = {
            ownerId: userId,
            
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

        // Disable form elements and show loading message
        const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm button, #articleForm textarea');
        const submitButton = document.querySelector('#articleForm button[type="submit"]');
        formElements.forEach(element => element.disabled = true);
        submitButton.textContent = 'Submitting...';
        document.getElementById('loadingMessage').style.display = 'block';

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
                uploadFiles(data.trackId);
            } else {
                showToast('Failed to submit track data, please try again.', 'error');
                resetForm();
            }
        })
        .catch(error => {
            console.error('Error submitting track data:', error);
            showToast('Failed to submit track data, please try again.', 'error');
            resetForm();
        });

        function uploadFiles(trackId) {
            const formData = new FormData();
            formData.append('audioFileWAV', document.getElementById('uploadWAV').files[0]);
            formData.append('audioFileMP3', document.getElementById('uploadMP3').files[0]);
            formData.append('coverImage', document.getElementById('uploadCoverImage').files[0]);

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
                document.getElementById('loadingMessage').style.display = 'none';
                formElements.forEach(element => element.disabled = false); // Re-enable form elements
                submitButton.textContent = 'Submit';

                if (xhr.status === 200) {
                    showToast('Track released successfully!', 'success');
                    document.getElementById('articleForm').reset();
                    document.getElementById('coverImagePreview').style.display = 'none';
                    localStorage.removeItem('trackReleaseFormData');  // Clear saved form data
                    window.location.href = '/voyage'; 
                    return;
                } else {
                    showToast('Failed to upload files.', 'error');
                }
            };

            xhr.onerror = function() {
                document.getElementById('loadingMessage').style.display = 'none';
                formElements.forEach(element => element.disabled = false); // Re-enable form elements
                submitButton.textContent = 'Submit';
                showToast('Failed to upload files.', 'error');
            };

            xhr.send(formData);
        }

        function resetForm() {
            formElements.forEach(element => element.disabled = false);
            submitButton.textContent = 'Submit';
            document.getElementById('loadingMessage').style.display = 'none';
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
    });


    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        if (type === 'success') {
            toast.classList.add('success');
        } else if (type === 'error') {
            toast.classList.add('error');
        }
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    }
});
</script>
