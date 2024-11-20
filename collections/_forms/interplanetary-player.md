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
<div id="interplanetaryPlayerView" style="display: block;"> <!-- Ensure view is visible -->

    <!-- 3D Model Preview Container -->
    <div id="modelPreviewContainer" class="iframe-3d-model-container">
        <iframe 
            id="modelPreviewIframe"
            class="iframe-3d-model"
            src=""
            title="3D Model Viewer"
            allowfullscreen
        ></iframe>
    </div>

    <!-- Player Details -->
    <a id="viewGlbFile" style="display: none;" href="#" download>Download 3D Model</a>
    
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
    <ul id="playerOwnerList" class="user-list"></ul>
</div>        
    <!-- Edit/Create Mode -->

    <form id="articleForm" class="contact-form" style="display: none;" enctype="multipart/form-data">
        <!-- 3D Model Upload -->
        <p>Please fill out the form with details about the exoplanet and your artistic representation.</p>

        <!-- 3D Model Preview -->
        <div id="modelPreviewFormContainer">
            <iframe 
                id="modelPreviewFormIframe"
                class="iframe-3d-model" 
                width="100%" 
                height="400px" 
                style="background: transparent; border: none; display: none;">
            </iframe>
        </div>

        <!-- GLB File Upload -->
        <label for="uploadGlb">
            Please upload the 3D model (GLB format): <span class="required" id="uploadGlbRequired">*</span>
            <span class="tooltip" aria-label="GLB File Info" tabindex="0" data-tooltip="Ensure the file is in .glb format and does not exceed 50MB.">
                <span class="material-symbols-outlined">tooltip_2</span>
            </span>
        </label>
        <input type="file" id="uploadGlb" name="uploadGlb" accept=".glb" required>

        <!-- Existing GLB File -->
        <div id="existingGlbFile" style="display: none;">
            Current 3D Model File: <a href="#" target="_blank" id="existingGlbLink">Download</a>
        </div>

        <!-- 3D Artist -->
        <label for="dddArtistName">
            Who is the 3D artist for this creation? Please introduce @username <span class="required">*</span>
            <span class="tooltip" aria-label="Artist Info" tabindex="0" data-tooltip="Provide the username of the 3D artist responsible for this creation.">
                <span class="material-symbols-outlined">tooltip_2</span>
            </span>
        </label>
        <div class="input-wrapper">
            <input type="text" class="user-search-input" name="artistUsernames[]" placeholder="Type a username..." autocomplete="off" required>
            <input type="hidden" class="artistUserId" name="artistUserIds[]" value="">
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
    const API_BASE_URL = 'https://media.maar.world:443/api';

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

function collectArtistUserIds() {
    const artistIdInputs = document.querySelectorAll('.artistUserId');
    const artistIds = Array.from(artistIdInputs).map(input => input.value.trim());
    return artistIds.filter(id => id); // Remove empty entries
}


function clearFormFields() {
    const sciName = document.getElementById('sciName');
    if (sciName) sciName.value = '';

    const artName = document.getElementById('artName');
    if (artName) artName.value = '';

    const dddArtistName = document.getElementById('dddArtistName');
    if (dddArtistName) dddArtistName.value = '';

    const exoplanetDescription = document.getElementById('exoplanetDescription');
    if (exoplanetDescription) exoplanetDescription.value = '';

    const credits = document.getElementById('credits');
    if (credits) credits.value = '';

    const uploadGlb = document.getElementById('uploadGlb');
    if (uploadGlb) uploadGlb.value = '';

    const moonAmount = document.getElementById('moonAmount');
    if (moonAmount) moonAmount.value = '0';

    const exoplanetDetails = document.getElementById('exoplanetDetails');
    if (exoplanetDetails) exoplanetDetails.style.display = 'none';

    displayArtNameFeedback('', '');

    const submitButton = document.getElementById('submitButton');
    if (submitButton) submitButton.disabled = true;

    const existingGlbFile = document.getElementById('existingGlbFile');
    if (existingGlbFile) existingGlbFile.style.display = 'none';

    const modelPreviewFormIframe = document.getElementById('modelPreviewFormIframe');
    if (modelPreviewFormIframe) {
        modelPreviewFormIframe.src = '';
        modelPreviewFormIframe.style.display = 'none';
    }
}

