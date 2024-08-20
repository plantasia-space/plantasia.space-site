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
    <h3>Create a new Interplanetary Player</h3>
    <p>Fill the form with details about the exoplanet and your artistic representation.</p>

    <form id="articleForm" class="contact-form">
        <label for="sciName">Scientific Exoplanet Name:</label>
        <select id="sciName" name="sciName" required onchange="updateDetails()">
            <option value="">Please select an exoplanet</option>
        </select><br><br>

        <div id="exoplanetDetails" style="display:none;">
            <p><strong>IP ID:</strong> <span id="ipId"></span></p> 
            <p><strong>Right Ascension (Decimal):</strong> <span id="ra_decimal"></span></p>
            <p><strong>Declination (Decimal):</strong> <span id="dec_decimal"></span></p>
            <p><strong>Orbital Period [days]:</strong> <span id="period"></span></p>
            <p><strong>Radius [R earth]:</strong> <span id="radius"></span></p>
            <p><strong>Discovery Year:</strong> <span id="discoveryyear"></span></p>
            <p style="display: none;"><strong>Position URL:</strong> <a id="posURL" href="#" target="_blank">View Location</a></p>
        </div>

        <label for="soundEngine">Select a Sonic Engine:</label>
        <select id="soundEngine" name="soundEngine" required onchange="updateSoundEngineDetails()">
            <option value="">Please select a sound engine</option>
        </select>
        <div id="soundEngineDetails">
            <p><strong>X Tag:</strong> <span id="xTag"></span></p>
            <p><strong>Y Tag:</strong> <span id="yTag"></span></p>
            <p><strong>Z Tag:</strong> <span id="zTag"></span></p>
        </div><br>

        <!-- Add regenState toggle button -->
        <label for="regenState">Regen State:</label>
        <input type="checkbox" id="regenState" name="regenState" onchange="updateRegenState()"><br><br>

        <label for="artName">Choose an Artistic Exoplanet Name:</label>
        <input type="text" id="artName" name="artName" required><br><br>

        <label for="uploadObj">Upload 3D Model (OBJ):</label>
        <input type="file" id="uploadObj" name="uploadObj" accept=".obj" required><br><br>

        <label for="uploadTexture">Upload Texture:</label>
        <input type="file" id="uploadTexture" name="uploadTexture" accept="image/*" required><br><br>

        <label for="3dArtistName">3D Artist Name:</label>
        <input type="text" id="3dArtistName" name="3dArtistName" required><br><br>

        <label for="exoplanetDescription">Describe topology, life, and or story of the exoplanet in 500 characters:</label>
        <textarea id="exoplanetDescription" name="exoplanetDescription" required rows="4" maxlength="500" style="width: 100%;"></textarea><br><br>

        <label for="credits">Credits:</label>
        <input type="text" id="credits" name="credits" required><br><br>

        <button type="submit">Next</button>
    </form>
</div>

<script>
let exoplanetData = {};

document.addEventListener('DOMContentLoaded', function() {
    // Fetch exoplanet data
    fetch('http://media.maar.world:3001/api/fetchExoplanetData')
        .then(response => response.json())
        .then(data => {
            exoplanetData = data[0];
            const selectElement = document.getElementById('sciName');
            selectElement.innerHTML = '<option value="">Please select an exoplanet</option>';
            for (const key in exoplanetData) {
                if (exoplanetData.hasOwnProperty(key)) {
                    const exoplanet = exoplanetData[key];
                    const option = document.createElement('option');
                    option.value = key; // Use key as value to reference the ID
                    option.textContent = exoplanet.sciName;
                    selectElement.appendChild(option);
                }
            }
        })
        .catch(error => console.error('Error loading or parsing the JSON data:', error));

    // Fetch sound engine data
    fetch('http://media.maar.world:3001/api/fetchSonicEngineData')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('soundEngine');
            selectElement.innerHTML = '<option value="">Please select a sound engine</option>';
            for (const engineKey in data[0]) {
                if (data[0].hasOwnProperty(engineKey) && engineKey !== '_id') {
                    const option = document.createElement('option');
                    option.value = engineKey;
                    option.textContent = engineKey;
                    selectElement.appendChild(option);
                }
            }
        })
        .catch(error => console.error('Error loading or parsing the sound engines JSON data:', error));
});

function updateRegenState() {
    const regenState = document.getElementById('regenState').checked ? true : false;
    console.log('Regen State:', regenState);
}

