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
<h3>Create a New Interplanetary Player</h3>
<p>Please fill out the form with details about the exoplanet and your artistic representation.</p>

<!-- View Mode -->
<div id="interplanetaryPlayerView" style="display: none;">
    <a id="viewObjFile" style="display: none;">Download 3D Model</a>
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
    <p id="viewOwnerDetails" style="display: none;"></p>

</div>

<!-- Edit/Create Mode -->
<form id="articleForm" class="contact-form">

    <!-- 3D Model Upload -->
<label for="uploadObj">Please upload the 3D model (OBJ format):</label>
<input type="file" id="uploadObj" name="uploadObj" accept=".obj">

<!-- Texture Upload -->
<label for="uploadTexture">Please upload the texture file (any image format):</label>
<input type="file" id="uploadTexture" name="uploadTexture" accept="image/*">

<label for="dddArtistName">Who is the 3D artist for this creation?</label>
<input type="text" class="user-search-input" id="dddArtistName" name="dddArtistName" required>
<!-- Container for Search Results -->
<div class="dropdown"></div>


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
        <input type="number" id="moonAmount" name="moonAmount" value="0" required placeholder="moonAmount">
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

    <button type="button" id="cancelButton" class="btn button--outline-primary button--circle">Cancel</button>
<div class="p-2"></div>
<br>


<!-- Progress Bar -->
<div class="progress-bar">
    <div id="progress"></div>
</div><br>

<!-- Status Messages -->
<div id="statusMessage" class="status-message" style="display: none;"></div>
</form>
</div>


<script>
// Define urlParams first, before using it.
const urlParams = new URLSearchParams(window.location.search);
let mode = urlParams.get('mode') || 'create'; // Default to 'create' if 'mode' is not provided.
let playerId = urlParams.get('playerId') || ''; // Default to 'create' if 'mode' is not provided.
let playerData = null; // Define playerData globally.
let exoplanetData = {}; // Holds exoplanet data fetched from the API
const userId = localStorage.getItem('userId'); // Retrieve the logged-in user's ID
let isOwner = false;
let moonAmountInput = null; // Declare moonAmountInput globally so it can be accessed by other functions

document.addEventListener('DOMContentLoaded', function() {
    // Set moonAmountInput once DOM is ready
    moonAmountInput = document.getElementById('moonAmount');

    // Set the initial mode for the form
    setFormMode(mode); 

    // Fetch exoplanet data
    fetch('http://media.maar.world:3001/api/interplanetaryplayers/fetchExoplanetData')
        .then(response => response.json())
        .then(data => {
            console.log('Exoplanet data:', data);
            exoplanetData = data[0]; // Access the correct object inside the array
            populateExoplanetDropdown();
        })
        .catch(error => console.error('Error loading or parsing the exoplanet data:', error));
    
    if (playerId) {
        // Only load player details if a playerId is present.
        loadInterplanetaryPlayersDetails(playerId);
    } else {
        // Ensure form fields are cleared if no playerId is provided.
        clearFormFields();
    }

    setupFormListeners(); // Initialize form listeners after DOM is loaded
});

// Function to reset/clear form fields when switching to 'create' mode
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
}

