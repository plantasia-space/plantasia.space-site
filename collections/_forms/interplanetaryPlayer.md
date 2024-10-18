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
    // Define urlParams first, before using it.
    const urlParams = new URLSearchParams(window.location.search);
    let initialMode = urlParams.get('mode'); // 'edit' or null
    let playerId = urlParams.get('playerId') || ''; // Default to '' if 'playerId' is not provided.
    let playerData = null; // Define playerData globally.
    let exoplanetData = {}; // Holds exoplanet data fetched from the API
    const userId = localStorage.getItem('userId'); // Retrieve the logged-in user's ID
    let isOwner = false;
    let moonAmountInput = null; // Declare moonAmountInput globally so it can be accessed by other functions
    let currentMode = 'create'; // Initialize currentMode

    // Toast Function (Enhanced)
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

        // Optional: Close Button
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

    // Function to load exoplanet data (directly fetch from server without caching)
    const loadExoplanetData = () => {
        console.log('Fetching exoplanet data from server');
        fetch('http://media.maar.world:3001/api/interplanetaryplayers/fetchExoplanetData')
            .then(response => response.json())
            .then(data => {
                console.log('Exoplanet data:', data);
                exoplanetData = data[0]; // Access the correct object inside the array
                populateExoplanetDropdown();
                // Removed caching
            })
            .catch(error => {
                console.error('Error loading or parsing the exoplanet data:', error);
                showToast('Failed to load exoplanet data. Please refresh the page.', 'error');
            });
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
                toggleEditMode(); // Toggle between view and edit modes
            });
        }

        // Determine initial mode based on URL parameters
        if (initialMode === 'edit' && playerId) {
            currentMode = 'edit';
        } else if (playerId) {
            currentMode = 'view';
        } else {
            currentMode = 'create';
        }

        // Set the initial mode for the form
        setFormMode(currentMode); 

        // Load exoplanet data (direct fetch)
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
        if (currentMode !== 'create') {
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
        const submitButton = document.querySelector('#articleForm button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
        }

        const method = currentMode === 'edit' ? 'PUT' : 'POST';
        const url = method === 'PUT' 
            ? `http://media.maar.world:3001/api/interplanetaryplayers/${playerId}` 
            : 'http://media.maar.world:3001/api/interplanetaryplayers';

        let moonAmount = parseInt(moonAmountInput.value, 10);
        moonAmount = isNaN(moonAmount) || moonAmount < 0 ? 0 : moonAmount > 145 ? 145 : moonAmount;

        const fileFormData = new FormData();
        const ipId = currentMode === 'edit' && playerData
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

        const configData = {
            ownerId: userId,
            isPublic: false,
            ipId,
            artName: document.getElementById('artName').value,
            moonAmount: moonAmount,
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

        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        if (method === 'POST' || method === 'PUT') {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.upload.addEventListener('progress', function(event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                const progressBar = document.getElementById('progress');
                progressBar.style.width = percentComplete + '%';
                progressBar.textContent = Math.round(percentComplete) + '%';
            }
        });

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const progressBar = document.getElementById('progress');
                if (xhr.status >= 200 && xhr.status < 300) {
                    progressBar.style.width = '0%';
                    progressBar.textContent = '';

                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Submit';
                    }

                    const response = JSON.parse(xhr.responseText);
                    console.log('Configuration submitted:', response);

                    showToast('Interplanetary Player created successfully!', 'success');

                    // Update the exoplanet artistic name before switching modes
                    updateExoplanetArtName(ipId, document.getElementById('artName').value);
                } else {
                    console.error('Failed to submit configuration:', xhr.responseText);
                    showToast('An error occurred during submission. Please try again.', 'error');

                    progressBar.style.width = '0%';
                    progressBar.textContent = '';

                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Submit';
                    }
                }
            }
        };

        xhr.onerror = function() {
            console.error('Network error occurred.');
            showToast('A network error occurred. Please check your connection and try again.', 'error');

            const progressBar = document.getElementById('progress');
            progressBar.style.width = '0%';
            progressBar.textContent = '';

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
        };

        let dataToSend;

        if (objFile || textureFile) {
            const uploadFiles = new FormData();
            uploadFiles.append('ipId', ipId);

            if (objFile) {
                uploadFiles.append('uploadObj', objFile);
            } else if (playerData.objURL) {
                uploadFiles.append('existingObjURL', playerData.objURL);
            }

            if (textureFile) {
                uploadFiles.append('uploadTexture', textureFile);
            } else if (playerData.textureURL) {
                uploadFiles.append('existingTextureURL', playerData.textureURL);
            }

            // First, upload files using fetch
            fetch('http://media.maar.world:3001/api/interplanetaryplayers/uploadModelFiles', {
                method: 'POST',
                body: uploadFiles
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

                dataToSend = JSON.stringify(configData);
                xhr.send(dataToSend);
            })
            .catch(error => {
                console.error('Failed to upload files:', error);
                showToast('Failed to upload files. Please try again.', 'error');

                const progressBar = document.getElementById('progress');
                progressBar.style.width = '0%';
                progressBar.textContent = '';

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                }
            });
        } else {
            dataToSend = JSON.stringify(configData);
            xhr.send(dataToSend);
        }
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
                showToast('Interplanetary Player data updated successfully!', 'success');

                // Reload the player data and switch to view mode
                loadInterplanetaryPlayersDetails(playerId);
                setFormMode('view');
            }
        })
        .catch(error => {
            console.error('Failed to update artistic name:', error);
            showToast('Failed to update exoplanet artistic name. Please try again.', 'error');
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
                    showToast('Failed to load player details. Please try again.', 'error');
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

                //showToast('Player details loaded successfully!', 'success');
            })
            .catch(error => {
                console.error('Error loading interplanetary player details:', error);
                showToast('Error loading player details. Please try again.', 'error');
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
        
        // **Populate Interplanetary Player Owner Details**
        populatePlayerOwnerDetails(playerData.ownerDetails);
    }

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
        } else {
            playerOwnerList.innerHTML = '<li>No owner details available.</li>';
        }
    }

    // Function to populate the form with data in edit mode
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
        }
    }

    // Function to toggle between Edit and View modes
    function toggleEditMode() {
        if (currentMode === 'view') {
            // Switch to Edit Mode
            setFormMode('edit');
        } else if (currentMode === 'edit') {
            // Switch to View Mode and reload data to discard changes
            setFormMode('view');
            loadInterplanetaryPlayersDetails(playerId);
        }
    }

    // Handle different form modes (view, edit, create)
    // Function to set the current mode (View or Edit)
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
                editButton.style.display = isOwner ? 'block' : 'none';
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

    // Function to enable the form again (used on error)
    function enableForm() {
        document.getElementById('articleForm').querySelectorAll('input, select, textarea, button').forEach(element => {
            element.disabled = false;
        });
    }

    // Function to load Interplanetary Player details from the server
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
                    showToast('Failed to load player details. Please try again.', 'error');
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

              //  showToast('Player details loaded successfully!', 'success');
            })
            .catch(error => {
                console.error('Error loading interplanetary player details:', error);
                showToast('Error loading player details. Please try again.', 'error');
            });
    }
</script>
