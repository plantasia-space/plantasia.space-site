---
layout: articles
show_title: false
show_date: false
permalink: /proto
titles:
  # @start locale config
  en      : &EN       Protoplanets
  en-GB   : *EN
  en-US   : *EN
  en-CA   : *EN
  en-AU   : *EN
  # @end locale config
key: IP

---
<div class="p-5"></div>
<div class="p-5"></div>
<div class="p-5"></div>

<div class="form-container">
    <h3>Create a New Interplanetary Player</h3>
    <p>Please fill out the form with details about the exoplanet and your artistic representation.</p>

    <form id="articleForm" class="contact-form">
        <!-- Scientific Exoplanet Name -->
        <label for="sciName">Which scientific exoplanet are you representing?</label>
        <select id="sciName" name="sciName" required onchange="updateDetails()">
            <option value="">Please select an exoplanet</option>
        </select><br><br>

        <!-- Exoplanet Details -->
        <div id="exoplanetDetails" style="display:none;">
            <p><strong>IP ID:</strong> <span id="ipId"></span></p> 
            <p><strong>Right Ascension (Decimal):</strong> <span id="ra_decimal"></span></p>
            <p><strong>Declination (Decimal):</strong> <span id="dec_decimal"></span></p>
            <p><strong>Orbital Period [days]:</strong> <span id="period"></span></p>
            <p><strong>Radius [R earth]:</strong> <span id="radius"></span></p>
            <p><strong>Discovery Year:</strong> <span id="discoveryyear"></span></p>
            <p style="display: none;"><strong>Position URL:</strong> <a id="posURL" href="#" target="_blank">View Location</a></p>
        </div><br><br>

        <!-- Sonic Engine Selection -->
        <label for="soundEngine">Which sonic engine would you like to use as the default for your Interplanetary Player?</label>
        <select id="soundEngine" name="soundEngine" required onchange="updateSoundEngineDetails()">
            <option value="">Please select a sound engine</option>
        </select><br><br>

        <div id="soundEngineDetails">
            <p><strong>X Tag:</strong> <span id="xTag"></span></p>
            <p><strong>Y Tag:</strong> <span id="yTag"></span></p>
            <p><strong>Z Tag:</strong> <span id="zTag"></span></p>
        </div><br>

        <!-- Regen State -->
        <label for="regenState">Would you like to enable the Regen State?</label>
        <input type="checkbox" id="regenState" name="regenState"><br><br>

        <!-- Artistic Exoplanet Name -->
        <label for="artName">What artistic name would you like to give this Interplanetary Player?</label>
        <input type="text" id="artName" name="artName" required><br><br>

        <!-- 3D Model Upload -->
        <label for="uploadObj">Please upload the 3D model (OBJ format):</label>
        <input type="file" id="uploadObj" name="uploadObj" accept=".obj" required><br><br>

        <!-- Texture Upload -->
        <label for="uploadTexture">Please upload the texture file (any image format):</label>
        <input type="file" id="uploadTexture" name="uploadTexture" accept="image/*" required><br><br>

        <!-- 3D Artist Name -->
        <label for="dddArtistName">Who is the 3D artist for this creation?</label>
        <input type="text" id="dddArtistName" name="dddArtistName" required><br><br>

        <!-- Gender Identity -->
        <label for="genderIdentity">How do they identify?</label>
        <select id="genderIdentity" name="genderIdentity" required>
            <option value="Prefer not to reply">Prefer not to reply</option>
            <option value="Woman">Woman</option>
            <option value="Man">Man</option>
            <option value="Trans woman">Trans woman</option>
            <option value="Trans man">Trans man</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Not Listed">Not Listed</option>
        </select><br><br>

        <input type="text" id="customGenderIdentity" name="customGenderIdentity" placeholder="Please specify" style="display: none;"><br><br>

        <!-- Exoplanet Description -->
        <label for="exoplanetDescription">Can you describe the topology, life, or story of this exoplanet in 500 characters?</label>
        <textarea id="exoplanetDescription" name="exoplanetDescription" required rows="4" maxlength="500" style="width: 100%;"></textarea><br><br>

        <!-- Credits -->
        <label for="credits">Who should be credited for this work?</label>
        <input type="text" id="credits" name="credits" required><br><br>

        <!-- Submit Button -->
        <button type="submit">Next</button>

        <!-- Progress Bar -->
        <div class="progress-bar">
            <div id="progress"></div>
        </div><br>

        <!-- Status Messages -->
        <div id="statusMessage" class="status-message" style="display: none;"></div>
    </form>
