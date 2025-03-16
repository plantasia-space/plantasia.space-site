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

<!-- Updated track-release.html -->

<div class="form-container">
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Back to Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">brightness_6</span>
                </button>
            </a>
        </div>
        <div class="edit-button-container">
            <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Track Release" style="display: none;">
                <span class="material-symbols-outlined">edit</span>
            </button>
        </div>
    </div>
    <h3 id="formTitle">Track Release</h3>
    <!-- View Mode -->
    <div id="trackReleaseView" style="display: none;">
        <!-- Details will be populated here in view mode -->
        <div id="coverImageView" class="cover-image-container">
            <img id="coverImageDisplay" src="" alt="Cover Image" style="max-width: 100%; height: auto;" />
        </div>
        <p id="viewTrackName"></p>
        <p id="viewArtists"></p>
        <p id="viewLicence"></p>
        <p id="viewDescription"></p>
        <!-- Additional details can be added here -->
        <p id="viewType"></p>
        <p id="viewGenre"></p>
        <p id="viewMood"></p>
        <p id="viewAdditionalTags"></p>
        <p id="viewCredits"></p>
        <p id="viewPrivacy"></p>
        <p id="viewReleaseDate"></p>
        <p id="viewEnableDirectDownloads"></p>
        <br>        <div id="audioPlayerContainer"></div> <!-- Container for Audio Player -->
        <!-- Interplanetary Player Details -->

        <!-- Interplanetary Player Details -->
        <h4>Interplanetary Player Details</h4>

        <ul class="interplanetaryPlayer-list" id="interplanetaryPlayerDetailsList">
            <li class="interplanetaryPlayer-list-item">
                <div class="interplanetaryPlayer-profile-pic">
                            <div class="decagon-frame">

                    <img id="playerImageDisplay" src="" alt="Interplanetary Player Image" />
                </div>
                                </div>

                <div class="interplanetaryPlayer-details">
                    <p id="viewPlayerName"><strong>Name:</strong> </p>
                    <p id="viewPlayerSciName"><strong>Scientific Name:</strong> </p>
                    <p id="viewPlayerDescription"><strong>Description:</strong> </p>
                    <p id="viewPlayerAvailability"><strong>Availability:</strong> </p>
                </div>
                <div class="interplanetaryPlayer-actions">
                    <!-- More Options Dropdown (if needed) -->
                </div>
            </li>
        </ul>

        <!-- Sound Engine Details -->
        <h4>Sound Engine Details</h4>

        <ul class="soundEngine-list" id="soundEngineDetailsList">
            <li class="soundEngine-list-item">
                <div class="sound-engine-profile-pic">
                            <div class="hexagon-frame">
                    <img id="soundEngineImageDisplay" src="" alt="Sound Engine Image" />
                </div>                </div>

                <div class="soundEngine-details">
                    <p id="viewSoundEngineName"><strong>Name:</strong> </p>
                    <p id="viewSoundEngineDeveloper"><strong>Developer:</strong> </p>
                    <p id="viewSoundEngineAvailability"><strong>Availability:</strong> </p>
                    <p id="viewSoundEngineParams"><strong>Parameters:</strong> </p>
                    <p id="viewSoundEngineCredits"><strong>Credits:</strong> </p>
                </div>
                <div class="soundEngine-actions">
                    <!-- More Options Dropdown (if needed) -->
                </div>
                
            </li>
        </ul>
    </div>
  
    <!-- Edit/Create Mode -->
    <form id="articleForm" class="contact-form" style="display: none;" enctype="multipart/form-data">
        <!-- Hidden ownerId input -->
        <input type="hidden" id="ownerId" name="ownerId" value="">
        <!-- Cover Image Preview -->
        <div id="coverImagePreviewContainer" class="cover-image-container">
            <img id="coverImagePreview" src="" alt="Cover Image Preview" style="display: none;">
        </div><br>
        <!-- Cover Image Upload -->
<label for="uploadCoverImage">
    Upload the cover image for your release: <span class="required" id="coverImageRequired">*</span>
    <span class="tooltip" aria-label="Cover Image Info" tabindex="0" 
          data-tooltip="Best Size: 800x800 pixels, Max: 2MB, JPG or PNG">
        <span class="material-symbols-outlined">tooltip_2</span>
    </span>
</label>
        <input type="file" id="uploadCoverImage" name="coverImage" accept=".jpg, .jpeg, .png"><br><br>
        <!-- Interplanetary Player Selection -->
        <label for="playerId">Which Interplanetary Player would you like to choose for this release?*</label>
        <select id="playerId" name="playerId" required>
            <option value="">Please select an Interplanetary player</option>
        </select><br><br>
        <div id="interplanetaryPlayerView"></div>
        <!-- Sound Engine Selection -->
        <label for="soundEngineId">Which sonic engine would you like to use as the default for your Interplanetary Player?</label>
        <select id="soundEngineId" name="soundEngineId">
            <option value="">Please select a sound engine</option>
        </select><br><br>
        <ul class="soundEngine-list" id="sound-engines-list"></ul>
        <!-- Artists -->
        <label>Artists*</label>
        <div id="artistsContainer">
            <!-- Each artist will be added here -->
            <div class="artistEntry">
                <div class="input-wrapper">
                    <input type="text" class="user-search-input" name="artistUsernames[]" placeholder="Type a username..." autocomplete="off" required>
                    <input type="hidden" class="artistUserId" name="artistUserIds[]" value="">
                    <div class="dropdown"></div>
                </div>
                <!-- Remove button removed from the first artistEntry -->
            </div>
            <button type="button" id="addArtistButton" class="btn button--outline-primary button--small">Add Another Artist</button>
            <br><br>
        </div>
        <!-- Track Name -->
        <label for="trackName">What is the name of the track?*</label>
        <input type="text" id="trackName" name="trackName" required><br><br>
        <!-- Audio File Upload -->
        <label for="uploadAudio">
            Upload your audio file: <span class="required" id="audioFileRequired">*</span>
            <span class="tooltip" aria-label="Audio File Info" tabindex="0" 
                data-tooltip="Accepted formats: WAV, AIFF. If using MP3, up to 256kbps. Max file size: 200MB">
                <span class="material-symbols-outlined">tooltip_2</span>
            </span>
        </label>        
        <input type="file" id="uploadAudio" name="audioFile" accept=".wav, .aif, .aiff, .mp3"><br><br>
        <!-- License Selection -->
        <label for="licence">Which license would you like to apply to this work?*</label>
        <select id="licence" name="licence" required>
            <option value="">Select a license</option>
            <option value="NIBBLE-1.0">Regenerative Music Copy Nibble 1.0</option>
            <option value="CC-BY-SA-4.0">CC BY-SA 4.0</option>
        </select><br><br>
        <!-- Release Date -->
        <label for="releaseDate">When would you like this track to be released?*</label>
        <input type="date" id="releaseDate" name="releaseDate" required><br><br>

    <!-- Optional Fields in Collapsible Section -->
    <div class="collapsible-section form-collapsible">
        <div class="section-header" tabindex="0" role="button" aria-expanded="true" aria-controls="optional-fields-form">
            <h2 class="section-title">Add optional information:</h2>
            <button type="button" class="toggle-button" aria-expanded="true" aria-controls="optional-fields-form" aria-label="Toggle Optional Information">
                <span class="material-symbols-outlined toggle-icon">keyboard_arrow_up</span>
            </button>
        </div><br>
        <div class="section-content" id="optional-fields-form">
            <!-- Categories -->
            <label for="type">Given the following categories, what type of content is this?</label>
            <select id="type" name="type">
                <option value="">Please select a type</option>
                <option value="Music">Music</option>
                <option value="Spoken Voice">Spoken Voice</option>
                <option value="Soundscape">Soundscape</option>
                <option value="Other">Other</option>
            </select><br><br>

            <!-- Genre -->
            <label for="genre">Does this track belong to any genre? If yes, which ones?</label>
            <input type="text" id="genre" name="genre"><br><br>

            <!-- Mood -->
            <label for="mood">What mood does this track inspire?</label>
            <input type="text" id="mood" name="mood"><br><br>

            <!-- Additional Tags -->
            <label for="additionalTags">Would you like to add any additional tags for this release?</label>
            <input type="text" id="additionalTags" name="additionalTags"><br><br>

            <!-- Description -->
            <label for="description">Please provide a description for this release.</label>
            <textarea id="description" name="description" rows="4" style="width: 100%;"></textarea><br><br>

            <!-- Collaborators -->
            <label for="credits">Who should be credited for this work?</label>
            <input type="text" id="credits" name="credits"><br><br>

            <!-- Privacy -->
            <label for="privacy">Would you like to make this release public or private?</label>
            <select id="privacy" name="privacy">
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select><br><br>

            <!-- Enable Direct Downloads -->
                <div class="checkbox-wrapper">
            <label class="checkbox-container">
                <input type="checkbox" id="enableDirectDownloads" name="enableDirectDownloads">
                <span class="checkmark"></span>
                Would you like to enable free direct downloads for this release?
            </label><br><br>
                </div>

        </div>
    </div>

    <!-- Rights Confirmation Checkbox Moved Here -->
    <div class="checkbox-wrapper">
        <label class="checkbox-container">
            <input type="checkbox" id="confirmRights" name="confirmRights" required>
            <span class="checkmark"></span>
            I confirm that I own the rights to all uploaded content.
        </label>
    </div>
    <br><br>

    <!-- Submit Button -->
    <button type="submit" id="submitButton">Submit</button>
    <button type="button" id="cancelButton" class="btn button--outline-primary button--circle">Cancel</button>

    </form>
    <!-- Loading Message -->
    <div id="loadingMessage" style="display: none; text-align: center;">
        <p>Uploading your track, please wait...</p>
        <!-- Loading Spinner -->
        <div class="spinner"></div>
    </div>
    <!-- Toast Container -->
    <div id="toastContainer"></div>
