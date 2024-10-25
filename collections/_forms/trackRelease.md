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
                <span class="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
        </a>
    </div>
    <div class="edit-button-container">
        <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Track Release" style="display: none;">
            <span class="material-symbols-outlined">edit</span>
        </button>
    </div>
</div>
<h3 id="formTitle">Track Release Form</h3>
<p>Fill the form with details about your track.</p>

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
<label for="uploadCoverImage">Upload the cover image for your release (Best Size: 800x800 pixels, Max: 2MB, JPG or PNG):<span id="coverImageRequired">*</span></label>
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
        <button type="button" id="addArtistButton">Add Another Artist</button>
        <br><br>
    </div>
    <!-- Track Name -->
    <label for="trackName">What is the name of the track?*</label>
    <input type="text" id="trackName" name="trackName" required><br><br>
    <!-- Audio File Upload -->
    <label for="uploadAudio">Please upload your audio file (WAV, AIFF, or MP3 up to 256kbps, Max 10 minutes):<span id="audioFileRequired">*</span></label>
    <input type="file" id="uploadAudio" name="audioFile" accept=".wav, .aif, .aiff, .mp3"><br><br>
    <!-- License Selection -->
    <label for="licence">Which license would you like to apply to this work?*</label>
    <select id="licence" name="licence" required>
        <option value="">Select a license</option>
        <option value="NIBBLE-1.0">Regenerative Music Copy Nibble 1.0</option>
        <option value="CC-BY-SA-4.0">CC BY-SA 4.0</option>
    </select><br><br>
        <!-- Metadata -->
    <label for="releaseDate">When would you like this track to be released?*</label>
    <input type="date" id="releaseDate" name="releaseDate" required><br><br>
    <!-- Rights Confirmation Checkbox -->
    <label>
        <input type="checkbox" id="confirmRights" name="confirmRights" required>
        I confirm that I own the rights to all uploaded content.
    </label><br><br>
    <!-- Optional Fields in Collapsible Section -->
    <div class="collapsible-section">
        <div class="section-header">
            <h2>Optional Information</h2>
            <button type="button" class="toggle-button" aria-expanded="false" aria-controls="optional-fields">+</button>
        </div>
        <div class="section-content" id="optional-fields" style="display: none;">
            <!-- Categories -->
            <label for="type">Given the following categories, what type of content is this?</label>
            <select id="type" name="type">
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
            <!-- Advanced -->
            <label for="enableDirectDownloads">Would you like to enable free direct downloads for this release?</label>
            <input type="checkbox" id="enableDirectDownloads" name="enableDirectDownloads"><br><br>
        </div>
    </div>
    <br>
    <button type="submit" id="submitButton">Submit</button>
    <button type="button" id="cancelButton" class="btn button--outline-primary button--circle">Cancel</button>
</form>

<!-- Loading Message -->
<div id="loadingMessage" style="display: none; text-align: center;">
    <p>Uploading your track, please wait...</p>
    <div class="progress-bar" style="width: 100%; background-color: lightgray;">
        <div id="progress" style="width: 0%; height: 20px; background-color: green;"></div>
    </div>
</div>
<!-- Toast Container -->
<div id="toastContainer" style="position: fixed; top: 20px; right: 20px; z-index: 1000;"></div>
</div>


<!-- JavaScript Code -->


<script>
    
