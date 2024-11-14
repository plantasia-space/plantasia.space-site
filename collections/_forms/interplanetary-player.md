---
layout: articles
show_title: false
show_date: false
permalink: /voyage/interplanetary-player
titles:
  en: &EN interplanetary-players
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
                    <span class="material-symbols-outlined">brightness_6</span>
                </button>
            </a>
        </div>
        <div class="edit-button-container">
            <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Interplanetary Player" style="display: none;">
                <span class="material-symbols-outlined">edit</span> 
            </button>
        </div>
    </div>
    <h3 id="formTitle">Create a New Interplanetary Player</h3>

    <!-- View Mode -->
    <div id="interplanetaryPlayerView" style="display: none;">

        <div id="modelPreviewContainer" class="iframe-3d-model-container" style="display: none;">
        <iframe 
            id="modelPreviewIframe"
            class="iframe-3d-model" 
            width="100%" 
            height="auto" 
            style="background: transparent; border: none;">
        </iframe>
    </div>

        <a id="viewObjFile" style="display: none;" href="#" download>Download 3D Model</a>
        <img id="viewTextureImage" style="display: none; max-width: 50%; height: auto;" alt="Texture Image" />
        
        <p id="viewSciName"></p>
        <p id="viewArtName"></p>
        <p id="viewRaDecimal"></p>
        <p id="viewDecDecimal"></p>
        <p id="viewPeriod"></p>
        <p id="viewRadius"></p>
        <p id="viewDiscoveryYear"></p>
        <p id="viewDddArtistName"></p>
        <p id="viewExoplanetDescription"></p>
        <p id="viewCredits"></p>
        
        <!-- Owner Details -->
        <ul id="playerOwnerList" class="user-list">
            <!-- Owner details will be injected here -->
        </ul>
    </div>
        
    <!-- Edit/Create Mode -->

    <form id="articleForm" class="contact-form" style="display: none;" enctype="multipart/form-data">
        <!-- 3D Model Upload -->
        <p>Please fill out the form with details about the exoplanet and your artistic representation.</p>

        <!-- Texture Image Preview -->
        <div id="textureImagePreviewContainer">
            <img id="texturePreviewForm" src="" alt="Texture Image" style="display: none;">
        </div>

<label for="uploadObj">
    Please upload the 3D model (OBJ format): <span class="required" id="uploadObjRequired">*</span>
    <span class="tooltip" aria-label="OBJ File Info" tabindex="0" data-tooltip="Ensure the file is in .obj format and does not exceed 10MB.">
        <span class="material-symbols-outlined">tooltip_2</span>
    </span>
</label>
<input type="file" id="uploadObj" name="uploadObj" accept=".obj" required>

<!-- Texture Upload -->
<label for="uploadTexture">
    Please upload the texture file (any image format): <span class="required" id="uploadTextureRequired">*</span>
    <span class="tooltip" aria-label="Texture File Info" tabindex="0" data-tooltip="Supported formats: .jpg, .png, .gif. Maximum size: 5MB.">
        <span class="material-symbols-outlined">tooltip_2</span>
    </span>
</label>
<input type="file" id="uploadTexture" name="uploadTexture" accept="image/*" required>

        
        <!-- Existing Texture File -->
        <div id="existingTextureFile" style="display: none;">
            Current Texture File: <a href="#" target="_blank" id="existingTextureLink">View</a>
        </div>
        <!-- Existing OBJ File -->
        <div id="existingObjFile" style="display: none;">
            Current 3D Model File: <a href="#" target="_blank" id="existingObjLink">Download</a>
        </div>

<!-- 3D Artist -->
<label for="dddArtistName">
    Who is the 3D artist for this creation? Please introduce @username <span class="required">*</span>
    <span class="tooltip" aria-label="Artist Info" tabindex="0" data-tooltip="Provide the username of the 3D artist responsible for this creation.">
        <span class="material-symbols-outlined">tooltip_2</span>
    </span>