</div>

<script>

    let exoplanetData = {};

document.addEventListener('DOMContentLoaded', function() {
    // Fetch exoplanet data
    fetch('http://media.maar.world:3001/api/fetchExoplanetData')
        .then(response => response.json())
        .then(data => {
            console.log('Exoplanet data:', data);

            exoplanetData = data[0]; // Access the correct object inside the array
            populateExoplanetDropdown();
        })
        .catch(error => console.error('Error loading or parsing the exoplanet data:', error));

    // Fetch sound engine data
    fetch('http://media.maar.world:3001/api/fetchSonicEngineData')
        .then(response => response.json())
        .then(data => {
            console.log('Sonic Engine data:', data);

            soundEngineData = data[0]; // Adjust based on actual API response structure
            populateSoundEngineDropdown();
        })
        .catch(error => console.error('Error loading or parsing the sound engine data:', error));

    setupFormListeners();
    loadFormData();
});

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

            // Append the option to the select element
            selectElement.appendChild(option);
        }
    });
}
function populateSoundEngineDropdown() {
    const selectElement = document.getElementById('soundEngine');
    selectElement.innerHTML = '<option value="">Please select a sound engine</option>';

    Object.keys(soundEngineData).forEach(engineKey => {
        if (engineKey !== '_id') { // Ensure '_id' is not a key to skip
            const option = document.createElement('option');
            option.value = engineKey;
            option.textContent = engineKey; // Ensure this is what you want to display
            selectElement.appendChild(option);
        }
    });
}

function setupFormListeners() {
    const formElements = document.querySelectorAll('#articleForm input, #articleForm select, #articleForm textarea');
    formElements.forEach(element => {
        element.addEventListener('input', saveFormData);
    });

    document.getElementById('genderIdentity').addEventListener('change', function() {
        const customInput = document.getElementById('customGenderIdentity');
        customInput.style.display = this.value === 'Not Listed' ? 'inline-block' : 'none';
    });

    document.getElementById('articleForm').addEventListener('submit', function(event) {
        event.preventDefault();
        submitForm();
    });

    document.getElementById('sciName').addEventListener('change', updateDetails);
    document.getElementById('soundEngine').addEventListener('change', updateSoundEngineDetails);
}

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

function updateSoundEngineDetails() {
    const selectedEngine = document.getElementById('soundEngine').value;

    if (selectedEngine === "") {
        document.getElementById('xTag').textContent = 'N/A';
        document.getElementById('yTag').textContent = 'N/A';
        document.getElementById('zTag').textContent = 'N/A';
    } else {
        const soundEngine = soundEngineData[selectedEngine];
        if (soundEngine) {
            document.getElementById('xTag').textContent = soundEngine.xTag || 'N/A';
            document.getElementById('yTag').textContent = soundEngine.yTag || 'N/A';
            document.getElementById('zTag').textContent = soundEngine.zTag || 'N/A';
        } else {
            document.getElementById('xTag').textContent = 'N/A';
            document.getElementById('yTag').textContent = 'N/A';
            document.getElementById('zTag').textContent = 'N/A';
        }
    }
}

