---
layout: articles
show_title: false
show_date: false
permalink: /voyage/interplanetary-player
titles:
  # @start locale config
  en      : &EN       interplanetary-players
  en-GB   : *EN
  en-US   : *EN
  en-CA   : *EN
  en-AU   : *EN
  # @end locale config
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
    <p>Please fill out the form with details about the exoplanet and your artistic representation.</p>

    <!-- View Mode -->
    <div id="interplanetaryPlayerView" style="display: none;">
        <a id="viewObjFile" style="display: none;" href="#" download>Download 3D Model</a>
        <img id="viewTextureImage" style="display: none; max-width: 100%; height: auto;" alt="Texture Image" />
        
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

        <!-- Texture Image Preview -->
        <div id="textureImagePreviewContainer">
            <img id="texturePreviewForm" src="" alt="Texture Image" style="display: none;">
        </div>

        <label for="uploadObj">Please upload the 3D model (OBJ format):</label>
        <input type="file" id="uploadObj" name="uploadObj" accept=".obj">

        <!-- Texture Upload -->
        <label for="uploadTexture">Please upload the texture file (any image format):</label>
        <input type="file" id="uploadTexture" name="uploadTexture" accept="image/*">
        <!-- Existing Texture File -->
        <div id="existingTextureFile" style="display: none;">
            Current Texture File: <a href="#" target="_blank" id="existingTextureLink">View</a>
        </div>
        <!-- Existing OBJ File -->
        <div id="existingObjFile" style="display: none;">
            Current 3D Model File: <a href="#" target="_blank" id="existingObjLink">Download</a>
        </div>

        <label for="dddArtistName">Who is the 3D artist for this creation?</label>
        <div class="input-wrapper">
            <input type="text" class="user-search-input" id="dddArtistName" name="dddArtistName" placeholder="Type a username..." autocomplete="off" required>
            <div class="dropdown"></div>
        </div>

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
        <input type="text" id="artName" name="artName" required><br><br>

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
        <button type="submit">Submit</button>

        <br>

        <!-- Progress Bar -->
        <div class="progress-bar">
            <div id="progress">0%</div>
        </div><br>

        <!-- Status Messages -->
        <div id="statusMessage" class="status-message" style="display: none;"></div>
    </form>
</div>

<div id="toastContainer" style="position: fixed; top: 20px; right: 20px; z-index: 1000;"></div>

