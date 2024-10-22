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
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">brightness_6</span>
                </button>
            </a>
        </div>
        <div class="edit-button-container">
            <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Sound Engine" style="display: none;">
                <span class="material-symbols-outlined">edit</span> 
            </button>
        </div>
    </div>


    <h3 id="formTitle">Create a Sound Engine</h3>
    <p>Create a new Sound Engine with custom parameters for audio manipulation.</p>
    <div class="p-2"></div>

    <!-- View Mode -->
    <div id="soundEngineView">

        <div id="soundEngineImagePreviewContainer">
            <img id="soundEngineImagePreview" src="" alt="Sound Engine Image" style="display: none;" width="480" height="480">
        </div>
        <p><strong>Developer Username:</strong> <span id="displayDeveloperUsername"></span></p>
        <p><strong>Sound Engine Name:</strong> <span id="displaySoundEngineName"></span></p>
        <p><strong>Color 1:</strong> <span id="displayColor1"></span></p>
        <p><strong>Color 2:</strong> <span id="displayColor2"></span></p>
        <p><strong>Sonification Button:</strong> <span id="displaysonificationState"></span></p>
        <p><strong>Availability:</strong> <span id="displayAvailability"></span></p>
        <p><strong>Credits:</strong> <span id="displayCredits"></span></p>

                        <!-- Engine Owner -->
        <div id="engineOwnerContainer">
            <h4>Engine Owner (<span id="engineOwnerCount">0</span>)</h4>
            <ul id="engineOwnerList"></ul>
        </div>
    </div>



    <!-- Edit/Create Mode -->
    <form id="soundEngineForm" class="contact-form" style="display: none;" enctype="multipart/form-data">
        <!-- Sound Engine Image Upload -->
        <div id="soundEngineImagePreviewContainer">
            <img id="soundEngineImagePreviewForm" src="" alt="Sound Engine Image" style="display: none;" width="480" height="480">
        </div>
        <!-- Add a label showing the existing image path outside the image container -->
        <p id="existingImage" style="display: none;">
            Current Image: <a href="" target="_blank" id="existingImageLink">View</a>
        </p>
        <input type="file" id="soundEngineImage" name="soundEngineImage" accept=".jpg, .jpeg, .png"><br><br>


        <!-- Sound Engine JSON Upload -->
        <label for="soundEngineFile">Upload Sound Engine JSON File (Optional):</label>
        <p id="existingJsonFile" style="display: none;">Current JSON File: <a href="" target="_blank" id="existingJsonLink">Download</a></p>
        <input type="file" id="soundEngineFile" name="soundEngineFile" accept=".json"><br><br>



        <!-- Other input fields -->
        <label for="developerUsername">Developer Username<span style="color: red;">*</span>:</label>
        <div class="input-wrapper">
            <input type="text" class="user-search-input" id="developerUsername" name="developerUsername" placeholder="Type a username..." autocomplete="off" required>
            <div class="dropdown"></div> <!-- Dropdown directly below the input field -->
        </div>



        <label for="soundEngineName">Sound Engine Name<span style="color: red;">*</span>:</label>
        <input type="text" id="soundEngineName" name="soundEngineName" required>
        <div id="nameFeedback" style="font-size: 14px; margin-top: 5px;"></div>
        <input type="hidden" id="soundEngineId" value="">
        <br><br>
        

        <!-- Color 1 Picker -->
        <div id="color1Section" style="border: 5px solid rgba(255, 255, 255, 1); padding: 10px; margin-bottom: 10px;">
            <label for="color1">Color 1 (RGBA)<span style="color: red;">*</span>:</label>
            <input type="color" id="color1Picker" name="color1Picker" value="#ff33cc" required>
            <input type="range" id="alpha1Picker" name="alpha1Picker" min="0" max="1" step="0.01" value="1" required>
            <label for="alpha1Picker">Alpha 1: <span id="alpha1Value">1</span></label>
            <input type="hidden" id="color1" name="color1">
        </div>

        <!-- Color 2 Picker -->
        <div id="color2Section" style="border: 5px solid rgba(255, 255, 255, 1); padding: 10px; margin-bottom: 10px;">
            <label for="color2">Color 2 (RGBA)<span style="color: red;">*</span>:</label>
            <input type="color" id="color2Picker" name="color2Picker" value="#33ffff" required>
            <input type="range" id="alpha2Picker" name="alpha2Picker" min="0" max="1" step="0.01" value="1" required>
            <label for="alpha2Picker">Alpha 2: <span id="alpha2Value">1</span></label>
            <input type="hidden" id="color2" name="color2">
        </div><br><br>

        <!-- Parameter Inputs (Responsive) -->
        <div class="parameter-inputs">
            <label for="xParamLabel">X Parameter Label<span style="color: red;">*</span>:</label>
            <input type="text" id="xParamLabel" name="xParamLabel" value="Speed" required>
            <div class="param-range">
                <input type="number" id="xParamMin" name="xParamMin" value="-100" required placeholder="Min">
                <input type="number" id="xParamMax" name="xParamMax" value="100" required placeholder="Max">
                <input type="number" id="xParamInit" name="xParamInit" value="1" required placeholder="Initial">
            </div>
        </div>

        <div class="parameter-inputs">
            <label for="yParamLabel">Y Parameter Label<span style="color: red;">*</span>:</label>
            <input type="text" id="yParamLabel" name="yParamLabel" value="Tremolo" required>
            <div class="param-range">
                <input type="number" id="yParamMin" name="yParamMin" value="-100" required placeholder="Min">
                <input type="number" id="yParamMax" name="yParamMax" value="100" required placeholder="Max">
                <input type="number" id="yParamInit" name="yParamInit" value="0" required placeholder="Initial">
            </div>
        </div>

        <div class="parameter-inputs">
            <label for="zParamLabel">Z Parameter Label<span style="color: red;">*</span>:</label>
            <input type="text" id="zParamLabel" name="zParamLabel" value="SpaceReverb" required>
            <div class="param-range">
                <input type="number" id="zParamMin" name="zParamMin" value="-100" required placeholder="Min">
                <input type="number" id="zParamMax" name="zParamMax" value="100" required placeholder="Max">
                <input type="number" id="zParamInit" name="zParamInit" value="0" required placeholder="Initial">
            </div>
        </div><br><br>        

        <label for="sonificationState">Sonification Button:</label>
        <select id="sonificationState" name="sonificationState" required>
            <option value="false">Disabled</option>
            <option value="true">Enabled</option>
        </select><br><br>

        <!-- Sonification File Upload (Conditional) -->
        <div id="sonificationFileContainer" style="display: none;">
            <label for="sonificationFile" id="sonificationFileLabel">Upload Sonification File (Optional):</label>
            <p id="existingSonificationFile" style="display: none;">
                Current Sonification File: <a href="" target="_blank" id="existingSonificationLink">Download</a>
            </p>
            <input type="file" id="sonificationFile" name="sonificationFile" accept=".json, .txt, .js"><br><br>
        </div>


        <label for="Availability">Availability:</label>
        <select id="availability" name="availability" required>
            <option value="true">Public</option>
            <option value="false">Private</option>
        </select>
        <small style="color: grey;">If you change the availability from Public to Private, all current Interplanetary Players using your engine will still have access. The private status will only apply to future community creations.</small>
        <br><br>
         

        <label for="credits">Credits:</label>
        <textarea id="credits" name="credits" rows="3" maxlength="500"></textarea><br><br>

        <button type="submit">Save Sound Engine</button>
        <div class="p-2"></div>

     <button type="button" id="cancelButton" class="btn button--outline-primary button--circle">Cancel</button>
        <div class="p-2"></div>
        <br>
        <!-- Progress Bar -->
        <div class="progress-bar" style="width: 100%; background-color: lightgray;">
            <div id="progress" style="width: 0%; height: 20px; background-color: green;"></div>
        </div>
        

    </form>