// Function to set up form listeners (for inputs, validations, and submit)
function setupFormListeners() {
    // Validate moonAmount to be between 0 and 145
    moonAmountInput.addEventListener('input', function() {
        const value = parseInt(moonAmountInput.value, 10);

        // If the input is less than 0 or more than 145, set it to the boundary values
        if (value < 0) {
            moonAmountInput.value = 0;
        } else if (value > 145) {
            moonAmountInput.value = 145;
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

// Function to update exoplanet details on selection change
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

// Save form data locally in case of an incomplete form submission
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

// Load saved form data for edit or pre-fill
function loadFormData() {
    if (mode !== 'create') {
        const savedData = JSON.parse(localStorage.getItem('protoFormData'));
        if (savedData) {
            document.getElementById('sciName').value = savedData.sciName;
            document.getElementById('artName').value = savedData.artName;
            document.getElementById('moonAmount').value = savedData.moonAmount;
            document.getElementById('dddArtistName').value = savedData.dddArtistName;
            document.getElementById('exoplanetDescription').value = savedData.exoplanetDescription;
            document.getElementById('credits').value = savedData.credits;
        }
    }
}

// Submit the form: either POST for new creation or PUT for updates
// Submit the form: either POST for new creation or PUT for updates
function submitForm() {
    const method = mode === 'edit' ? 'PUT' : 'POST';
    const url = method === 'PUT' 
        ? `http://media.maar.world:3001/api/interplanetaryplayers/${playerId}` 
        : 'http://media.maar.world:3001/api/interplanetaryplayers';

    // Validate moonAmount input
    let moonAmount = parseInt(moonAmountInput.value, 10);
    if (isNaN(moonAmount) || moonAmount < 0) {
        moonAmount = 0;
    } else if (moonAmount > 145) {
        moonAmount = 145;
    }

    // Prepare FormData for file uploads
    const fileFormData = new FormData();
    const ipId = mode === 'edit' && playerData
        ? playerData.ipId
        : parseInt(document.getElementById('sciName').value.split(':')[0]);

    fileFormData.append('ipId', ipId);
    const objFile = document.getElementById('uploadObj').files[0];
    const textureFile = document.getElementById('uploadTexture').files[0];

    if (objFile) {
        fileFormData.append('uploadObj', objFile);
    }
    if (textureFile) {
        fileFormData.append('uploadTexture', textureFile);
    }

    // Prepare JSON data for other form fields
    const configData = {
        ownerId: userId,
        isPublic: false,
        ipId,
        artName: document.getElementById('artName').value,
        moonAmount: moonAmount, // Append moonAmount to the form data
        sciName: document.getElementById('sciNameDisplay').textContent || 'Unknown Exoplanet',
        ra_decimal: parseFloat(document.getElementById('ra_decimal').textContent),
        dec_decimal: parseFloat(document.getElementById('dec_decimal').textContent),
        period: parseFloat(document.getElementById('period').textContent),
        radius: parseFloat(document.getElementById('radius').textContent),
        discoveryyear: parseInt(document.getElementById('discoveryyear').textContent, 10),
        description: document.getElementById('exoplanetDescription').value,
        credits: document.getElementById('credits').value,
        ddd: {
            dddArtist: document.getElementById('dddArtistName').value.trim(),
            objURL: playerData?.ddd?.objURL || '',
            textureURL: playerData?.ddd?.textureURL || ''
        }
    };

    // First, upload files if they exist
    fetch('http://media.maar.world:3001/api/interplanetaryplayers/uploadModelFiles', {
        method: 'POST',
        body: fileFormData
    })
    .then(response => response.json())
    .then(fileData => {
        console.log('Files uploaded successfully:', fileData);

        // Include file URLs in the JSON data only if new files were uploaded
        if (fileData.uploadObjURL) {
            configData.ddd.objURL = fileData.uploadObjURL;
        }
        if (fileData.uploadTextureURL) {
            configData.ddd.textureURL = fileData.uploadTextureURL;
        }

        // Submit the form data
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(configData)
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to submit configuration');
        }
        return response.json();
    })
    .then(data => {
        console.log('Configuration submitted:', data);
        
        // Now update the exoplanet artistic name before redirecting
        updateExoplanetArtName(ipId, document.getElementById('artName').value);
    })
    .catch(error => {
        console.error('Failed to submit configuration:', error);
        alert('An error occurred. Please try again.');
    });
}

// Function to update artistic name
function updateExoplanetArtName(ipId, artName) {
    console.log('Updating exoplanet artistic name for ipId:', ipId, 'artName:', artName);
    fetch('http://media.maar.world:3001/api/interplanetaryplayers/updateExoplanet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ipId, artName })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update artistic name');
        }
        return response.json();
    })
    .then(data => {
        if (data.artName) {
            console.log('Artistic name updated successfully:', data);
            const statusMessage = document.getElementById('statusMessage');
            statusMessage.textContent = 'Exoplanet artistic name updated successfully!';
            statusMessage.classList.remove('error');
            statusMessage.style.display = 'block';

            // Redirect to /voyage after successful update
            setTimeout(() => {
                window.location.href = '/voyage';
            }, 2000); // Adjust the delay if needed
        }
    })
    .catch(error => {
        console.error('Failed to update artistic name:', error);
        const statusMessage = document.getElementById('statusMessage');
        statusMessage.textContent = 'Failed to update exoplanet artistic name. Please try again.';
        statusMessage.classList.add('error');
        statusMessage.style.display = 'block';
        enableForm();
    });
}


// Function to enable the form again (used on error)
function enableForm() {
    document.getElementById('articleForm').querySelectorAll('input, select, textarea, button').forEach(element => {
        element.disabled = false;
    });

}


