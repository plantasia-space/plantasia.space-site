---
layout: articles
show_title: false
show_date: false
permalink: /xplorer/sound-engine
titles:
  en: &EN Create Sound Engine
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
public: true

---

<!-- Sound Engine Form Container -->
<div class="form-container">
    <!-- Back Button -->
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Back to Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
            </a>
        </div>
    </div>

    <!-- Form Title and Description -->
    <h3 id="formTitle">Create a Sound Engine</h3>
    <div class="p-2"></div>

    <!-- View Mode Container -->
    <div id="soundEngineView">
        <!-- Sound Engine Image Preview -->
        <div id="soundEngineImagePreviewContainer">
            <img id="soundEngineImagePreview" src="" alt="Sound Engine Image" style="display: none;" width="480" height="480">
        </div>

        <!-- Sound Engine Details -->
        <p><strong>Developer Username:</strong> <span id="displayDeveloperUsername"></span></p>
        <p><strong>Sound Engine Name:</strong> <span id="displaySoundEngineName"></span></p>
        <p><strong>Color 1:</strong> <span id="displayColor1"></span></p>
        <p><strong>Color 2:</strong> <span id="displayColor2"></span></p>
        <p><strong>Sonification Button:</strong> <span id="displaysonificationState"></span></p>
        <p><strong>Availability:</strong> <span id="displayAvailability"></span></p>
        <p><strong>Credits:</strong> <span id="displayCredits"></span></p>

        <!-- Engine Owner Details -->
        <div id="engineOwnerContainer">
            <h4>Engine Owner</h4>
            <ul id="engineOwnerList"></ul>
        </div>
    </div>
</div>
<div id="toastContainer" class="toast-container"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId'); 
    const urlParams = new URLSearchParams(window.location.search);
    const engineId = urlParams.get('engineId'); // Retrieve engineId from the URL

    const formTitle = document.getElementById('formTitle');
    const soundEngineView = document.getElementById('soundEngineView');
    const soundEngineImagePreview = document.getElementById('soundEngineImagePreview');
    const engineOwnerList = document.getElementById('engineOwnerList');

    // Check if engineId is present in the URL
    if (engineId) {
        formTitle.innerText = 'Sound Engine Details';
        loadSoundEngineDetails(engineId);
    } else {
        showToast('Sound Engine ID not provided in the URL.', 'error');
    }

function loadSoundEngineDetails(soundEngineId) {
    const userId = localStorage.getItem('userId'); // Retrieve the logged-in user's ID

    fetch(`https://api.plantasia.space/api/soundEngines/${soundEngineId}`)
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);

            if (data.success && data.soundEngine) {
                const soundEngine = data.soundEngine;
                console.log('Sound engine data is available:', soundEngine);

                // Check if the sound engine is public or if the current user is the owner
                if (soundEngine.isPublic || soundEngine.ownerId === userId) {
                    populateViewMode(soundEngine);
                    showOwnerDetails(soundEngine.ownerDetails);
                } else {
                    console.log('Sound engine is not public and user is not the owner. Redirecting to /voyage.');
                    showToast('This sound engine is private.', 'error');
                    setTimeout(() => {
                        window.location.href = '/voyage';
                    }, 2000);
                }
            } else {
                console.log('Failed to load sound engine details.');
                showToast(data.message || 'Failed to load sound engine details.', 'error');
                setTimeout(() => {
                    window.location.href = '/voyage';
                }, 2000);
            }
        })
        .catch(error => {
            console.error('Error loading sound engine details:', error);
            showToast('An error occurred while loading sound engine details.', 'error');
            setTimeout(() => {
                window.location.href = '/voyage';
            }, 2000);
        });
}


    function populateViewMode(soundEngine) {
        document.getElementById('displayDeveloperUsername').innerText = soundEngine.developerUsername;
        document.getElementById('displaySoundEngineName').innerText = soundEngine.soundEngineName;
        document.getElementById('displayColor1').innerText = soundEngine.color1;
        document.getElementById('displayColor2').innerText = soundEngine.color2;
        document.getElementById('displaysonificationState').innerText = soundEngine.sonificationState ? 'Enabled' : 'Disabled';
        document.getElementById('displayAvailability').innerText = soundEngine.isPublic ? 'Public' : 'Private';
        document.getElementById('displayCredits').innerText = soundEngine.credits || 'No credits provided';

        if (soundEngine.soundEngineImage) {
            soundEngineImagePreview.src = `https://api.plantasia.space${encodeURI(soundEngine.soundEngineImage)}`;
            soundEngineImagePreview.style.display = 'block';
        } else {
            soundEngineImagePreview.style.display = 'none';
        }
    }

    function showOwnerDetails(ownerDetails) {
        if (ownerDetails) {
            engineOwnerList.innerHTML = `
                <li class="user-list-item">
                    <div class="user-profile-pic">
                        <img src="https://api.plantasia.space${ownerDetails.profileImage || '/https://api.plantasia.space/uploads/default/default-profile.jpg'}" alt="${ownerDetails.username}">
                    </div>
                    <div class="user-details">
                        <div class="user-display-name">${ownerDetails.displayName || 'Unknown'}</div>
                        <div class="user-username">
                            <a href="/xplorer/?username=${ownerDetails.username}" target="_self">@${ownerDetails.username || 'Unknown'}</a>
                        </div>
                    </div>
                </li>`;
        } else {
            engineOwnerList.innerHTML = '<li>No owner details available.</li>';
        }
    }

    // Toast function for showing messages
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        console.error('Toast container element not found');
        return; // Exit the function if the toast container is missing
    }

    const toast = document.createElement('div');
    const toastId = `toast_${Date.now()}`;
    toast.classList.add('toast');
    toast.setAttribute('id', toastId);
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
            const toastElem = document.getElementById(toastId);
            if (toastElem) {
                toastElem.remove();
            }
        }, 500);
    }, 3000);
}

});
</script>