</div>



<!-- JavaScript Code -->

<script>

// Define the API base URL
const API_BASE_URL = 'https://media.maar.world:443/api';

// Define the file category for this form
const FILE_CATEGORY_UPLOAD = 'tracks'; // Must match the category in spacesUtils.js

// Function to initialize collapsible sections (if any)
function initializeFormCollapsibleSection() {
    const collapsibleSections = document.querySelectorAll('.collapsible-section.form-collapsible');

    collapsibleSections.forEach(section => {
        const header = section.querySelector('.section-header');
        const toggleButton = header.querySelector('.toggle-button');
        const content = section.querySelector('.section-content');
        const icon = toggleButton.querySelector('.toggle-icon');

        // Set initial state
        let isExpanded = false;
        content.style.display = 'none';

        // Click event on header and toggle button
        header.addEventListener('click', function (e) {
            e.preventDefault();
            isExpanded = !isExpanded;
            if (isExpanded) {
                content.style.display = 'block';
                icon.textContent = 'keyboard_arrow_up';
            } else {
                content.style.display = 'none';
                icon.textContent = 'keyboard_arrow_down';
            }
        });
    });
}

// Define global variables
let playersData = [];
let soundEngineData = [];
let currentMode = 'create'; // Current mode: 'create', 'edit', 'view'
let trackId = ''; // Will hold the track ID when editing/viewing
let userId = localStorage.getItem('userId'); // Ensure this is set correctly
let isOwner = false; // Indicates if the current user is the owner of the track
let trackData = null; // Holds the current track data
const defaultTrackImageURL = "https://mw-storage.fra1.cdn.digitaloceanspaces.com/default/default-tracks_thumbnail_mid.webp";


// Initialize the form once the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    initializeFormCollapsibleSection();
});

// Main initialization function
async function initializeForm() {
    const urlParams = new URLSearchParams(window.location.search);
    let initialMode = urlParams.get('mode');
    trackId = urlParams.get('trackId') || '';
    console.log("track " + trackId);
    console.log("mode " + initialMode);

    if (!userId) {
        showToast('User not authenticated.', 'error');
        return;
    }
    document.getElementById('ownerId').value = userId;

    // Fetch necessary data for dropdowns and components
    await Promise.all([fetchPlayersData(userId), fetchSoundEnginesData(userId)]);
    attachEventListeners();

    if (initialMode === 'edit' && trackId) {
        currentMode = 'edit';
        await loadTrackDetails(trackId);

        if (!trackData) {
            showToast('Retrying load...', 'error');
            setTimeout(() => loadTrackDetails(trackId), 500);
        }
    } else if (trackId) {
        currentMode = 'view';
        await loadTrackDetails(trackId);

        if (!trackData) {
            showToast('Retrying load...', 'error');
            setTimeout(() => loadTrackDetails(trackId), 500);
        }
    } else {
        currentMode = 'create';
        clearFormFields();
                // Load default image in create mode
        const coverImagePreview = document.getElementById('coverImagePreview');
        if (coverImagePreview) {
            coverImagePreview.src = defaultTrackImageURL;
            setTimeout(() => {
                coverImagePreview.style.display = 'block';
            }, 100); // Small delay to ensure load
        } else {
            console.error("coverImagePreview element not found.");
        }

    }

    setFormMode(currentMode);
    history.replaceState({ mode: currentMode, trackId }, '', window.location.href);
}

// Function to attach all necessary event listeners
function attachEventListeners() {
    document.getElementById('soundEngineId').addEventListener('change', updateSoundEngineDetails);
    document.getElementById('playerId').addEventListener('change', updatePlayerDetails);
    document.getElementById('articleForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('uploadCoverImage').addEventListener('change', handleImagePreview);
    document.getElementById('addArtistButton').addEventListener('click', addArtistField);
    document.getElementById('artistsContainer').addEventListener('click', handleRemoveArtist);
    // Removed individual toggleOptionalFields event listener
    // document.querySelector('.toggle-button').addEventListener('click', toggleOptionalFields);

    const cancelButton = document.getElementById('cancelButton');
    if (cancelButton) {
        cancelButton.addEventListener('click', function () {
            setFormMode("view");
            console.log("Canceling form editing/creation.");
        });
    }

    // Event Listener for Edit Button
    const editButtonElement = document.getElementById('editButton');
    if (editButtonElement) {
        editButtonElement.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default button behavior
            toggleEditMode(); // Toggle between view and edit modes
        });
    }

    // Handle Browser Navigation (Back/Forward)
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            setFormMode(event.state.mode);
        } else {
            // Default to view mode if no state is available
            setFormMode('view');
        }
    });

    // **Add File Size Checks Here**
    // Define maximum file sizes
    const MAX_AUDIO_FILE_SIZE = 200 * 1024 * 1024; // 200MB
    const MAX_COVER_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

    // Audio File Size Check
    const uploadAudioInput = document.getElementById('uploadAudio');
    uploadAudioInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.size > MAX_AUDIO_FILE_SIZE) {
            showToast('The audio file is too large. Maximum allowed size is 200MB.', 'error');
            // Clear the file input
            uploadAudioInput.value = '';
        }
    });

    // Cover Image Size Check
    const uploadCoverImageInput = document.getElementById('uploadCoverImage');
    uploadCoverImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.size > MAX_COVER_IMAGE_SIZE) {
            showToast('The cover image is too large. Maximum allowed size is 2MB.', 'error');
            // Clear the file input
            uploadCoverImageInput.value = '';
        }
    });
}