</label>
        <div class="input-wrapper">
            <input type="text" class="user-search-input" id="dddArtistName" name="dddArtistName" placeholder="Type a username..." autocomplete="off" required>
            <div class="dropdown"></div>
        </div>
        <span id="dddArtistFeedback" class="feedback-message"></span><br><br>

        <!-- Scientific Exoplanet Name -->
        <label for="sciName">Which scientific exoplanet are you representing?</label>
        <select id="sciName" name="sciName" required>
            <option value="">Please select an exoplanet</option>
        </select>
        <!-- This paragraph will display the fixed sciName in edit mode -->
        <h4 id="sciNameDisplay" style="display: none;"></h4>

        <!-- Exoplanet Details -->
        <div id="exoplanetDetails" style="display: none;">
            <p><strong>IP ID:</strong> <span id="ipId"></span></p>
            <p><strong>Right Ascension (Decimal):</strong> <span id="ra_decimal"></span></p>
            <p><strong>Declination (Decimal):</strong> <span id="dec_decimal"></span></p>
            <p><strong>Orbital Period [days]:</strong> <span id="period"></span></p>
            <p><strong>Radius [R earth]:</strong> <span id="radius"></span></p>
            <p><strong>Discovery Year:</strong> <span id="discoveryyear"></span></p>
        </div><br><br>

        <!-- Artistic Exoplanet Name -->
        <label for="artName">What artistic name would you like to give this Interplanetary Player?</label>
        <input type="text" id="artName" name="artName" required>
        <span id="artNameFeedback" class="feedback-message"></span><br>

        <div class="parameter-inputs">
            <label for="moonAmount">How many moons orbit this planet?</label>
            <div class="param-range">
                <input type="number" id="moonAmount" name="moonAmount" value="0" required min="0" max="145" placeholder="moonAmount">
            </div>
        </div>

        <!-- Exoplanet Description -->
        <label for="exoplanetDescription">Can you describe the topology, life, or story of this exoplanet in 500 characters?</label>
        <textarea id="exoplanetDescription" name="exoplanetDescription" required rows="4" maxlength="500" style="width: 100%;"></textarea><br><br>

        <!-- Credits -->
        <label for="credits">Who should be credited for this work?</label>
        <input type="text" id="credits" name="credits" required><br><br>

        <!-- Submit Button -->
        <button type="submit" id="submitButton" disabled>Submit</button>

        <br>
             <button type="button" id="cancelButton" class="btn button--outline-primary button--circle">Cancel</button>
        <div class="p-2"></div>

        <!-- Loading Message -->
        <div id="loadingMessage" style="display: none; text-align: center;">
            <p>Uploading your interplanetary player, please wait...</p>
            <!-- Loading Spinner -->
            <div class="spinner"></div>
        </div>

        <!-- Progress Bar -->
        <div class="progress-bar">
            <div id="progress">0%</div>
        </div><br>

        <!-- Status Messages -->
        <div id="statusMessage" class="status-message" style="display: none;"></div>
    </form>
</div>
<div id="toastContainer"></div>