// Function to Set Up Form Listeners
function setupFormListeners() {
    // Reference to moonAmount input
    moonAmountInput = document.getElementById('moonAmount');
    const cancelButton = document.getElementById('cancelButton');

    // Validate moonAmount to be between 0 and 145
    if (moonAmountInput) {
        moonAmountInput.addEventListener('input', function() {
            let value = parseInt(moonAmountInput.value, 10);

            if (isNaN(value) || value < 0) {
                value = 0;
            } else if (value > 145) {
                value = 145;
            }

            moonAmountInput.value = value;
        });
    }

    // GLB Upload Preview
    const uploadGlbInput = document.getElementById('uploadGlb');
    if (uploadGlbInput) {
        uploadGlbInput.addEventListener('change', function(event) {
            const modelPreviewIframe = document.getElementById('modelPreviewFormIframe');
            const file = event.target.files[0];

            if (file && modelPreviewIframe) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    modelPreviewIframe.src = e.target.result;
                    modelPreviewIframe.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else if (modelPreviewIframe) {
                modelPreviewIframe.src = '';
                modelPreviewIframe.style.display = 'none';
            }
        });
    }

    // Cancel Button Event Listener
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            setFormMode("view");
            console.log("Canceling form editing/creation.");
        });
    }

    // Save form data on input change
    const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm textarea');

    formElements.forEach(element => {
        element.addEventListener('input', saveFormData);
    });

    // Handle form submission
    const articleForm = document.getElementById('articleForm');
    if (articleForm) {
        articleForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleFormSubmission();
        });
    }

    // Handle change in exoplanet selection
    const sciNameSelect = document.getElementById('sciName');
    if (sciNameSelect) {
        sciNameSelect.addEventListener('change', updateDetails);
    }

    // Add event listeners to file inputs to monitor file selections
    if (uploadGlbInput) {
        uploadGlbInput.addEventListener('change', checkFileUploads);
    }
}

// Function to Update Exoplanet Details on Selection Change
function updateDetails() {
    const sciNameSelect = document.getElementById('sciName');
    if (!sciNameSelect) {
        console.error('sciName select element not found');
        return;
    }

    const selectedIpId = sciNameSelect.value;
    const detailsDiv = document.getElementById('exoplanetDetails');
    if (!detailsDiv) {
        console.error('exoplanetDetails div not found');
        return;
    }

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
    const formData = {};

    const sciNameElement = document.getElementById('sciName');
    if (sciNameElement) formData.sciName = sciNameElement.value;

    const artNameElement = document.getElementById('artName');
    if (artNameElement) formData.artName = artNameElement.value;

    const moonAmountElement = document.getElementById('moonAmount');
    if (moonAmountElement) formData.moonAmount = moonAmountElement.value;

    const dddArtistNameElement = document.getElementById('dddArtistName');
    if (dddArtistNameElement) formData.dddArtistName = dddArtistNameElement.value;

    const exoplanetDescriptionElement = document.getElementById('exoplanetDescription');
    if (exoplanetDescriptionElement) formData.exoplanetDescription = exoplanetDescriptionElement.value;

    const creditsElement = document.getElementById('credits');
    if (creditsElement) formData.credits = creditsElement.value;

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
    // In Create Mode, ensure GLB file is uploaded
    if (currentMode === 'create') {
        const glbFile = document.getElementById('uploadGlb').files[0];

        if (!glbFile) {
            showToast('Please upload the 3D model (GLB) before submitting.', 'error');
            return;
        }
    }

    submitForm(); // Proceed with form submission
}

/**
 * Function to Submit the Form for Creating or Editing an Interplanetary Player.
 */