/**
    * Fetch Players Data and Populate Dropdown
    */
function fetchPlayersData(userId) {
    return fetch(`${API_BASE_URL}/interplanetaryplayers/get-available-interplanetary-players/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server returned ${response.status} error`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                playersData = data.interplanetaryPlayers;
                console.log("fetchPlayersData", playersData);
                populatePlayerDropdown(playersData);
            } else {
                showToast('Error loading player data.', 'error');
                console.error('Error fetching players:', data.message);
            }
        })
        .catch(error => {
            showToast('Error loading player data.', 'error');
            console.error('Error fetching players:', error);
        });
}

/**
    * Populate Player Dropdown with Owned and Public Players
    */
function populatePlayerDropdown(players) {
    const selectElement = document.getElementById('playerId');
    selectElement.innerHTML = '<option value="">Please select an Interplanetary player</option>';
    
    if (!players || players.length === 0) {
        selectElement.innerHTML += '<option value="" disabled>No players available</option>';
        return;
    }

    // Create optgroups for Owned and Public
    const ownedGroup = document.createElement('optgroup');
    ownedGroup.label = 'Owned Players';
    const publicGroup = document.createElement('optgroup');
    publicGroup.label = 'Public Players';

    players.forEach(({ player, canEdit }) => {
        const option = document.createElement('option');
        option.value = player._id; // Use player._id as the value
        option.textContent = `💡 ${player.artName} 🔭 ${player.sciName} (${canEdit ? 'Owned' : 'Public'})`;
        
        // Categorize based on ownership
        if (canEdit) {
            ownedGroup.appendChild(option);
        } else {
            publicGroup.appendChild(option);
        }
    });

    // Append optgroups to the select element
    if (ownedGroup.children.length > 0) {
        selectElement.appendChild(ownedGroup);
    }
    if (publicGroup.children.length > 0) {
        selectElement.appendChild(publicGroup);
    }
}

/**
    * Fetch Sound Engines Data and Populate Dropdown
    */
function fetchSoundEnginesData(userId) {
    return fetch(`${API_BASE_URL}/soundEngines/getAvailableSoundEngines/${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                soundEngineData = data.soundEngines; // Store data globally
                console.log("fetchSoundEnginesData", soundEngineData);
                populateSoundEngineDropdown(soundEngineData);
            } else {
                showToast('Error loading sound engines.', 'error');
                console.error('Error fetching sound engines:', data.message);
            }
        })
        .catch(error => {
            showToast('Error loading sound engines.', 'error');
            console.error('Error fetching sound engines:', error);
        });
}

/**
    * Populate Sound Engine Dropdown with Owned and Public Sound Engines
    */
function populateSoundEngineDropdown(soundEngines) {
    const selectElement = document.getElementById('soundEngineId');
    selectElement.innerHTML = '<option value="">Please select a sound engine</option>';
    if (!soundEngines || soundEngines.length === 0) {
        selectElement.innerHTML += '<option value="" disabled>No sound engines available</option>';
        return;
    }
    // Create optgroups for Owned and Public
    const ownedGroup = document.createElement('optgroup');
    ownedGroup.label = 'Owned Sound Engines';
    const publicGroup = document.createElement('optgroup');
    publicGroup.label = 'Public Sound Engines';
    soundEngines.forEach(engine => {
        const option = document.createElement('option');
        option.value = engine._id; // Ensure _id exists
        option.textContent = `🎛️ ${engine.soundEngineName} 👤 ${engine.developerUsername} ${engine.isPublic ? "🌍 Public" : "🔐 Exclusive"}`;
    
        if (engine.isPublic) {
            publicGroup.appendChild(option);
        } else {
            ownedGroup.appendChild(option);
        }
    });
    
    // Append optgroups to the select element
    if (ownedGroup.children.length > 0) {
        selectElement.appendChild(ownedGroup);
    }
    
    if (publicGroup.children.length > 0) {
        selectElement.appendChild(publicGroup);
    }
}

/**
    * Update Sound Engine Details
    */
function updateSoundEngineDetails() {
    const selectedEngineId = document.getElementById('soundEngineId').value;
    console.log('Selected Engine ID:', selectedEngineId);
    console.log('Sound Engine Data:', soundEngineData);
    
    const soundEngine = soundEngineData.find(engine => engine._id === selectedEngineId);
    
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
                        <div class="hexagon-frame">

                <img src="${imageUrl}" alt="${soundEngine.soundEngineName}" />
            </div>
            </div>
            <div class="soundEngine-details">
                <div class="soundEngine-name"><strong>Name:</strong> ${soundEngine.soundEngineName}</div>
                <div class="soundEngine-developer"><strong>Developer:</strong> ${soundEngine.developerUsername}</div>
                <div class="soundEngine-availability"><strong>Availability:</strong> ${soundEngine.isPublic ? '🌍 Shared' : '🔐 Exclusive'}</div>
                <div class="soundEngine-params">
                    <strong>X Parameter:</strong> ${soundEngine.xParam.label}
                    (Min: ${soundEngine.xParam.min}, Max: ${soundEngine.xParam.max}, Init: ${soundEngine.xParam.initValue})<br>
                    <strong>Y Parameter:</strong> ${soundEngine.yParam.label}
                    (Min: ${soundEngine.yParam.min}, Max: ${soundEngine.yParam.max}, Init: ${soundEngine.yParam.initValue})<br>
                    <strong>Z Parameter:</strong> ${soundEngine.zParam.label}
                    (Min: ${soundEngine.zParam.min}, Max: ${soundEngine.zParam.max}, Init: ${soundEngine.zParam.initValue})
                    <div class="soundEngine-credits"><strong>Credits:</strong> ${soundEngine.credits}</div>
                </div>
            </div>
        `;
    
        soundEngineListElement.appendChild(engineElement);
    } else {
        soundEngineListElement.innerHTML = '<li>Please select a sound engine to view its details.</li>';
    }
}

/**
    * Update Player Details
    */