<script>
    // Define the API base URL
    const API_BASE_URL = 'http://media.maar.world:3001/api';

    // Define the file category for this form
    const FILE_CATEGORY_UPLOAD = 'interplanetaryPlayers'; // Must match the category in spacesUtils.js

    // Toast Function for User Notifications
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

    // URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    let initialMode = urlParams.get('mode'); // 'edit', 'view', or null
    let playerId = urlParams.get('playerId') || ''; // Default to '' if 'playerId' is not provided.

    // Global Variables
    let playerData = null; // Holds the current player data
    let exoplanetData = {}; // Holds exoplanet data fetched from the API
    const userId = localStorage.getItem('userId'); // Retrieve the logged-in user's ID
    let isOwner = false; // Indicates if the current user is the owner of the player
    let moonAmountInput = null; // Reference to the moonAmount input
    let currentMode = 'create'; // Current mode: 'create', 'edit', 'view'

    // Initialize the form once the DOM is loaded
    document.addEventListener('DOMContentLoaded', async () => {
        setupFormListeners();
        await loadExoplanetData();
        setupArtNameValidation();

        // Determine initial mode based on URL parameters
        if (initialMode === 'edit' && playerId) {
            currentMode = 'edit';
            await loadInterplanetaryPlayersDetails(playerId);
        } else if (initialMode === 'view' && playerId) {
            currentMode = 'view';
            await loadInterplanetaryPlayersDetails(playerId);
        } else {
            currentMode = 'create';
            clearFormFields();
        }

        setFormMode(currentMode);

        // Push the initial state to history
        history.replaceState({ mode: currentMode, playerId }, '', window.location.href);
    });

    // Function to load exoplanet data from the server
    async function loadExoplanetData() {
        try {
            console.log('Fetching exoplanet data from server');
            const response = await fetch(`${API_BASE_URL}/interplanetaryplayers/fetch-exoplanet-data`);
            if (!response.ok) {
                throw new Error(`Failed to fetch exoplanet data: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Exoplanet data fetched:', data);
            
            // Check if data has success and exoplanets array
            if (data.success && Array.isArray(data.exoplanets) && data.exoplanets.length > 0) {
                const exoplanetObject = data.exoplanets[0]; // Access the first element
                //console.log('Exoplanet Object:', exoplanetObject);
                exoplanetData = {}; // Initialize as an empty object

                // Iterate through the keys of the exoplanetObject to build exoplanetData
                Object.keys(exoplanetObject).forEach(ipId => {
                    //console.log('Processing ipId:', ipId);
                    if (ipId !== 'undefined') { // Exclude undefined keys
                        exoplanetData[ipId] = exoplanetObject[ipId];
                    } else {
                        console.warn('Encountered undefined ipId:', exoplanetObject[ipId]);
                    }
                });

                console.log('Structured Exoplanet Data:', exoplanetData);
                populateExoplanetDropdown();
            } else {
                throw new Error('Exoplanet data is empty or not in the expected format.');
            }
        } catch (error) {
            console.error('Error loading exoplanet data:', error);
            showToast('Failed to load exoplanet data. Please refresh the page.', 'error');
        }
    }

// Function to populate the exoplanet dropdown with data fetched from the API
function populateExoplanetDropdown() {
    const selectElement = document.getElementById('sciName');
    selectElement.innerHTML = '<option value="">Please select an exoplanet</option>';

    // Iterate over the keys in exoplanetData
    Object.keys(exoplanetData).forEach(ipId => {
        const exoplanet = exoplanetData[ipId];

        // Only add to the dropdown if artName is explicitly null or the string "null"
        if (exoplanet.artName === null || exoplanet.artName === 'null') {
            const option = document.createElement('option');
            option.value = ipId; // Set ipId as the value for the option
            option.textContent = `${ipId}: ${exoplanet.sciName}`; // Display ipId and sciName
            selectElement.appendChild(option);
        }
    });

    console.log('Exoplanet dropdown populated with available exoplanets.');
}

    // Function to Clear Form Fields (Create Mode)
    function clearFormFields() {
        document.getElementById('sciName').value = '';
        document.getElementById('artName').value = '';
        document.getElementById('dddArtistName').value = '';
        document.getElementById('exoplanetDescription').value = '';
        document.getElementById('credits').value = '';
        document.getElementById('uploadObj').value = '';
        document.getElementById('uploadTexture').value = '';
        document.getElementById('moonAmount').value = '0'; // Reset moonAmount to a default value

        // Hide exoplanet details when in create mode.
        document.getElementById('exoplanetDetails').style.display = 'none';
        // Clear artName feedback
        displayArtNameFeedback('', '');
        const submitButton = document.getElementById('submitButton');
        if (submitButton) {
            submitButton.disabled = true;
        }

        // Hide existing file links and previews
        document.getElementById('existingObjFile').style.display = 'none';
        document.getElementById('existingTextureFile').style.display = 'none';
        document.getElementById('texturePreviewForm').style.display = 'none';
    }

    // Function to Set Up Form Listeners
    function setupFormListeners() {
        // Reference to moonAmount input
        moonAmountInput = document.getElementById('moonAmount');
        const cancelButton = document.getElementById('cancelButton');
        const artNameInput = document.getElementById('artName');

        // Validate moonAmount to be between 0 and 145
        moonAmountInput.addEventListener('input', function() {
            let value = parseInt(moonAmountInput.value, 10);

            if (isNaN(value) || value < 0) {
                value = 0;
            } else if (value > 145) {
                value = 145;
            }

            moonAmountInput.value = value;
        });

        // Texture Upload Preview
        document.getElementById('uploadTexture').addEventListener('change', function(event) {
            const texturePreview = document.getElementById('texturePreviewForm');
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    texturePreview.src = e.target.result;
                    texturePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                const preview = document.getElementById('texturePreviewForm');
                preview.src = '';
                preview.style.display = 'none';
            }
        });

        // OBJ Upload Preview (Optional: Similar to Texture Upload)
        document.getElementById('uploadObj').addEventListener('change', function(event) {
            const objFile = event.target.files[0];
            if (objFile) {
                console.log(`OBJ file selected: ${objFile.name}`);
                // Additional preview or validation can be added here if needed
            }
        });

        // Cancel Button Event Listener
        cancelButton.addEventListener('click', function() {
            setFormMode("view");
            console.log("Canceling form editing/creation.");
        });

        // Save form data on input change
        const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm textarea');

        formElements.forEach(element => {
            element.addEventListener('input', saveFormData);
        });

        // Handle form submission
        document.getElementById('articleForm').addEventListener('submit', function(event) {
            event.preventDefault();
            handleFormSubmission();
        });

        // Handle change in exoplanet selection
        document.getElementById('sciName').addEventListener('change', updateDetails);

        // Add event listeners to file inputs to monitor file selections
        const uploadObjInput = document.getElementById('uploadObj');
        const uploadTextureInput = document.getElementById('uploadTexture');

        uploadObjInput.addEventListener('change', checkFileUploads);
        uploadTextureInput.addEventListener('change', checkFileUploads);
    }

    // Function to Update Exoplanet Details on Selection Change
    function updateDetails() {
        const selectedIpId = document.getElementById('sciName').value;
        const detailsDiv = document.getElementById('exoplanetDetails');
        const exoplanet = exoplanetData[selectedIpId]; // Access exoplanet by ipId

        if (!selectedIpId || !exoplanet) {
            detailsDiv.style.display = 'none';
        } else {
            // Populate the details section with exoplanet data
            document.getElementById('ipId').textContent = selectedIpId;
            document.getElementById('ra_decimal').textContent = exoplanet.ra_decimal || 'N/A';
            document.getElementById('dec_decimal').textContent = exoplanet.dec_decimal || 'N/A';
            document.getElementById('period').textContent = exoplanet.period || 'N/A';
            document.getElementById('radius').textContent = exoplanet.radius || 'N/A';
            document.getElementById('discoveryyear').textContent = exoplanet.discoveryyear || 'N/A';
            detailsDiv.style.display = 'block';
        }
    }

    // Function to Save Form Data Locally (Optional)
    function saveFormData() {
        const formData = {
            sciName: document.getElementById('sciName').value,
            artName: document.getElementById('artName').value,
            moonAmount: document.getElementById('moonAmount').value,
            dddArtistName: document.getElementById('dddArtistName').value,
            exoplanetDescription: document.getElementById('exoplanetDescription').value,
            credits: document.getElementById('credits').value
        };
        localStorage.setItem('protoFormData', JSON.stringify(formData));
    }

    // Function to Load Saved Form Data (Optional)
    function loadFormData() {
        const savedData = JSON.parse(localStorage.getItem('protoFormData'));
        if (savedData) {
            document.getElementById('sciName').value = savedData.sciName || '';
            document.getElementById('artName').value = savedData.artName || '';
            document.getElementById('moonAmount').value = savedData.moonAmount || '0';
            document.getElementById('dddArtistName').value = savedData.dddArtistName || '';
            document.getElementById('exoplanetDescription').value = savedData.exoplanetDescription || '';
            document.getElementById('credits').value = savedData.credits || '';
        }
    }

    /**
     * Function to Handle Form Submission with Enhanced Validation
     */
    async function handleFormSubmission() {
        // In Create Mode, ensure both files are uploaded
        if (currentMode === 'create') {
            const objFile = document.getElementById('uploadObj').files[0];
            const textureFile = document.getElementById('uploadTexture').files[0];

            if (!objFile || !textureFile) {
                showToast('Please upload both the 3D model (OBJ) and the texture image before submitting.', 'error');
                return;
            }
        }

        submitForm(); // Proceed with form submission
    }

    /**
     * Function to Submit the Form for Creating or Editing an Interplanetary Player.
     */
async function submitForm() {
    disableFormInputs();

    const submitButton = document.querySelector('#articleForm button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
    }

    const url = currentMode === 'edit'
        ? `${API_BASE_URL}/interplanetaryplayers/${playerId}`
        : `${API_BASE_URL}/interplanetaryplayers`;

    const method = currentMode === 'edit' ? 'PATCH' : 'POST';
    console.log('Submitting form to:', url);

    // Get moon amount and validate range
    let moonAmount = parseInt(document.getElementById('moonAmount').value, 10);
    moonAmount = isNaN(moonAmount) || moonAmount < 0 ? 0 : moonAmount > 145 ? 145 : moonAmount;

    // Determine sciName and ipId based on the mode
    let sciName, selectedIpId;

    if (currentMode === 'create') {
        selectedIpId = document.getElementById('sciName').value;
        sciName = selectedIpId && exoplanetData[selectedIpId]
            ? exoplanetData[selectedIpId].sciName
            : 'Unknown Exoplanet';
    } else if (currentMode === 'edit') {
        selectedIpId = playerData.ipId; // From loaded player data
        sciName = playerData.sciName;    // From loaded player data
    }

    const initialData = {
        ownerId: userId,
        isPublic: false,
        ipId: selectedIpId,
        sciName, // Using sciName based on mode
        artName: document.getElementById('artName').value.trim(),
        moonAmount,
        ra_decimal: parseFloat(document.getElementById('ra_decimal').textContent) || 0,
        dec_decimal: parseFloat(document.getElementById('dec_decimal').textContent) || 0,
        period: parseFloat(document.getElementById('period').textContent) || 0,
        radius: parseFloat(document.getElementById('radius').textContent) || 0,
        discoveryyear: parseInt(document.getElementById('discoveryyear').textContent, 10) || 0,
        description: document.getElementById('exoplanetDescription').value.trim(),
        credits: document.getElementById('credits').value.trim(),
        dddArtistName: document.getElementById('dddArtistName').value.trim(),
    };
  const textureFile = document.getElementById('uploadTexture').files[0];
  const objFile = document.getElementById('uploadObj').files[0];

  if (textureFile && objFile) {
    initialData.textureFileName = textureFile.name;
    initialData.textureFileType = textureFile.type || getMimeTypeFromFileName(textureFile.name);
    initialData.objFileName = objFile.name;
    initialData.objFileType = objFile.type || getMimeTypeFromFileName(objFile.name);
  }

  console.log('Initial data to be sent:', initialData);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(initialData)
    });

    const dataResponse = await response.json();

    if (!dataResponse.success) {
      throw new Error(dataResponse.message || 'An error occurred during submission.');
    }

    const { playerId: receivedPlayerId, textureUploadURL, objUploadURL, textureKey, objKey } = dataResponse;

    // Check if necessary keys for uploading files are present if files were selected
    if ((textureFile || objFile) && (!textureKey || !objKey || !textureUploadURL || !objUploadURL)) {
      throw new Error('File upload keys or URLs missing from the server response.');
    }

    if (textureFile && objFile) {
      console.log('Received presigned URLs and keys:', { receivedPlayerId, textureKey, objKey });
      await uploadFiles(textureUploadURL, objUploadURL);
      await finalizeInterplanetaryPlayer(receivedPlayerId, textureKey, objKey);
    }

    handleSuccessResponse({ playerId: receivedPlayerId });

  } catch (error) {
    console.error('Error:', error);
    showToast(`Error: ${error.message}`, 'error');
  } finally {
    enableFormInputs();
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit';
    }
  }
}
/**
 * Function to Upload Files Using Presigned URLs.
 */
async function uploadFiles(textureUploadURL, objUploadURL) {
    const objFile = document.getElementById('uploadObj').files[0];
    const textureFile = document.getElementById('uploadTexture').files[0];

    /**
     * Helper function to upload a file.
     */
    async function uploadFile(url, file) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type || getMimeTypeFromFileName(file.name),
            },
            body: file,
        });

        if (!response.ok) {
            throw new Error('File upload failed.');
        }
    }

    // Upload files concurrently
    await Promise.all([
        uploadFile(objUploadURL, objFile),
        uploadFile(textureUploadURL, textureFile)
    ]);

    console.log('Files uploaded successfully.');
}
/**
 * Function to Finalize the Interplanetary Player.
 */
async function finalizeInterplanetaryPlayer(playerId, textureKey, objKey) {
    const finalizeUrl = `${API_BASE_URL}/interplanetaryplayers/finalize`;

    const finalizeData = {
        playerId,
        textureKey,
        objKey
    };

    const finalizeResponse = await fetch(finalizeUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalizeData)
    });

    const finalizeDataResponse = await finalizeResponse.json();

    if (!finalizeDataResponse.success) {
        throw new Error(finalizeDataResponse.message || 'An error occurred during finalization.');
    }

    console.log('Interplanetary Player finalized successfully.');
}

    /**
     * Helper function to get MIME type from file name
     * @param {string} fileName - The name of the file.
     * @returns {string} - The MIME type.
     */
    function getMimeTypeFromFileName(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'obj':
                return 'application/octet-stream';
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            default:
                return 'application/octet-stream';
        }
    }

    /**
     * Helper function to update the artistic name
     */
    async function updateArtisticName(artName, selectedIpId) {
        try {
            const response = await fetch(`${API_BASE_URL}/interplanetaryplayers/updateArtName`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ipId: selectedIpId, artName })
            });

            if (!response.ok) {
                throw new Error(`Failed to update artistic name: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data.artName) {
                throw new Error('Artistic name update failed.');
            }

            console.log('Artistic name updated successfully:', data);
        } catch (error) {
            console.error('Failed to update artistic name:', error);
            throw error;
        }
    }

    // Function to Enable the Form Again (used on error)
    function enableForm() {
        document.getElementById('articleForm').querySelectorAll('input, select, textarea, button').forEach(element => {
            element.disabled = false;
        });
    }

    // Function to Handle Success Response after Creation or Editing
function handleSuccessResponse(response) {
    const successMessage = currentMode === 'edit'
        ? 'Interplanetary Player updated successfully!'
        : 'Interplanetary Player created successfully!';
    
    showToast(successMessage, 'success');

    // Clear form data cache
    clearProfileCache(userId);

    // Use playerId or provide a fallback ID if it's missing
    const newPlayerId = currentMode === 'edit'
        ? (response.player ? response.player._id : playerId)  // Use the existing playerId if response is missing
        : response.playerId || response.config._id;  // Fall back to `playerId` or `_id` when creating

    if (newPlayerId) {
        setTimeout(() => {
            window.location.href = `/voyage/interplanetary-player?mode=view&playerId=${newPlayerId}`;
        }, 1000);
    } else {
        console.error('Player ID not found in the response.');
        showToast('Player ID missing. Please contact support.', 'error');
    }
}

    // Function to Load Interplanetary Player Details from the Server
async function loadInterplanetaryPlayersDetails(playerId) {
    try {
        const response = await fetch(`${API_BASE_URL}/interplanetaryplayers/${playerId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch player details: ${response.statusText}`);
        }
        const data = await response.json();

        if (!data.success) {
            console.error('Error fetching player details:', data.message);
            showToast('Failed to load player details. Please try again.', 'error');
            return;
        }

        playerData = data.player;
        isOwner = playerData.ownerId === userId; // Check ownership directly

        // Display the edit button if the current user is the owner
        const editButton = document.getElementById('editButton');
        if (editButton) {
            editButton.style.display = isOwner ? 'block' : 'none';
        }

        populateEditMode(playerData);
        populateViewMode(playerData);

    } catch (error) {
        console.error('Error loading interplanetary player details:', error);
        showToast('Error loading player details. Please try again.', 'error');
    }
}
function populateEditMode(playerData) {
    const sciNameDisplay = document.getElementById('sciNameDisplay');
    const sciNameSelect = document.getElementById('sciName');
    const exoplanetDetails = document.getElementById('exoplanetDetails');
    
    console.log('Player data received:', JSON.stringify(playerData, null, 2));

    if (currentMode === 'edit') {
        sciNameDisplay.textContent = playerData.sciName || 'Unknown Exoplanet';
        sciNameDisplay.style.display = 'block';
        sciNameSelect.style.display = 'none';
        sciNameSelect.required = false;

        document.getElementById('artName').value = playerData.artName || '';
        document.getElementById('moonAmount').value = playerData.moonAmount || '0';
        document.getElementById('dddArtistName').value = playerData.ddd?.dddArtist || '';
        document.getElementById('exoplanetDescription').value = playerData.description || '';
        document.getElementById('credits').value = playerData.credits || '';

        // Populate Exoplanet Details fields
        document.getElementById('ipId').textContent = playerData.ipId || 'N/A';
        document.getElementById('ra_decimal').textContent = playerData.ra_decimal?.$numberDecimal || 'N/A';
        document.getElementById('dec_decimal').textContent = playerData.dec_decimal?.$numberDecimal || 'N/A';
        document.getElementById('period').textContent = playerData.period?.$numberDecimal || 'N/A';
        document.getElementById('radius').textContent = playerData.radius?.$numberDecimal || 'N/A';
        document.getElementById('discoveryyear').textContent = playerData.discoveryyear?.$numberDecimal || 'N/A';
        
        exoplanetDetails.style.display = 'block'; // Show the details section in edit mode

        const baseUrl = 'https://media.maar.world';

        // Show existing OBJ file link if available
        const existingObjFileDiv = document.getElementById('existingObjFile');
        const existingObjLink = document.getElementById('existingObjLink');
        if (playerData.ddd?.objURL) {
            const objUrl = playerData.ddd.objURL.startsWith('http')
                ? playerData.ddd.objURL
                : `${baseUrl}${playerData.ddd.objURL}`;
            existingObjLink.href = objUrl;
            existingObjLink.textContent = playerData.ddd.objURL.split('/').pop(); // Show the file name
            existingObjFileDiv.style.display = 'block';
        } else {
            existingObjFileDiv.style.display = 'none';
        }

        // Show existing Texture file link and preview if available
        const existingTextureFileDiv = document.getElementById('existingTextureFile');
        const existingTextureLink = document.getElementById('existingTextureLink');
        const texturePreview = document.getElementById('texturePreviewForm');

        if (playerData.ddd?.textureURL) {
            const textureUrl = playerData.ddd.textureURL.startsWith('http')
                ? playerData.ddd.textureURL
                : `${baseUrl}${playerData.ddd.textureURL}`;
            existingTextureLink.href = textureUrl;
            existingTextureLink.textContent = playerData.ddd.textureURL.split('/').pop();
            existingTextureFileDiv.style.display = 'block';

            // Set texture preview
            texturePreview.src = textureUrl;
            texturePreview.alt = `Texture of ${playerData.sciName || 'Exoplanet'}`;
            texturePreview.style.display = 'block';
        } else {
            existingTextureFileDiv.style.display = 'none';
            texturePreview.style.display = 'none';
        }

        // Display initial feedback and enable submit button
        displayArtNameFeedback('', '');
        const submitButton = document.getElementById('submitButton');
        if (submitButton) {
            submitButton.disabled = false;
        }

        // Make file uploads optional in Edit Mode
        document.getElementById('uploadObj').required = false;
        document.getElementById('uploadTexture').required = false;
    }
}

    // Function to Populate View Mode with Player Data