function updateDetails() {
    const ipId = document.getElementById('sciName').value;
    const detailsDiv = document.getElementById('exoplanetDetails');
    const exoplanet = exoplanetData[ipId]; // Access the exoplanetData in the global scope

    if (!ipId || !exoplanet) {
        detailsDiv.style.display = 'none';
    } else {
        console.log('Updating details for ipId:', ipId); // Debugging
        console.log('Exoplanet data:', exoplanet); // Debugging
        document.getElementById('ipId').textContent = ipId; // Set the ipId to be the key
        document.getElementById('ra_decimal').textContent = exoplanet.ra_decimal;
        document.getElementById('dec_decimal').textContent = exoplanet.dec_decimal;
        document.getElementById('period').textContent = exoplanet.period || 'N/A';
        document.getElementById('radius').textContent = exoplanet.radius;
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
        fetch('http://media.maar.world:3001/api/fetchSonicEngineData')
            .then(response => response.json())
            .then(data => {
                const soundEngine = data[0][selectedEngine];
                if (soundEngine) {
                    document.getElementById('xTag').textContent = soundEngine.xTag || 'N/A';
                    document.getElementById('yTag').textContent = soundEngine.yTag || 'N/A';
                    document.getElementById('zTag').textContent = soundEngine.zTag || 'N/A';
                } else {
                    document.getElementById('xTag').textContent = 'N/A';
                    document.getElementById('yTag').textContent = 'N/A';
                    document.getElementById('zTag').textContent = 'N/A';
                }
            })
            .catch(error => console.error('Error fetching sound engine details:', error));
    }
}

document.getElementById('articleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate required fields
    const requiredFields = ['artName', 'sciName', 'exoplanetDescription', 'credits', 'soundEngine', '3dArtistName'];
    for (let field of requiredFields) {
        const element = document.getElementById(field);
        if (!element.value) {
            alert(`Please fill out the ${field} field.`);
            return;
        }
    }

    // Upload files first
    const fileFormData = new FormData();
    fileFormData.append('ipId', document.getElementById('ipId').textContent);
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
            ipId: document.getElementById('ipId').textContent, // Ensure ipId is a string
            artName: document.getElementById('artName').value,
            sciName: document.getElementById('sciName').selectedOptions[0].textContent,
            ra_decimal: parseFloat(document.getElementById('ra_decimal').textContent),
            dec_decimal: parseFloat(document.getElementById('dec_decimal').textContent),
            period: parseFloat(document.getElementById('period').textContent),
            radius: parseFloat(document.getElementById('radius').textContent),
            discoveryyear: parseInt(document.getElementById('discoveryyear').textContent, 10),
            description: document.getElementById('exoplanetDescription').value,
            credits: document.getElementById('credits').value,
            soundEngine: document.getElementById('soundEngine').value,
            sonification: {
                regenState: document.getElementById('regenState').checked ? true : false,
                regen1: 'data/sonification_1.min.json',  
                regen2: 'data/sonification_2.min.json',  
                regen3: 'data/sonification_3.min.json',  
                regen4: 'data/sonification_4.min.json',  
                regen5: 'data/sonification_5.min.json',  
                regen6: 'data/sonification_6.min.json',  
                regen7: 'data/sonification_7.min.json'   
            },
            ddd: {
                dddArtistName: document.getElementById('3dArtistName').value,
                textureURL: fileData.uploadTextureURL,
                objURL: fileData.uploadObjURL
            }
        };

        console.log('JSON data being sent:', JSON.stringify(configData));

        fetch('http://media.maar.world:3001/api/configIntPlayer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(configData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit configuration');
            }
            return response.json();
        })
        .then(data => {
            console.log('Configuration submitted:', data);
            updateExoplanetArtName(configData.ipId, configData.artName);
        })
        .catch((error) => {
            console.error('Failed to submit configuration:', error);
            alert('Failed to submit configuration');
        });
    })
    .catch((error) => {
        console.error('Failed to upload files:', error);
        alert('Failed to upload files');
    });
});

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
            alert('Exoplanet artistic name updated successfully!');
        }
    })
    .catch(error => {
        console.error('Failed to update artistic name:', error);
        alert('Failed to update exoplanet artistic name.');
    });
}

// Optional: Function to be called when artName input loses focus
function updateArtisticName() {
    const ipId = document.getElementById('ipId').textContent;
    const artName = document.getElementById('artName').value;
    updateExoplanetArtName(ipId, artName);
}

// Ensure `ra_decimal` and other fields are properly set in `updateDetails`
function updateDetails() {
    const ipId = document.getElementById('sciName').value;
    const detailsDiv = document.getElementById('exoplanetDetails');
    const exoplanet = exoplanetData[ipId]; // Access the exoplanetData in the global scope

    if (!ipId || !exoplanet) {
        detailsDiv.style.display = 'none';
    } else {
        console.log('Updating details for ipId:', ipId); // Debugging
        console.log('Exoplanet data:', exoplanet); // Debugging
        document.getElementById('ipId').textContent = ipId; // Set the ipId to be the key
        document.getElementById('ra_decimal').textContent = exoplanet.ra_decimal;
        document.getElementById('dec_decimal').textContent = exoplanet.dec_decimal;
        document.getElementById('period').textContent = exoplanet.period || 'N/A';
        document.getElementById('radius').textContent = exoplanet.radius;
        document.getElementById('discoveryyear').textContent = exoplanet.discoveryyear || 'N/A';
        detailsDiv.style.display = 'block';
    }
}
</script>