function updatePlayerDetails() {
    const selectedPlayerId = document.getElementById('playerId').value;
    console.log('Selected Player ID:', selectedPlayerId);
    console.log('Players Data:', playersData);

    const interplanetaryPlayerView = document.getElementById('interplanetaryPlayerView');
    const modelPreviewFormIframe = document.getElementById('modelPreviewFormIframe');

    // Clear the interplanetaryPlayerView content
    interplanetaryPlayerView.innerHTML = ''; 

    if (!selectedPlayerId) {
        // No player selected
        interplanetaryPlayerView.innerHTML = '<p>Please select an Interplanetary Player to view its details.</p>';
        modelPreviewFormIframe.src = '';
        modelPreviewFormIframe.style.display = 'none';
        return;
    }

    // Find the selected player in the data
    const selectedPlayer = playersData.find(p => p.player._id === selectedPlayerId);

    if (!selectedPlayer) {
        console.error('Selected player not found in playersData.');
        showToast('Selected player details could not be loaded.', 'error');
        interplanetaryPlayerView.innerHTML = '<p>Error: Player details could not be loaded.</p>';
        modelPreviewFormIframe.src = '';
        modelPreviewFormIframe.style.display = 'none';
        return;
    }

    // Destructure the selected player object
    const { player, ownerDetails, artistDetails, canEdit } = selectedPlayer;

    // Check if GLB URL exists and populate the iframe for the GLB model viewer
    if (player.glbURL) {
        // Define the base URL for the viewer
        const viewerBaseUrl = 'https://preview.maar.world/?model=';

        // Encode the GLB URL for use in the viewer query parameter
        const encodedGlbUrl = encodeURIComponent(player.glbURL);

        // Construct the full viewer URL
        const viewerUrl = `${viewerBaseUrl}${encodedGlbUrl}`;
        console.log('Viewer URL:', viewerUrl);

        // Update the iframe source and make it visible
       // modelPreviewFormIframe.src = viewerUrl;
       // modelPreviewFormIframe.style.display = 'block';
    } else {
        // Hide the iframe if no GLB model is available
        console.warn('No GLB URL available for the selected player.');
        modelPreviewFormIframe.src = '';
        modelPreviewFormIframe.style.display = 'none';
    }

// Dynamically populate the edit mode view with the player's details
const playerDetailsHtml = `
    <div class="player-details">
        <!-- Iframe for GLB Model Viewer -->
        <div id="modelPreviewFormContainer" class="iframe-3d-model-container">
            <iframe 
                id="modelPreviewFormIframe"
                class="iframe-3d-model" 
                width="100%" 
                height="400px" 
                style="background: transparent; border: none; display: ${player.glbURL ? 'block' : 'none'};" 
                src="${player.glbURL ? `https://preview.maar.world/?model=${encodeURIComponent(player.glbURL)}` : ''}">
            </iframe>
        </div>

        <!-- Player Details -->
        <div class="player-name"><strong>Name:</strong> ${player.artName || 'N/A'}</div>
        <div class="player-owner"><strong>Owner:</strong> ${ownerDetails.displayName || 'Unknown'}</div>
        <div class="player-artist"><strong>3D Artist:</strong> ${artistDetails.displayName || 'Unknown'}</div>
        <div class="player-availability"><strong>Availability:</strong> ${player.isPublic ? '🌍 Public' : '🔐 Exclusive'}</div>
    </div>
`;

interplanetaryPlayerView.innerHTML = playerDetailsHtml;

    // Populate edit mode fields with the player's data
    document.getElementById('trackName').value = player.artName || '';
    document.getElementById('description').value = player.description || '';
    document.getElementById('releaseDate').value = player.releaseDate || '';
    document.getElementById('privacy').value = player.isPublic ? 'public' : 'private';
    document.getElementById('licence').value = player.licence || '';

    // Update artists
    const artistsContainer = document.getElementById('artistsContainer');
    artistsContainer.innerHTML = ''; // Clear previous artists
    if (artistDetails && artistDetails.username) {
        const artistEntry = `
            <div class="artistEntry">
                <input type="text" class="user-search-input" name="artistUsernames[]" value="${artistDetails.username}" required>
                <input type="hidden" class="artistUserId" name="artistUserIds[]" value="${artistDetails.userId}">
            </div>`;
        artistsContainer.innerHTML += artistEntry;
    }

    // Update sound engine selection
    document.getElementById('soundEngineId').value = player.soundEngineId || '';
}

/**
    * Clear Form Fields (Create Mode)
    */
function clearFormFields() {
    document.getElementById('playerId').value = '';
    document.getElementById('soundEngineId').value = '';
    document.getElementById('trackName').value = '';
    document.getElementById('licence').value = '';
    document.getElementById('type').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('mood').value = '';
    document.getElementById('additionalTags').value = '';
    document.getElementById('description').value = '';
    document.getElementById('credits').value = '';
    document.getElementById('privacy').value = 'public';
    document.getElementById('releaseDate').value = '';
    document.getElementById('enableDirectDownloads').checked = false;
    document.getElementById('confirmRights').checked = false;
    document.getElementById('uploadCoverImage').value = '';
    document.getElementById('uploadAudio').value = '';
    document.getElementById('coverImagePreview').style.display = 'none';
    // Clear artist fields
    const artistsContainer = document.getElementById('artistsContainer');
    artistsContainer.innerHTML = `
        <div class="artistEntry">
            <div class="input-wrapper">
                <input type="text" class="user-search-input" name="artistUsernames[]" placeholder="Type a username..." autocomplete="off" required>
                <input type="hidden" class="artistUserId" name="artistUserIds[]" value="">
                <div class="dropdown"></div>
            </div>
            <!-- Remove button removed from the first artistEntry -->
        </div>
        <button type="button" id="addArtistButton" class="btn button--outline-primary button--small">Add Another Artist</button>
        <br><br>
    `;
    // Reattach event listener for addArtistButton
    document.getElementById('addArtistButton').addEventListener('click', addArtistField);
    // Initialize search on the new input field
    if (typeof initializeSearchUsers === 'function') {
        initializeSearchUsers();
        console.log('Initialized search on the initial input field after clearing form.');
    } else {
        console.error('initializeSearchUsers function is not defined.');
    }
}

/**
    * Set the Current Mode (View, Edit, Create)
    */
function setFormMode(newMode) {
    currentMode = newMode;
    const isViewMode = currentMode === 'view';
    const isEditMode = currentMode === 'edit';
    const isCreateMode = currentMode === 'create';
    
    // Toggle visibility of form and view sections
    const articleForm = document.getElementById('articleForm');
    const trackReleaseView = document.getElementById('trackReleaseView');
    const editButton = document.getElementById('editButton');

    if (isViewMode) {
        trackReleaseView.style.display = 'block';
        articleForm.style.display = 'none';
    
        // Set Edit Button to show 'Edit' icon and title
        if (editButton) {
            editButton.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
            editButton.title = 'Edit Track Release';
            editButton.style.display = isOwner ? 'block' : 'none';
        }
    
        // Set form title
        const formTitle = document.getElementById('formTitle');
        if (formTitle) {
            formTitle.textContent = 'Track Release Details';
        }
    } else if (isEditMode) {
        trackReleaseView.style.display = 'none';
        articleForm.style.display = 'block';
    
        // Set Edit Button to show 'View' icon and title
        if (editButton) {
            editButton.innerHTML = `<span class="material-symbols-outlined">visibility</span>`;
            editButton.title = 'View Track Release';
            editButton.style.display = 'block';
        }
    
        // Set form title
        const formTitle = document.getElementById('formTitle');
        if (formTitle) {
            formTitle.textContent = 'Edit Track Release';
        }
    
        // Load the track details again if in edit mode
        if (trackId) {
            loadTrackDetails(trackId);
        }
    } else if (isCreateMode) {
        trackReleaseView.style.display = 'none';
        articleForm.style.display = 'block';
    
        // Hide Edit Button in Create Mode
        if (editButton) {
            editButton.style.display = 'none';
        }
    
        // Set form title
        const formTitle = document.getElementById('formTitle');
        if (formTitle) {
            formTitle.textContent = 'Create a New Track Release';
        }
    
        // Clear the form fields if in create mode
        clearFormFields();
    
        // Initially disable the submit button until required fields are filled
        const submitButton = document.getElementById('submitButton');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit'; // Ensure the button text is correct
        }
    }
}

/**
    * Toggle Between Edit and View Modes
    */
function toggleEditMode() {
    if (currentMode === 'view') {
        if (trackData) { // Ensure trackData is loaded
            updateURL('edit', trackId);
            setFormMode('edit');
        } else {
            showToast('Track data is still loading. Please wait...', 'error');
            console.warn('Attempted to switch to edit mode before trackData was loaded.');
        }
    } else if (currentMode === 'edit') {
        setFormMode('view');
        updateURL('view', trackId);
        loadTrackDetails(trackId); // Reload data to discard changes
    }
}

/**
    * Update the URL Without Reloading the Page
    */
function updateURL(mode, trackId) {
    const newURL = `/voyage/track-release?mode=${mode}&trackId=${trackId}`;
    if (history.pushState) {
        history.pushState({ mode, trackId }, '', newURL);
    } else {
        // Fallback for older browsers
        window.location.href = newURL;
    }
}

/**
 * Show a message indicating that the track is being processed.
 */
function showProcessingMessage() {
    const trackReleaseView = document.getElementById('trackReleaseView');
    if (trackReleaseView) {
        trackReleaseView.innerHTML = `
            <p>Your track is being processed. Please check back later.</p>
        `;
        trackReleaseView.style.display = 'block';
    }
    // Hide the form and any other elements as needed
    const articleForm = document.getElementById('articleForm');
    if (articleForm) {
        articleForm.style.display = 'none';
    }
}
/**
 * Poll the server to check if the track is now complete.
 */
function pollTrackStatus(trackId) {
    const intervalId = setInterval(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/tracks/${trackId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.track.isComplete) {
                    clearInterval(intervalId);
                    trackData = data.track;
                    populateViewMode(trackData);
                    setFormMode('view');
                    showToast('Your track is now available!', 'success');
                }
            }
        } catch (error) {
            console.error('Error polling track status:', error);
        }
    }, 10000); // Poll every 10 seconds
}

/**
    * Load Track Details from Backend
    */
async function loadTrackDetails(trackId) {
    try {
        const response = await fetch(`${API_BASE_URL}/tracks/${trackId}`);
        const data = await response.json();

        if (response.status === 200 && data.success) {
            trackData = data.track;
            isOwner = trackData.ownerId === userId;
            console.log('Is user the owner?', isOwner);
            console.log('Received Data', trackData);
            populateEditMode(trackData);
            populateViewMode(trackData);
        } else if (response.status === 202) {
            showProcessingMessage();
            pollTrackStatus(trackId);
        } else if (response.status === 404) {
            showToast('Track not found.', 'error');
        } else {
            showToast(data.message || 'Error loading track details.', 'error');
            console.error('Error fetching track details:', data.message);
        }
    } catch (error) {
        showToast('Error loading track details.', 'error');
        console.error('Error fetching track details:', error);
    }
}


function showProcessingMessage() {
    const trackReleaseView = document.getElementById('trackReleaseView');
    trackReleaseView.innerHTML = `
        <p>Your track is being processed. Please check back later.</p>
    `;
    trackReleaseView.style.display = 'block';
    document.getElementById('articleForm').style.display = 'none';
}



/**
    * Populate Edit Mode with Track Data
    */
function populateEditMode(trackData) {
    if (currentMode === 'edit') {
        document.getElementById('playerId').value = trackData.playerId ? trackData.playerId._id : '';
        document.getElementById('soundEngineId').value = trackData.soundEngineId ? trackData.soundEngineId._id : '';
        document.getElementById('trackName').value = trackData.trackName || '';
        document.getElementById('licence').value = trackData.licence || '';
        document.getElementById('type').value = trackData.type || '';
        document.getElementById('genre').value = trackData.genre || '';
        document.getElementById('mood').value = trackData.mood || '';
        document.getElementById('additionalTags').value = trackData.additionalTags || '';
        document.getElementById('description').value = trackData.description || '';
        document.getElementById('credits').value = trackData.credits || '';
        document.getElementById('privacy').value = trackData.privacy || 'public';
        document.getElementById('releaseDate').value = trackData.releaseDate ? trackData.releaseDate.split('T')[0] : '';
        document.getElementById('enableDirectDownloads').checked = trackData.enableDirectDownloads || false;
        document.getElementById('confirmRights').checked = trackData.confirmRights || false;

        // Display existing cover image
        const coverImagePreview = document.getElementById('coverImagePreview');
        if (trackData.coverImageURL) {
            console.log('Setting cover image source to:', trackData.coverImageURL); // Debugging
            coverImagePreview.src = trackData.coverImageURL; // Make sure to use coverImageURL
            coverImagePreview.style.display = 'block'; // Ensure it's displayed
        } else {
            console.log('No cover image available.'); // Debugging
            coverImagePreview.style.display = 'none';
        }

        // Populate artists (assuming artists is an array of user IDs)
        const artistsContainer = document.getElementById('artistsContainer');
        artistsContainer.innerHTML = ''; // Clear existing artists
        trackData.artists.forEach((artist, index) => {
            const artistEntry = document.createElement('div');
            artistEntry.className = 'artistEntry';
artistEntry.innerHTML = `
    <div class="input-wrapper">
        <input type="text" class="user-search-input" name="artistUsernames[]" placeholder="Type a username..." autocomplete="off" required value="${artist.username}">
        <input type="hidden" class="artistUserId" name="artistUserIds[]" value="${artist.userId}">
        <div class="dropdown"></div>
    </div>
    ${index > 0 ? '<button type="button" class="removeArtistButton btn button--outline-secondary button--small">Remove</button>' : ''}
`;
            artistsContainer.appendChild(artistEntry);
        });

        // Add a button to add more artists
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.id = 'addArtistButton';
        addButton.textContent = 'Add Another Artist';
        addButton.classList.add('btn', 'button--outline-primary', 'button--small'); // Add your button classes
        artistsContainer.appendChild(addButton);
        addButton.addEventListener('click', addArtistField);

        // Initialize search on artist input fields
        if (typeof initializeSearchUsers === 'function') {
            initializeSearchUsers();
        }
    }
}

/**
    * Populate View Mode with Track Data
    */
    function populateViewMode(trackData) {
        if (currentMode === 'view') {
            // Display cover image
            const coverImageDisplay = document.getElementById('coverImageDisplay');
            if (trackData.coverImageURL) {
                console.log('Setting cover image source to:', trackData.coverImageURL); // Debugging
                coverImageDisplay.src = trackData.coverImageURL; // Use the presigned download URL
                coverImageDisplay.style.display = 'block'; // Ensure it's displayed
            } else {
                console.log('No cover image available.'); // Debugging
                coverImageDisplay.style.display = 'none';
            }

            // Handle Audio File Display
            const audioPlayerContainer = document.getElementById('audioPlayerContainer');
            audioPlayerContainer.innerHTML = ''; // Clear previous content

            if (trackData.audioFileMP3URL) {
                const audioElement = document.createElement('audio');
                audioElement.controls = true;
                audioElement.src = trackData.audioFileMP3URL;
                audioPlayerContainer.appendChild(audioElement);
            } else {
                audioPlayerContainer.innerHTML = '<p>No audio file available.</p>';
            }

            // Display other track details
            document.getElementById('viewTrackName').innerHTML = `<strong>Track Name:</strong> ${trackData.trackName || 'N/A'}`;
            const artistNames = trackData.artists.map(artist => artist.username).join(', ');
            document.getElementById('viewArtists').innerHTML = `<strong>Artists:</strong> ${artistNames || 'N/A'}`;
            document.getElementById('viewLicence').innerHTML = `<strong>License:</strong> ${trackData.licence || 'N/A'}`;
            document.getElementById('viewDescription').innerHTML = `<strong>Description:</strong> ${trackData.description || 'N/A'}`;
            document.getElementById('viewType').innerHTML = `<strong>Type:</strong> ${trackData.type || 'N/A'}`;
            document.getElementById('viewGenre').innerHTML = `<strong>Genre:</strong> ${trackData.genre || 'N/A'}`;
            document.getElementById('viewMood').innerHTML = `<strong>Mood:</strong> ${trackData.mood || 'N/A'}`;
            document.getElementById('viewAdditionalTags').innerHTML = `<strong>Additional Tags:</strong> ${trackData.additionalTags || 'N/A'}`;
            document.getElementById('viewCredits').innerHTML = `<strong>Credits:</strong> ${trackData.credits || 'N/A'}`;
            document.getElementById('viewPrivacy').innerHTML = `<strong>Privacy:</strong> ${trackData.privacy || 'N/A'}`;
            document.getElementById('viewReleaseDate').innerHTML = `<strong>Release Date:</strong> ${trackData.releaseDate ? new Date(trackData.releaseDate).toLocaleDateString() : 'N/A'}`;
            document.getElementById('viewEnableDirectDownloads').innerHTML = `<strong>Direct Downloads Enabled:</strong> ${trackData.enableDirectDownloads ? 'Yes' : 'No'}`;

            // Populate Interplanetary Player Details
            populateInterplanetaryPlayerDetails(trackData.playerId);

            // Populate Sound Engine Details
            populateSoundEngineDetails(trackData.soundEngineId);
        }
    }


    function populateInterplanetaryPlayerDetails(player) {
        const playerImageDisplay = document.getElementById('playerImageDisplay');
        const viewPlayerName = document.getElementById('viewPlayerName');
        const viewPlayerSciName = document.getElementById('viewPlayerSciName');
        const viewPlayerDescription = document.getElementById('viewPlayerDescription');
        const viewPlayerAvailability = document.getElementById('viewPlayerAvailability');

        if (player) {
            const imageUrl = player.ddd && player.ddd.textureURL
                ? `https://media.maar.world${player.ddd.textureURL}`
                : 'https://media.maar.world/uploads/default/default-player.jpg';

            playerImageDisplay.src = imageUrl;
            playerImageDisplay.alt = player.artName || 'Interplanetary Player Image';

            viewPlayerName.innerHTML = `<strong>Name:</strong> ${player.artName || 'N/A'}`;
            viewPlayerSciName.innerHTML = `<strong>Scientific Name:</strong> ${player.sciName || 'N/A'}`;
            viewPlayerDescription.innerHTML = `<strong>Description:</strong> ${player.description || 'N/A'}`;
            viewPlayerAvailability.innerHTML = `<strong>Availability:</strong> ${player.isPublic ? '🌍 Public' : '🔐 Private'}`;
        } else {
            // If player data is not available
            playerImageDisplay.src = 'https://media.maar.world/uploads/default/default-player.jpg';
            playerImageDisplay.alt = 'No Interplanetary Player Selected';

            viewPlayerName.innerHTML = `<strong>Name:</strong> N/A`;
            viewPlayerSciName.innerHTML = `<strong>Scientific Name:</strong> N/A`;
            viewPlayerDescription.innerHTML = `<strong>Description:</strong> N/A`;
            viewPlayerAvailability.innerHTML = `<strong>Availability:</strong> N/A`;
        }
    }