function populateViewMode(playerData) {
    // Helper function to safely extract numberDecimal values
    function getNumberDecimalValue(field) {
        return field?.$numberDecimal || field || 'N/A';
    }

    // Populate the view container with data and make labels bold
    document.getElementById('viewSciName').innerHTML = `<strong>Scientific Name:</strong> ${playerData.sciName || 'N/A'}`;
    document.getElementById('viewArtName').innerHTML = `<strong>Artistic Name:</strong> ${playerData.artName || 'N/A'}`;
    document.getElementById('viewRaDecimal').innerHTML = `<strong>Right Ascension (Decimal):</strong> ${getNumberDecimalValue(playerData.ra_decimal)}`;
    document.getElementById('viewDecDecimal').innerHTML = `<strong>Declination (Decimal):</strong> ${getNumberDecimalValue(playerData.dec_decimal)}`;
    document.getElementById('viewPeriod').innerHTML = `<strong>Orbital Period [days]:</strong> ${getNumberDecimalValue(playerData.period)}`;
    document.getElementById('viewRadius').innerHTML = `<strong>Radius [R earth]:</strong> ${getNumberDecimalValue(playerData.radius)}`;
    document.getElementById('viewDiscoveryYear').innerHTML = `<strong>Discovery Year:</strong> ${getNumberDecimalValue(playerData.discoveryyear)}`;

    // 3D Artist with clickable link
    document.getElementById('viewDddArtistName').innerHTML = `<strong>3D Artist:</strong> ${playerData.ddd?.dddArtist ? `<a href="/xplorer/?username=${encodeURIComponent(playerData.ddd.dddArtist)}" target="_self">@${playerData.ddd.dddArtist}</a>` : 'N/A'}`;
    
    document.getElementById('viewExoplanetDescription').innerHTML = `<strong>Description:</strong> ${playerData.description || 'N/A'}`;
    document.getElementById('viewCredits').innerHTML = `<strong>Credits:</strong> ${playerData.credits || 'N/A'}`;
    
    // Set up 3D model preview using iframe if URLs are available
    const modelPreviewContainer = document.getElementById('modelPreviewContainer');
    const modelPreviewIframe = document.getElementById('modelPreviewIframe');

    // Prefer direct URLs if available, otherwise fallback to ddd URLs
    const objURL = playerData.objURL || playerData.ddd?.objURL;
    const textureURL = playerData.textureURL || playerData.ddd?.textureURL;

    if (objURL && textureURL) {
        const encodedObjURL = encodeURIComponent(objURL);
        const encodedTextureURL = encodeURIComponent(textureURL);
        
        // Construct the iframe source URL with the model and texture
        const iframeSrc = `https://preview.maar.world/?object=${encodedObjURL}&texture=${encodedTextureURL}`;
        console.log('Setting iframe src to:', iframeSrc); // Debugging line
        modelPreviewIframe.src = iframeSrc;

        // Display the iframe container
        modelPreviewContainer.style.display = 'block';
    } else {
        console.warn('OBJ or Texture URL is missing');
        modelPreviewContainer.style.display = 'none';
    }

    // Download 3D Model link
    const viewObjFile = document.getElementById('viewObjFile');
    if (objURL) {
        viewObjFile.href = objURL.startsWith('http') ? objURL : `https://media.maar.world${objURL}`;
        viewObjFile.textContent = 'Download 3D Model';
        viewObjFile.style.display = 'block';
    } else {
        viewObjFile.style.display = 'none';
    }
    
    // Texture Image
    const viewTextureImage = document.getElementById('viewTextureImage');
    if (textureURL) {
        const textureUrlResolved = textureURL.startsWith('http') ? textureURL : `https://media.maar.world${textureURL}`;
        viewTextureImage.src = textureUrlResolved;
        viewTextureImage.alt = `Texture of ${playerData.sciName || 'Exoplanet'}`;
        viewTextureImage.style.display = 'block';
    } else {
        viewTextureImage.style.display = 'none';
    }
    
    // Populate Owner Details
    populatePlayerOwnerDetails(playerData.ownerDetails);
}

    /**
        * Function to Populate the Interplanetary Player Owner Details
        */
        function populatePlayerOwnerDetails(ownerDetails) {
        const playerOwnerList = document.getElementById('playerOwnerList');

        if (ownerDetails) {
            playerOwnerList.innerHTML = `
            <li class="user-list-item">
                <div class="user-profile-pic">
                <img src="${ownerDetails.profileImage || '/default_profile.png'}" alt="${ownerDetails.username}">
                </div>
                <div class="user-details">
                <div class="user-display-name">${ownerDetails.displayName || 'Unknown'}</div>
                <div class="user-username">
                    <a href="/xplorer/?username=${encodeURIComponent(ownerDetails.username)}" target="_self">
                    @${ownerDetails.username || 'Unknown'}
                    </a>
                </div>
                </div>
            </li>`;
        } else {
            playerOwnerList.innerHTML = '<li>No owner details available.</li>';
        }
        }

    /**
        * Function to Clear Cached Profiles.
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
            console.log('Profile cache cleared for user');
        } else {
            console.log('No cache found for user');
        }
    }

    // Function to Toggle Between Edit and View Modes
function toggleEditMode() {
    if (currentMode === 'view') {
        if (playerData) { // Ensure playerData is loaded
            updateURL('edit', playerId);
            setFormMode('edit');
        } else {
            showToast('Player data is still loading. Please wait...', 'error');
            console.warn('Attempted to switch to edit mode before playerData was loaded.');
        }
    } else if (currentMode === 'edit') {
        setFormMode('view');
        updateURL('view', playerId);
        loadInterplanetaryPlayersDetails(playerId); // Reload data to discard changes
    }
}

    /**
        * Function to Set the Current Mode (View, Edit, Create)
        */
