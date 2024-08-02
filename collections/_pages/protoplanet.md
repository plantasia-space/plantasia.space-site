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
document.addEventListener('DOMContentLoaded', function() {
    // Fetch exoplanet data
    fetch('http://media.maar.world:3001/metadata/exoplanet/66ab800ea02d327c9e5671e6')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const selectElement = document.getElementById('sciName');
            Object.entries(data).forEach(([key, exoplanet]) => {
                if (exoplanet.artName === "null") {
                    const option = document.createElement('option');
                    option.value = key;  // Use key as the value
                    option.textContent = exoplanet.sciName;
                    selectElement.appendChild(option);
                }
            });
        })
        .catch(error => console.error('Error loading or parsing the JSON data:', error));

    // Fetch sound engine data
    fetch('http://media.maar.world:3001/metadata/sonicEngines.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const selectElement = document.getElementById('soundEngine');
            Object.keys(data).forEach(engineName => {
                const option = document.createElement('option');
                option.value = engineName;
                option.textContent = engineName;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading or parsing the sound engines JSON data:', error));
});

function updateDetails() {
    const ipId = document.getElementById('sciName').value;
    const detailsDiv = document.getElementById('exoplanetDetails');
    
    if (ipId === "") {
        detailsDiv.style.display = 'none';
    } else {
        fetch('http://media.maar.world:3001/metadata/exoplanet/66ab800ea02d327c9e5671e6')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const exoplanet = data[ipId];
                if (exoplanet) {
                    document.getElementById('ipId').textContent = ipId;
                    document.getElementById('ra_decimal').textContent = exoplanet.ra_decimal;
                    document.getElementById('dec_decimal').textContent = exoplanet.dec_decimal;
                    document.getElementById('period').textContent = exoplanet.period;
                    document.getElementById('radius').textContent = exoplanet.radius;
                    document.getElementById('discoveryyear').textContent = exoplanet.discoveryyear;
                    detailsDiv.style.display = 'block';
                }
            })
            .catch(error => console.error('Error processing JSON data:', error));
    }
}

function updateSoundEngineDetails() {
    const selectedEngine = document.getElementById('soundEngine').value;

    if (selectedEngine === "") {
        document.getElementById('xTag').textContent = 'N/A';
        document.getElementById('yTag').textContent = 'N/A';
        document.getElementById('zTag').textContent = 'N/A';
    } else {
        fetch('http://media.maar.world:3001/metadata/sonicEngines.json')
            .then(response => response.json())
            .then(data => {
                const soundEngine = data[selectedEngine];
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
            .catch(error => console.error('Error processing sound engines JSON data:', error));
    }
}

document.getElementById('articleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Build the JSON payload
    const jsonPayload = {
        ipId: document.getElementById('ipId').textContent,
        artName: document.getElementById('artName').value,
        sciName: document.getElementById('sciName').selectedOptions[0].textContent,
        ra_decimal: document.getElementById('ra_decimal').textContent,
        dec_decimal: document.getElementById('dec_decimal').textContent,
        period: document.getElementById('period').textContent,
        radius: document.getElementById('radius').textContent,
        discoveryyear: document.getElementById('discoveryyear').textContent,
        description: document.getElementById('exoplanetDescription').value,
        credits: document.getElementById('credits').value,
        soundEngine: null,
        sonification: [{
            regen1: null,
            regen2: null,
            regen3: null,
            regen4: null,
            regen5: null,
            regen6: null,
            regen7: null,
        }],
        ddd: [{
            dddArtistName: document.getElementById('3dArtistName').value,
            textureURL: document.getElementById('uploadTexture').files[0] ? URL.createObjectURL(document.getElementById('uploadTexture').files[0]) : null,
            objURL: document.getElementById('uploadObj').files[0] ? URL.createObjectURL(document.getElementById('uploadObj').files[0]) : null
        }],
        ipPlayback: [{
            playCount: null,
            playDuration: null,
            recDuration: null,
            xKnob: null,
            yKnob: null,
            zKnob: null,
            regenButton: null,
            playButton: null,
            pauseButton: null
        }],
        ipSocial: [{
            likes: null,
            dislikes: null,
            rating: null,
            shares: null,
            comments: ""
        }]
    };

    const selectedEngine = document.getElementById('soundEngine').value;
    if (selectedEngine !== "") {
        fetch('http://media.maar.world:3001/metadata/sonicEngines.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const soundEngine = data[selectedEngine];
                if (soundEngine) {
                    jsonPayload.soundEngine = soundEngine.engine;
                    jsonPayload.sonification[0].regen1 = soundEngine.regen1 || null;
                    jsonPayload.sonification[0].regen2 = soundEngine.regen2 || null;
                    jsonPayload.sonification[0].regen3 = soundEngine.regen3 || null;
                    jsonPayload.sonification[0].regen4 = soundEngine.regen4 || null;
                    jsonPayload.sonification[0].regen5 = soundEngine.regen5 || null;
                    jsonPayload.sonification[0].regen6 = soundEngine.regen6 || null;
                    jsonPayload.sonification[0].regen7 = soundEngine.regen7 || null;
                }
                logAndSubmitJsonPayload(jsonPayload);
            })
            .catch(error => console.error('Error processing sound engines JSON data:', error));
    } else {
        logAndSubmitJsonPayload(jsonPayload);
    }
});

function logAndSubmitJsonPayload(jsonPayload) {
    // Log the JSON payload
    console.log(JSON.stringify(jsonPayload, null, 2));

    // Define the API endpoint
    const apiEndpoint = "http://media.maar.world:3001/api/config";

    // Submit the JSON payload
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonPayload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Article submitted successfully!');

        // Update the artName in the exoplanet data
        fetch(`http://media.maar.world:3001/metadata/exoplanet/66ab800ea02d327c9e5671e6/${jsonPayload.ipId}/artName`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ artName: jsonPayload.artName })
        })
        .then(updateResponse => {
            if (!updateResponse.ok) {
                throw new Error('Failed to update exoplanet artName');
            }
            console.log('Exoplanet artName updated successfully');
        })
        .catch(error => console.error('Error updating exoplanet artName:', error));
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to submit article');
    });
}
</script>