/**
 * Populate Sound Engine Details in View Mode
 */
    function populateSoundEngineDetails(soundEngine) {
        const soundEngineImageDisplay = document.getElementById('soundEngineImageDisplay');
        const viewSoundEngineName = document.getElementById('viewSoundEngineName');
        const viewSoundEngineDeveloper = document.getElementById('viewSoundEngineDeveloper');
        const viewSoundEngineAvailability = document.getElementById('viewSoundEngineAvailability');
        const viewSoundEngineParams = document.getElementById('viewSoundEngineParams');
        const viewSoundEngineCredits = document.getElementById('viewSoundEngineCredits');

        if (soundEngine) {
            const imageUrl = soundEngine.soundEngineImage
                ? `https://media.maar.world${soundEngine.soundEngineImage}`
                : 'https://media.maar.world/uploads/default/default-soundEngine.jpg';

            soundEngineImageDisplay.src = imageUrl;
            soundEngineImageDisplay.alt = soundEngine.soundEngineName || 'Sound Engine Image';

            viewSoundEngineName.innerHTML = `<strong>Name:</strong> ${soundEngine.soundEngineName || 'N/A'}`;
            viewSoundEngineDeveloper.innerHTML = `<strong>Developer:</strong> ${soundEngine.developerUsername || 'N/A'}`;
            viewSoundEngineAvailability.innerHTML = `<strong>Availability:</strong> ${soundEngine.isPublic ? '🌍 Shared' : '🔐 Exclusive'}`;

            // Display parameters
            const xParam = soundEngine.xParam ? `${soundEngine.xParam.label} (Min: ${soundEngine.xParam.min}, Max: ${soundEngine.xParam.max}, Init: ${soundEngine.xParam.initValue})` : 'N/A';
            const yParam = soundEngine.yParam ? `${soundEngine.yParam.label} (Min: ${soundEngine.yParam.min}, Max: ${soundEngine.yParam.max}, Init: ${soundEngine.yParam.initValue})` : 'N/A';
            const zParam = soundEngine.zParam ? `${soundEngine.zParam.label} (Min: ${soundEngine.zParam.min}, Max: ${soundEngine.zParam.max}, Init: ${soundEngine.zParam.initValue})` : 'N/A';

            viewSoundEngineParams.innerHTML = `
                <strong>X Parameter:</strong> ${xParam}<br>
                <strong>Y Parameter:</strong> ${yParam}<br>
                <strong>Z Parameter:</strong> ${zParam}
            `;

            viewSoundEngineCredits.innerHTML = `<strong>Credits:</strong> ${soundEngine.credits || 'N/A'}`;
        } else {
            // If sound engine data is not available
            soundEngineImageDisplay.src = 'https://media.maar.world/uploads/default/default-soundEngine.jpg';
            soundEngineImageDisplay.alt = 'No Sound Engine Selected';

            viewSoundEngineName.innerHTML = `<strong>Name:</strong> N/A`;
            viewSoundEngineDeveloper.innerHTML = `<strong>Developer:</strong> N/A`;
            viewSoundEngineAvailability.innerHTML = `<strong>Availability:</strong> N/A`;
            viewSoundEngineParams.innerHTML = `<strong>Parameters:</strong> N/A`;
            viewSoundEngineCredits.innerHTML = `<strong>Credits:</strong> N/A`;
        }
    }