async function setFormMode(newMode) {
    currentMode = newMode;
    const isViewMode = currentMode === 'view';
    const isEditMode = currentMode === 'edit';
    const isCreateMode = currentMode === 'create';

    const articleForm = document.getElementById('articleForm');
    const interplanetaryPlayerView = document.getElementById('interplanetaryPlayerView');
    const editButton = document.getElementById('editButton');
    const formTitle = document.getElementById('formTitle'); // Reference to the form title element

    if (isViewMode) {
        interplanetaryPlayerView.style.display = 'block';
        articleForm.style.display = 'none';

        // Update the form title for view mode
        formTitle.textContent = 'View Interplanetary Player';

        // Update Edit Button to show 'Edit' icon and title
        if (editButton) {
            editButton.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
            editButton.title = 'Edit Interplanetary Player';
            editButton.style.display = isOwner ? 'block' : 'none';
        }

    } else if (isEditMode) {
        interplanetaryPlayerView.style.display = 'none';
        articleForm.style.display = 'block';

        // Update the form title for edit mode
        formTitle.textContent = 'Edit Interplanetary Player';

        // Update Edit Button to show 'View' icon and title
        if (editButton) {
            editButton.innerHTML = `<span class="material-symbols-outlined">visibility</span>`;
            editButton.title = 'View Interplanetary Player';
            editButton.style.display = 'block';
        }

        if (playerId) {
            await loadInterplanetaryPlayersDetails(playerId);
        }
    } else if (isCreateMode) {
        interplanetaryPlayerView.style.display = 'none';
        articleForm.style.display = 'block';

        // Update the form title for create mode
        formTitle.textContent = 'Create a New Interplanetary Player';

        if (editButton) {
            editButton.style.display = 'none';
        }
    }
}
    // Function to Update the URL Without Reloading the Page
    function updateURL(mode, playerId) {
        const newURL = `/voyage/interplanetary-player?mode=${mode}&playerId=${playerId}`;
        if (history.pushState) {
            history.pushState({ mode, playerId }, '', newURL);
        } else {
            // Fallback for older browsers
            window.location.href = newURL;
        }
    }

    // Event Listener for Edit Button
    const editButtonElement = document.getElementById('editButton');
    if (editButtonElement) {
        editButtonElement.addEventListener('click', function(event) {
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

    /**
     * Function to Check the Availability of artName.
     */
    async function checkArtNameAvailability(artName, excludeId = '') {
        const submitButton = document.querySelector('#articleForm button[type="submit"]');
        if (!artName.trim()) {
            displayArtNameFeedback('Artistic Name is required.', 'error');
            if (submitButton) {
                submitButton.disabled = true;
            }
            return false;
        }

        try {
            const params = new URLSearchParams({ name: artName.trim() });
            if (excludeId) {
                params.append('excludeId', excludeId);
            }

            // Ensure the endpoint matches the backend route
            const response = await fetch(`${API_BASE_URL}/interplanetaryplayers/checkArtName?${params.toString()}`);

            if (response.status === 200) {
                const data = await response.json();
                if (data.success) {
                    displayArtNameFeedback('Artistic Name is available.', 'success');
                    if (submitButton) {
                        submitButton.disabled = false;
                    }
                    return true;
                } else {
                    displayArtNameFeedback('Error checking name. Please try again.', 'error');
                    if (submitButton) {
                        submitButton.disabled = true;
                    }
                    return false;
                }
            } else if (response.status === 409) {
                // Handle 409 Conflict gracefully without logging
                displayArtNameFeedback('Artistic Name is already taken.', 'error');
                showToast('Please choose a different Artistic Name.', 'error');

                if (submitButton) {
                    submitButton.disabled = true;
                }
                return false;
            } else {
                // Handle other unexpected statuses
                displayArtNameFeedback('Error checking name. Please try again.', 'error');
                if (submitButton) {
                    submitButton.disabled = true;
                }
                return false;
            }
        } catch (error) {
            // Only log unexpected errors
            console.error('Error checking artName availability:', error);
            displayArtNameFeedback('Error checking name. Please try again.', 'error');
            if (submitButton) {
                submitButton.disabled = true;
            }
            return false;
        }
    }

    /**
        * Function to Display Feedback Messages for artName.
        */
    function displayArtNameFeedback(message, type) {
        const feedbackElem = document.getElementById('artNameFeedback');
        const artNameInput = document.getElementById('artName');

        feedbackElem.textContent = message;
        feedbackElem.className = 'feedback-message'; // Reset classes

        artNameInput.classList.remove('feedback-success', 'feedback-error'); // Reset classes

        if (type === 'success') {
            feedbackElem.classList.add('feedback-success');
            artNameInput.classList.add('feedback-success');
        } else if (type === 'error') {
            feedbackElem.classList.add('feedback-error');
            artNameInput.classList.add('feedback-error');
        }
    }

    /**
     * Function to Check if Both Files are Uploaded in Create Mode
     */
    function checkFileUploads() {
        if (currentMode !== 'create') {
            return; // Only enforce in create mode
        }

        const objFile = document.getElementById('uploadObj').files[0];
        const textureFile = document.getElementById('uploadTexture').files[0];
        const submitButton = document.getElementById('submitButton');

        if (objFile && textureFile) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // Function to Disable All Form Inputs
    function disableFormInputs() {
        const form = document.getElementById('articleForm');
        if (form) {
            const inputs = form.querySelectorAll('input, select, textarea, button');
            inputs.forEach(input => {
                input.disabled = true;
            });
        }
    }

    // Function to Enable All Form Inputs
    function enableFormInputs() {
        const form = document.getElementById('articleForm');
        if (form) {
            const inputs = form.querySelectorAll('input, select, textarea, button');
            inputs.forEach(input => {
                input.disabled = false;
            });
        }
    }

    // Function to Reset the Form After Submission
    function resetForm() {
        enableFormInputs();
        const submitButton = document.querySelector('#articleForm button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
        document.getElementById('loadingMessage').style.display = 'none';
    }

    /**
     * Function to Set Up artName Validation with Debounce
     */
    function setupArtNameValidation() {
        const artNameInput = document.getElementById('artName');

        let debounceTimeout = null;

        // Debounce function to limit the number of API calls
        artNameInput.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(async () => {
                const artName = artNameInput.value;
                const excludeId = currentMode === 'edit' ? playerId : '';
                await checkArtNameAvailability(artName, excludeId);
            }, 500); // Wait for 500ms after the user stops typing
        });

        // Also check on blur (when the user leaves the field)
        artNameInput.addEventListener('blur', async () => {
            const artName = artNameInput.value;
            const excludeId = currentMode === 'edit' ? playerId : '';
            await checkArtNameAvailability(artName, excludeId);
        });
    }
</script>
