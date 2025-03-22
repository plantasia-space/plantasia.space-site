---
layout: articles
show_title: false
show_date: false
permalink: /voyage/soundEngine
titles:
  en: &EN Create Sound Engine
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
public: false
---

<!-- Sound Engine Form Container -->
<div class="form-container">
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Back to Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle" aria-label="Back">
                    <span class="material-symbols-outlined">brightness_6</span>
                </button>
            </a>
        </div>
        <div class="edit-button-container">
            <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Sound Engine" style="display: none;" aria-label="Edit">
                <span class="material-symbols-outlined">edit</span> 
            </button>
        </div>
    </div>

    <h3 id="formTitle">Create a Sound Engine</h3>
    <p>Create a new Sound Engine with custom parameters for audio manipulation.</p>
    <div class="p-2"></div>

    <!-- View Mode -->
    <div id="soundEngineView">
        <div id="soundEngineImagePreviewContainer" class="sound-engine-hexagon">
            <img id="soundEngineImagePreview" src="" alt="Sound Engine Image" style="display: none;" loading="lazy">
        </div>

        <p><strong>Developer Username:</strong> <span id="displayDeveloperUsername"></span></p>
        <p><strong>Sound Engine Name:</strong> <span id="displaySoundEngineName"></span></p>
        <p><strong>Color 1:</strong> <span id="displayColor1"></span></p>
        <p><strong>Color 2:</strong> <span id="displayColor2"></span></p>
        <p><strong>Availability:</strong> <span id="displayAvailability"></span></p>
        <p><strong>Credits:</strong> <span id="displayCredits"></span></p>

        <!-- Engine Owner -->
        <div id="engineOwnerContainer">
            <h4>Engine Owner (<span id="engineOwnerCount">0</span>)</h4>
            <ul id="engineOwnerList"></ul>
        </div>
    </div>

    <!-- Edit/Create Mode -->
    <form id="soundEngineForm" class="contact-form" style="display: none;" enctype="multipart/form-data" aria-labelledby="formTitle">
        <!-- Loading Message -->
        <div id="loadingMessage" style="display: none; margin-bottom: 10px; color: blue;">Uploading... Please wait.</div>

        <div id="soundEngineImagePreviewContainer" class="sound-engine-hexagon">
            <img id="soundEngineImagePreviewForm" src="" alt="Sound Engine Image" style="display: none;" loading="lazy">
        </div>
        <p id="existingImage" style="display: none;">
            Current Image: <a href="" target="_blank" id="existingImageLink">View</a>
        </p>
        <input type="file" id="soundEngineImage" name="soundEngineImage" accept=".jpg, .jpeg, .png" aria-label="Upload Sound Engine Image"><br><br>

        <!-- Sound Engine JSON Upload -->
        <label for="soundEngineFile">Upload Sound Engine JSON File (Optional):</label>
        <p id="existingJsonFile" style="display: none;">Current JSON File: <a href="" target="_blank" id="existingJsonLink">Download</a></p>
        <input type="file" id="soundEngineFile" name="soundEngineFile" accept=".json" aria-label="Upload Sound Engine JSON File"><br><br>

        <!-- Developer Username Input -->
        <label for="developerUsername">Developer Username<span style="color: red;">*</span>:</label>
        <div class="input-wrapper" role="combobox" aria-haspopup="listbox" aria-expanded="false">
            <input type="text" class="user-search-input" id="developerUsername" name="developerUsername" placeholder="Type a username..." autocomplete="off" required aria-autocomplete="list" aria-controls="developerUsernameDropdown">
            <div class="dropdown" id="developerUsernameDropdown" role="listbox"></div>
        </div>

        <label for="soundEngineName">Sound Engine Name<span style="color: red;">*</span>:</label>
        <input type="text" id="soundEngineName" name="soundEngineName" required aria-describedby="nameFeedback" aria-required="true">
        <div id="nameFeedback" style="font-size: 14px; margin-top: 5px;"></div>
        <input type="hidden" id="soundEngineId" value="">
        <br><br>

        <!-- Color 1 Picker -->
        <div id="color1Section" style="border: 5px solid rgba(255, 255, 255, 1); padding: 10px; margin-bottom: 10px;">
            <label for="color1Picker">Color 1 (RGBA)<span style="color: red;">*</span>:</label>
            <input type="color" id="color1Picker" name="color1Picker" value="#ff33cc" required aria-label="Select Color 1">
            <input type="range" id="alpha1Picker" name="alpha1Picker" min="0" max="1" step="0.01" value="1" required aria-label="Select Alpha for Color 1">
            <label for="alpha1Picker">Alpha 1: <span id="alpha1Value">1</span></label>
            <input type="hidden" id="color1" name="color1">
        </div>

        <!-- Color 2 Picker -->
        <div id="color2Section" style="border: 5px solid rgba(255, 255, 255, 1); padding: 10px; margin-bottom: 10px;">
            <label for="color2Picker">Color 2 (RGBA)<span style="color: red;">*</span>:</label>
            <input type="color" id="color2Picker" name="color2Picker" value="#33ffff" required aria-label="Select Color 2">
            <input type="range" id="alpha2Picker" name="alpha2Picker" min="0" max="1" step="0.01" value="1" required aria-label="Select Alpha for Color 2">
            <label for="alpha2Picker">Alpha 2: <span id="alpha2Value">1</span></label>
            <input type="hidden" id="color2" name="color2">
        </div><br><br>

        <!-- Parameter Inputs (Responsive) -->
        <div class="parameter-inputs">
            <label for="xParamLabel">X Parameter Label<span style="color: red;">*</span>:</label>
            <input type="text" id="xParamLabel" name="xParamLabel" value="Speed" required aria-required="true">
            <div class="param-range">
                <input type="number" id="xParamMin" name="xParamMin" value="-100" required placeholder="Min" aria-label="X Parameter Minimum">
                <input type="number" id="xParamMax" name="xParamMax" value="100" required placeholder="Max" aria-label="X Parameter Maximum">
                <input type="number" id="xParamInit" name="xParamInit" value="1" required placeholder="Initial" aria-label="X Parameter Initial Value">
            </div>
        </div>

        <div class="parameter-inputs">
            <label for="yParamLabel">Y Parameter Label<span style="color: red;">*</span>:</label>
            <input type="text" id="yParamLabel" name="yParamLabel" value="Tremolo" required aria-required="true">
            <div class="param-range">
                <input type="number" id="yParamMin" name="yParamMin" value="-100" required placeholder="Min" aria-label="Y Parameter Minimum">
                <input type="number" id="yParamMax" name="yParamMax" value="100" required placeholder="Max" aria-label="Y Parameter Maximum">
                <input type="number" id="yParamInit" name="yParamInit" value="0" required placeholder="Initial" aria-label="Y Parameter Initial Value">
            </div>
        </div>

        <div class="parameter-inputs">
            <label for="zParamLabel">Z Parameter Label<span style="color: red;">*</span>:</label>
            <input type="text" id="zParamLabel" name="zParamLabel" value="SpaceReverb" required aria-required="true">
            <div class="param-range">
                <input type="number" id="zParamMin" name="zParamMin" value="-100" required placeholder="Min" aria-label="Z Parameter Minimum">
                <input type="number" id="zParamMax" name="zParamMax" value="100" required placeholder="Max" aria-label="Z Parameter Maximum">
                <input type="number" id="zParamInit" name="zParamInit" value="0" required placeholder="Initial" aria-label="Z Parameter Initial Value">
            </div>
        </div><br><br>

        <label for="availability">Availability:</label>
        <select id="availability" name="availability" required aria-required="true">
            <option value="true">Public</option>
            <option value="false">Private</option>
        </select>
        <small style="color: grey;">If you change the availability from Public to Private, all current Interplanetary Players using your engine will still have access. The private status will only apply to future community creations.</small>
        <br><br>

        <label for="credits">Credits:</label>
        <textarea id="credits" name="credits" rows="3" maxlength="500" aria-label="Credits for Sound Engine"></textarea><br><br>

        <button type="submit" class="btn button--primary">Save Sound Engine</button>
        <div class="p-2"></div>

        <button type="button" id="cancelButton" class="btn button--outline-primary button--circle" aria-label="Cancel">Cancel</button>
        <div class="p-2"></div>
        <br>
        <!-- Upload Stage Label -->
        <div id="uploadStage" style="margin-bottom: 5px;"></div>
        <!-- Progress Bar -->
        <div class="progress-bar" style="width: 100%; background-color: lightgray;">
            <div id="progress" style="width: 0%; height: 20px; background-color: green;"></div>
        </div>
    </form>