/**
    * Handle Form Submission
    */
/**
 * Handle Form Submission
 */
/**
 * Handle Form Submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    console.log('Form submit handler triggered');
    
    // Collect form data
    const audioFile = document.getElementById('uploadAudio').files[0];
    const isUploadingNewAudio = !!audioFile;

    const trackDataToSend = {
        ownerId: document.getElementById('ownerId').value,
        playerId: document.getElementById('playerId').value,
        soundEngineId: document.getElementById('soundEngineId').value,
        artists: collectArtistUserIds(),
        trackName: document.getElementById('trackName').value,
        licence: document.getElementById('licence').value,
        releaseDate: document.getElementById('releaseDate').value,
        type: document.getElementById('type').value,
        genre: document.getElementById('genre').value,
        mood: document.getElementById('mood').value,
        additionalTags: document.getElementById('additionalTags').value,
        description: document.getElementById('description').value,
        credits: document.getElementById('credits').value,
        privacy: document.getElementById('privacy').value,
        enableDirectDownloads: document.getElementById('enableDirectDownloads').checked,
        confirmRights: document.getElementById('confirmRights').checked,
    };
            console.log('Collected Artist IDs:', trackDataToSend.artists);

    // Conditionally add audioFileName and audioFileType if a new audio file is being uploaded
    if (isUploadingNewAudio) {
        trackDataToSend.audioFileName = audioFile.name;
        trackDataToSend.audioFileType = audioFile.type || getMimeTypeFromFileName(audioFile.name);
    }
    
    // Log the collected trackData for debugging
    console.log('Submitting trackData:', trackDataToSend);
    
    // Validation: Ensure required fields are filled
    const requiredFields = ['playerId', 'trackName', 'licence', 'releaseDate'];
    
    // Add audioFileName and audioFileType to required fields only if uploading a new audio file
    if (isUploadingNewAudio) {
        requiredFields.push('audioFileName', 'audioFileType');
    }
    
    for (let field of requiredFields) {
        if (!trackDataToSend[field]) {
            showToast(`Please fill out the ${field} field.`, 'error');
            return;
        }
    }
    
    if (trackDataToSend.artists.length === 0) {
        showToast('Please add at least one artist.', 'error');
        return;
    }
    if (!trackDataToSend.confirmRights) {
        showToast('You must confirm that you own the rights to all uploaded content.', 'error');
        return;
    }
    // Add more validations as necessary
    
    // Proceed with form submission
    // Disable form elements and show loading message
    const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm button, #articleForm textarea');
    const submitButton = document.querySelector('#articleForm button[type="submit"]');
    formElements.forEach(element => element.disabled = true);
    submitButton.textContent = 'Submitting...';
    document.getElementById('loadingMessage').style.display = 'block';
    console.log(trackDataToSend);
    
    const method = currentMode === 'edit' ? 'PATCH' : 'POST';
    const url = method === 'PATCH'
        ? `${API_BASE_URL}/tracks/${trackId}`
        : `${API_BASE_URL}/tracks`; // Correct endpoint for creation
    
    console.log('Submitting trackData:', trackDataToSend);

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackDataToSend)
    })
    .then(response => {
        if (!response.ok) {
            // Attempt to parse error message from response
            return response.json().then(errData => {
                throw new Error(errData.error || 'Server returned an error');
            }).catch(() => {
                // If response is not JSON, throw generic error
                throw new Error('Server returned an error');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.trackId) {
            const hasFiles = isUploadingNewAudio || document.getElementById('uploadCoverImage').files.length > 0;
            if (hasFiles) {
                uploadFilesAndFinalize(data.trackId); // Use the new function
            } else {
                showToast('Track released successfully!', 'success');
                window.location.href = `/voyage/track-release?mode=view&trackId=${data.trackId}`;
            }
        } else {
            showToast('Failed to submit track data, please try again.', 'error');
            resetForm();
        }
    })
    .catch(error => {
        console.error('Upload Failed:', error);
        let errorMessage = 'Failed to submit track data. Please try again.';
        if (error.message.includes('LIMIT_FILE_SIZE')) {
            errorMessage = 'The uploaded file is too large. Please choose a smaller file.';
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Network error: Unable to reach the server. Please try again.';
        } else if (error.message) {
            errorMessage = `Error: ${error.message}`;
        }
        showToast(errorMessage, 'error');
        resetForm();
    });
}

/**
 * Upload Files After Metadata Submission
 * @param {string} trackId - The ID of the track.
 */