function loadInterplanetaryPlayersDetails(playerId) {
    fetch(`http://media.maar.world:3001/api/interplanetaryplayers/${playerId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch player details');
            }
            return response.json();
        })
        .then(data => {
            if (!data.success) {
                console.error('Error fetching player details:', data.message);
                return;
            }

            playerData = data.player; // Assign fetched data to playerData.
            const isOwner = playerData.ownerId === userId;
            console.log('Is user the owner?', isOwner);

            // Show the edit button only if the user is the owner
            const editButton = document.getElementById('editButton');
            if (editButton) {
                editButton.style.display = isOwner ? 'block' : 'none';
            }

            // Pass the fetched data to populate the edit mode
            populateEditMode(playerData);
        })
        .catch(error => {
            console.error('Error loading interplanetary player details:', error);
        });
}

// Populate the form with data in edit mode
function populateEditMode(playerData) {
    // Handle sciName: show as text and hide the selector in edit mode
    const sciNameDisplay = document.getElementById('sciNameDisplay');
    const sciNameSelect = document.getElementById('sciName');

    console.log('Player data received:', JSON.stringify(playerData, null, 2));

    // Show the scientific name as plain text and hide the dropdown
    sciNameDisplay.textContent = playerData.sciName || 'Unknown Exoplanet';
    sciNameDisplay.style.display = 'block';
    sciNameSelect.style.display = 'none';
    sciNameSelect.required = false; // Remove the required attribute when hidden

    // Populate other form fields with data from playerData for editing
    document.getElementById('artName').value = playerData.artName || '';
    document.getElementById('moonAmount').value = playerData.moonAmount || '';
    document.getElementById('ra_decimal').textContent = playerData.ra_decimal?.$numberDecimal || 'N/A';
    document.getElementById('dec_decimal').textContent = playerData.dec_decimal?.$numberDecimal || 'N/A';
    document.getElementById('period').textContent = playerData.period?.$numberDecimal || 'N/A';
    document.getElementById('radius').textContent = playerData.radius?.$numberDecimal || 'N/A';
    document.getElementById('discoveryyear').textContent = playerData.discoveryyear?.$numberDecimal || 'N/A';

    // Populate 3D artist name from the playerData, which should now be a simple string
    const dddArtistNameField = document.getElementById('dddArtistName');
    dddArtistNameField.value = playerData.dddArtist || '';


    // Populate exoplanet description
    document.getElementById('exoplanetDescription').value = playerData.description || '';

    // Populate credits
    document.getElementById('credits').value = playerData.credits || '';

    const baseUrl = 'https://media.maar.world';

    // Handle the 3D model download link
    const objFileLink = document.getElementById('viewObjFile');
    if (playerData.objURL) {
        const objUrl = playerData.objURL.startsWith('http')
            ? playerData.objURL
            : `${baseUrl}${playerData.objURL}`;
        objFileLink.textContent = 'Download 3D Model';
        objFileLink.href = objUrl;
        objFileLink.style.display = 'block';
    } else {
        objFileLink.style.display = 'none';
    }

    // Display the texture image if available
    const textureImage = document.getElementById('viewTextureImage');
    if (playerData.textureURL) {
        const textureUrl = playerData.textureURL.startsWith('http')
            ? playerData.textureURL
            : `${baseUrl}${playerData.textureURL}`;
        textureImage.src = textureUrl;
        textureImage.alt = `Texture of ${playerData.sciName || 'Exoplanet'}`;
        textureImage.style.display = 'block';
    } else {
        textureImage.style.display = 'none';
    }

    // Show the form for editing and hide the view mode
    document.getElementById('articleForm').style.display = 'block';
    document.getElementById('interplanetaryPlayerView').style.display = 'none';
}

// Handle different form modes (view, edit, create)
function setFormMode(mode) {
    const isViewMode = mode === 'view';
    const isEditMode = mode === 'edit';
    const isCreateMode = mode === 'create';

    console.log('Setting form mode:', mode);

    // Toggle form elements' disabled state based on the mode
    const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm textarea');
    formElements.forEach(element => {
        element.disabled = isViewMode; // Disable input fields only in view mode
    });

    const articleForm = document.getElementById('articleForm');
    const interplanetaryPlayerView = document.getElementById('interplanetaryPlayerView');
    const editButton = document.getElementById('editButton');
    const cancelEditButton = document.getElementById('cancelEditButton');

    // Cancel button functionality: return to view or voyage page
    document.getElementById('cancelButton').addEventListener('click', function () {
        if (mode === 'edit' && playerId) {
            setFormMode('view');  // Switch to view mode
            loadInterplanetaryPlayersDetails(playerId);  // Reload the player details
        } else {
            window.location.href = '/voyage';
        }
    });

    // Toggle visibility of form and view sections based on the mode
    if (articleForm) {
        articleForm.style.display = (isEditMode || isCreateMode) ? 'block' : 'none';
    }
    if (interplanetaryPlayerView) {
        interplanetaryPlayerView.style.display = isViewMode ? 'block' : 'none';
    }

    // Show edit button only if in view mode and user is the owner
    if (editButton) {
        editButton.style.display = isViewMode && isOwner ? 'block' : 'none';
    }

    // Show the cancel edit button only in edit mode
    if (cancelEditButton) {
        cancelEditButton.style.display = isEditMode ? 'block' : 'none';
    }

    // Update the page title based on the mode
    const header = document.querySelector('.form-container h3');
    if (header) {
        header.textContent = isCreateMode
            ? 'Create a New Interplanetary Player'
            : isEditMode
            ? 'Edit Interplanetary Player'
            : 'View Interplanetary Player';
    }

    // Clear form fields if in create mode
    if (isCreateMode) {
        clearFormFields();
    }
}

</script>
