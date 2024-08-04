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
    fetch('http://media.maar.world:3001/api/fetchExoplanetData')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched exoplanet data:', data); // Debugging log

            const selectElement = document.getElementById('sciName');
            // Clear existing options
            selectElement.innerHTML = '<option value="">Please select an exoplanet</option>';

            // Log the data structure to understand it
            console.log('Data structure:', data[0]);

            // Add new options
            for (const key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    const exoplanet = data[0][key];
                    const option = document.createElement('option');
                    option.value = exoplanet.sciName; // Use sciName as value
                    option.textContent = exoplanet.sciName; // Display sciName as text
                    selectElement.appendChild(option);
                }
            }

            console.log('Exoplanet selector options added');
        })
        .catch(error => console.error('Error loading or parsing the JSON data:', error));

    // Fetch sound engine data
    fetch('http://media.maar.world:3001/api/fetchSonicEngineData')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched sound engine data:', data); // Debugging log
            const selectElement = document.getElementById('soundEngine');
            // Clear existing options
            selectElement.innerHTML = '<option value="">Please select a sound engine</option>';

            // Add new options, filtering out the '_id' key
            for (const engineKey in data[0]) {
                if (data[0].hasOwnProperty(engineKey) && engineKey !== '_id') {
                    const option = document.createElement('option');
                    option.value = engineKey; // Use the key as value
                    option.textContent = engineKey; // Display engine name as text
                    selectElement.appendChild(option);
                }
            }

            console.log('Sound engine selector options added');
        })
        .catch(error => console.error('Error loading or parsing the sound engines JSON data:', error));
});

function updateDetails() {
    const ipId = document.getElementById('sciName').value;
    const detailsDiv = document.getElementById('exoplanetDetails');

    if (ipId === "") {
        detailsDiv.style.display = 'none';
    } else {
        fetch('http://media.maar.world:3001/api/fetchExoplanetData')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched exoplanet details:', data); // Debugging log

                // Handle nested data structure
                const exoplanets = data[0]; // Assuming data[0] contains the array of exoplanets

                // Find the exoplanet object with the matching sciName
                let exoplanet;
                for (const key in exoplanets) {
                    if (exoplanets[key].sciName === ipId) {
                        exoplanet = exoplanets[key];
                        break;
                    }
                }

                if (exoplanet) {
                    document.getElementById('ipId').textContent = exoplanet.sciName;
                    document.getElementById('ra_decimal').textContent = exoplanet.ra_decimal;
                    document.getElementById('dec_decimal').textContent = exoplanet.dec_decimal;
                    document.getElementById('period').textContent = exoplanet.period || 'N/A';
                    document.getElementById('radius').textContent = exoplanet.radius;
                    document.getElementById('discoveryyear').textContent = exoplanet.discoveryyear || 'N/A';
                    detailsDiv.style.display = 'block';
                } else {
                    console.log('No exoplanet found with the given ID');
                    detailsDiv.style.display = 'none';
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
        fetch('http://media.maar.world:3001/api/fetchSonicEngineData')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
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

    const formData = new FormData();
    formData.append('ipId', document.getElementById('ipId').textContent);
    formData.append('artName', document.getElementById('artName').value);
    formData.append('sciName', document.getElementById('sciName').selectedOptions[0].textContent);
    formData.append('ra_decimal', document.getElementById('ra_decimal').textContent);
    formData.append('dec_decimal', document.getElementById('dec_decimal').textContent);
    formData.append('period', document.getElementById('period').textContent);
    formData.append('radius', document.getElementById('radius').textContent);
    formData.append('discoveryyear', document.getElementById('discoveryyear').textContent);
    formData.append('description', document.getElementById('exoplanetDescription').value);
    formData.append('credits', document.getElementById('credits').value);
    formData.append('soundEngine', document.getElementById('soundEngine').value);
    formData.append('uploadObj', document.getElementById('uploadObj').files[0]);
    formData.append('uploadTexture', document.getElementById('uploadTexture').files[0]);
    formData.append('3dArtistName', document.getElementById('3dArtistName').value);

    fetch('http://media.maar.world:3001/api/configIntPlayer', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Article submitted successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to submit article');
    });
});
</script>