</div>

<!-- Toast Container for Notifications -->
<div id="toastContainer"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'https://api.plantasia.space:443/api'; // Ensure this matches your backend
    const userId = localStorage.getItem('userId'); 
    const DEFAULT_SE_IMAGE_URL = 'https://mw-storage.fra1.cdn.digitaloceanspaces.com/default/default-soundEngine.jpg'; // Replace with your actual default image URL

    if (!userId) {
        showToast('No logged-in user found. Please log in first.', 'error');
        window.location.href = '/login';
        return;
    }

    // DOM Elements
    const formTitle = document.getElementById('formTitle');
    const soundEngineView = document.getElementById('soundEngineView');
    const soundEngineForm = document.getElementById('soundEngineForm');
    const editButton = document.getElementById('editButton');
    const backButton = document.getElementById('backButton');
    const cancelButton = document.getElementById('cancelButton');
    const soundEngineImageInput = document.getElementById('soundEngineImage');
    const soundEngineImagePreviewForm = document.getElementById('soundEngineImagePreviewForm');
    const soundEngineFileInput = document.getElementById('soundEngineFile');
    const nameFeedback = document.getElementById('nameFeedback');
    const progressBar = document.getElementById('progress');
    const uploadStage = document.getElementById('uploadStage');
    const loadingMessage = document.getElementById('loadingMessage');

    const color1Picker = document.getElementById('color1Picker');
    const color2Picker = document.getElementById('color2Picker');
    const alpha1Picker = document.getElementById('alpha1Picker');
    const alpha2Picker = document.getElementById('alpha2Picker');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const alpha1Value = document.getElementById('alpha1Value');
    const alpha2Value = document.getElementById('alpha2Value');

    const developerUsernameInput = document.getElementById('developerUsername');
    const developerUsernameDropdown = document.getElementById('developerUsernameDropdown'); // Renamed for clarity

    const soundEngineNameInput = document.getElementById('soundEngineName');
    const soundEngineIdInput = document.getElementById('soundEngineId');
    const availabilitySelect = document.getElementById('availability');
    const creditsTextarea = document.getElementById('credits');

    const displayDeveloperUsername = document.getElementById('displayDeveloperUsername');
    const displaySoundEngineName = document.getElementById('displaySoundEngineName');
    const displayColor1 = document.getElementById('displayColor1');
    const displayColor2 = document.getElementById('displayColor2');
    const displayAvailability = document.getElementById('displayAvailability');
    const displayCredits = document.getElementById('displayCredits');
    const soundEngineImagePreview = document.getElementById('soundEngineImagePreview');
    const engineOwnerList = document.getElementById('engineOwnerList');
    const engineOwnerCount = document.getElementById('engineOwnerCount');

    // Flags
    let isEditMode = false;
    let isOwner = false;
    let canEdit = false;

    // Regex for soundEngineName
    const soundEngineNameRegex = /^[a-zA-Z0-9 _-]{1,30}$/;

    // Variable to store the original Sound Engine name
    let originalSoundEngineName = '';

    // Flag to indicate that the form is fully initialized
    let formInitialized = false;

    // Debounce function
    function debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

    /**
     * Convert Hex to RGBA
     * @param {string} hex 
     * @param {number} alpha 
     * @returns {string}
     */
    function hexToRgba(hex, alpha = 1) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        }
        return `rgba(${r},${g},${b},${alpha})`;
    }

    /**
     * Convert RGB to Hex
     * @param {number} r 
     * @param {number} g 
     * @param {number} b 
     * @returns {string}
     */
    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    /**
     * Update Border Color for Color Pickers
     */
    function updateBorderColor() {
        const rgbaColor = hexToRgba(color1Picker.value, alpha1Picker.value);
        const color1Section = document.getElementById('color1Section');
        if (color1Section) {
            color1Section.style.borderColor = rgbaColor;
        }
        color1Input.value = rgbaColor;
        alpha1Value.innerText = alpha1Picker.value;
    }

    function updateBorderColor2() {
        const rgbaColor = hexToRgba(color2Picker.value, alpha2Picker.value);
        const color2Section = document.getElementById('color2Section');
        if (color2Section) {
            color2Section.style.borderColor = rgbaColor;
        }
        color2Input.value = rgbaColor;
        alpha2Value.innerText = alpha2Picker.value;
    }

    // Event listeners for color pickers
    color1Picker.addEventListener('input', updateBorderColor);
    alpha1Picker.addEventListener('input', updateBorderColor);
    color2Picker.addEventListener('input', updateBorderColor2);
    alpha2Picker.addEventListener('input', updateBorderColor2);

    // Initial call to set border color
    updateBorderColor();
    updateBorderColor2();

    /**
     * Function to Update Edit Button Based on Mode
     */
    function updateEditButton() {
        if (isEditMode) {
            // In Edit Mode: Show 'visibility' icon to switch to View Mode
            editButton.innerHTML = '<span class="material-symbols-outlined">visibility</span>';
            editButton.title = 'View Sound Engine';
            editButton.setAttribute('aria-label', 'View');
        } else {
            // In View Mode: Show 'edit' icon to switch to Edit Mode
            editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>';
            editButton.title = 'Edit Sound Engine';
            editButton.setAttribute('aria-label', 'Edit');
        }
    }

    /**
     * Function to Update the URL Based on Mode
     * @param {string} mode - 'edit' or 'view'
     * @param {string} soundEngineId 
     */
    function updateURL(mode, soundEngineId) {
        const newURL = `/voyage/soundEngine?mode=${mode}&id=${encodeURIComponent(soundEngineId)}`;
        history.pushState({ mode }, '', newURL);
    }

    /**
     * Function to Handle Mode Toggle
     */
    function handleModeToggle(currentSoundEngineId) {
        if (isEditMode) {
            // Switch to View Mode
            isEditMode = false;
            toggleViewMode('view');
            loadSoundEngineDetails(currentSoundEngineId);
            updateURL('view', currentSoundEngineId);
        } else {
            // Switch to Edit Mode
            isEditMode = true;
            toggleViewMode('form');
            updateURL('edit', currentSoundEngineId);
        }
        updateEditButton();
    }

    /**
     * Initialize Edit Button and Event Listener
     */
    function initializeEditButton(currentSoundEngineId) {
        if (editButton) {
            editButton.style.display = 'block'; // Ensure the edit button is visible based on ownership
            updateEditButton(); // Set initial icon based on mode

            editButton.addEventListener('click', function() {
                handleModeToggle(currentSoundEngineId);
            });
        }
    }

    /**
     * Handle Browser Navigation (Back/Forward)
     */
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.mode) {
            const mode = event.state.mode;
            if (mode === 'edit') {
                isEditMode = true;
                toggleViewMode('form');
            } else {
                isEditMode = false;
                toggleViewMode('view');
                loadSoundEngineDetails(currentSoundEngineId);
            }
            updateEditButton();
        }
    });

    /**
     * Toggle between View and Form Modes
     * @param {string} mode - 'view' or 'form'
     */
    function toggleViewMode(mode) {
        if (mode === 'form') {
            soundEngineView.style.display = 'none';
            soundEngineForm.style.display = 'block';
        } else if (mode === 'view') {
            soundEngineView.style.display = 'block';
            soundEngineForm.style.display = 'none';
        }
    }

    /**
     * Handle mode logic and load sound engine details
     */
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get('mode');
    const currentSoundEngineId = urlParams.get('id') || '';

    if (modeParam === 'edit' && currentSoundEngineId) {
        formTitle.innerText = 'Edit Sound Engine';
        isEditMode = true;
        loadSoundEngineDetails(currentSoundEngineId);
        toggleViewMode('form'); // Show the form for editing
    } else if (modeParam === 'view' && currentSoundEngineId) {
        formTitle.innerText = 'Sound Engine Details';
        isEditMode = false;
        loadSoundEngineDetails(currentSoundEngineId);
        toggleViewMode('view'); // Show the view mode
    } else {
        formTitle.innerText = 'Create a Sound Engine';
        toggleViewMode('form'); // Show the form for creation
        isEditMode = false;
        formInitialized = true; // For creation mode, form is initialized immediately

        // Set default image in creation mode
        soundEngineImagePreviewForm.src = DEFAULT_SE_IMAGE_URL;
        soundEngineImagePreviewForm.style.display = 'block';
    }


    // Initialize Edit Button after determining the mode
    if (currentSoundEngineId) {
        initializeEditButton(currentSoundEngineId);
    }

    /**
     * Function to load Sound Engine details based on ID
     * @param {string} soundEngineId 
     */
    async function loadSoundEngineDetails(soundEngineId) {
        try {
            const response = await fetch(`${API_BASE_URL}/soundEngines/${soundEngineId}`, {
                credentials: 'include', // Use HTTP-only cookies for authentication
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            const data = await response.json();
            console.log('Load Sound Engine Details Response:', data);
            console.log('soundEngine:', data.soundEngine); // Added for debugging

            if (data.success && data.soundEngine) {
                const soundEngine = data.soundEngine;

                // Adjust based on your backend's owner field
                isOwner = soundEngine.ownerDetails && soundEngine.ownerDetails.ownerId === userId;

                canEdit = isOwner; // Adjust based on your permission logic
                console.log('Is user the owner?', isOwner);
                console.log('Can user edit?', canEdit);

                populateViewMode(soundEngine);
                populateFormMode(soundEngine);

                // Store the original name
                originalSoundEngineName = soundEngine.soundEngineName;

                // Show or hide edit button based on ownership
                if (isOwner) {
                    editButton.style.display = 'block';
                    updateEditButton(); // Update the edit button based on the current mode
                } else {
                    editButton.style.display = 'none';
                }

                // Toggle to the appropriate mode
                if (isEditMode) {
                    toggleViewMode('form');
                } else {
                    toggleViewMode('view');
                }

                // Mark form as initialized after populating data
                formInitialized = true;

            } else {
                showToast(data.message || 'Failed to load Sound Engine details.', 'error');
            }
        } catch (error) {
            console.error('Error fetching Sound Engine details:', error);
            showToast('An error occurred while loading Sound Engine details.', 'error');
        }
    }

    /**
     * Populate View Mode with Sound Engine Data
     * @param {object} soundEngine 
     */
    function populateViewMode(soundEngine) {
        displayDeveloperUsername.innerText = soundEngine.developerUsername;
        displaySoundEngineName.innerText = soundEngine.soundEngineName;
        displayColor1.innerText = soundEngine.color1;
        displayColor2.innerText = soundEngine.color2;
        displayAvailability.innerText = soundEngine.isPublic ? 'Public' : 'Private';
        displayCredits.innerText = soundEngine.credits || 'No credits provided';

                // Image Display
        if (soundEngine.soundEngineImageURL) {
            soundEngineImagePreview.src = soundEngine.soundEngineImageURL;
            soundEngineImagePreview.style.display = 'block';
        } else {
            soundEngineImagePreview.src = DEFAULT_SE_IMAGE_URL;
            soundEngineImagePreview.style.display = 'block';
        }

        // Engine Owner Details
        engineOwnerList.innerHTML = ''; // Clear existing list

        if (soundEngine.ownerDetails) {
            const owner = soundEngine.ownerDetails;
            const li = document.createElement('li');
            li.classList.add('user-list-item');

            li.innerHTML = `
                <div class="user-profile-pic">
                    <img src="${owner.profileImage ? `https://api.plantasia.space${owner.profileImage}` : 'https://api.plantasia.space/uploads/default/default-profile.jpg'}" alt="${owner.username}" loading="lazy">
                </div>
                <div class="user-details">
                    <div class="user-display-name">${owner.displayName || 'Unknown'}</div>
                    <div class="user-username">
                        <a href="/xplorer/?username=${encodeURIComponent(owner.username)}" target="_self">
                            @${owner.username || 'Unknown'}
                        </a>
                    </div>
                </div>
            `;
            engineOwnerList.appendChild(li);
            engineOwnerCount.innerText = 1;
        } else {
            engineOwnerList.innerHTML = '<li>No owner details available.</li>';
            engineOwnerCount.innerText = 0;
        }
    }

    /**
     * Populate Form Mode with Sound Engine Data for Editing
     * @param {object} soundEngine 
     */
    function populateFormMode(soundEngine) {
        developerUsernameInput.value = soundEngine.developerUsername;
        soundEngineNameInput.value = soundEngine.soundEngineName;
        color1Input.value = soundEngine.color1;
        color2Input.value = soundEngine.color2;
        availabilitySelect.value = soundEngine.isPublic.toString();
        creditsTextarea.value = soundEngine.credits || '';
        soundEngineIdInput.value = soundEngine._id;

        // Show existing image
        if (soundEngine.soundEngineImageURL) {
            const existingImage = document.getElementById('existingImage'); // Ensure these elements exist
            const existingImageLink = document.getElementById('existingImageLink');
            existingImage.style.display = 'block';
            existingImageLink.href = soundEngine.soundEngineImageURL;
            existingImageLink.textContent = soundEngine.soundEngineImageKey.split('/').pop();
            soundEngineImagePreviewForm.src = soundEngine.soundEngineImageURL;
            soundEngineImagePreviewForm.style.display = 'block';
        } else {
            const existingImage = document.getElementById('existingImage');
            soundEngineImagePreviewForm.style.display = 'none';
            if (existingImage) {
                existingImage.style.display = 'none';
            }
        }

        // Show existing JSON file
        const existingJsonFile = document.getElementById('existingJsonFile');
        const existingJsonLink = document.getElementById('existingJsonLink');
        if (soundEngine.soundEngineFileURL) {
            existingJsonFile.style.display = 'block';
            existingJsonLink.href = soundEngine.soundEngineFileURL;
            existingJsonLink.textContent = soundEngine.soundEngineFileKey.split('/').pop();
        } else {
            existingJsonFile.style.display = 'none';
        }

        // Update color pickers based on stored RGBA values
        const [r1, g1, b1, a1] = extractRGBAValues(soundEngine.color1);
        const [r2, g2, b2, a2] = extractRGBAValues(soundEngine.color2);

        color1Picker.value = rgbToHex(r1, g1, b1);
        alpha1Picker.value = a1;
        updateBorderColor();

        color2Picker.value = rgbToHex(r2, g2, b2);
        alpha2Picker.value = a2;
        updateBorderColor2();
    }

    /**
     * Helper Function to Extract RGBA Values
     * @param {string} rgbaString 
     * @returns {Array} [r, g, b, a]
     */
    function extractRGBAValues(rgbaString) {
        const rgbaMatch = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*(?:\.\d+)?)?\)/);
        if (rgbaMatch) {
            const [, r, g, b, a = 1] = rgbaMatch;
            return [parseInt(r), parseInt(g), parseInt(b), parseFloat(a)];
        }
        return [0, 0, 0, 1]; // Default values if parsing fails
    }

/**
 * Show Toast Notifications
 * @param {string} message - The message to display.
 * @param {string} type - The type of toast ('success' or 'error').
 */
function showToast(message, type = 'success') {
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
        }

    /**
     * Disable or Enable Form Inputs
     * @param {boolean} disable 
     */
    function disableFormInputs(disable) {
        const inputs = soundEngineForm.querySelectorAll('input, textarea, select, button');
        inputs.forEach(input => {
            input.disabled = disable;
        });
    }

    /**
     * Function to submit Sound Engine data (Create)
     */
    async function handleFormSubmit(event) {
        event.preventDefault();

        // Disable form to prevent multiple submissions
        disableFormInputs(true);
        showLoading(true);
        progressBar.style.width = '0%';
        uploadStage.innerText = 'Uploading... Please wait.';

        try {
            // Extract necessary fields
            const ownerId = userId;
            const isPublic = availabilitySelect.value === 'true';
            const developerUsername = developerUsernameInput.value.trim();
            const soundEngineName = soundEngineNameInput.value.trim();
            const color1 = color1Input.value;
            const color2 = color2Input.value;
            const xParam = JSON.stringify({
                label: document.getElementById('xParamLabel').value.trim(),
                min: parseFloat(document.getElementById('xParamMin').value),
                max: parseFloat(document.getElementById('xParamMax').value),
                initValue: parseFloat(document.getElementById('xParamInit').value)
            });
            const yParam = JSON.stringify({
                label: document.getElementById('yParamLabel').value.trim(),
                min: parseFloat(document.getElementById('yParamMin').value),
                max: parseFloat(document.getElementById('yParamMax').value),
                initValue: parseFloat(document.getElementById('yParamInit').value)
            });
            const zParam = JSON.stringify({
                label: document.getElementById('zParamLabel').value.trim(),
                min: parseFloat(document.getElementById('zParamMin').value),
                max: parseFloat(document.getElementById('zParamMax').value),
                initValue: parseFloat(document.getElementById('zParamInit').value)
            });
            const credits = creditsTextarea.value.trim();

            // Prepare payload for /submit
            const submitPayload = {
                ownerId,
                isPublic,
                developerUsername,
                soundEngineName,
                color1,
                color2,
                xParam,
                yParam,
                zParam,
                credits
            };

            // Handle files
            const soundEngineImage = soundEngineImageInput.files[0];
            if (soundEngineImage) {
                submitPayload.soundEngineImageFileName = soundEngineImage.name;
                submitPayload.soundEngineImageFileType = soundEngineImage.type;
            }

            const soundEngineFile = soundEngineFileInput.files[0];
            if (soundEngineFile) {
                submitPayload.soundEngineFileName = soundEngineFile.name;
                submitPayload.soundEngineFileType = soundEngineFile.type;
            }

            // Real-time validation for soundEngineName
            if (!soundEngineNameRegex.test(soundEngineName)) {
                throw new Error('Invalid Sound Engine Name format. Use 1-30 characters: letters, numbers, underscores, or hyphens.');
            }

            const isUnique = await checkSoundEngineExists(soundEngineName);
            if (!isUnique) {
                throw new Error('Sound Engine name is already taken. Please choose another one.');
            }

            // Show loading message
            uploadStage.innerText = 'Submitting Sound Engine Data...';

            console.log('Submitting payload to /soundEngines/submit:', submitPayload); // Debugging

            // Make API call to /submit
            const submitResponse = await fetch(`${API_BASE_URL}/soundEngines/submit`, {
                method: 'POST',
                credentials: 'include', // Use HTTP-only cookies for authentication
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitPayload)
            });

            let submitData;
            try {
                submitData = await submitResponse.json();
            } catch (jsonError) {
                const text = await submitResponse.text();
                throw new Error(`Unexpected response format: ${text}`);
            }

            console.log('API Response Status:', submitResponse.status);
            console.log('API Response Data:', submitData);

            if (!submitData.success) {
                throw new Error(submitData.message || 'Failed to create Sound Engine.');
            }

            const { soundEngineId, uploadURLs, uploadKeys } = submitData;

            // Update progress
            progressBar.style.width = '25%';
            uploadStage.innerText = 'Uploading Image...';

            // Step 2: Upload files to presigned URLs with progress
            // Function to upload a single file with progress
            function uploadFileWithProgress(file, url, stageDescription) {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('PUT', url, true);
                    xhr.setRequestHeader('Content-Type', file.type);

                    xhr.upload.onprogress = function(event) {
                        if (event.lengthComputable) {
                            const percentComplete = (event.loaded / event.total) * 100;
                            // Calculate overall progress based on stages
                            let stageProgress = 0;
                            if (stageDescription === 'Image') stageProgress = 25;
                            if (stageDescription === 'Sound Engine JSON') stageProgress = 50;
                            progressBar.style.width = `${stageProgress + (percentComplete / 100) * 25}%`;
                        }
                    };

                    xhr.onload = function() {
                        if (xhr.status === 200 || xhr.status === 204) {
                            resolve();
                        } else {
                            reject(new Error(`Failed to upload ${file.name}: ${xhr.statusText}`));
                        }
                    };

                    xhr.onerror = function() {
                        reject(new Error(`Network error while uploading ${file.name}.`));
                    };

                    xhr.send(file);
                });
            }

            // Upload Image
            if (soundEngineImage && uploadURLs.soundEngineImageURL) {
                uploadStage.innerText = 'Uploading Image...';
                await uploadFileWithProgress(soundEngineImage, uploadURLs.soundEngineImageURL, 'Image');
            }

            // Update progress
            progressBar.style.width = '50%';
            uploadStage.innerText = 'Uploading Sound Engine JSON File...';

            // Upload Sound Engine JSON File
            if (soundEngineFile && uploadURLs.soundEngineFileURL) {
                await uploadFileWithProgress(soundEngineFile, uploadURLs.soundEngineFileURL, 'Sound Engine JSON');
            }

            // Update progress
            progressBar.style.width = '75%';
            uploadStage.innerText = 'Finalizing Sound Engine...';

            // Step 3: Finalize Sound Engine
            const finalizePayload = {
                soundEngineId,
                soundEngineImageKey: uploadKeys.soundEngineImageKey || '',
                soundEngineFileKey: uploadKeys.soundEngineFileKey || ''
            };

            console.log('Finalizing Sound Engine with payload:', finalizePayload); // Debugging

            const finalizeResponse = await fetch(`${API_BASE_URL}/soundEngines/finalize`, {
                method: 'POST',
                credentials: 'include', // Use HTTP-only cookies for authentication
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalizePayload)
            });

            let finalizeData;
            try {
                finalizeData = await finalizeResponse.json();
            } catch (jsonError) {
                const text = await finalizeResponse.text();
                throw new Error(`Unexpected response format: ${text}`);
            }

            if (!finalizeData.success) {
                throw new Error(finalizeData.message || 'Failed to finalize Sound Engine.');
            }

            // Update progress
            progressBar.style.width = '100%';
            uploadStage.innerText = 'Sound Engine Created Successfully!';

            // Show success toast
            showToast('Sound Engine created successfully!', 'success');

            // Update sessionData.enginesOwned in localStorage
            const sessionData = JSON.parse(localStorage.getItem('sessionData')) || {};
            if (Array.isArray(sessionData.enginesOwned)) {
                sessionData.enginesOwned.push(soundEngineId);
            } else {
                sessionData.enginesOwned = [soundEngineId];
            }
            localStorage.setItem('sessionData', JSON.stringify(sessionData));

            // Clear cache if using lscache
            if (typeof lscache !== 'undefined') { // Check if lscache is available
                lscache.remove(`profile_${userId}`);
                lscache.remove(`soundEngines_batch_${userId}`);
            }

            // Redirect to view mode after a short delay to allow the toast to be visible
            setTimeout(() => {
                window.location.href = `/voyage/soundEngine?mode=view&id=${encodeURIComponent(soundEngineId)}`;
            }, 3000); // 3-second delay

        } catch (error) {
            console.error('Error during Sound Engine submission:', error);
            showToast(error.message, 'error');
        } finally {
            // Re-enable form inputs and reset progress bar
            disableFormInputs(false);
            showLoading(false);
            progressBar.style.width = '0%';
            uploadStage.innerText = '';
        }
    }

async function handleEditSubmit(event) {
    event.preventDefault();

    // Disable form to prevent multiple submissions
    disableFormInputs(true);
    showLoading(true);
    progressBar.style.width = '0%';
    uploadStage.innerText = 'Updating Sound Engine...';

    try {
        // Extract Sound Engine ID
        const soundEngineId = soundEngineIdInput.value;
        if (!soundEngineId) {
            throw new Error('Sound Engine ID is missing.');
        }

        // Extract form data
        const isPublic = availabilitySelect.value === 'true';
        const developerUsername = developerUsernameInput.value.trim();
        const soundEngineName = soundEngineNameInput.value.trim();
        const color1 = color1Input.value;
        const color2 = color2Input.value;
        const xParam = JSON.stringify({
            label: document.getElementById('xParamLabel').value.trim(),
            min: parseFloat(document.getElementById('xParamMin').value),
            max: parseFloat(document.getElementById('xParamMax').value),
            initValue: parseFloat(document.getElementById('xParamInit').value)
        });
        const yParam = JSON.stringify({
            label: document.getElementById('yParamLabel').value.trim(),
            min: parseFloat(document.getElementById('yParamMin').value),
            max: parseFloat(document.getElementById('yParamMax').value),
            initValue: parseFloat(document.getElementById('yParamInit').value)
        });
        const zParam = JSON.stringify({
            label: document.getElementById('zParamLabel').value.trim(),
            min: parseFloat(document.getElementById('zParamMin').value),
            max: parseFloat(document.getElementById('zParamMax').value),
            initValue: parseFloat(document.getElementById('zParamInit').value)
        });
        const credits = creditsTextarea.value.trim();

        // Prepare payload for /soundEngines/:id (PATCH)
        const patchPayload = {
            ownerId: userId,
            isPublic,
            developerUsername,
            soundEngineName,
            color1,
            color2,
            xParam,
            yParam,
            zParam,
            credits
        };

        // Handle files
        const soundEngineImage = soundEngineImageInput.files[0];
        if (soundEngineImage) {
            patchPayload.newSoundEngineImageFileName = soundEngineImage.name;
            patchPayload.newSoundEngineImageFileType = soundEngineImage.type;
        }

        const soundEngineFile = soundEngineFileInput.files[0];
        if (soundEngineFile) {
            patchPayload.newSoundEngineFileName = soundEngineFile.name;
            patchPayload.newSoundEngineFileType = soundEngineFile.type;
        }

        // Real-time validation for soundEngineName
        if (!soundEngineNameRegex.test(soundEngineName)) {
            throw new Error('Invalid Sound Engine Name format. Use 1-30 characters: letters, numbers, underscores, or hyphens.');
        }

        const isAvailable = await checkSoundEngineExists(soundEngineName, soundEngineId);
        if (!isAvailable) {
            throw new Error('Sound Engine name is already taken. Please choose another one.');
        }

        // Show loading message
        uploadStage.innerText = 'Updating Sound Engine Data...';

        console.log('Submitting payload to /soundEngines/:id (PATCH):', patchPayload); // Debugging

        // Make API call to /soundEngines/:id (PATCH)
        const patchResponse = await fetch(`${API_BASE_URL}/soundEngines/${soundEngineId}`, {
            method: 'PATCH',
            credentials: 'include', // Use HTTP-only cookies for authentication
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patchPayload)
        });

        let patchData;
        try {
            patchData = await patchResponse.json();
        } catch (jsonError) {
            const text = await patchResponse.text();
            throw new Error(`Unexpected response format: ${text}`);
        }

        console.log('API Response Status:', patchResponse.status);
        console.log('API Response Data:', patchData);

        if (!patchData.success) {
            throw new Error(patchData.message || 'Failed to update Sound Engine.');
        }

        // Update progress
        progressBar.style.width = '25%';
        uploadStage.innerText = 'Uploading Image...';

        // Step 2: Upload files to presigned URLs with progress
        const { uploadURLs, uploadKeys } = patchData;

        // Function to upload a single file with progress (reuse from create)
        function uploadFileWithProgress(file, url, stageDescription) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', url, true);
                xhr.setRequestHeader('Content-Type', file.type);

                xhr.upload.onprogress = function(event) {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        // Calculate overall progress based on stages
                        let stageProgress = 0;
                        if (stageDescription === 'Image') stageProgress = 25;
                        if (stageDescription === 'Sound Engine JSON') stageProgress = 50;
                        progressBar.style.width = `${stageProgress + (percentComplete / 100) * 25}%`;
                    }
                };

                xhr.onload = function() {
                    if (xhr.status === 200 || xhr.status === 204) {
                        resolve();
                    } else {
                        reject(new Error(`Failed to upload ${file.name}: ${xhr.statusText}`));
                    }
                };

                xhr.onerror = function() {
                    reject(new Error(`Network error while uploading ${file.name}.`));
                };

                xhr.send(file);
            });
        }

        // Upload Image
        if (soundEngineImage && uploadURLs.soundEngineImageURL) {
            uploadStage.innerText = 'Uploading Image...';
            await uploadFileWithProgress(soundEngineImage, uploadURLs.soundEngineImageURL, 'Image');
        }

        // Update progress
        progressBar.style.width = '50%';
        uploadStage.innerText = 'Uploading Sound Engine JSON File...';

        // Upload Sound Engine JSON File
        if (soundEngineFile && uploadURLs.soundEngineFileURL) {
            await uploadFileWithProgress(soundEngineFile, uploadURLs.soundEngineFileURL, 'Sound Engine JSON');
        }

        // Update progress
        progressBar.style.width = '75%';
        uploadStage.innerText = 'Finalizing Sound Engine...';

        // Step 3: Finalize Sound Engine
        const finalizePayload = {
            soundEngineId,
            soundEngineImageKey: uploadKeys.soundEngineImageKey || '',
            soundEngineFileKey: uploadKeys.soundEngineFileKey || ''
        };

        console.log('Finalizing Sound Engine with payload:', finalizePayload); // Debugging

        const finalizeResponse = await fetch(`${API_BASE_URL}/soundEngines/finalize`, {
            method: 'POST',
            credentials: 'include', // Use HTTP-only cookies for authentication
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalizePayload)
        });

        let finalizeData;
        try {
            finalizeData = await finalizeResponse.json();
        } catch (jsonError) {
            const text = await finalizeResponse.text();
            throw new Error(`Unexpected response format: ${text}`);
        }

        if (!finalizeData.success) {
            throw new Error(finalizeData.message || 'Failed to finalize Sound Engine.');
        }

        // Update progress
        progressBar.style.width = '100%';
        uploadStage.innerText = 'Sound Engine Updated Successfully!';

        // Show success toast
        showToast('Sound Engine updated successfully!', 'success');

        // Clear cache if using lscache
        if (typeof lscache !== 'undefined') { // Check if lscache is available
            lscache.remove(`profile_${userId}`);
            lscache.remove(`soundEngines_batch_${userId}`);
        }

        // Redirect to view mode after a short delay to allow the toast to be visible
        setTimeout(() => {
            window.location.href = `/voyage/soundEngine?mode=view&id=${encodeURIComponent(soundEngineId)}`;
        }, 3000); // 3-second delay

    } catch (error) {
        console.error('Error during Sound Engine update:', error);
        showToast(error.message, 'error');
    } finally {
        // Re-enable form inputs and reset progress bar
        disableFormInputs(false);
        showLoading(false);
        progressBar.style.width = '0%';
        uploadStage.innerText = '';
    }
}

    /**
     * Function to check if a Sound Engine name exists (for real-time validation)
     * @param {string} soundEngineName 
     * @param {string} soundEngineId 
     * @returns {boolean}
     */
    async function checkSoundEngineExists(soundEngineName, soundEngineId = null) {
        try {
            const url = new URL(`${API_BASE_URL}/soundEngines/exists`);
            url.searchParams.append('soundEngineName', soundEngineName);
            if (soundEngineId) {
                url.searchParams.append('id', soundEngineId);
            }

            const response = await fetch(url, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Failed to check Sound Engine name.');
            }

            return !data.exists; // true if name is available
        } catch (error) {
            console.error('Error checking Sound Engine existence:', error);
            return false;
        }
    }

    /**
     * Handle Sound Engine Name Input for Duplication Check
     */
soundEngineNameInput.addEventListener('input', debounce(async function(e) {
    // Do not process input events until form is initialized
    if (!formInitialized) return;

    const soundEngineName = e.target.value.trim();
    const soundEngineId = soundEngineIdInput.value;

    console.log('isEditMode:', isEditMode);
    console.log('soundEngineName:', soundEngineName);
    console.log('originalSoundEngineName:', originalSoundEngineName);

    // Skip uniqueness check if the name hasn't changed
    if (isEditMode && soundEngineName.toLowerCase() === originalSoundEngineName.toLowerCase()) {
        nameFeedback.innerText = 'Sound Engine name is available.';
        nameFeedback.style.color = 'green';
        return;
    }

    if (!soundEngineNameRegex.test(soundEngineName)) {
        nameFeedback.innerText = 'Invalid format. Use 1-30 characters: letters, numbers, underscores, hyphens, or spaces.';
        nameFeedback.style.color = 'red';
        return;
    }

    const isAvailable = await checkSoundEngineExists(soundEngineName, soundEngineId);
    if (!isAvailable) {
        nameFeedback.innerText = 'Sound Engine name is already taken.';
        nameFeedback.style.color = 'red';
    } else {
        nameFeedback.innerText = 'Sound Engine name is available.';
        nameFeedback.style.color = 'green';
    }
}, 300));
    /**
     * Handle Image Input Change for Preview
     */
soundEngineImageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            soundEngineImagePreviewForm.src = e.target.result;
            soundEngineImagePreviewForm.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        soundEngineImagePreviewForm.src = DEFAULT_SE_IMAGE_URL;
        soundEngineImagePreviewForm.style.display = 'block';
    }
});

    /**
     * Handle Form Submission based on Mode
     */
    soundEngineForm.addEventListener('submit', function(event) {
        if (isEditMode) {
            handleEditSubmit(event);
        } else {
            handleFormSubmit(event);
        }
    });

    /**
     * Function to show or hide loading indicators
     * @param {boolean} show 
     */
    function showLoading(show) {
        if (loadingMessage) {
            loadingMessage.style.display = show ? 'block' : 'none';
        }
    }

    /**
     * Cancel Button Event Listener
     */
        cancelButton.addEventListener('click', function() {
            if (isEditMode) {
                // Switch back to view mode if in edit mode
                isEditMode = false;
                toggleViewMode('view');
                updateURL('view', soundEngineIdInput.value); // Update URL to reflect view mode
                loadSoundEngineDetails(soundEngineIdInput.value); // Reload details in view mode
                updateEditButton(); // Adjust the edit button icon and title
            } else {
                // If not in edit mode, return to the main sound engine list or home page
                window.location.href = '/voyage';
            }
        });


});
</script>