// Define global variables
let playersData = [];
let soundEngineData = [];
let currentMode = 'create'; // Current mode: 'create', 'edit', 'view'
let trackId = ''; // Will hold the track ID when editing/viewing
let userId = localStorage.getItem('userId'); // Ensure this is set correctly
let isOwner = false; // Indicates if the current user is the owner of the track
let trackData = null; // Holds the current track data
// Initialize the form once the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeForm);
function initializeForm() {
if (!userId) {
    showToast('User not authenticated.', 'error');
    return;
}
document.getElementById('ownerId').value = userId;
// Fetch data
fetchPlayersData(userId);
fetchSoundEnginesData(userId);
// Attach event listeners
attachEventListeners();
// Determine initial mode based on URL parameters
const urlParams = new URLSearchParams(window.location.search);
let initialMode = urlParams.get('mode'); // 'edit', 'view', or null
trackId = urlParams.get('trackId') || ''; // Default to '' if 'trackId' is not provided.
if (initialMode === 'edit' && trackId) {
    currentMode = 'edit';
    loadTrackDetails(trackId);
} else if (trackId) {
    currentMode = 'view';
    loadTrackDetails(trackId);
} else {
    currentMode = 'create';
    clearFormFields();
}
setFormMode(currentMode);
// Push the initial state to history
history.replaceState({ mode: currentMode, trackId }, '', window.location.href);
}
function attachEventListeners() {
document.getElementById('soundEngineId').addEventListener('change', updateSoundEngineDetails);
document.getElementById('playerId').addEventListener('change', updatePlayerDetails);
document.getElementById('articleForm').addEventListener('submit', handleFormSubmit);
document.getElementById('uploadCoverImage').addEventListener('change', handleImagePreview);
document.getElementById('addArtistButton').addEventListener('click', addArtistField);
document.getElementById('artistsContainer').addEventListener('click', handleRemoveArtist);
document.querySelector('.toggle-button').addEventListener('click', toggleOptionalFields);
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
}
/**
* Fetch Players Data and Populate Dropdown
*/
function fetchPlayersData(userId) {
fetch(`http://media.maar.world:3001/api/interplanetaryplayers/getAvailableInterplanetaryPlayers/${userId}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            playersData = data.interplanetaryPlayers; // Store data globally
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
players.forEach(player => {
    const option = document.createElement('option');
    option.value = player._id; // Ensure _id exists
    option.textContent = `💡 ${player.artName} 🔭 ${player.sciName} (${player.isPublic ? 'Public' : 'Owned'})`;
    if (player.isPublic) {
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
* Fetch Sound Engines Data and Populate Dropdown
*/
function fetchSoundEnginesData(userId) {
fetch(`http://media.maar.world:3001/api/soundEngines/getAvailableSoundEngines/${userId}`)
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
            <img src="${imageUrl}" alt="${soundEngine.soundEngineName}" />
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

const player = playersData.find(p => p._id === selectedPlayerId);

const playerListElement = document.getElementById('interplanetaryPlayerView');
playerListElement.innerHTML = ''; // Clear previous details

if (player) {
    const imageUrl = player.ddd && player.ddd.textureURL
        ? `https://media.maar.world${player.ddd.textureURL}`
        : 'https://media.maar.world/uploads/default/default-player.jpg';

    const playerElement = document.createElement('div');
    playerElement.classList.add('interplanetaryPlayer-list-item');
    playerElement.innerHTML = `
        <div class="player-profile-pic">
            <img src="${imageUrl}" alt="${player.artName}" />
        </div>
        <div class="player-details">
            <div class="player-name"><strong>Name:</strong> ${player.artName}</div>
            <div class="player-owner"><strong>3D Artist:</strong> ${player.ddd.dddArtist}</div>
            <div class="player-availability"><strong>Availability:</strong> ${player.isPublic ? '🌍 Public' : '🔐 Exclusive'}</div>
            <!-- Add more player details as needed -->
        </div>
    `;

    playerListElement.appendChild(playerElement);
} else {
    playerListElement.innerHTML = '<p>Please select an Interplanetary Player to view its details.</p>';
}
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
    <button type="button" id="addArtistButton">Add Another Artist</button>
    <br><br>
`;
// Reattach event listener for addArtistButton
document.getElementById('addArtistButton').addEventListener('click', addArtistField);
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
* Load Track Details from the Server
*/
function loadTrackDetails(trackId) {
fetch(`http://media.maar.world:3001/api/tracks/${trackId}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            trackData = data.track;
            isOwner = trackData.ownerId === userId;
            console.log('Is user the owner?', isOwner);
            console.log('RECIVED DATA', trackData);

            // Show the edit button only if the user is the owner
            const editButton = document.getElementById('editButton');
            if (editButton) {
                editButton.style.display = isOwner ? 'block' : 'none';
            }

            populateEditMode(trackData);
            populateViewMode(trackData);
        } else {
            showToast('Error loading track details.', 'error');
            console.error('Error fetching track details:', data.message);
        }
    })
    .catch(error => {
        showToast('Error loading track details.', 'error');
        console.error('Error fetching track details:', error);
    });
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
    if (trackData.coverImage) {
        coverImagePreview.src = `https://media.maar.world${trackData.coverImage}`;
        coverImagePreview.style.display = 'block';
    } else {
        coverImagePreview.style.display = 'none';
    }
    // Populate artists
    const artistsContainer = document.getElementById('artistsContainer');
    artistsContainer.innerHTML = '';
    trackData.artists.forEach((artist, index) => {
        const artistEntry = document.createElement('div');
        artistEntry.className = 'artistEntry';
        artistEntry.innerHTML = `
            <div class="input-wrapper">
                <input type="text" class="user-search-input" name="artistUsernames[]" placeholder="Type a username..." autocomplete="off" required value="${artist.username}">
                <input type="hidden" class="artistUserId" name="artistUserIds[]" value="${artist.userId}">
                <div class="dropdown"></div>
            </div>
            ${index > 0 ? '<button type="button" class="removeArtistButton" style="display: inline-block;">Remove</button>' : ''}
        `;
        artistsContainer.appendChild(artistEntry);
    });

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.id = 'addArtistButton';
    addButton.textContent = 'Add Another Artist';
    artistsContainer.appendChild(addButton);
    addButton.addEventListener('click', addArtistField);
}
}

