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
            <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Interplanetary Player" style="display: none;">
                <span class="material-symbols-outlined">edit</span> 
            </button>
        </div>
    </div>
    <h3 id="formTitle">Create a New Interplanetary Player</h3>
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
let playerId = urlParams.get('playerId') || ''; // Default to '' if 'playerId' is not provided.
let playerData = null; // Define playerData globally.
let exoplanetData = {}; // Holds exoplanet data fetched from the API
const userId = localStorage.getItem('userId'); // Retrieve the logged-in user's ID
let isOwner = false;
let moonAmountInput = null; // Declare moonAmountInput globally so it can be accessed by other functions

// Caching Helper Functions

const cacheKey = 'exoplanetData';
const cacheTTLKey = 'exoplanetDataTTL';
const cacheTTL = 60 * 60 * 24; // Cache for 24 hours (in seconds)

// Helper function to check if cache is valid
const isCacheValid = () => {
    const cachedTime = localStorage.getItem(cacheTTLKey);
    if (!cachedTime) return false; // No TTL found, cache is invalid
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return (now - cachedTime) < cacheTTL; // Check if TTL is still valid
};

// Helper function to save data to cache
const saveToCache = (data) => {
    localStorage.setItem(cacheKey, JSON.stringify(data));
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    localStorage.setItem(cacheTTLKey, now);
};

// Function to load exoplanet data (from cache or server)
const loadExoplanetData = () => {
    if (localStorage.getItem(cacheKey) && isCacheValid()) {
        console.log('Loading exoplanet data from cache');
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));
        exoplanetData = cachedData[0]; // Access the correct object inside the array
        populateExoplanetDropdown();
    } else {
        console.log('Fetching exoplanet data from server');
        fetch('http://media.maar.world:3001/api/interplanetaryplayers/fetchExoplanetData')
            .then(response => response.json())
            .then(data => {
                console.log('Exoplanet data:', data);
                exoplanetData = data[0]; // Access the correct object inside the array
                populateExoplanetDropdown();
                saveToCache(data); // Save the fetched data to cache
            })
            .catch(error => console.error('Error loading or parsing the exoplanet data:', error));
    }
};

// DOMContentLoaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Set moonAmountInput once DOM is ready
    moonAmountInput = document.getElementById('moonAmount');

    // Add event listener to edit button
    const editButton = document.getElementById('editButton');
    if (editButton) {
        editButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default button behavior
            setFormMode('edit');    // Switch to edit mode
        });
    }

    // Add event listener to cancel button
    const cancelButton = document.getElementById('cancelButton');
    if (cancelButton) {
        cancelButton.addEventListener('click', function () {
            if (mode === 'edit' && playerId) {
                setFormMode('view');  // Switch to view mode
                loadInterplanetaryPlayersDetails(playerId);  // Reload the player details
            } else {
                window.location.href = '/voyage';
            }
        });
    }

    // Set the initial mode for the form
    setFormMode(mode); 

    // Load exoplanet data (cached or fetch)
    loadExoplanetData();

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
            if (playerData && playerData.textureURL) {
                const textureUrl = playerData.textureURL.startsWith('http')
                    ? playerData.textureURL
                    : `https://media.maar.world${playerData.textureURL}`;
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
    } else if (playerData.objURL) {
        fileFormData.append('existingObjURL', playerData.objURL);
    }

    if (textureFile) {
        fileFormData.append('uploadTexture', textureFile);
    } else if (playerData.textureURL) {
        fileFormData.append('existingTextureURL', playerData.textureURL);
    }

    // Prepare JSON data for other form fields
    const configData = {
        ownerId: userId,
        isPublic: false,
        ipId,
        artName: document.getElementById('artName').value,
        moonAmount: moonAmount, // Append moonAmount to the form data
        sciName: document.getElementById('sciNameDisplay').textContent.replace('Scientific Name: ', '') || 'Unknown Exoplanet',
        ra_decimal: parseFloat(document.getElementById('ra_decimal').textContent.replace('Right Ascension (Decimal): ', '')) || 0,
        dec_decimal: parseFloat(document.getElementById('dec_decimal').textContent.replace('Declination (Decimal): ', '')) || 0,
        period: parseFloat(document.getElementById('period').textContent.replace('Orbital Period [days]: ', '')) || 0,
        radius: parseFloat(document.getElementById('radius').textContent.replace('Radius [R earth]: ', '')) || 0,
        discoveryyear: parseInt(document.getElementById('discoveryyear').textContent.replace('Discovery Year: ', ''), 10) || 0,
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
        
        // Now update the exoplanet artistic name before switching modes
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
            statusMessage.textContent = 'Interplanetary Player data updated successfully!';
            statusMessage.classList.remove('error');
            statusMessage.style.display = 'block';

            // Reload the player data and switch to view mode
            loadInterplanetaryPlayersDetails(playerId);
            setFormMode('view');
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
            isOwner = playerData.ownerId === userId; // Assign to global variable
            console.log('Is user the owner?', isOwner);

            // Show the edit button only if the user is the owner
            const editButton = document.getElementById('editButton');
            if (editButton) {
                editButton.style.display = isOwner ? 'block' : 'none';
            }

            // Pass the fetched data to populate the edit mode
            populateEditMode(playerData);

            // Populate view mode with data
            populateViewMode(playerData);
        })
        .catch(error => {
            console.error('Error loading interplanetary player details:', error);
        });
}