<script>
    // Check for lscache availability
    if (typeof lscache === 'undefined') {
        console.warn('lscache is not available on this page.');
    } else {
        console.log('lscache is loaded and available.');
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

// Function to load exoplanet data from the server
async function loadExoplanetData() {
    try {
        console.log('Fetching exoplanet data from server');
        const response = await fetch('http://media.maar.world:3001/api/interplanetaryplayers/fetchExoplanetData');
        if (!response.ok) {
            throw new Error(`Failed to fetch exoplanet data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Exoplanet data fetched:', data);
        
        // Check if data is an array and has at least one element
        if (Array.isArray(data) && data.length > 0) {
            const exoplanetArray = data[0]; // Access the first element
            exoplanetData = {}; // Initialize as an empty object
            
            // Iterate through the exoplanetArray to build exoplanetData
            Object.keys(exoplanetArray).forEach(ipId => {
                exoplanetData[ipId] = exoplanetArray[ipId];
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

        // Only add to the dropdown if artName is null or "null" (string)
        if (!exoplanet.artName || exoplanet.artName === 'null') {
            const option = document.createElement('option');
            option.value = ipId; // Set ipId as the value for the option
            option.textContent = `${ipId}: ${exoplanet.sciName}`; // Display ipId and sciName
            selectElement.appendChild(option);
        }
    });

    console.log('Exoplanet dropdown populated.');
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
    }

    // Function to Set Up Form Listeners
    function setupFormListeners() {
        // Reference to moonAmount input
        moonAmountInput = document.getElementById('moonAmount');

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
                if (playerData && playerData.ddd.textureURL) {
                    const textureUrl = playerData.ddd.textureURL.startsWith('http')
                        ? playerData.ddd.textureURL
                        : `https://media.maar.world${playerData.ddd.textureURL}`;
                    texturePreview.src = textureUrl;
                    texturePreview.style.display = 'block';
                } else {
                    texturePreview.src = '';
                    texturePreview.style.display = 'none';
                }
            }
        });

        // Save form data on input change
        const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm textarea');
        formElements.forEach(element => {
            element.addEventListener('input', saveFormData);
        });

        // Handle form submission
        document.getElementById('articleForm').addEventListener('submit', function(event) {
            event.preventDefault();
            submitForm(); // Call submitForm when the form is submitted
        });

        // Handle change in exoplanet selection
        document.getElementById('sciName').addEventListener('change', updateDetails);
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

    // Function to Save Form Data Locally (e.g., in localStorage)
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

    // Function to Handle Success Response after Creation or Editing
    function handleSuccessResponse(response) {
        // Determine the success message based on the action
        const successMessage = currentMode === 'edit'
            ? 'Interplanetary Player updated successfully!'
            : 'Interplanetary Player created successfully!';
        
        showToast(successMessage, 'success');

        // Clear form data cache
        clearProfileCache(userId);

        // Extract the new player ID from the response
        const newPlayerId = currentMode === 'edit'
            ? response.player._id // Access the player ID when editing
            : response.playerId || response.config._id; // Fall back to playerId or _id when creating

        if (newPlayerId) {
            setTimeout(() => {
                window.location.href = `/voyage/interplanetary-player?mode=view&playerId=${newPlayerId}`;
            }, 1000);
        } else {
            console.error('Player ID not found in the response.');
            showToast('Player ID missing. Please contact support.', 'error');
        }
    }

    // Function to Submit the Form for Creating or Editing an Interplanetary Player
// Function to submit the form for creating or editing an Interplanetary Player
async function submitForm() {
    const submitButton = document.querySelector('#articleForm button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
    }

    const method = currentMode === 'edit' ? 'PUT' : 'POST';
    const url = method === 'PUT' 
        ? `http://media.maar.world:3001/api/interplanetaryplayers/${playerId}` 
        : 'http://media.maar.world:3001/api/interplanetaryplayers';

    console.log('Submitting form with method:', method);
    console.log('URL:', url);

    let moonAmount = parseInt(document.getElementById('moonAmount').value, 10);
    moonAmount = isNaN(moonAmount) || moonAmount < 0 ? 0 : moonAmount > 145 ? 145 : moonAmount;

    const selectedIpId = currentMode === 'edit' && playerData ? playerData.ipId : document.getElementById('sciName').value;
    console.log('Selected ipId:', selectedIpId);

    if (!selectedIpId && currentMode !== 'edit') {
        showToast('Please select a valid exoplanet.', 'error');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
        return;
    }

    // Determine sciName based on mode
    let sciName = 'Unknown Exoplanet';
    if (currentMode === 'edit') {
        sciName = document.getElementById('sciNameDisplay').textContent.trim() || 'Unknown Exoplanet';
    } else {
        // Create Mode: Get sciName from selectedIpId
        if (selectedIpId && exoplanetData[selectedIpId]) {
            sciName = exoplanetData[selectedIpId].sciName || 'Unknown Exoplanet';
        }
    }
    console.log('Determined sciName:', sciName);

    // Prepare configData
    const configData = {
        ownerId: userId,
        isPublic: false,
        ipId: selectedIpId,
        artName: document.getElementById('artName').value.trim(),
        moonAmount,
        sciName,
        ra_decimal: parseFloat(document.getElementById('ra_decimal').textContent.replace('Right Ascension (Decimal): ', '')) || 0,
        dec_decimal: parseFloat(document.getElementById('dec_decimal').textContent.replace('Declination (Decimal): ', '')) || 0,
        period: parseFloat(document.getElementById('period').textContent.replace('Orbital Period [days]: ', '')) || 0,
        radius: parseFloat(document.getElementById('radius').textContent.replace('Radius [R earth]: ', '')) || 0,
        discoveryyear: parseInt(document.getElementById('discoveryyear').textContent.replace('Discovery Year: ', ''), 10) || 0,
        description: document.getElementById('exoplanetDescription').value.trim(),
        credits: document.getElementById('credits').value.trim(),
        ddd: {
            dddArtist: document.getElementById('dddArtistName').value.trim(),
            objURL: playerData?.ddd?.objURL || '',
            textureURL: playerData?.ddd?.textureURL || ''
        }
    };

    console.log('Config data to be sent:', configData);

    // Validate Required Fields
    if (!configData.artName) {
        showToast('Artistic Name is required.', 'error');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
        return;
    }

    if (!configData.description) {
        showToast('Exoplanet Description is required.', 'error');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
        return;
    }

    try {
        let fileData = {};

        // Handle File Uploads
        const objFile = document.getElementById('uploadObj').files[0];
        const textureFile = document.getElementById('uploadTexture').files[0];

        if (objFile || textureFile) {
            const uploadFiles = new FormData();
            uploadFiles.append('ipId', selectedIpId);

            if (objFile) {
                uploadFiles.append('uploadObj', objFile);
                console.log('Appending obj file:', objFile.name);
            } else if (playerData && playerData.ddd.objURL) {
                uploadFiles.append('existingObjURL', playerData.ddd.objURL);
                console.log('Appending existing obj URL:', playerData.ddd.objURL);
            }

            if (textureFile) {
                uploadFiles.append('uploadTexture', textureFile);
                console.log('Appending texture file:', textureFile.name);
            } else if (playerData && playerData.ddd.textureURL) {
                uploadFiles.append('existingTextureURL', playerData.ddd.textureURL);
                console.log('Appending existing texture URL:', playerData.ddd.textureURL);
            }

            // Upload Files
            const uploadResponse = await fetch('http://media.maar.world:3001/api/interplanetaryplayers/uploadModelFiles', {
                method: 'POST',
                body: uploadFiles
            });

            if (!uploadResponse.ok) {
                throw new Error(`Failed to upload files: ${uploadResponse.statusText}`);
            }

            fileData = await uploadResponse.json();
            console.log('Files uploaded successfully:', fileData);

            // Update configData with new URLs if uploaded
            if (fileData.uploadObjURL) {
                configData.ddd.objURL = fileData.uploadObjURL;
            }
            if (fileData.uploadTextureURL) {
                configData.ddd.textureURL = fileData.uploadTextureURL;
            }
        }

        // Update Exoplanet Artistic Name
        if (configData.artName) {
            const updateArtNameResponse = await fetch('http://media.maar.world:3001/api/interplanetaryplayers/updateExoplanet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ipId: selectedIpId, artName: configData.artName })
            });

            if (!updateArtNameResponse.ok) {
                throw new Error(`Failed to update artistic name: ${updateArtNameResponse.statusText}`);
            }

            const updateArtNameData = await updateArtNameResponse.json();

            if (!updateArtNameData.artName) {
                throw new Error('Artistic name update failed.');
            }

            console.log('Artistic name updated successfully:', updateArtNameData);
        }

        // Submit the main form data
        const formResponse = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(configData)
        });

        const formDataResponse = await formResponse.json();
        console.log('Server response:', formDataResponse);

        if (formDataResponse.success) {
            handleSuccessResponse(formDataResponse);
        } else {
            throw new Error(formDataResponse.message || 'An error occurred during submission.');
        }

    } catch (error) {
        console.error('Error:', error);
        showToast(`Error: ${error.message}`, 'error');
    } finally {
        // Re-enable the submit button and reset progress bar
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
        document.getElementById('progress').style.width = '0%';
        document.getElementById('progress').textContent = '';
    }
}

    // Function to Update the Exoplanet Artistic Name
    async function updateExoplanetArtName(ipId, artName) {
        try {
            console.log('Updating exoplanet artistic name for ipId:', ipId, 'artName:', artName);
            const response = await fetch('http://media.maar.world:3001/api/interplanetaryplayers/updateExoplanet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ipId, artName })
            });

            if (!response.ok) {
                throw new Error(`Failed to update artistic name: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data.artName) {
                throw new Error('Artistic name update failed.');
            }

            console.log('Artistic name updated successfully:', data);
            showToast('Interplanetary Player data updated successfully!', 'success');

            // Reload the player data and switch to view mode
            await loadInterplanetaryPlayersDetails(playerId);
            setFormMode('view');
        } catch (error) {
            console.error('Failed to update artistic name:', error);
            showToast('Failed to update exoplanet artistic name. Please try again.', 'error');
            enableForm();
        }
    }

    // Function to Enable the Form (used on error)
    function enableForm() {
        document.getElementById('articleForm').querySelectorAll('input, select, textarea, button').forEach(element => {
            element.disabled = false;
        });
    }

    // Function to Handle Success Response after Creation or Editing
    function handleSuccessResponse(response) {
        // Determine the success message based on the action
        const successMessage = currentMode === 'edit'
            ? 'Interplanetary Player updated successfully!'
            : 'Interplanetary Player created successfully!';
        
        showToast(successMessage, 'success');

        // Clear form data cache
        clearProfileCache(userId);

        // Extract the new player ID from the response
        const newPlayerId = currentMode === 'edit'
            ? response.player._id // Access the player ID when editing
            : response.playerId || response.config._id; // Fall back to playerId or _id when creating

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
            const response = await fetch(`http://media.maar.world:3001/api/interplanetaryplayers/${playerId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch player details: ${response.statusText}`);
            }
            const data = await response.json();

            if (!data.success) {
                console.error('Error fetching player details:', data.message);
                showToast('Failed to load player details. Please try again.', 'error');
                return;
            }

            playerData = data.player; // Assign fetched data to playerData.
            isOwner = playerData.ownerId === userId; // Check ownership
            console.log('Is user the owner?', isOwner);

            // Show the edit button only if the user is the owner
            const editButton = document.getElementById('editButton');
            if (editButton) {
                editButton.style.display = isOwner ? 'block' : 'none';
            }

            // Populate modes with data
            populateEditMode(playerData);
            populateViewMode(playerData);
        } catch (error) {
            console.error('Error loading interplanetary player details:', error);
            showToast('Error loading player details. Please try again.', 'error');
        }
    }

    // Function to Populate Edit Mode with Player Data
    function populateEditMode(playerData) {
        // Handle sciName: show as text and hide the selector in edit mode
        const sciNameDisplay = document.getElementById('sciNameDisplay');
        const sciNameSelect = document.getElementById('sciName');

        console.log('Player data received:', JSON.stringify(playerData, null, 2));

        if (currentMode === 'edit') {
            // Show the scientific name as plain text and hide the dropdown
            sciNameDisplay.textContent = playerData.sciName || 'Unknown Exoplanet';
            sciNameDisplay.style.display = 'block';
            sciNameSelect.style.display = 'none';
            sciNameSelect.required = false; // Remove the required attribute when hidden

            // Populate other form fields with data from playerData for editing
            document.getElementById('artName').value = playerData.artName || '';
            document.getElementById('moonAmount').value = playerData.moonAmount || '0';
            document.getElementById('ra_decimal').textContent = playerData.ra_decimal?.$numberDecimal || 'N/A';
            document.getElementById('dec_decimal').textContent = playerData.dec_decimal?.$numberDecimal || 'N/A';
            document.getElementById('period').textContent = playerData.period?.$numberDecimal || 'N/A';
            document.getElementById('radius').textContent = playerData.radius?.$numberDecimal || 'N/A';
            document.getElementById('discoveryyear').textContent = playerData.discoveryyear?.$numberDecimal || 'N/A';

            // Populate 3D artist name
            const dddArtistNameField = document.getElementById('dddArtistName');
            dddArtistNameField.value = playerData.ddd?.dddArtist || '';

            // Populate exoplanet description
            document.getElementById('exoplanetDescription').value = playerData.description || '';

            // Populate credits
            document.getElementById('credits').value = playerData.credits || '';

            const baseUrl = 'https://media.maar.world';

            // Display existing OBJ file
            const existingObjFileDiv = document.getElementById('existingObjFile');
            const existingObjLink = document.getElementById('existingObjLink');
            if (playerData.ddd?.objURL) {
                const objUrl = playerData.ddd.objURL.startsWith('http')
                    ? playerData.ddd.objURL
                    : `${baseUrl}${playerData.ddd.objURL}`;
                existingObjLink.href = objUrl;
                existingObjLink.textContent = playerData.ddd.objURL.split('/').pop(); // Show file name
                existingObjFileDiv.style.display = 'block';
            } else {
                existingObjFileDiv.style.display = 'none';
            }

            // Display existing Texture file
            const existingTextureFileDiv = document.getElementById('existingTextureFile');
            const existingTextureLink = document.getElementById('existingTextureLink');
            const texturePreview = document.getElementById('texturePreviewForm');

            if (playerData.ddd?.textureURL) {
                const textureUrl = playerData.ddd.textureURL.startsWith('http')
                    ? playerData.ddd.textureURL
                    : `${baseUrl}${playerData.ddd.textureURL}`;
                existingTextureLink.href = textureUrl;
                existingTextureLink.textContent = playerData.ddd.textureURL.split('/').pop(); // Show file name
                existingTextureFileDiv.style.display = 'block';

                // Display texture image preview
                texturePreview.src = textureUrl;
                texturePreview.alt = `Texture of ${playerData.sciName || 'Exoplanet'}`;
                texturePreview.style.display = 'block';
            } else {
                existingTextureFileDiv.style.display = 'none';
                texturePreview.style.display = 'none';
            }
        }
    }

    // Function to Populate View Mode with Player Data
    function populateViewMode(playerData) {
        // Populate the view container with data and make labels bold
        document.getElementById('viewSciName').innerHTML = `<strong>Scientific Name:</strong> ${playerData.sciName || 'N/A'}`;
        document.getElementById('viewArtName').innerHTML = `<strong>Artistic Name:</strong> ${playerData.artName || 'N/A'}`;
        document.getElementById('viewRaDecimal').innerHTML = `<strong>Right Ascension (Decimal):</strong> ${playerData.ra_decimal?.$numberDecimal || 'N/A'}`;
        document.getElementById('viewDecDecimal').innerHTML = `<strong>Declination (Decimal):</strong> ${playerData.dec_decimal?.$numberDecimal || 'N/A'}`;
        document.getElementById('viewPeriod').innerHTML = `<strong>Orbital Period [days]:</strong> ${playerData.period?.$numberDecimal || 'N/A'}`;
        document.getElementById('viewRadius').innerHTML = `<strong>Radius [R earth]:</strong> ${playerData.radius?.$numberDecimal || 'N/A'}`;
        document.getElementById('viewDiscoveryYear').innerHTML = `<strong>Discovery Year:</strong> ${playerData.discoveryyear?.$numberDecimal || 'N/A'}`;
        
        // **3D Artist as Clickable Handler**
        document.getElementById('viewDddArtistName').innerHTML = `<strong>3D Artist:</strong> ${playerData.ddd?.dddArtist ? `<a href="/xplorer/?username=${encodeURIComponent(playerData.ddd.dddArtist)}" target="_self">@${playerData.ddd.dddArtist}</a>` : 'N/A'}`;
        
        document.getElementById('viewExoplanetDescription').innerHTML = `<strong>Description:</strong> ${playerData.description || 'N/A'}`;
        document.getElementById('viewCredits').innerHTML = `<strong>Credits:</strong> ${playerData.credits || 'N/A'}`;
        
        // Show or hide Download 3D Model link
        const viewObjFile = document.getElementById('viewObjFile');
        if (playerData.ddd?.objURL) {
            viewObjFile.href = playerData.ddd.objURL.startsWith('http') ? playerData.ddd.objURL : `https://media.maar.world${playerData.ddd.objURL}`;
            viewObjFile.textContent = 'Download 3D Model';
            viewObjFile.style.display = 'block';
        } else {
            viewObjFile.style.display = 'none';
        }
        
        // Show or hide Texture Image
        const viewTextureImage = document.getElementById('viewTextureImage');
        if (playerData.ddd?.textureURL) {
            const textureUrl = playerData.ddd.textureURL.startsWith('http') ? playerData.ddd.textureURL : `https://media.maar.world${playerData.ddd.textureURL}`;
            viewTextureImage.src = textureUrl;
            viewTextureImage.alt = `Texture of ${playerData.sciName || 'Exoplanet'}`;
            viewTextureImage.style.display = 'block';
        } else {
            viewTextureImage.style.display = 'none';
        }
        
        // **Populate Interplanetary Player Owner Details**
        populatePlayerOwnerDetails(playerData.ownerDetails);
    }

    // Function to Populate the Interplanetary Player Owner Details
    function populatePlayerOwnerDetails(ownerDetails) {
        const playerOwnerList = document.getElementById('playerOwnerList');
        
        console.log("Player Owner Data:", ownerDetails);

        if (ownerDetails) {
            playerOwnerList.innerHTML = `
                <li class="user-list-item">
                    <div class="user-profile-pic">
                        <img src="https://media.maar.world${ownerDetails.profileImage || '/default_profile.png'}" alt="${ownerDetails.username}">
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
            console.log(`Profile cache cleared for user`);
        } else {
            console.log(`No cache found for user`);
        }
    }

    // Function to Toggle Between Edit and View Modes
    function toggleEditMode() {
        if (currentMode === 'view') {
            if (playerData) { // Ensure playerData is loaded
                setFormMode('edit');
                updateURL('edit', playerId);
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

    // Function to Set the Current Mode (View, Edit, Create)
    function setFormMode(newMode) {
        currentMode = newMode;
        const isViewMode = currentMode === 'view';
        const isEditMode = currentMode === 'edit';
        const isCreateMode = currentMode === 'create';

        // Toggle visibility of form and view sections
        const articleForm = document.getElementById('articleForm');
        const interplanetaryPlayerView = document.getElementById('interplanetaryPlayerView');
        const editButton = document.getElementById('editButton');

        if (isViewMode) {
            interplanetaryPlayerView.style.display = 'block';
            articleForm.style.display = 'none';
            
            // Set Edit Button to show 'Edit' icon and title
            if (editButton) {
                editButton.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
                editButton.title = 'Edit Interplanetary Player';
                editButton.style.display = isOwner ? 'block' : 'none';
            }

            // Set form title
            const formTitle = document.getElementById('formTitle');
            if (formTitle) {
                formTitle.textContent = 'Interplanetary Player Details';
            }
        } else if (isEditMode) {
            interplanetaryPlayerView.style.display = 'none';
            articleForm.style.display = 'block';
            
            // Set Edit Button to show 'View' icon and title
            if (editButton) {
                editButton.innerHTML = `<span class="material-symbols-outlined">visibility</span>`;
                editButton.title = 'View Interplanetary Player';
                editButton.style.display = 'block';
            }

            // Set form title
            const formTitle = document.getElementById('formTitle');
            if (formTitle) {
                formTitle.textContent = 'Edit Interplanetary Player';
            }
        } else if (isCreateMode) {
            interplanetaryPlayerView.style.display = 'none';
            articleForm.style.display = 'block';
            
            // Hide Edit Button in Create Mode
            if (editButton) {
                editButton.style.display = 'none';
            }

            // Set form title
            const formTitle = document.getElementById('formTitle');
            if (formTitle) {
                formTitle.textContent = 'Create a New Interplanetary Player';
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

    // Handle Browser Navigation (Back/Forward)
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            setFormMode(event.state.mode);
        } else {
            // Default to view mode if no state is available
            setFormMode('view');
        }
    });

    // Initialize the Form on Page Load
    document.addEventListener('DOMContentLoaded', async () => {
        setupFormListeners();
        loadExoplanetData();

        // Determine initial mode based on URL parameters
        if (initialMode === 'edit' && playerId) {
            currentMode = 'edit';
            await loadInterplanetaryPlayersDetails(playerId);
        } else if (playerId) {
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

    // Function to Load Interplanetary Player Details from the Server
    async function loadInterplanetaryPlayersDetails(playerId) {
        try {
            const response = await fetch(`http://media.maar.world:3001/api/interplanetaryplayers/${playerId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch player details: ${response.statusText}`);
            }
            const data = await response.json();

            if (!data.success) {
                console.error('Error fetching player details:', data.message);
                showToast('Failed to load player details. Please try again.', 'error');
                return;
            }

            playerData = data.player; // Assign fetched data to playerData.
            isOwner = playerData.ownerId === userId; // Check ownership
            console.log('Is user the owner?', isOwner);

            // Show the edit button only if the user is the owner
            const editButton = document.getElementById('editButton');
            if (editButton) {
                editButton.style.display = isOwner ? 'block' : 'none';
            }

            // Populate modes with data
            populateEditMode(playerData);
            populateViewMode(playerData);
        } catch (error) {
            console.error('Error loading interplanetary player details:', error);
            showToast('Error loading player details. Please try again.', 'error');
        }
    }

    // Function to Enable the Form Again (used on error)
    function enableForm() {
        document.getElementById('articleForm').querySelectorAll('input, select, textarea, button').forEach(element => {
            element.disabled = false;
        });
    }
</script>