</div>

<!-- Toast Container for Notifications -->
<div id="toastContainer" style="position: fixed; top: 20px; right: 20px; z-index: 1000;"></div>

<script>

    if (typeof lscache === 'undefined') {
    console.warn('lscache is not available on this page.');
} else {
    console.log('lscache is loaded and available.');
}

document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId'); 


    if (!userId) {
        window.location.href = '/login';
        return;
    }
    let isCreateMode = false;
    let isEditMode = false;
    let currentSoundEngineId = null;
    let isOwner = false;

    const formTitle = document.getElementById('formTitle');
    const soundEngineView = document.getElementById('soundEngineView');
    const soundEngineForm = document.getElementById('soundEngineForm');
    const editButton = document.getElementById('editButton');
    const backButton = document.getElementById('backButton');
    const cancelButton = document.getElementById('cancelButton');

    const soundEngineFileInput = document.getElementById('soundEngineFile');
    const soundEngineImageInput = document.getElementById('soundEngineImage');
    const soundEngineImagePreview = document.getElementById('soundEngineImagePreview');
    const soundEngineImagePreviewForm = document.getElementById('soundEngineImagePreviewForm');

    const color1Picker = document.getElementById('color1Picker');
    const color2Picker = document.getElementById('color2Picker');
    const alpha1Picker = document.getElementById('alpha1Picker');
    const alpha2Picker = document.getElementById('alpha2Picker');
    const color1Section = document.getElementById('color1Section');
    const color2Section = document.getElementById('color2Section');

    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const alpha1Value = document.getElementById('alpha1Value');
    const alpha2Value = document.getElementById('alpha2Value');

    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    currentSoundEngineId = urlParams.get('id');

    // Function to convert Hex to RGBA
    function hexToRgba(hex, alpha = 1) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        }
        return `rgba(${r},${g},${b},${alpha})`;
    }

    // Update the border color of the Color 1 section
    function updateBorderColor() {
        const rgbaColor = hexToRgba(color1Picker.value, alpha1Picker.value);
        color1Section.style.borderColor = rgbaColor;
        color1Input.value = rgbaColor;
        alpha1Value.innerText = alpha1Picker.value;
    }

    function updateBorderColor2() {
        const rgbaColor = hexToRgba(color2Picker.value, alpha2Picker.value);
        color2Section.style.borderColor = rgbaColor;
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

    // Handle mode logic and load sound engine details
    if (!currentSoundEngineId || mode === 'create') {
        formTitle.innerText = 'Create a Sound Engine';
        toggleViewMode(true); // Show the form for creation
        isCreateMode = true;
        isEditMode = false;
        editButton.style.display = 'none'; // Hide edit button in create mode
    } else if (mode === 'edit' && currentSoundEngineId) {
        formTitle.innerText = 'Edit Sound Engine';
        isEditMode = true;
        isCreateMode = false;
        loadSoundEngineDetails(currentSoundEngineId);
        toggleViewMode(true); // Show the form for editing
    } else if (mode === 'soundEngine' && currentSoundEngineId) {
        formTitle.innerText = 'Sound Engine Details';
        isEditMode = false;
        isCreateMode = false;
        loadSoundEngineDetails(currentSoundEngineId);
        toggleViewMode(false); // Ensure we are in view mode
    }

    // Edit Button Event Listener
    editButton.addEventListener('click', function() {
        if (isEditMode) {
            // If already in edit mode, switch back to view mode
            loadSoundEngineDetails(currentSoundEngineId);
            toggleViewMode(false);
            isEditMode = false;
        } else {
            // Switch to edit mode
            toggleViewMode(true);
            isEditMode = true;
        }
    });

    // Cancel Button Event Listener
    cancelButton.addEventListener('click', function() {
        if (isCreateMode || isEditMode) {
            // Reset the form and switch back to view mode
            if (isEditMode) {
                loadSoundEngineDetails(currentSoundEngineId);
            } else {
                soundEngineForm.reset();
                resetFormState();
            }
            toggleViewMode(false);
            isCreateMode = false;
            isEditMode = false;
        }
    });

    // Back Button Event Listener
    backButton.addEventListener('click', function() {
        window.location.href = '/voyage';
    });

    // Image preview functionality
    soundEngineImageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                soundEngineImagePreviewForm.src = e.target.result;
                soundEngineImagePreviewForm.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            soundEngineImagePreviewForm.src = '';
            soundEngineImagePreviewForm.style.display = 'none';
        }
    });

    // Sonification File preview functionality (optional, similar to image)
    // Add if needed

    // Function to reset form state after creation
    function resetFormState() {
        soundEngineImagePreviewForm.src = '';
        soundEngineImagePreviewForm.style.display = 'none';
        document.getElementById('existingImage').style.display = 'none';
        document.getElementById('existingJsonFile').style.display = 'none';
        document.getElementById('existingSonificationFile').style.display = 'none';
        document.getElementById('nameFeedback').innerText = '';

        // Reset hidden fields and color pickers
        document.getElementById('soundEngineId').value = '';
        color1Picker.value = '#ff33cc';
        alpha1Picker.value = '1';
        color2Picker.value = '#33ffff';
        alpha2Picker.value = '1';
        updateBorderColor();
        updateBorderColor2();

        // Optionally, set focus back to the first input field
        document.getElementById('developerUsername').focus();
    }

    // Function to handle form submission