// Function to populate the view mode with player data
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
    if (playerData.objURL) {
        viewObjFile.href = playerData.objURL.startsWith('http') ? playerData.objURL : `https://media.maar.world${playerData.objURL}`;
        viewObjFile.textContent = 'Download 3D Model';
        viewObjFile.style.display = 'block';
    } else {
        viewObjFile.style.display = 'none';
    }
    
    // Show or hide Texture Image
    const viewTextureImage = document.getElementById('viewTextureImage');
    if (playerData.textureURL) {
        const textureUrl = playerData.textureURL.startsWith('http') ? playerData.textureURL : `https://media.maar.world${playerData.textureURL}`;
        viewTextureImage.src = textureUrl;
        viewTextureImage.alt = `Texture of ${playerData.sciName || 'Exoplanet'}`;
        viewTextureImage.style.display = 'block';
    } else {
        viewTextureImage.style.display = 'none';
    }
    
    // **Remove Owner Details Display**
    // The following code has been removed/commented out because the HTML elements no longer exist
    /*
    const viewOwnerDetails = document.getElementById('viewOwnerDetails');
    if (isOwner) {
        viewOwnerDetails.textContent = `Owner ID: ${playerData.ownerId}`;
        viewOwnerDetails.style.display = 'block';
    } else {
        viewOwnerDetails.style.display = 'none';
    }
    */
    
    // Populate Interplanetary Player Owner Details
    populatePlayerOwnerDetails(playerData.ownerDetails);
}

// Function to populate the Interplanetary Player owner details
// Function to populate the Interplanetary Player owner details
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
                        <a href="/xplorer/?username=${ownerDetails.username}" target="_self">
                            @${ownerDetails.username || 'Unknown'}
                        </a>
                    </div>
                </div>
            </li>`;
        // Removed playerOwnerCount as it's no longer needed
    } else {
        playerOwnerList.innerHTML = '<li>No owner details available.</li>';
        // Removed playerOwnerCount as it's no longer needed
    }
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
    dddArtistNameField.value = playerData.ddd?.dddArtist || '';

    // Populate exoplanet description
    document.getElementById('exoplanetDescription').value = playerData.description || '';

    // Populate credits
    document.getElementById('credits').value = playerData.credits || '';

    const baseUrl = 'https://media.maar.world';

    // Display existing OBJ file
    const existingObjFileDiv = document.getElementById('existingObjFile');
    const existingObjLink = document.getElementById('existingObjLink');
    if (playerData.objURL) {
        const objUrl = playerData.objURL.startsWith('http')
            ? playerData.objURL
            : `${baseUrl}${playerData.objURL}`;
        existingObjLink.href = objUrl;
        existingObjLink.textContent = playerData.objURL.split('/').pop(); // Show file name
        existingObjFileDiv.style.display = 'block';
    } else {
        existingObjFileDiv.style.display = 'none';
    }

    // Display existing Texture file
    const existingTextureFileDiv = document.getElementById('existingTextureFile');
    const existingTextureLink = document.getElementById('existingTextureLink');
    const texturePreview = document.getElementById('texturePreviewForm');

    if (playerData.textureURL) {
        const textureUrl = playerData.textureURL.startsWith('http')
            ? playerData.textureURL
            : `${baseUrl}${playerData.textureURL}`;
        existingTextureLink.href = textureUrl;
        existingTextureLink.textContent = playerData.textureURL.split('/').pop(); // Show file name
        existingTextureFileDiv.style.display = 'block';

        // Display texture image preview
        texturePreview.src = textureUrl;
        texturePreview.alt = `Texture of ${playerData.sciName || 'Exoplanet'}`;
        texturePreview.style.display = 'block';
    } else {
        existingTextureFileDiv.style.display = 'none';
        texturePreview.style.display = 'none';
    }

    // After populating, switch to view mode to display data
    setFormMode('view');
}

// Handle different form modes (view, edit, create)
// Function to set the current mode (View or Edit)
function setFormMode(newMode) {
    mode = newMode;
    const isViewMode = mode === 'view';
    const isEditMode = mode === 'edit';

    // Toggle visibility of form and view sections
    const articleForm = document.getElementById('articleForm');
    const interplanetaryPlayerView = document.getElementById('interplanetaryPlayerView');
    const editButton = document.getElementById('editButton');
    const cancelEditButton = document.getElementById('cancelButton');

    if (isViewMode) {
        interplanetaryPlayerView.style.display = 'block';
        articleForm.style.display = 'none';
        editButton.style.display = isOwner ? 'block' : 'none';
    } else if (isEditMode) {
        interplanetaryPlayerView.style.display = 'none';
        articleForm.style.display = 'block';
        editButton.style.display = 'none';
    }

    // Update the form title
    const formTitle = document.getElementById('formTitle');
    if (formTitle) {
        formTitle.textContent = isEditMode ? 'Edit Interplanetary Player' : 'Create a New Interplanetary Player';
    }
}

// Event Listeners for Edit and Cancel Buttons
document.getElementById('editButton').addEventListener('click', function() {
    setFormMode('edit');
});

document.getElementById('cancelButton').addEventListener('click', function() {
    setFormMode('view');
});

// Initial Mode Setup (Assuming default is View Mode)
setFormMode('view');

</script>