function saveFormData() {
    const formData = {
        sciName: document.getElementById('sciName').value,
        soundEngine: document.getElementById('soundEngine').value,
        regenState: document.getElementById('regenState').checked,
        artName: document.getElementById('artName').value,
        dddArtistName: document.getElementById('dddArtistName').value,
        genderIdentity: document.getElementById('genderIdentity').value,
        customGenderIdentity: document.getElementById('customGenderIdentity').value,
        exoplanetDescription: document.getElementById('exoplanetDescription').value,
        credits: document.getElementById('credits').value
    };
    localStorage.setItem('protoFormData', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('protoFormData'));
    if (savedData) {
        document.getElementById('sciName').value = savedData.sciName;
        document.getElementById('soundEngine').value = savedData.soundEngine;
        document.getElementById('regenState').checked = savedData.regenState;
        document.getElementById('artName').value = savedData.artName;
        document.getElementById('dddArtistName').value = savedData.dddArtistName;
        document.getElementById('genderIdentity').value = savedData.genderIdentity;
        document.getElementById('customGenderIdentity').value = savedData.customGenderIdentity;
        document.getElementById('exoplanetDescription').value = savedData.exoplanetDescription;
        document.getElementById('credits').value = savedData.credits;

        // Show custom gender identity field if "Not Listed" was selected
        if (savedData.genderIdentity === 'Not Listed') {
            document.getElementById('customGenderIdentity').style.display = 'inline-block';
        }
    }
}
function submitForm() {
    // Validate required fields
    const requiredFields = ['artName', 'sciName', 'exoplanetDescription', 'credits', 'soundEngine', 'dddArtistName'];
    for (let field of requiredFields) {
        const element = document.getElementById(field);
        if (!element.value) {
            alert(`Please fill out the ${field} field.`);
            return;
        }
    }

    // Ensure ipId is correctly filled before submission
    const ipId = document.getElementById('ipId').textContent;
    if (ipId === 'N/A' || !ipId) {
        alert('Invalid IP ID. Please ensure you have selected a valid exoplanet.');
        return;
    }

    // Disable the form to prevent further editing
    document.getElementById('articleForm').querySelectorAll('input, select, textarea, button').forEach(element => {
        element.disabled = true;
    });

    // Show the progress bar
    const progressBar = document.getElementById('progress');
    const statusMessage = document.getElementById('statusMessage');
    progressBar.style.width = '0%';
    statusMessage.style.display = 'none';
    statusMessage.classList.remove('error');

    // Upload files first
    const fileFormData = new FormData();
    fileFormData.append('ipId', ipId);
    fileFormData.append('uploadObj', document.getElementById('uploadObj').files[0]);
    fileFormData.append('uploadTexture', document.getElementById('uploadTexture').files[0]);

    fetch('http://media.maar.world:3001/api/uploadModelFiles', {
        method: 'POST',
        body: fileFormData
    })
    .then(response => response.json())
    .then(fileData => {
        console.log('Files uploaded successfully:', fileData);

        // Now submit the rest of the form data
        const configData = {
            ipId,
            artName: document.getElementById('artName').value,
            sciName: document.getElementById('sciName').selectedOptions[0].textContent.split(': ')[1], // Extract sciName
            ra_decimal: parseFloat(document.getElementById('ra_decimal').textContent),
            dec_decimal: parseFloat(document.getElementById('dec_decimal').textContent),
            period: parseFloat(document.getElementById('period').textContent),
            radius: parseFloat(document.getElementById('radius').textContent),
            discoveryyear: parseInt(document.getElementById('discoveryyear').textContent, 10),
            description: document.getElementById('exoplanetDescription').value,
            credits: document.getElementById('credits').value,
            soundEngine: document.getElementById('soundEngine').value,
            sonification: {
                regenState: document.getElementById('regenState').checked,
                regen1: 'data/sonification_1.min.json',  
                regen2: 'data/sonification_2.min.json',  
                regen3: 'data/sonification_3.min.json',  
                regen4: 'data/sonification_4.min.json',  
                regen5: 'data/sonification_5.min.json',  
                regen6: 'data/sonification_6.min.json',  
                regen7: 'data/sonification_7.min.json'   
            },
            ddd: {
                dddArtistName: document.getElementById('dddArtistName').value,
                textureURL: fileData.uploadTextureURL,
                objURL: fileData.uploadObjURL
            }
        };

        console.log('JSON data being sent:', JSON.stringify(configData));

        // Simulate a progress bar fill-up
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            progressBar.style.width = progress + '%';
            if (progress >= 100) clearInterval(progressInterval);
        }, 100);

        // Use the correct endpoint to submit the configuration
        fetch('http://media.maar.world:3001/api/configIntPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(configData)
        })
        .then(response => {
            clearInterval(progressInterval); // Ensure the progress bar is full
            progressBar.style.width = '100%';
            if (!response.ok) {
                throw new Error('Failed to submit configuration');
            }
            return response.json();
        })
        .then(data => {
            console.log('Configuration submitted:', data);
            updateExoplanetArtName(configData.ipId, configData.artName);
        })
        .catch(error => {
            console.error('Failed to submit configuration:', error);
            statusMessage.textContent = 'Failed to submit configuration. Please try again.';
            statusMessage.classList.add('error');
            statusMessage.style.display = 'block';
            enableForm();
        });
    })
    .catch(error => {
        console.error('Failed to upload files:', error);
        statusMessage.textContent = 'Failed to upload files. Please try again.';
        statusMessage.classList.add('error');
        statusMessage.style.display = 'block';
        enableForm();
    });

    // Clear localStorage upon successful submission
    localStorage.removeItem('protoFormData');
}

// Function to update artistic name
function updateExoplanetArtName(ipId, artName) {
    console.log('Updating exoplanet artistic name for ipId:', ipId, 'artName:', artName);
    fetch('http://media.maar.world:3001/api/updateExoplanet', {
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


</script>