// Handle form submission
soundEngineForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    // Disable all form inputs to prevent multiple submissions while processing
    disableFormInputs(true);
    // Disable the save button to prevent multiple submissions
    const saveButton = soundEngineForm.querySelector('[type="submit"]');
    saveButton.disabled = true;

    // Gather input values
    const developerUsername = document.getElementById('developerUsername').value.trim();
    const soundEngineName = document.getElementById('soundEngineName').value.trim();
    const color1 = color1Input.value.trim();
    const color2 = color2Input.value.trim();
    const sonificationState = document.getElementById('sonificationState').value;
    const isPublic = document.getElementById('availability').value;
    const credits = document.getElementById('credits').value.trim();

    // Validate required fields
    if (!developerUsername || !soundEngineName || !color1 || !color2 || sonificationState === '' || !userId) {
        showToast('Please fill in all required fields.', 'error');
        saveButton.disabled = false; // Re-enable the save button
        disableFormInputs(false);
        return;
    }

    // Validate Sound Engine Name Availability
    const soundEngineId = document.getElementById('soundEngineId').value.trim();
    const isNameAvailable = await checkSoundEngineExists(soundEngineName, soundEngineId);
    if (!isNameAvailable) {
        showToast('Sound Engine name is already taken. Please choose another one.', 'error');
        saveButton.disabled = false; // Re-enable the save button
        disableFormInputs(false);
        return;
    }

    const sonificationStateValue = sonificationState === 'true';

    // Additional Validation: Ensure Sonification File is Uploaded if Enabled
    if (sonificationStateValue) {
        const sonificationFile = document.getElementById('sonificationFile').files[0];
        if (!sonificationFile && (!existingSoundEngine || !existingSoundEngine.sonificationFile)) {
            showToast('Please upload a Sonification file or ensure an existing one is present.', 'error');
            saveButton.disabled = false; // Re-enable the save button
            disableFormInputs(false);
            return;
        }
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('ownerId', userId);
    formData.append('isPublic', isPublic);
    formData.append('developerUsername', developerUsername);
    formData.append('soundEngineName', soundEngineName);
    formData.append('color1', color1);
    formData.append('color2', color2);
    formData.append('xParam', JSON.stringify({ label: 'Speed', min: -100, max: 100, initValue: 1 }));
    formData.append('yParam', JSON.stringify({ label: 'Tremolo', min: -100, max: 100, initValue: 0 }));
    formData.append('zParam', JSON.stringify({ label: 'SpaceReverb', min: -100, max: 100, initValue: 0 }));
    formData.append('sonificationState', sonificationStateValue);
    formData.append('credits', credits);

    // Handle image file: use the existing one if no new file is selected
    const imageFile = soundEngineImageInput.files[0];
    if (imageFile) {
        formData.append('soundEngineImage', imageFile);
    } else if (existingSoundEngine && existingSoundEngine.soundEngineImage) {
        formData.append('existingImagePath', existingSoundEngine.soundEngineImage);
    }

    // Handle JSON file: use the existing one if no new file is selected
    const jsonFile = soundEngineFileInput.files[0];
    if (jsonFile) {
        formData.append('soundEngineFile', jsonFile);
    } else if (existingSoundEngine && existingSoundEngine.soundEngineFile) {
        formData.append('existingJsonFilePath', existingSoundEngine.soundEngineFile);
    }

    // Handle Sonification File: only if sonification is enabled
    if (sonificationStateValue) {
        const sonificationFile = document.getElementById('sonificationFile').files[0];
        if (sonificationFile) {
            formData.append('sonificationFile', sonificationFile);
        } else if (existingSoundEngine && existingSoundEngine.sonificationFile) {
            formData.append('existingSonificationFilePath', existingSoundEngine.sonificationFile);
        }
    }
        let apiEndpoint = 'http://media.maar.world:3001/api/soundEngines';
        let method = 'POST'; // Default method for creating a new sound engine

        console.log('Create mode:', isCreateMode, 'Edit mode:', isEditMode, 'Sound Engine ID:', currentSoundEngineId);
        console.log('HTTP Method:', method);
        console.log('API Endpoint:', apiEndpoint);

        if (isEditMode && currentSoundEngineId) {
            // Update the endpoint and method for editing mode
            apiEndpoint = `${apiEndpoint}/${currentSoundEngineId}`;
            method = 'PATCH'; // Use PATCH method for updating an existing sound engine

            console.log('Edit mode active. Updating sound engine.');
            console.log('Updated HTTP Method:', method);
            console.log('Updated API Endpoint:', apiEndpoint);
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: method,
                body: formData,
            });
            const data = await response.json();

            console.log("Data received after submission:", data); // Log the entire response

            if (data.success) {

            clearProfileCache(userId);
            console.log("id"+" "+userId);
                if (isEditMode) {
                    // Edit Mode Logic
                    showToast('Sound Engine updated successfully!', 'success');

                    // No need to update sessionData.enginesOwned since it's an edit


                    // Redirect to View Mode with the same Sound Engine ID
                    setTimeout(() => {
                        window.location.href = `/voyage/soundEngine?mode=soundEngine&id=${currentSoundEngineId}`;
                    }, 3000); // 3-second delay to allow the toast to be visible
                } else if (isCreateMode) {
                    // Create Mode Logic

                    showToast('Sound Engine created successfully!', 'success');

                    // Capture the new Sound Engine ID
                    const newSoundEngineId = data.soundEngine && data.soundEngine._id ? data.soundEngine._id : null;

                    if (newSoundEngineId) {
                        // Update sessionData.enginesOwned in localStorage
                        const sessionData = JSON.parse(localStorage.getItem('sessionData'));
                        if (sessionData) {
                            if (Array.isArray(sessionData.enginesOwned)) {
                                sessionData.enginesOwned.push(newSoundEngineId);
                            } else {
                                sessionData.enginesOwned = [newSoundEngineId];
                            }
                            localStorage.setItem('sessionData', JSON.stringify(sessionData));
                            console.log('Updated sessionData.enginesOwned:', sessionData.enginesOwned);
                        } else {
                            console.warn('sessionData not found in localStorage. Creating new sessionData.');
                            const newSessionData = {
                                // Include other necessary session properties here
                                enginesOwned: [newSoundEngineId],
                                // e.g., tracksOwned: [], interplanetaryPlayersOwned: [], etc.
                                // Ensure other necessary fields are populated to prevent data loss
                            };
                            localStorage.setItem('sessionData', JSON.stringify(newSessionData));
                            console.log('Initialized sessionData with enginesOwned:', newSessionData.enginesOwned);
                        }

                        // Clear cache to fetch the latest Sound Engines

                        // Redirect to View Mode of the newly created Sound Engine
                        setTimeout(() => {
                            window.location.href = `/voyage/soundEngine?mode=soundEngine&id=${newSoundEngineId}`;
                        }, 2000); // 2-second delay to allow the toast to be visible
                    } else {
                        console.error('Sound Engine ID is invalid or missing:', newSoundEngineId);
                        showToast('Failed to retrieve Sound Engine ID. Please try again.', 'error');
                    }
                }
            } else {
                console.error("Error in response data:", data);
                showToast(data.message || 'An error occurred.', 'error');
            }
        } catch (error) {
            console.error('Error during sound engine submission:', error); // Log any error that occurs
            showToast('An error occurred while saving the sound engine.', 'error');
        } finally {
            // Re-enable the save button after request completes
            saveButton.disabled = false;
                    disableFormInputs(false); // Re-enable form inputs after submission or error

        }
    });

    /**
     * Function to clear cached Sound Engines.
     */
        function clearProfileCache(userId) {
            if (typeof lscache === 'undefined') {
                console.warn('lscache is not available. Skipping cache clearing.');
                return;
            }

            const cacheKey = `profile_${userId}`;
            const cachedProfile = lscache.get(cacheKey);
            if (cachedProfile) {
                lscache.remove(cacheKey);
                console.log(`Profile cache cleared for user`);
            } else {
                console.log(`No cache found for user`);
            }
        }
    /**
     * Function to disable or enable form inputs
     */
    function disableFormInputs(disable) {
        const inputs = soundEngineForm.querySelectorAll('input, textarea, select, button');
        inputs.forEach(input => {
            input.disabled = disable;
        });
    }

    /**
     * Toggle between view and edit modes
     */
    function toggleViewMode(editMode) {
        if (editMode) {
            soundEngineView.style.display = 'none';
            soundEngineForm.style.display = 'block';
            console.log(editMode ? 'Switched to edit/create mode.' : 'Switched to view mode.');
        } else {
            soundEngineView.style.display = 'block';
            soundEngineForm.style.display = 'none';
            console.log('Switched to view mode.');
        }
    }

    let existingSoundEngine = null;  // Define existingSoundEngine at the top

    /**
     * Load sound engine details
     */
    function loadSoundEngineDetails(soundEngineId) {
        fetch(`http://media.maar.world:3001/api/soundEngines/${soundEngineId}?userId=${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load sound engine details: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Received Sound Engine Data:', data);

                if (data.success && data.soundEngine) {
                    existingSoundEngine = data.soundEngine;
                    populateViewMode(data.soundEngine);
                    populateFormMode(data.soundEngine);

                    console.log('Logged-in userId:', userId);
                    console.log('Sound Engine ownerId:', data.soundEngine.ownerId);

                    // Update the global isOwner variable
                    isOwner = data.soundEngine.ownerId === userId;
                    console.log('Is user the owner?', isOwner);

                    // Show the edit button only if the user is the owner
                    if (isOwner) {
                        editButton.style.display = 'block';
                    } else {
                        editButton.style.display = 'none';
                    }

                    // Display owner details
                    const ownerDetails = data.soundEngine.ownerDetails;
                    const engineOwnerList = document.getElementById('engineOwnerList');
                    console.log("Owner Data:", ownerDetails);

                    if (ownerDetails) {
                        engineOwnerList.innerHTML = `
                            <li class="user-list-item">
                                <div class="user-profile-pic">
                                    <img src="https://media.maar.world${ownerDetails.profileImage || '/uploads/default/default-profile.jpg'}" alt="${ownerDetails.username}">
                                </div>
                                <div class="user-details">
                                    <div class="user-display-name">${ownerDetails.displayName || 'Unknown'}</div>
                                    <div class="user-username">
                                        <a href="/xplorer/?username=${ownerDetails.username}" target="_self">
                                            @${ownerDetails.username || 'Unknown'}
                                        </a>
                                    </div>
                                </div>
                            </li>`;
                        document.getElementById('engineOwnerCount').innerText = 1;
                    } else {
                        engineOwnerList.innerHTML = '<li>No owner details available.</li>';
                        document.getElementById('engineOwnerCount').innerText = 0;
                    }
                } else {
                    showToast(data.message || 'Failed to load sound engine details.', 'error');
                }
            })
            .catch(error => {
                console.error('An error occurred while loading sound engine details:', error);
                showToast('An error occurred while loading sound engine details.', 'error');
            });
    }

    /**
     * Populate view mode with sound engine details
     */
    function populateViewMode(soundEngine) {
        document.getElementById('displayDeveloperUsername').innerText = soundEngine.developerUsername;
        document.getElementById('displaySoundEngineName').innerText = soundEngine.soundEngineName;
        document.getElementById('displayColor1').innerText = soundEngine.color1;
        document.getElementById('displayColor2').innerText = soundEngine.color2;
        document.getElementById('displaysonificationState').innerText = soundEngine.sonificationState ? 'Enabled' : 'Disabled';
        document.getElementById('displayAvailability').innerText = soundEngine.isPublic ? 'Public' : 'Private';
        document.getElementById('displayCredits').innerText = soundEngine.credits || 'No credits provided';

        if (soundEngine.soundEngineImage) {
            const imageURL = `https://media.maar.world${encodeURI(soundEngine.soundEngineImage)}`;
            soundEngineImagePreview.src = imageURL;
            soundEngineImagePreview.style.display = 'block';
        } else {
            soundEngineImagePreview.style.display = 'none';
        }
    }

    /**
     * Populate form fields for edit mode
     */
    function populateFormMode(soundEngine) {
        const baseUrl = 'https://media.maar.world';

        document.getElementById('developerUsername').value = soundEngine.developerUsername;
        document.getElementById('soundEngineName').value = soundEngine.soundEngineName;
        document.getElementById('color1').value = soundEngine.color1;
        document.getElementById('color2').value = soundEngine.color2;
        document.getElementById('availability').value = soundEngine.isPublic;
        document.getElementById('sonificationState').value = soundEngine.sonificationState;
        document.getElementById('credits').value = soundEngine.credits || '';
        document.getElementById('soundEngineId').value = soundEngine._id; // Assuming soundEngine is the object you fetched

        // Toggle the visibility of the sonification file input based on sonificationState
        toggleSonificationFileInput();

        // Show existing image
        if (soundEngine.soundEngineImage) {
            const fullImageUrl = `${baseUrl}${soundEngine.soundEngineImage}`;
            document.getElementById('existingImage').style.display = 'block';
            document.getElementById('existingImageLink').href = fullImageUrl;
            document.getElementById('existingImageLink').textContent = soundEngine.soundEngineImage.split('/').pop();
            soundEngineImagePreviewForm.src = fullImageUrl;
            soundEngineImagePreviewForm.style.display = 'block';
        } else {
            document.getElementById('existingImage').style.display = 'none';
            soundEngineImagePreviewForm.style.display = 'none';
        }

        // Show existing JSON file
        if (soundEngine.soundEngineFile) {
            const fullJsonUrl = `${baseUrl}${soundEngine.soundEngineFile}`;
            document.getElementById('existingJsonFile').style.display = 'block';
            document.getElementById('existingJsonLink').href = fullJsonUrl;
            document.getElementById('existingJsonLink').textContent = soundEngine.soundEngineFile.split('/').pop();
        } else {
            document.getElementById('existingJsonFile').style.display = 'none';
        }

        // Show existing Sonification file
        if (soundEngine.sonificationFile) {
            const fullSonificationUrl = `${baseUrl}${soundEngine.sonificationFile}`;
            document.getElementById('existingSonificationFile').style.display = 'block';
            document.getElementById('existingSonificationLink').href = fullSonificationUrl;
            document.getElementById('existingSonificationLink').textContent = soundEngine.sonificationFile.split('/').pop();
        } else {
            document.getElementById('existingSonificationFile').style.display = 'none';
        }

        // Update the color pickers and alpha sliders based on stored RGBA values
        const [color1R, color1G, color1B, color1A] = extractRGBAValues(soundEngine.color1);
        const [color2R, color2G, color2B, color2A] = extractRGBAValues(soundEngine.color2);
        
        color1Picker.value = rgbToHex(color1R, color1G, color1B);
        alpha1Picker.value = color1A;

        color2Picker.value = rgbToHex(color2R, color2G, color2B);
        alpha2Picker.value = color2A;
        
        updateBorderColor();
        updateBorderColor2();
    }

    /**
     * Helper to extract RGBA values from a string like "rgba(255, 51, 204, 0.5)"
     */
    function extractRGBAValues(rgbaString) {
        const rgbaMatch = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*(?:\.\d+)?)?\)/);
        if (rgbaMatch) {
            const [, r, g, b, a = 1] = rgbaMatch;
            return [parseInt(r), parseInt(g), parseInt(b), parseFloat(a)];
        }
        return [0, 0, 0, 1]; // default values if parsing fails
    }

    /**
     * Helper to convert RGB values to hex
     */
    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    /**
     * Toast function for showing messages
     */
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        const toastId = `toast_${Date.now()}`;
        toast.classList.add('toast');
        toast.setAttribute('id', toastId);
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
                const toastElem = document.getElementById(toastId);
                if (toastElem) {
                    toastElem.remove();
                }
            }, 500);
        }, 3000);
    }

    /**
     * Validation for Min, Max, and Initial Values
     */
    const params = ['x', 'y', 'z'];
    
    params.forEach(param => {
        const minInput = document.getElementById(`${param}ParamMin`);
        const maxInput = document.getElementById(`${param}ParamMax`);
        const initInput = document.getElementById(`${param}ParamInit`);

        const validateInitValue = () => {
            let min = parseInt(minInput.value, 10);
            let max = parseInt(maxInput.value, 10);
            let init = parseInt(initInput.value, 10);

            if (min < -100) min = -100;
            if (min > 100) min = 100;
            if (max < -100) max = -100;
            if (max > 100) max = 100;

            minInput.value = min;
            maxInput.value = max;

            const realMin = Math.min(min, max);
            const realMax = Math.max(min, max);

            if (init < realMin) init = realMin;
            if (init > realMax) init = realMax;

            initInput.value = init;
        };

        minInput.addEventListener('input', validateInitValue);
        maxInput.addEventListener('input', validateInitValue);
        initInput.addEventListener('input', validateInitValue);
    });

    /**
     * Function to check if a SoundEngine name exists
     */
    async function checkSoundEngineExists(soundEngineName, soundEngineId = null) {
        try {
            const url = new URL('http://media.maar.world:3001/api/soundEngines/exists');
            url.searchParams.append('soundEngineName', soundEngineName);
            if (soundEngineId) {
                url.searchParams.append('id', soundEngineId);
            }

            const response = await fetch(url);
            const data = await response.json();
            return !data.exists; // Return true if name is available
        } catch (error) {
            console.error('Error checking SoundEngine existence:', error);
            return false;
        }
    }

    /**
     * Debounce function to limit the number of API calls
     */
    function debounce(func, delay) {
        let debounceTimer;
        return function(...args) {
            const context = this;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }


const sonificationFileInput = document.getElementById('sonificationFile');

sonificationFileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const allowedTypes = ['application/json', 'text/plain', 'application/javascript'];
        if (!allowedTypes.includes(file.type)) {
            showToast('Invalid file type. Please upload a JSON, TXT, or JS file.', 'error');
            sonificationFileInput.value = ''; // Clear the invalid file
        } else if (file.size > 5 * 1024 * 1024) { // Example: 5MB limit
            showToast('File size exceeds 5MB. Please upload a smaller file.', 'error');
            sonificationFileInput.value = ''; // Clear the oversized file
        }
    }
});


    /**
     * Handle input event for the SoundEngine name with debounce
     */
    document.getElementById('soundEngineName').addEventListener('input', debounce(async function(e) {
        const soundEngineName = e.target.value.trim();
        const feedback = document.getElementById('nameFeedback');
        const soundEngineId = document.getElementById('soundEngineId').value.trim(); // Hidden input for the sound engine ID

        // Validate the format of the SoundEngine name
        const nameRegex = /^[a-zA-Z0-9_-]{1,30}$/;
        if (!nameRegex.test(soundEngineName)) {
            feedback.textContent = 'Invalid format. Use letters, numbers, underscores, and hyphens (max 30 characters).';
            feedback.style.color = 'red';
            return;
        }

        if (soundEngineName.length === 0) {
            feedback.textContent = '';
            return;
        }

        const isAvailable = await checkSoundEngineExists(soundEngineName, soundEngineId);
        if (!isAvailable) {
            feedback.textContent = 'Name is already taken.';
            feedback.style.color = 'red';
        } else {
            feedback.textContent = 'Name is available.';
            feedback.style.color = 'green';
        }
    }, 500)); // Adjust the delay time if needed

    /**
     * Prevent form submission if the name is taken
     */
    soundEngineForm.addEventListener('submit', async function(e) {
        const soundEngineName = document.getElementById('soundEngineName').value.trim();
        const soundEngineId = document.getElementById('soundEngineId').value.trim(); // Hidden input for the sound engine ID

        const isAvailable = await checkSoundEngineExists(soundEngineName, soundEngineId);
        if (!isAvailable) {
            e.preventDefault();
            showToast('Sound Engine name is already taken. Please choose another one.', 'error');
        }
    });

    /**
     * Function to toggle the sonification file input
     */
    const sonificationStateSelect = document.getElementById('sonificationState');
    const sonificationFileContainer = document.getElementById('sonificationFileContainer');

    function toggleSonificationFileInput() {
        const sonificationFileLabel = document.getElementById('sonificationFileLabel');
        if (sonificationStateSelect.value === 'true') {
            sonificationFileContainer.style.display = 'block';
            document.getElementById('sonificationFile').required = true; // Make it required
            sonificationFileLabel.classList.add('required-field'); // Add required indicator
        } else {
            sonificationFileContainer.style.display = 'none';
            // Clear the file input
            document.getElementById('sonificationFile').value = '';
            // Remove the required attribute
            document.getElementById('sonificationFile').required = false;
            // Remove required indicator
            sonificationFileLabel.classList.remove('required-field');
            // Hide existing file link
            document.getElementById('existingSonificationFile').style.display = 'none';
        }
    }


    // Initial check on page load
    toggleSonificationFileInput();

    // Event listener for changes in sonificationState
    sonificationStateSelect.addEventListener('change', toggleSonificationFileInput);

    /**
     * Function to handle form submission with Sonification File
     */
    // (Already handled in the existing form submission handler above)

});
</script>