// Frontend JavaScript

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

  // Collect moon amount and validate range
  let moonAmount = 0;
  const moonAmountInput = document.getElementById('moonAmount');
  if (moonAmountInput) {
    moonAmount = parseInt(moonAmountInput.value, 10);
    moonAmount = isNaN(moonAmount) || moonAmount < 0 ? 0 : moonAmount > 145 ? 145 : moonAmount;
  }

  // Determine sciName and ipId based on the mode
  let sciName = '';
  let selectedIpId = '';

  if (currentMode === 'create') {
    const sciNameSelect = document.getElementById('sciName');
    if (sciNameSelect) {
      selectedIpId = sciNameSelect.value;
      sciName = selectedIpId && exoplanetData[selectedIpId]
        ? exoplanetData[selectedIpId].sciName
        : 'Unknown Exoplanet';
    }
  } else if (currentMode === 'edit') {
    selectedIpId = playerData.ipId; // From loaded player data
    sciName = playerData.sciName;    // From loaded player data
  }

  // Collect form data with null checks
  const artNameInput = document.getElementById('artName');
  const artName = artNameInput ? artNameInput.value.trim() : '';

  const raDecimalElement = document.getElementById('ra_decimal');
  const ra_decimal = raDecimalElement ? parseFloat(raDecimalElement.textContent) || 0 : 0;

  const decDecimalElement = document.getElementById('dec_decimal');
  const dec_decimal = decDecimalElement ? parseFloat(decDecimalElement.textContent) || 0 : 0;

  const periodElement = document.getElementById('period');
  const period = periodElement ? parseFloat(periodElement.textContent) || 0 : 0;

  const radiusElement = document.getElementById('radius');
  const radius = radiusElement ? parseFloat(radiusElement.textContent) || 0 : 0;

  const discoveryYearElement = document.getElementById('discoveryyear');
  const discoveryyear = discoveryYearElement ? parseInt(discoveryYearElement.textContent, 10) || 0 : 0;

  const exoplanetDescriptionElement = document.getElementById('exoplanetDescription');
  const description = exoplanetDescriptionElement ? exoplanetDescriptionElement.value.trim() : '';

  const creditsElement = document.getElementById('credits');
  const credits = creditsElement ? creditsElement.value.trim() : '';

  // Collect artist user IDs
  const dddArtistIds = collectArtistUserIds();

  // Ensure we have at least one artist ID
  if (dddArtistIds.length === 0) {
    showToast('Please select a valid 3D artist.', 'error');
    enableFormInputs();
    return;
  }

  const initialData = {
    ownerId: userId,
    isPublic: false,
    ipId: selectedIpId,
    sciName,
    artName,
    moonAmount,
    ra_decimal,
    dec_decimal,
    period,
    radius,
    discoveryyear,
    description,
    credits,
    dddArtistId: dddArtistIds[0], // Since we have only one artist field
  };

  const glbFileInput = document.getElementById('uploadGlb');
  const glbFile = glbFileInput ? glbFileInput.files[0] : null;

  if (glbFile) {
    initialData.glbFileName = glbFile.name;
    initialData.glbFileType = glbFile.type || getMimeTypeFromFileName(glbFile.name);
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

    const { playerId: receivedPlayerId, glbUploadURL, glbKey } = dataResponse;

    // Check if necessary keys for uploading files are present if files were selected
    if (glbFile) {
      if (!glbKey || !glbUploadURL) {
        throw new Error('GLB upload key or URL missing from the server response.');
      }

      console.log('Received presigned URLs and keys:', { receivedPlayerId, glbKey });
      await uploadGlbFile(glbUploadURL, glbFile);
      await finalizeInterplanetaryPlayer(receivedPlayerId, glbKey);
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
 * Function to Upload GLB File Using Presigned URL.
 */
async function uploadGlbFile(glbUploadURL, glbFile) {
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

    // Upload the GLB file
    await uploadFile(glbUploadURL, glbFile);

    console.log('GLB file uploaded successfully.');
}

/**
 * Function to Finalize the Interplanetary Player.
 */
async function finalizeInterplanetaryPlayer(playerId, glbKey) {
    const finalizeUrl = `${API_BASE_URL}/interplanetaryplayers/finalize`;

    const finalizeData = {
        playerId,
        glbKey
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
            case 'glb':
                return 'model/gltf-binary';
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

        // Show existing GLB file link if available
        const existingGlbFileDiv = document.getElementById('existingGlbFile');
        const existingGlbLink = document.getElementById('existingGlbLink');
        if (playerData.ddd?.glbURL) {
            const glbUrl = playerData.ddd.glbURL.startsWith('http')
                ? playerData.ddd.glbURL
                : `${baseUrl}${playerData.ddd.glbURL}`;
            existingGlbLink.href = glbUrl;
            existingGlbLink.textContent = playerData.ddd.glbURL.split('/').pop(); // Show the file name
            existingGlbFileDiv.style.display = 'block';

            // Set GLB model preview
            const modelPreviewFormIframe = document.getElementById('modelPreviewFormIframe');
            modelPreviewFormIframe.src = glbUrl;
            modelPreviewFormIframe.style.display = 'block';
        } else {
            existingGlbFileDiv.style.display = 'none';
            const modelPreviewFormIframe = document.getElementById('modelPreviewFormIframe');
            modelPreviewFormIframe.src = '';
            modelPreviewFormIframe.style.display = 'none';
        }

        // Display initial feedback and enable submit button
        displayArtNameFeedback('', '');
        const submitButton = document.getElementById('submitButton');
        if (submitButton) {
            submitButton.disabled = false;
        }

        // Make file uploads optional in Edit Mode
        document.getElementById('uploadGlb').required = false;
    }
}

// Populate View Mode with Player Data
function populateViewMode(playerData) {
    // Helper function to safely extract numberDecimal values
    function getNumberDecimalValue(field) {
        return field?.$numberDecimal || field || 'N/A';
    }

    // Populate the view container with data
    document.getElementById('viewSciName').innerHTML = `<strong>Scientific Name:</strong> ${playerData.sciName || 'N/A'}`;
    document.getElementById('viewArtName').innerHTML = `<strong>Artistic Name:</strong> ${playerData.artName || 'N/A'}`;
    document.getElementById('viewRaDecimal').innerHTML = `<strong>Right Ascension (Decimal):</strong> ${getNumberDecimalValue(playerData.ra_decimal)}`;
    document.getElementById('viewDecDecimal').innerHTML = `<strong>Declination (Decimal):</strong> ${getNumberDecimalValue(playerData.dec_decimal)}`;
    document.getElementById('viewPeriod').innerHTML = `<strong>Orbital Period [days]:</strong> ${getNumberDecimalValue(playerData.period)}`;
    document.getElementById('viewRadius').innerHTML = `<strong>Radius [R earth]:</strong> ${getNumberDecimalValue(playerData.radius)}`;
    document.getElementById('viewDiscoveryYear').innerHTML = `<strong>Discovery Year:</strong> ${getNumberDecimalValue(playerData.discoveryyear)}`;
    document.getElementById('viewDddArtistName').innerHTML = `<strong>3D Artist:</strong> ${playerData.ddd?.dddArtist ? `<a href="/xplorer/?username=${encodeURIComponent(playerData.ddd.dddArtist)}" target="_self">@${playerData.ddd.dddArtist}</a>` : 'N/A'}`;
    document.getElementById('viewExoplanetDescription').innerHTML = `<strong>Description:</strong> ${playerData.description || 'N/A'}`;
    document.getElementById('viewCredits').innerHTML = `<strong>Credits:</strong> ${playerData.credits || 'N/A'}`;

    // Set up 3D model preview using iframe
    const modelPreviewContainer = document.getElementById('modelPreviewContainer');
    const modelPreviewIframe = document.getElementById('modelPreviewIframe');
    const glbURL = playerData.glbURL;

    if (glbURL) {
        const iframeSrc = `https://preview.maar.world/?model=${encodeURIComponent(glbURL)}`;
        console.log('Setting iframe src to:', iframeSrc); // Debugging line
        modelPreviewIframe.src = iframeSrc;
        modelPreviewContainer.style.display = 'block'; // Display the iframe container
    } else {
        console.warn('GLB URL is missing');
        modelPreviewContainer.style.display = 'none'; // Hide the container if no GLB URL
    }

    // Set up the download link
    const viewGlbFile = document.getElementById('viewGlbFile');
    if (glbURL) {
        viewGlbFile.href = glbURL.startsWith('http') ? glbURL : `https://media.maar.world${glbURL}`;
        viewGlbFile.textContent = 'Download 3D Model';
        viewGlbFile.style.display = 'block';
    } else {
        viewGlbFile.style.display = 'none';
    }

    // Populate Owner Details
    populatePlayerOwnerDetails(playerData.ownerDetails);
}

// Populate Owner Details
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

/**
    * Function to Toggle Between Edit and View Modes
    */
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

/**
    * Function to Update the URL Without Reloading the Page
    */
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

// Inside checkFileUploads function

function checkFileUploads() {
  if (currentMode !== 'create' && currentMode !== 'edit') {
    return; // Only enforce in create or edit mode
  }

  const glbFile = document.getElementById('uploadGlb').files[0];
  const submitButton = document.getElementById('submitButton');

  if (glbFile) {
    // Validate file size (e.g., max 50MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (glbFile.size > maxSize) {
      showToast('GLB file exceeds the maximum size of 5MB.', 'error');
      if (submitButton) {
        submitButton.disabled = true;
      }
      return;
    }

    submitButton.disabled = false;
  } else {
    if (currentMode === 'create') {
      // GLB file is required in create mode
      submitButton.disabled = true;
    } else if (currentMode === 'edit') {
      // GLB file is optional in edit mode
      submitButton.disabled = false;
    }
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