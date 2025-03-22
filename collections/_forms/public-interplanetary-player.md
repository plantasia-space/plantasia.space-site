---
layout: articles
show_title: false
show_date: false
permalink: /xplorer/interplanetary-player
titles:
  en: &EN Public Interplanetary Player
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
public: true
---

<!-- Interplanetary Player Form Container -->
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
    <h3 id="formTitle">Interplanetary Player Details</h3>
    <div class="p-2"></div>

    <!-- View Mode Container -->
    <div id="interplanetaryPlayerView">
        <!-- Texture Image -->
        <img id="viewTextureImage" style="display: none; max-width: 100%; height: auto;" alt="Texture Image" />
        
        <!-- Interplanetary Player Image Preview -->
        <div id="interplanetaryPlayerImagePreviewContainer">
            <img id="interplanetaryPlayerImagePreview" src="" alt="Interplanetary Player Image" style="display: none;" width="480" height="480">
        </div>

        <!-- Interplanetary Player Details -->
        <p><strong>Scientific Name:</strong> <span id="viewSciName"></span></p>
        <p><strong>Artistic Name:</strong> <span id="viewArtName"></span></p>
        <p><strong>Right Ascension (Decimal):</strong> <span id="viewRaDecimal"></span></p>
        <p><strong>Declination (Decimal):</strong> <span id="viewDecDecimal"></span></p>
        <p><strong>Orbital Period [days]:</strong> <span id="viewPeriod"></span></p>
        <p><strong>Radius [R earth]:</strong> <span id="viewRadius"></span></p>
        <p><strong>Discovery Year:</strong> <span id="viewDiscoveryYear"></span></p>
        <p><strong>3D Artist:</strong> <span id="viewDddArtistName"></span></p>
        <p><strong>Description:</strong> <span id="viewExoplanetDescription"></span></p>
        <p><strong>Credits:</strong> <span id="viewCredits"></span></p>

        <!-- Download 3D Model Link -->
        <a id="viewObjFile" style="display: none;">Download 3D Model</a>

        <!-- Engine Owner Details -->
        <div id="engineOwnerContainer">
            <h4>Engine Owner</h4>
            <ul id="playerOwnerList" class="user-list">
                <!-- Owner details will be injected here -->
            </ul>
        </div>
    </div>
</div>

<!-- Toast Notification Container -->
<div id="toastContainer" class="toast-container"></div>