async function uploadFilesAndFinalize(trackId) {
    const audioFile = document.getElementById('uploadAudio').files[0];
    const coverImage = document.getElementById('uploadCoverImage').files[0];
    
    const uploadPromises = [];
    const fileKeys = {};

    /**
     * Upload a single file using a presigned URL
     * @param {string} presignedUrl - The presigned URL to upload the file.
     * @param {File} file - The file to be uploaded.
     * @returns {Promise<string>} - Resolves to the file key if upload is successful.
     */
    async function uploadFile(presignedUrl, file) {
        const response = await fetch(presignedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
            },
            body: file,
        });

        if (!response.ok) {
            throw new Error('File upload failed.');
        }

        // Extract the key from the presigned URL
        const url = new URL(presignedUrl);
        const key = decodeURIComponent(url.pathname.substring(1)); // Remove leading '/'
        return key;
    }

    /**
     * Generate presigned URL and upload the file
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name (e.g., 'audioFile', 'coverImage').
     * @returns {Promise<void>}
     */
    const generateUploadAndUpload = async (file, fieldName) => {
        try {
            // Prepare options with identifier
            const options = { identifier: trackId };

            // Request presigned URL from the server
            const presignedUrlResponse = await fetch(`${API_BASE_URL}/spaces/generate-presigned-url`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    category: FILE_CATEGORY_UPLOAD,
                    options: options,
                    fileName: file.name, 
                    fileType: file.type || getMimeTypeFromFileName(file.name) // Use fallback
                })
            });
            const presignedUrlData = await presignedUrlResponse.json();

            if (!presignedUrlData.success) {
                throw new Error(`Failed to get presigned URL for ${fieldName}: ${presignedUrlData.message}`);
            }

            const { url, key } = presignedUrlData;

            // Upload the file using the presigned URL
            const uploadedKey = await uploadFile(url, file);

            // Store the key for finalization
            fileKeys[fieldName] = uploadedKey;

        } catch (error) {
            console.error(`Error uploading ${fieldName}:`, error);
            throw error;
        }
    };

    // Prepare upload promises
    if (audioFile) {
        // Store the audio file type for finalization
        fileKeys.audioFileType = audioFile.type || getMimeTypeFromFileName(audioFile.name);
        console.log('Audio File Type:', fileKeys.audioFileType);

        uploadPromises.push(generateUploadAndUpload(audioFile, 'audioFileKey'));
    }

    if (coverImage) {
        uploadPromises.push(generateUploadAndUpload(coverImage, 'coverImageKey'));
    }

    try {
        // Execute all uploads concurrently
        await Promise.all(uploadPromises);
        console.log('All files uploaded successfully:', fileKeys);

        // Finalize the track by sending file keys to the server
        const finalizeResponse = await fetch(`${API_BASE_URL}/tracks/finalize`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                trackId,
                coverImageKey: fileKeys.coverImageKey || null,
                audioFileKey: fileKeys.audioFileKey || null,
                audioFileType: fileKeys.audioFileType || null,
            })
        });

        const finalizeData = await finalizeResponse.json();

        if (!finalizeData.success) {
            throw new Error(`Failed to finalize track: ${finalizeData.error}`);
        }

        // Success
        showToast('Track released successfully!', 'success');
        document.getElementById('articleForm').reset();
        const coverImagePreview = document.getElementById('coverImagePreview');
        if (coverImagePreview) {
            coverImagePreview.style.display = 'none';
        } else {
            console.warn('coverImagePreview element not found.');
        }
        localStorage.removeItem('trackReleaseFormData');  // Clear saved form data

        // Clear relevant caches if applicable
        if (typeof clearUserCaches === 'function') {
            clearUserCaches(userId); // Ensure this function is accessible here
        } else {
            console.warn('clearUserCaches function is not defined.');
        }

        // Redirect to the track release page in view mode
        window.location.href = `/voyage/track-release?mode=view&trackId=${trackId}`;
    } catch (error) {
        console.error('File Upload or Finalization Failed:', error);

        // Determine the type of error and set an appropriate message
        let errorMessage = 'Failed to upload files or finalize track. Please try again.';
        if (error.message.includes('LIMIT_FILE_SIZE')) {
            errorMessage = 'The uploaded file is too large. Please choose a smaller file.';
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Network error: Unable to reach the server. Please check your internet connection.';
        } else if (error.message) {
            errorMessage = `Error: ${error.message}`;
        }

        showToast(errorMessage, 'error');
        resetForm();
    } finally {
        // Regardless of success or failure, hide the loading message and re-enable the form
        const loadingMessage = document.getElementById('loadingMessage');
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        } else {
            console.warn('loadingMessage element not found.');
        }

        const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm button, #articleForm textarea');
        const submitButton = document.querySelector('#articleForm button[type="submit"]');
        if (formElements.length > 0) {
            formElements.forEach(element => element.disabled = false); // Re-enable form elements
        } else {
            console.warn('No form elements found to re-enable.');
        }
        if (submitButton) {
            submitButton.textContent = 'Submit';
        } else {
            console.warn('submitButton element not found.');
        }
    }
}