/**
* Populate View Mode with Track Data
*/
function populateViewMode(trackData) {
if (currentMode === 'view') {
    const coverImageDisplay = document.getElementById('coverImageDisplay');
    if (trackData.coverImage) {
        coverImageDisplay.src = `https://media.maar.world${trackData.coverImage}`;
        coverImageDisplay.style.display = 'block';
    } else {
        coverImageDisplay.style.display = 'none';
    }

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
}
}

/**
* Handle Form Submission
*/
function handleFormSubmit(event) {
event.preventDefault();
console.log('Form submit handler triggered');

// Collect form data
const trackDataToSend = {
ownerId: document.getElementById('ownerId').value,
playerId: document.getElementById('playerId').value,
soundEngineId: document.getElementById('soundEngineId').value,
artists: collectArtistUserIds(), // Collect UUIDs
trackName: document.getElementById('trackName').value,
licence: document.getElementById('licence').value,
// Include optional fields if they are filled
type: document.getElementById('type').value || null,
genre: document.getElementById('genre').value || null,
mood: document.getElementById('mood').value || null,
additionalTags: document.getElementById('additionalTags').value || null,
description: document.getElementById('description').value || null,
credits: document.getElementById('credits').value || null,
privacy: document.getElementById('privacy').value || 'public',
releaseDate: document.getElementById('releaseDate').value || null,
enableDirectDownloads: document.getElementById('enableDirectDownloads').checked,
confirmRights: document.getElementById('confirmRights').checked
};

// Log the collected trackData for debugging
console.log('Submitting trackData:', trackDataToSend);

// Validation: Ensure required fields are filled
if (!trackDataToSend.playerId) {
    showToast('Please select an Interplanetary Player.', 'error');
    return;
}
if (!trackDataToSend.soundEngineId) {
    showToast('Please select a Sound Engine.', 'error');
    return;
}
if (!trackDataToSend.artists.length) {
    showToast('Please add at least one artist.', 'error');
    return;
}
if (!trackDataToSend.trackName) {
    showToast('Please enter the track name.', 'error');
    return;
}
if (!trackDataToSend.licence) {
    showToast('Please select a license.', 'error');
    return;
}
if (!trackDataToSend.confirmRights) {
    showToast('Please confirm your rights to the content.', 'error');
    return;
}

// Proceed with form submission
// Disable form elements and show loading message
const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm button, #articleForm textarea');
const submitButton = document.querySelector('#articleForm button[type="submit"]');
formElements.forEach(element => element.disabled = true);
submitButton.textContent = 'Submitting...';
document.getElementById('loadingMessage').style.display = 'block';
console.log(trackDataToSend);

const method = currentMode === 'edit' ? 'PUT' : 'POST';
const url = method === 'PUT'
? `http://media.maar.world:3001/api/tracks/${trackId}`
: 'http://media.maar.world:3001/api/submitTrackData'; // Updated POST endpoint

fetch(url, {
    method: method,
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(trackDataToSend)
})
.then(response => {
    if (!response.ok) {
        // Handle error
        throw new Error('Server returned an error');
    }
    return response.json();
})
.then(data => {
    if (data.trackId) {
        const hasFiles = document.getElementById('uploadAudio').files.length > 0 || document.getElementById('uploadCoverImage').files.length > 0;
        if (hasFiles) {
            uploadFiles(data.trackId);
        } else {
            showToast('Track updated successfully!', 'success');
            window.location.href = `/voyage/track-release?mode=view&trackId=${data.trackId}`;
        }
    } else {
        showToast('Failed to submit track data, please try again.', 'error');
        resetForm();
    }
})
.catch(error => {
    console.error('Error submitting track data:', error);
    showToast(`Failed to submit track data: ${error.message || 'Please try again.'}`, 'error');
    resetForm();
});
}

