---
layout: articles
show_title: false
show_date: false
permalink: /voyage/soundEngine
titles:
  en: &EN Create Sound Engine
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
---
<!-- Sound Engine Form Container -->
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

    <h3 id="formTitle">Create a Sound Engine</h3>
    <p>Create a new Sound Engine with custom parameters for audio manipulation.</p>
    <div class="p-2"></div>

    <!-- View Mode -->
    <div id="soundEngineView">
        <p><strong>Developer Username:</strong> <span id="displayDeveloperUsername"></span></p>
        <p><strong>Sound Engine Name:</strong> <span id="displaySoundEngineName"></span></p>
        <p><strong>Color 1:</strong> <span id="displayColor1"></span></p>
        <p><strong>Color 2:</strong> <span id="displayColor2"></span></p>
        <p><strong>Sonification Button:</strong> <span id="displaySonificationButton"></span></p>
        <p><strong>Credits:</strong> <span id="displayCredits"></span></p>
    </div>

    <!-- Edit/Create Mode -->
    <form id="soundEngineForm" class="contact-form" style="display: none;" enctype="multipart/form-data">
        <label for="developerUsername">Developer Username<span style="color: red;">*</span>:</label>
        <input type="text" id="developerUsername" name="developerUsername" required><br><br>

        <label for="soundEngineName">Sound Engine Name<span style="color: red;">*</span>:</label>
        <input type="text" id="soundEngineName" name="soundEngineName" required><br><br>

        <!-- Sound Engine Image Upload -->
        <label for="soundEngineImage">Upload Sound Engine Image<span style="color: red;">*</span>:</label>
        <input type="file" id="soundEngineImage" name="soundEngineImage" accept=".jpg, .jpeg, .png" required><br><br>

        <!-- Sound Engine JSON Upload -->
        <label for="soundEngineFile">Upload Sound Engine JSON File<span style="color: red;">*</span>:</label>
        <input type="file" id="soundEngineFile" name="soundEngineFile" accept=".json" required><br><br>

        <!-- Color 1 Picker -->
        <label for="color1">Color 1 (RGBA)<span style="color: red;">*</span>:</label>
        <input type="color" id="color1Picker" name="color1Picker" value="#ffff00" required>
        <input type="range" id="alpha1Picker" name="alpha1Picker" min="0" max="1" step="0.01" value="1" required>
        <label for="alpha1Picker">Alpha 1: <span id="alpha1Value">1</span></label>
        <input type="hidden" id="color1" name="color1"><br><br>

        <!-- Color 2 Picker -->
        <label for="color2">Color 2 (RGBA)<span style="color: red;">*</span>:</label>
        <input type="color" id="color2Picker" name="color2Picker" value="#333333" required>
        <input type="range" id="alpha2Picker" name="alpha2Picker" min="0" max="1" step="0.01" value="1" required>
        <label for="alpha2Picker">Alpha 2: <span id="alpha2Value">1</span></label>
        <input type="hidden" id="color2" name="color2"><br><br>


<!-- X Parameter (Speed) -->
<div style="margin-right: 20px;">
    <div style="flex: 2;">
        <label for="xParamLabel">X Parameter Label<span style="color: red;">*</span>:</label>
        <input type="text" id="xParamLabel" name="xParamLabel" value="Speed" required>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-right: 15px;">
        <div style="flex: 1; margin-left: 0px;">
            <label for="xParamMin">Min:</label>
            <input type="number" id="xParamMin" name="xParamMin" value="-100" style="color: black;" required>
        </div>
        <div style="flex: 1; margin-left: 0px;">
            <label for="xParamMax">Max:</label>
            <input type="number" id="xParamMax" name="xParamMax" value="100" style="color: black;" required>
        </div>
        <div style="flex: 1; margin-left: 0px;">
            <label for="xParamInit">Initial:</label>
            <input type="number" id="xParamInit" name="xParamInit" value="1" style="color: black;" required>
        </div>
    </div>
</div><br><br>

<!-- Y Parameter (Tremolo) -->
<div style="margin-right: 20px;">
    <div style="flex: 2;">
        <label for="yParamLabel">Y Parameter Label<span style="color: red;">*</span>:</label>
        <input type="text" id="yParamLabel" name="yParamLabel" value="Tremolo" required>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-right: 15px;">
        <div style="flex: 1; margin-left: 0px;">
            <label for="yParamMin">Min:</label>
            <input type="number" id="yParamMin" name="yParamMin" value="-100" style="color: black;" required>
        </div>
        <div style="flex: 1; margin-left: 0px;">
            <label for="yParamMax">Max:</label>
            <input type="number" id="yParamMax" name="yParamMax" value="100" style="color: black;" required>
        </div>
        <div style="flex: 1; margin-left: 0px;">
            <label for="yParamInit">Initial:</label>
            <input type="number" id="yParamInit" name="yParamInit" value="0" style="color: black;" required>
        </div>
    </div>
</div><br><br>