/**
    * Reset the Form After Submission
    */
function resetForm() {
    const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm button, #articleForm textarea');
    const submitButton = document.querySelector('#articleForm button[type="submit"]');
    formElements.forEach(element => element.disabled = false);
    submitButton.textContent = 'Submit';
    document.getElementById('loadingMessage').style.display = 'none';
}

/**
    * Collect Artist UUIDs from the hidden inputs.
    * @returns {Array} Array of artist UUIDs.
    */
function collectArtistUserIds() {
    const artistIdInputs = document.querySelectorAll('.artistUserId');
    const artistIds = Array.from(artistIdInputs).map(input => input.value.trim());
    // Filter out any undefined or empty values
    return artistIds.filter(id => id);
}

/**
    * Handle Image Preview
    */
function handleImagePreview(event) {
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
}

/**
    * Add Another Artist Field
    */
function addArtistField() {
    const artistEntry = document.createElement('div');
    artistEntry.className = 'artistEntry';
    artistEntry.innerHTML = `
        <div class="input-wrapper">
            <input type="text" class="user-search-input" name="artistUsernames[]" placeholder="Type a username..." autocomplete="off" required>
            <input type="hidden" class="artistUserId" name="artistUserIds[]" value="">
            <div class="dropdown"></div>
        </div>
        <button type="button" class="removeArtistButton btn button--outline-secondary button--small">Remove</button>
    `;
    const addButton = document.getElementById('addArtistButton');
    const artistsContainer = document.getElementById('artistsContainer');
    artistsContainer.appendChild(artistEntry);

    console.log('Added new artist entry:', artistEntry);

    // Initialize search on the new artist input field
    if (typeof initializeSearchUsers === 'function') {
        initializeSearchUsers();
        console.log('Initialized search on the new input field');
    } else {
        console.error('initializeSearchUsers function is not defined.');
    }
}
/**
 * Handle Removing an Artist Field
 */
function handleRemoveArtist(event) {
    if (event.target.classList.contains('removeArtistButton')) {
        const artistEntry = event.target.closest('.artistEntry');
        if (artistEntry) {
            artistEntry.remove();
            console.log('Removed artist entry:', artistEntry);
        }
    }
}

/**
 * Show Toast Notifications
 * @param {string} message - The message to display.
 * @param {string} type - The type of toast ('success' or 'error').
 * @param {boolean} disableSubmit - Whether to disable the submit button.
 */
function showToast(message, type = 'success', disableSubmit = false) {
    console.log(`showToast called with message: "${message}", type: "${type}"`);
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        console.error('Toast container not found!');
        return;
    }

    // Create Toast Element
    const toast = document.createElement('div');
    const toastId = `toast_${Date.now()}`;
    toast.classList.add('toast', type);
    toast.setAttribute('id', toastId);
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.setAttribute('tabindex', '0'); // Make focusable

    // Close Button
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close notification');
    closeBtn.onclick = () => {
        toast.classList.remove('show');
        setTimeout(() => {
            const toastElem = document.getElementById(toastId);
            if (toastElem) {
                toastElem.remove();
                console.log(`Toast "${toastId}" removed from DOM.`);
            }
        }, 500);
    };

    // Append Close Button and Message to Toast
    toast.appendChild(closeBtn);
    toast.appendChild(document.createTextNode(message));
    toastContainer.appendChild(toast);
    console.log(`Toast "${toastId}" appended to #toastContainer.`);

    // Show the toast with animation
    setTimeout(() => {
        toast.classList.add('show');
        console.log(`Toast "${toastId}" shown.`);
        if (type === 'error') {
            toast.focus(); // Shift focus to the toast for immediate notification
        }
    }, 100);

    // Determine auto-close behavior based on toast type
    if (type === 'success') {
        // Auto-close success toasts after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            console.log(`Toast "${toastId}" hiding.`);
            setTimeout(() => {
                const toastElem = document.getElementById(toastId);
                if (toastElem) {
                    toastElem.remove();
                    console.log(`Toast "${toastId}" removed from DOM.`);
                }
            }, 500);
        }, 3000);
    }

    // Disable the submit button if required
    if (disableSubmit) {
        const submitButton = document.getElementById('submitButton');
        if (submitButton) {
            submitButton.disabled = true;
            console.log('Submit button disabled due to validation error.');
        } else {
            console.warn('submitButton element not found.');
        }
    }
}
/**
 * Get MIME type based on file extension.
 * @param {string} fileName - The name of the file.
 * @returns {string} - The corresponding MIME type.
 */
function getMimeTypeFromFileName(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
        case 'mp3':
            return 'audio/mpeg';
        case 'wav':
        case 'wave':
            return 'audio/wav';
        case 'aiff':
        case 'aif':
            return 'audio/aiff';
        default:
            return '';
    }
}

</script>