/**
* Upload Files After Metadata Submission
*/
function uploadFiles(trackId) {
const audioFile = document.getElementById('uploadAudio').files[0];
const coverImage = document.getElementById('uploadCoverImage').files[0];

const formData = new FormData();
if (audioFile) {
    formData.append('audioFile', audioFile);
}
if (coverImage) {
    formData.append('coverImage', coverImage);
}

console.log('FormData Entries:');
for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
}

fetch(`http://media.maar.world:3001/api/uploadTrackFiles/${trackId}`, {
    method: 'POST',
    body: formData,
})
.then(response => {
    document.getElementById('loadingMessage').style.display = 'none';
    const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm button, #articleForm textarea');
    const submitButton = document.querySelector('#articleForm button[type="submit"]');
    formElements.forEach(element => element.disabled = false); // Re-enable form elements
    submitButton.textContent = 'Submit';

    if (!response.ok) {
        return response.json().then(errData => { throw errData; });
    }
    return response.json();
})
.then(data => {
    console.log('Upload Successful:', data);
    showToast('Track released successfully!', 'success');
    document.getElementById('articleForm').reset();
    document.getElementById('coverImagePreview').style.display = 'none';
    localStorage.removeItem('trackReleaseFormData');  // Clear saved form data

    // Redirect to the track release page in view mode
    window.location.href = `/voyage/track-release?mode=view&trackId=${trackId}`;
})
.catch(error => {
    console.error('Upload Failed:', error);
    showToast(`Failed to upload files: ${error.message || 'Please try again.'}`, 'error');
});
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
    <button type="button" class="removeArtistButton" style="display: inline-block;">Remove</button>
`;
const addButton = document.getElementById('addArtistButton');
const artistsContainer = document.getElementById('artistsContainer');

// Insert the new artistEntry before the "Add Another Artist" button
artistsContainer.insertBefore(artistEntry, addButton);

console.log('Added new artist entry:', artistEntry);

// Initialize autocomplete for the new artist entry by calling the globally exposed function
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
* Toggle Optional Fields Visibility
*/
function toggleOptionalFields(event) {
event.preventDefault(); // Prevent default button behavior
const toggleButton = event.target;
const optionalFields = document.getElementById('optional-fields');
const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
toggleButton.setAttribute('aria-expanded', !isExpanded);
toggleButton.textContent = isExpanded ? '+' : '–';
optionalFields.style.display = isExpanded ? 'none' : 'block';
}

/**
* Show Toast Notifications
*/
function showToast(message, type = 'success') {
const toastContainer = document.getElementById('toastContainer');
const toast = document.createElement('div');
const toastId = `toast_${Date.now()}`;
toast.classList.add('toast');
toast.setAttribute('id', toastId);
toast.setAttribute('role', 'alert');
toast.setAttribute('aria-live', 'assertive');
toast.setAttribute('aria-atomic', 'true');

if (type === 'success') {
    toast.classList.add('success');
} else if (type === 'error') {
    toast.classList.add('error');
}

// Close Button
const closeBtn = document.createElement('button');
closeBtn.classList.add('close-btn');
closeBtn.innerHTML = '&times;';
closeBtn.onclick = () => {
    toast.classList.remove('show');
    setTimeout(() => {
        const toastElem = document.getElementById(toastId);
        if (toastElem) {
            toastElem.remove();
        }
    }, 500);
};

toast.appendChild(closeBtn);
toast.appendChild(document.createTextNode(message));
toastContainer.appendChild(toast);

// Show the toast
setTimeout(() => {
    toast.classList.add('show');
}, 100);

// Automatically hide the toast after 3 seconds
setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
        const toastElem = document.getElementById(toastId);
        if (toastElem) {
            toastElem.remove();
        }
    }, 500);
}, 3000);
}

// Placeholder for initializeSearchUsers function
// This function should be defined elsewhere in your codebase
function initializeSearchUsers() {
// Implement the user search functionality here
}

</script>