<!-- Z Parameter (SpaceReverb) -->
<div style="margin-right: 20px;">
    <div style="flex: 2;">
        <label for="zParamLabel">Z Parameter Label<span style="color: red;">*</span>:</label>
        <input type="text" id="zParamLabel" name="zParamLabel" value="SpaceReverb" required>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-right: 15px;">
        <div style="flex: 1; margin-left: 0px;">
            <label for="zParamMin">Min:</label>
            <input type="number" id="zParamMin" name="zParamMin" value="-100" style="color: black;" required>
        </div>
        <div style="flex: 1; margin-left: 0px;">
            <label for="zParamMax">Max:</label>
            <input type="number" id="zParamMax" name="zParamMax" value="100" style="color: black;" required>
        </div>
        <div style="flex: 1; margin-left: 0px;">
            <label for="zParamInit">Initial:</label>
            <input type="number" id="zParamInit" name="zParamInit" value="0" style="color: black;" required>
        </div>
    </div>
</div><br><br>

        <label for="sonificationButton">Sonification Button:</label>
        <select id="sonificationButton" name="sonificationButton" required>
            <option value="false">Disabled</option>
            <option value="true">Enabled</option>
        </select><br><br>

        <label for="credits">Credits:</label>
        <textarea id="credits" name="credits" rows="3" maxlength="500"></textarea><br><br>

        <button type="submit">Save Sound Engine</button>
        <div class="p-2"></div>

        <button type="button" id="cancelButton" class="btn button--outline-primary button--circle">Cancel</button>
        <div class="p-2"></div>
    </form>
</div>