<!-- JavaScript to Handle Data Retrieval and Rendering -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId'); 
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('playerId'); // Retrieve playerId from the URL

    const formTitle = document.getElementById('formTitle');
    const interplanetaryPlayerView = document.getElementById('interplanetaryPlayerView');
    const interplanetaryPlayerImagePreview = document.getElementById('interplanetaryPlayerImagePreview');
    const playerOwnerList = document.getElementById('playerOwnerList');

    // Check if playerId is present in the URL
    if (playerId) {
        formTitle.innerText = 'Interplanetary Player Details';
        loadInterplanetaryPlayerDetails(playerId);
    } else {
        showToast('Interplanetary Player ID not provided in the URL.', 'error');
    }

    /**
     * Fetch and load Interplanetary Player details based on playerId
     * @param {string} playerId - The ID of the Interplanetary Player
     */
    function loadInterplanetaryPlayerDetails(playerId) {
        fetch(`https://api.plantasia.space:443/api/interplanetaryPlayers/${playerId}`)
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Received data:', data);

                if (data.success && data.player) { // Ensure 'player' key exists
                    const player = data.player; // Assign player data
                    console.log('Interplanetary Player data is available:', player);

                    // Check if the player is public or if the current user is the owner
                    if (player.isPublic || player.ownerId === userId) {
                        populateViewMode(player);
                        showOwnerDetails(player.ownerDetails);
                        // If there are additional artist details, handle them here
                        // showDddArtistDetails(player.dddArtistDetails);
                    } else {
                        console.log('Interplanetary Player is not public and user is not the owner. Redirecting to /voyage.');
                        showToast('This Interplanetary Player is private.', 'error');
                        setTimeout(() => {
                            window.location.href = '/voyage';
                        }, 2000);
                    }
                } else {
                    console.log('Failed to load Interplanetary Player details.');
                    showToast(data.message || 'Failed to load Interplanetary Player details.', 'error');
                    setTimeout(() => {
                        window.location.href = '/voyage';
                    }, 2000);
                }
            })
            .catch(error => {
                console.error('Error loading Interplanetary Player details:', error);
                showToast('An error occurred while loading Interplanetary Player details.', 'error');
                setTimeout(() => {
                    window.location.href = '/voyage';
                }, 2000);
            });
    }

    /**
     * Populate the view mode with Interplanetary Player data
     * @param {Object} player - The Interplanetary Player data
     */
    function populateViewMode(player) {
        document.getElementById('viewSciName').innerHTML = `<strong>Scientific Name:</strong> ${player.sciName || 'N/A'}`;
        document.getElementById('viewArtName').innerHTML = `<strong>Artistic Name:</strong> ${player.artName || 'N/A'}`;
        document.getElementById('viewRaDecimal').innerHTML = `<strong>Right Ascension (Decimal):</strong> ${player.ra_decimal?.$numberDecimal || 'N/A'}`;
        document.getElementById('viewDecDecimal').innerHTML = `<strong>Declination (Decimal):</strong> ${player.dec_decimal?.$numberDecimal || 'N/A'}`;
        document.getElementById('viewPeriod').innerHTML = `<strong>Orbital Period [days]:</strong> ${player.period?.$numberDecimal || 'N/A'}`;
        document.getElementById('viewRadius').innerHTML = `<strong>Radius [R earth]:</strong> ${player.radius?.$numberDecimal || 'N/A'}`;
        document.getElementById('viewDiscoveryYear').innerHTML = `<strong>Discovery Year:</strong> ${player.discoveryyear?.$numberDecimal || 'N/A'}`;
        
        // 3D Artist as Clickable Handler
        document.getElementById('viewDddArtistName').innerHTML = `<strong>3D Artist:</strong> ${player.ddd?.dddArtist ? `<a href="/xplorer/?username=${encodeURIComponent(player.ddd.dddArtist)}" target="_self">@${player.ddd.dddArtist}</a>` : 'N/A'}`;
        
        document.getElementById('viewExoplanetDescription').innerHTML = `<strong>Description:</strong> ${player.description || 'N/A'}`;
        document.getElementById('viewCredits').innerHTML = `<strong>Credits:</strong> ${player.credits || 'N/A'}`;
        
        // Show or hide Download 3D Model link
        const viewObjFile = document.getElementById('viewObjFile');
        if (player.objURL) {
            viewObjFile.href = player.objURL.startsWith('http') ? player.objURL : `https://api.plantasia.space${player.objURL}`;
            viewObjFile.textContent = 'Download 3D Model';
            viewObjFile.style.display = 'block';
        } else {
            viewObjFile.style.display = 'none';
        }
        
        // Show or hide Texture Image
        const viewTextureImage = document.getElementById('viewTextureImage');
        if (player.textureURL) {
            const textureUrl = player.textureURL.startsWith('http') ? player.textureURL : `https://api.plantasia.space${player.textureURL}`;
            viewTextureImage.src = textureUrl;
            viewTextureImage.alt = `Texture of ${player.sciName || 'Interplanetary Player'}`;
            viewTextureImage.style.display = 'block';
        } else {
            viewTextureImage.style.display = 'none';
        }
        
        // Show or hide Interplanetary Player Image
        if (player.interplanetaryPlayerImage) {
            interplanetaryPlayerImagePreview.src = `https://api.plantasia.space${encodeURI(player.interplanetaryPlayerImage)}`;
            interplanetaryPlayerImagePreview.style.display = 'block';
        } else {
            interplanetaryPlayerImagePreview.style.display = 'none';
        }
    }

    /**
     * Display Owner Details in the Owner List
     * @param {Object} ownerDetails - The Owner's details
     */
    function showOwnerDetails(ownerDetails) {
        if (ownerDetails) {
            playerOwnerList.innerHTML = `
                <li class="user-list-item">
                    <div class="user-profile-pic">
                        <img src="https://api.plantasia.space${ownerDetails.profileImage || '/default_profile.png'}" alt="${ownerDetails.username}">
                    </div>
                    <div class="user-details">
                        <div class="user-display-name">${ownerDetails.displayName || 'Unknown'}</div>
                        <div class="user-username">
                            <a href="/xplorer/?username=${ownerDetails.username}" target="_self">@${ownerDetails.username || 'Unknown'}</a>
                        </div>
                    </div>
                </li>`;
        } else {
            playerOwnerList.innerHTML = '<li>No owner details available.</li>';
        }
    }

    /**
     * Display Toast Notifications
     * @param {string} message - The message to display
     * @param {string} type - The type of message ('success' or 'error')
     */
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

        // Trigger CSS animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Remove toast after animation
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