<!-- Toast Container for Notifications -->
<div id="toastContainer" style="position: fixed; top: 20px; right: 20px; z-index: 1000;"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId'); 
    if (!userId) {
        document.getElementById('messageDisplay').innerText = 'No logged-in user found. Please log in first.';
        document.getElementById('messageDisplay').style.color = 'red';
        window.location.href = '/login';
        return;
    }

    let isEditMode = false;
    let currentSoundEngineId = null;
    let isOwner = false;

    const formTitle = document.getElementById('formTitle');
    const soundEngineView = document.getElementById('soundEngineView');
    const soundEngineForm = document.getElementById('soundEngineForm');
    const editButton = document.getElementById('editButton');
    const backButton = document.getElementById('backButton');
    const cancelButton = document.getElementById('cancelButton');

    const color1Picker = document.getElementById('color1Picker');
    const color2Picker = document.getElementById('color2Picker');
    const alpha1Picker = document.getElementById('alpha1Picker');
    const alpha2Picker = document.getElementById('alpha2Picker');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const alpha1Value = document.getElementById('alpha1Value');
    const alpha2Value = document.getElementById('alpha2Value');

    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    currentSoundEngineId = urlParams.get('id');

    // Function to convert Hex to RGBA
    function hexToRgba(hex, alpha = 1) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        }
        return `rgba(${r},${g},${b},${alpha})`;
    }

    // Update RGBA value based on color picker and alpha
    color1Picker.addEventListener('change', function() {
        color1Input.value = hexToRgba(color1Picker.value, alpha1Picker.value);
    });
    alpha1Picker.addEventListener('input', function() {
        alpha1Value.innerText = alpha1Picker.value;
        color1Input.value = hexToRgba(color1Picker.value, alpha1Picker.value);
    });

    color2Picker.addEventListener('change', function() {
        color2Input.value = hexToRgba(color2Picker.value, alpha2Picker.value);
    });
    alpha2Picker.addEventListener('input', function() {
        alpha2Value.innerText = alpha2Picker.value;
        color2Input.value = hexToRgba(color2Picker.value, alpha2Picker.value);
    });

    // Populate initial RGBA values
    color1Input.value = hexToRgba(color1Picker.value, alpha1Picker.value);
    color2Input.value = hexToRgba(color2Picker.value, alpha2Picker.value);

    if (mode === 'edit' && currentSoundEngineId) {
        isEditMode = true;
        formTitle.innerText = 'Edit Sound Engine';
        loadSoundEngineDetails(currentSoundEngineId);
    } else if (mode === 'soundEngine' && currentSoundEngineId) {
        formTitle.innerText = 'Sound Engine Details';
        loadSoundEngineDetails(currentSoundEngineId);
    } else {
        formTitle.innerText = 'Create a Sound Engine';
        toggleViewMode(true);
    }

    editButton.addEventListener('click', function() {
        toggleViewMode(true);
    });

    cancelButton.addEventListener('click', function() {
        if (isEditMode) {
            loadSoundEngineDetails(currentSoundEngineId);
            toggleViewMode(false);
        } else {
            soundEngineForm.reset();
            toggleViewMode(false);
        }
    });

    backButton.addEventListener('click', function() {
        window.location.href = '/voyage';
    });

    soundEngineForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const developerUsername = document.getElementById('developerUsername').value.trim();
        const soundEngineName = document.getElementById('soundEngineName').value.trim();
        const color1 = color1Input.value.trim();
        const color2 = color2Input.value.trim();
        const sonificationButton = document.getElementById('sonificationButton').value;
        const credits = document.getElementById('credits').value.trim();

        if (!developerUsername || !soundEngineName || !color1 || !color2 || !sonificationButton) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('ownerId', userId);
        formData.append('developerUsername', developerUsername);
        formData.append('soundEngineName', soundEngineName);
        formData.append('color1', color1);
        formData.append('color2', color2);
        formData.append('xParam', JSON.stringify({label: 'Speed', min: -100, max: 100, initValue: 1}));
        formData.append('yParam', JSON.stringify({label: 'Tremolo', min: -100, max: 100, initValue: 0}));
        formData.append('zParam', JSON.stringify({label: 'SpaceReverb', min: -100, max: 100, initValue: 0}));
        formData.append('sonificationButton', sonificationButton);
        formData.append('credits', credits);

        let apiEndpoint = 'http://media.maar.world:3001/api/soundEngines';
        let method = 'POST';
        if (isEditMode && currentSoundEngineId) {
            apiEndpoint += `/${currentSoundEngineId}`;
            method = 'PUT';
        }

        const xhr = new XMLHttpRequest();
        xhr.open(method, apiEndpoint, true);
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 201) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    showToast(response.message || (isEditMode ? 'Sound Engine updated successfully!' : 'Sound Engine created successfully!'), 'success');
                    if (isEditMode) {
                        loadSoundEngineDetails(currentSoundEngineId);
                        toggleViewMode(false);
                    } else {
                        window.location.href = `/voyage/soundEngine?mode=soundEngine&id=${response.soundEngine._id}`;
                    }
                } else {
                    showToast(response.message || 'Failed to save sound engine.', 'error');
                }
            } else {
                showToast('An error occurred while saving the sound engine.', 'error');
            }
        };
        xhr.send(formData);
    });

    function toggleViewMode(editMode) {
        if (editMode) {
            soundEngineView.style.display = 'none';
            soundEngineForm.style.display = 'block';
        } else {
            soundEngineView.style.display = 'block';
            soundEngineForm.style.display = 'none';
        }
    }

    function loadSoundEngineDetails(soundEngineId) {
        fetch(`http://media.maar.world:3001/api/soundEngines/${soundEngineId}?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.soundEngine) {
                    populateViewMode(data.soundEngine);
                    populateFormMode(data.soundEngine);
                    isOwner = data.canEdit;
                    editButton.style.display = isOwner ? 'block' : 'none';
                } else {
                    showToast(data.message || 'Failed to load sound engine details.', 'error');
                }
            })
            .catch(error => {
                console.error('Error fetching sound engine details:', error);
                showToast('An error occurred while loading sound engine details.', 'error');
            });
    }

    function populateViewMode(soundEngine) {
        document.getElementById('displayDeveloperUsername').innerText = soundEngine.developerUsername;
        document.getElementById('displaySoundEngineName').innerText = soundEngine.soundEngineName;
        document.getElementById('displayColor1').innerText = soundEngine.color1;
        document.getElementById('displayColor2').innerText = soundEngine.color2;
        document.getElementById('displaySonificationButton').innerText = soundEngine.sonificationButton ? 'Enabled' : 'Disabled';
        document.getElementById('displayCredits').innerText = soundEngine.credits || 'No credits provided.';
    }

    function populateFormMode(soundEngine) {
        document.getElementById('developerUsername').value = soundEngine.developerUsername;
        document.getElementById('soundEngineName').value = soundEngine.soundEngineName;
        color1Picker.value = soundEngine.color1;
        color2Picker.value = soundEngine.color2;
        document.getElementById('sonificationButton').value = soundEngine.sonificationButton;
        document.getElementById('credits').value = soundEngine.credits || '';
    }

    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        if (type === 'success') {
            toast.classList.add('success');
        } else if (type === 'error') {
            toast.classList.add('error');
        }
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    }

    // Validation for Min, Max, and Initial Values
    const params = ['x', 'y', 'z'];
    
    params.forEach(param => {
        const minInput = document.getElementById(`${param}ParamMin`);
        const maxInput = document.getElementById(`${param}ParamMax`);
        const initInput = document.getElementById(`${param}ParamInit`);

        const validateInitValue = () => {
            let min = parseInt(minInput.value, 10);
            let max = parseInt(maxInput.value, 10);
            let init = parseInt(initInput.value, 10);

            // Clamp min and max to the valid range of -100 to 100
            if (min < -100) min = -100;
            if (min > 100) min = 100;
            if (max < -100) max = -100;
            if (max > 100) max = 100;

            // Update the input fields with the clamped values
            minInput.value = min;
            maxInput.value = max;

            // Allow inverted range by treating min and max dynamically
            const realMin = Math.min(min, max);
            const realMax = Math.max(min, max);

            // Ensure the init value is within the real range (taking into account inversion)
            if (init < realMin) init = realMin;
            if (init > realMax) init = realMax;

            // Set validated values back into the input fields
            initInput.value = init;
        };

        // Add event listeners to validate the values when the user inputs data
        minInput.addEventListener('input', validateInitValue);
        maxInput.addEventListener('input', validateInitValue);
        initInput.addEventListener('input', validateInitValue);
    });

});
</script>
