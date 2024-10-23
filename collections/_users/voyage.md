---
layout: articles
show_title: false
show_date: false
permalink: /voyage
titles:
  en: &EN Voyage
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
public: false
---

<!-- Voyage Page Container -->
<div id="voyage-content">
    <h1>Voyage</h1>
    <p id="user-info"></p>
    <ul class="user-list" id="user-profile-list">
        <!-- User profile will be populated here -->
    </ul>

    <p><a href="/voyage/profile"><span class="material-symbols-outlined">account_circle</span> Go to your profile</a></p> 
    <p><a href="/voyage/soundengine"><span class="material-symbols-outlined">noise_control_on</span> Create a new sound engine</a></p> 
    <p><a href="/voyage/interplanetary-player"><span class="material-symbols-outlined">public</span> Create or edit a new Interplanetary Player</a></p> 
    <p><a href="/voyage/track-release"><span class="material-symbols-outlined">diversity_1</span> Release a new track</a></p> 
    <p><a href="/voyage/playlist"><span class="material-symbols-outlined">playlist_add_circle</span> Create a new playlist or album</a></p> 

    <h2>Your Released Tracks:</h2>
    <ul id="tracks-list"></ul>

    <h2>Your Sound Engines:</h2>
    <ul class="soundEngine-list" id="sound-engines-list"></ul>

    <h2>Your Interplanetary Players:</h2>
    <ul class="interplanetaryPlayer-list" id="interplanetary-players-list"></ul>
</div>

<!-- Toast Notification Container -->
<div id="toastContainer" class="toast-container"></div>

<!-- JavaScript to Handle Data Retrieval and Rendering -->
<script>
/**
 * Fetches data from the API with caching using lscache.
 * Specifically used for Sound Engines.
 * @param {string} url - The API endpoint.
 * @param {string} cacheKey - The key to store/retrieve data from cache.
 * @param {boolean} forceRefresh - If true, bypasses the cache.
 * @returns {Promise<Object>} - The fetched data.
 */
async function fetchDataWithCache(url, cacheKey, forceRefresh = false) {
    if (!forceRefresh) {
        const cachedData = lscache.get(cacheKey);
        if (cachedData) {
            console.log(`Cache hit for ${cacheKey}`);
            return cachedData;
        }
    }

    console.log(`Fetching data from server for ${cacheKey}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        lscache.set(cacheKey, data, 5); // Cache for 5 minutes
        console.log(`Data fetched and cached for ${cacheKey}`);
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
}

/**
 * Fetches data directly from the API without using caching.
 * Specifically used for Interplanetary Players (IPP).
 * @param {string} url - The API endpoint.
 * @returns {Promise<Object>} - The fetched data.
 */
async function fetchData(url) {
    console.log(`Fetching data from server: ${url}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Data fetched successfully from ${url}`);
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        console.error('No valid session found. Redirecting to login...');
        window.location.href = '/login';
        return;
    }    
    // Fetch user profile data
    fetchUserProfile(userId);
});

// Function to fetch user profile data from cache or server
function fetchUserProfile(userId) {
    const cachedProfile = lscache.get(`profile_${userId}`);
    if (cachedProfile) {
        console.log('Using cached profile data:', cachedProfile);
        populateUserProfile(cachedProfile); // Use cached data
    } else {
        fetch(`http://media.maar.world:3001/api/profile?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Received fresh profile data:', data);
                lscache.set(`profile_${userId}`, data, 60); // Cache for 60 minutes
                populateUserProfile(data); // Populate UI with fresh data
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                document.getElementById('messageDisplay').innerText = 'Error fetching user data. Please try again.';
            });
    }
}

// Function to populate user profile UI
function populateUserProfile(profileData) {
    // Call populateUserProfileList to display the profile
    populateUserProfileList(profileData);

    console.log('User profile populated:', profileData);
    
    // Check and display Sound Engines
    if (Array.isArray(profileData.enginesOwned)) {
        displaySoundEnginesBatch(profileData.enginesOwned);
    } else {
        console.warn('enginesOwned is not an array:', profileData.enginesOwned);
        document.getElementById('sound-engines-list').innerHTML = '<li>No sound engines found.</li>';
    }
    
    // Check and display Interplanetary Players
    if (Array.isArray(profileData.interplanetaryPlayersOwned)) {
        displayInterplanetaryPlayersBatch(profileData.interplanetaryPlayersOwned);
    } else {
        console.warn('interplanetaryPlayersOwned is not an array:', profileData.interplanetaryPlayersOwned);
        document.querySelector('.interplanetaryPlayer-list').innerHTML = '<li>No interplanetary players found.</li>';
    }
}

/**
 * Function to populate the user profile using the user-list structure
 * @param {Object} profileData - The user's profile data
 */
/**
 * Function to populate the user profile using the user-list structure
 * @param {Object} profileData - The user's profile data
 */
function populateUserProfileList(profileData) {
    const userProfileList = document.getElementById('user-profile-list');

    if (!profileData) {
        userProfileList.innerHTML = '<li>No profile information available.</li>';
        return;
    }

    userProfileList.innerHTML = `
        <li class="voyage-profile">
            <!-- Profile Image -->
            <div class="voyage-profile-pic">
                <a href="/voyage/profile">
                    <img src="https://media.maar.world${profileData.profileImage || '/default_profile.png'}" alt="${profileData.username}">
                </a>
            </div>

            <!-- Profile Details -->
            <div class="voyage-details">
                <!-- Display Name and Username -->
                <div class="voyage-display-name">${profileData.displayName || 'Unknown'}</div>
                <div class="voyage-username">
                    <a href="/xplorer/?username=${encodeURIComponent(profileData.username)}" target="_self">
                        @${profileData.username || 'Unknown'}
                    </a>
                </div>

                <!-- Bio -->
                ${profileData.bio ? `<div class="voyage-bio">${profileData.bio}</div>` : ''}

                <!-- Role -->
                <div class="voyage-role"><strong>Role:</strong> ${profileData.role || 'Listener'}</div>

                <!-- 1st Custom Link -->
                ${profileData.customLinks && profileData.customLinks[0] && profileData.customLinks[0] !== '' ? 
                    `<div class="voyage-custom-link">
                        <a href="${profileData.customLinks[0]}" target="_blank">${profileData.customLinks[0]}</a>
                    </div>` 
                    : ''
                }
            </div>
        </li>
    `;
}

function navigateToProfile() {
    window.location.href = '/voyage/profile';
}

/**
 * Function to display tracks on the page
 * @param {Array} tracks - Array of track objects owned by the user.
 */
function displayTracks(tracks) {
    const tracksListElement = document.getElementById('tracks-list');

    if (!tracks || tracks.length === 0) {
        tracksListElement.innerHTML = '<li>No tracks found.</li>';
        console.log('No tracks to display.');
        return;
    }

    tracks.forEach(track => {
        const artistNames = track.artistNames.map(artist => artist.name).join(', ');

        const trackElement = document.createElement('li');
        trackElement.innerHTML = `
            <strong>Artist Name:</strong> ${artistNames}<br>
            <strong>Song Name:</strong> ${track.trackName}<br>
            <strong>Privacy:</strong> ${track.privacy}<br>
            <strong>Release Date:</strong> ${new Date(track.releaseDate).toLocaleDateString()}
        `;
        tracksListElement.appendChild(trackElement);
    });
    console.log(`${tracks.length} tracks displayed.`);
}

/**
 * Function to display sound engines on the page using batch fetching with caching.
 * @param {Array<string>} engineIds - Array of sound engine IDs owned by the user.
 */
async function displaySoundEnginesBatch(engineIds) {

        console.log('Starting displaySoundEnginesBatch with IDs:', engineIds);

    const soundEnginesListElement = document.getElementById('sound-engines-list');
    soundEnginesListElement.innerHTML = ''; // Clear existing list

    if (!engineIds || engineIds.length === 0) {
        soundEnginesListElement.innerHTML = '<li>No sound engines found.</li>';
        console.log('No sound engines to display.');
        return;
    }

    // Validate and filter sound engine IDs
    const validEngineIds = engineIds.filter(id => isValidObjectId(id));
    if (validEngineIds.length === 0) {
        soundEnginesListElement.innerHTML = '<li>No valid sound engine IDs found.</li>';
        console.warn('No valid sound engine IDs to fetch.');
        return;
    }

    // Create a cache key based on sorted IDs for consistency
    const sortedIds = [...validEngineIds].sort();
    const cacheKey = `soundEngines_batch_${sortedIds.join('_')}`;
    const batchUrl = `http://media.maar.world:3001/api/soundEngines/batch?ids=${sortedIds.join(',')}`;

    try {
        const data = await fetchDataWithCache(batchUrl, cacheKey, false);
        if (data.success && Array.isArray(data.soundEngines)) {
            console.log(`Fetched ${data.soundEngines.length} sound engines.`);
            data.soundEngines.forEach(engine => {
                if (!engine || typeof engine !== 'object') {
                    console.warn('Invalid sound engine data:', engine);
                    return;
                }

                const imageUrl = engine.soundEngineImage
                    ? `https://media.maar.world${encodeURI(engine.soundEngineImage)}`
                    : 'https://media.maar.world/uploads/default/default-soundEngine.jpg'; // Provide a default image path

                const soundEngineName = engine.soundEngineName || 'Unnamed Sound Engine';

                // Create DOM elements
                const soundEngineDiv = document.createElement('li');
                soundEngineDiv.classList.add('soundEngine-list-item');

                soundEngineDiv.innerHTML = `
                    <div class="soundEngine-profile-pic">
                        <img src="${imageUrl}" alt="${soundEngineName}" loading="lazy" style="max-width: 80px; max-height: 80px;">
                    </div>
                    <div class="soundEngine-details">
                        <div class="soundEngine-name"><strong>Name:</strong> ${soundEngineName}</div>
                        <div class="soundEngine-availability"><strong>Availability:</strong> ${engine.isPublic ? '🌍 Shared' : '🔐 Exclusive'}</div>
                        <div class="soundEngine-params">
                            <strong>Parameters:</strong> 
                            X: ${engine.xParam.label} (${engine.xParam.min} to ${engine.xParam.max}, Init: ${engine.xParam.initValue}) |
                            Y: ${engine.yParam.label} (${engine.yParam.min} to ${engine.yParam.max}, Init: ${engine.yParam.initValue}) |
                            Z: ${engine.zParam.label} (${engine.zParam.min} to ${engine.zParam.max}, Init: ${engine.zParam.initValue})
                        </div>
                    </div>
                    <div class="button-container">
                        <button class="soundEngine-edit-button" onclick="editSoundEngine('${engine._id}')">
                            <span class="material-symbols-outlined">edit</span> 
                        </button>
                        <button 
                            class="btn share-button" 
                            ${engine.isPublic ? '' : 'disabled'} 
                            onclick="shareSoundEngine('${engine._id}')"
                        >
                            <span class="material-symbols-outlined">share</span> 
                        </button>
                        <!-- More Options Button -->
                        <div class="more-options-container">
                            <button class="btn more-options-button" onclick="toggleMoreOptions(event)">
                                <span class="material-symbols-outlined">more_horiz</span>
                            </button>
                            <div class="more-options-dropdown" style="display: none;">
                                <button class="delete-button" onclick="deleteSoundEngine('${engine._id}', this)">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
                soundEnginesListElement.appendChild(soundEngineDiv);
            });
            console.log('All sound engines displayed successfully.');
        } else {
            console.error('Failed to fetch sound engines:', data.message);
            soundEnginesListElement.innerHTML = '<li>Failed to load sound engines.</li>';
            showToast('Failed to load your sound engines.', 'error');
        }
    } catch (error) {
        console.error('Error displaying sound engines:', error);
        soundEnginesListElement.innerHTML = '<li>An error occurred while loading sound engines.</li>';
        showToast('An error occurred while loading your sound engines.', 'error');
    }
}

/**
 * Function to display interplanetary players on the page without caching.
 * @param {Array<string>} playerIds - Array of interplanetary player IDs owned by the user.
 */
async function displayInterplanetaryPlayersBatch(playerIds) {

        console.log('Starting displayInterplanetaryPlayersBatch with IDs:', playerIds);

    const playersListElement = document.querySelector('.interplanetaryPlayer-list');
    playersListElement.innerHTML = ''; // Clear any existing content

    if (!playerIds || playerIds.length === 0) {
        playersListElement.innerHTML = '<li>No interplanetary players found.</li>';
        console.log('No interplanetary players to display.');
        return;
    }

    // Validate and filter player IDs
    const validPlayerIds = playerIds.filter(id => isValidObjectId(id));
    if (validPlayerIds.length === 0) {
        playersListElement.innerHTML = '<li>No valid interplanetary player IDs found.</li>';
        console.warn('No valid interplanetary player IDs to fetch.');
        return;
    }

    const batchUrl = `http://media.maar.world:3001/api/interplanetaryPlayers/batch?ids=${validPlayerIds.join(',')}`;

    try {
        const data = await fetchData(batchUrl);
        if (data.success && Array.isArray(data.interplanetaryPlayers)) {
            console.log(`Fetched ${data.interplanetaryPlayers.length} interplanetary players.`);
            
            data.interplanetaryPlayers.forEach(player => {
                console.log('Interplanetary Player Object:', player); // <-- Debugging Line

                if (!player || typeof player !== 'object') {
                    console.warn('Invalid interplanetary player data:', player);
                    return;
                }

                // Fetch image from ddd.textureURL, and fall back to a default image
                const imageUrl = player.ddd?.textureURL
                    ? `https://media.maar.world${encodeURI(player.ddd.textureURL)}`
                    : 'https://media.maar.world/uploads/default/default-interplanetaryPlayer.jpg'; // Default image

                // Use artName for the player name
                const playerName = player.artName || 'Unnamed Player'; 
                const sciName = player.sciName || 'Unknown';
                const description = player.description ? player.description.substring(0, 30) + '...' : 'No description available.';

                // Create DOM elements
                const playerDiv = document.createElement('li');
                playerDiv.classList.add('interplanetaryPlayer-list-item');

                playerDiv.innerHTML = `
                    <div class="interplanetaryPlayer-profile-pic">
                        <img src="${imageUrl}" alt="${playerName}" loading="lazy" style="max-width: 80px; max-height: 80px;">
                    </div>
                    <div class="interplanetaryPlayer-details">
                        <div class="interplanetaryPlayer-name"><strong>Name:</strong> ${playerName}</div>
                        <div class="interplanetaryPlayer-sciName"><strong>Scientific Name:</strong> ${sciName}</div>
                        <div class="interplanetaryPlayer-description"><strong>Description:</strong> ${description}</div>
                        <div class="interplanetaryPlayer-availability"><strong>Availability:</strong> ${player.isPublic ? '🌍 Public' : '🔐 Private'}</div>
                    </div>
                    <div class="button-container">
                        <button class="interplanetaryPlayer-edit-button" onclick="editInterplanetaryPlayer('${player._id}')">
                            <span class="material-symbols-outlined">edit</span> 
                        </button>
                        <button 
                            class="btn share-button" 
                            onclick="shareInterplanetaryPlayer('${player._id}')"
                        >
                            <span class="material-symbols-outlined">share</span> 
                        </button>
                        <!-- More Options Button -->
                        <div class="more-options-container">
                            <button class="btn more-options-button" onclick="toggleMoreOptions(event)">
                                <span class="material-symbols-outlined">more_horiz</span>
                            </button>
                            <div class="more-options-dropdown" style="display: none;">
                                <button class="delete-button" onclick="deleteInterplanetaryPlayer('${player._id}', this)">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
                playersListElement.appendChild(playerDiv);
            });
            console.log('All interplanetary players displayed successfully.');
        } else {
            console.error('Failed to fetch interplanetary players:', data.message);
            playersListElement.innerHTML = '<li>Failed to load interplanetary players.</li>';
            showToast('Failed to load your interplanetary players.', 'error');
        }
    } catch (error) {
        console.error('Error displaying interplanetary players:', error);
        playersListElement.innerHTML = '<li>An error occurred while loading interplanetary players.</li>';
        showToast('An error occurred while loading your interplanetary players.', 'error');
    }
}

/**
 * Validate if a string is a valid MongoDB ObjectId.
 * @param {string} id
 * @returns {boolean}
 */
function isValidObjectId(id) {
    return /^[a-fA-F0-9]{24}$/.test(id);
}

/**
 * Function to handle editing a sound engine.
 * @param {string} engineId - The ID of the sound engine to edit.
 */
function editSoundEngine(engineId) {
    console.log(`Editing sound engine with ID: ${engineId}`);
    window.location.href = `/voyage/soundEngine?mode=edit&id=${engineId}`;
}

/**
 * Function to handle sharing a sound engine.
 * @param {string} engineId - The ID of the sound engine to share.
 */
function shareSoundEngine(engineId) {
    const shareUrl = `http://maar.world/xplorer/sound-engine/?engineId=${engineId}`;
    console.log(`Sharing sound engine with URL: ${shareUrl}`);
    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            showToast('Sound engine link copied to clipboard!', 'success');
        })
        .catch(err => {
            console.error('Failed to copy sound engine link:', err);
            showToast('Failed to copy the sound engine link. Please try again.', 'error');
        });
}

/**
 * Function to handle editing an interplanetary player.
 * @param {string} playerId - The ID of the interplanetary player to edit.
 */
function editInterplanetaryPlayer(playerId) {
    console.log(`Editing interplanetary player with ID: ${playerId}`);
    window.location.href = `/voyage/interplanetary-player?mode=edit&playerId=${playerId}`;
}

/**
 * Function to handle sharing an interplanetary player.
 * @param {string} playerId - The ID of the interplanetary player to share.
 */
function shareInterplanetaryPlayer(playerId) {
    const shareUrl = `http://maar.world/xplorer/interplanetary-player/?playerId=${playerId}`;
    console.log(`Sharing interplanetary player with URL: ${shareUrl}`);
    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            showToast('Interplanetary player link copied to clipboard!', 'success');
        })
        .catch(err => {
            console.error('Failed to copy interplanetary player link:', err);
            showToast('Failed to copy the interplanetary player link. Please try again.', 'error');
        });
}

/**
 * Function to display Toast Notifications
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

/**
 * Function to toggle the visibility of the More Options dropdown
 * @param {Event} event - The click event
 */
function toggleMoreOptions(event) {
    event.stopPropagation(); // Prevent event from bubbling up
    const dropdown = event.currentTarget.nextElementSibling;
    if (dropdown) {
        const isDisplayed = dropdown.style.display === 'block';
        // Close any other open dropdowns
        closeAllDropdowns();
        dropdown.style.display = isDisplayed ? 'none' : 'block';
    }
}

/**
 * Function to close all open dropdown menus
 */
function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.more-options-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });
}

/**
 * Function to handle the deletion of a sound engine
 * @param {string} engineId - The ID of the sound engine to delete
 * @param {HTMLElement} button - The delete button that was clicked
 */
function deleteSoundEngine(engineId, button) {
    // Confirm deletion with the user
    const confirmation = confirm('Are you sure you want to delete this Sound Engine? This action cannot be undone.');
    if (!confirmation) return;

    // Disable the delete button to prevent multiple clicks
    button.disabled = true;
    button.textContent = 'Deleting...';

    // Send DELETE request to the server
    fetch(`http://media.maar.world:3001/api/soundEngines/${engineId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete the Sound Engine.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            showToast('Sound Engine deleted successfully!', 'success');
            // Remove the sound engine from the DOM
            const soundEngineListItem = button.closest('.soundEngine-list-item');
            if (soundEngineListItem) {
                soundEngineListItem.remove();
            }
        } else {
            throw new Error(data.message || 'Failed to delete the Sound Engine.');
        }
    })
    .catch(error => {
        console.error('Error deleting Sound Engine:', error);
        showToast(`Error: ${error.message}`, 'error');
        // Re-enable the delete button
        button.disabled = false;
        button.textContent = 'Delete';
    });
}

/**
 * Function to handle the deletion of an interplanetary player
 * @param {string} playerId - The ID of the interplanetary player to delete
 * @param {HTMLElement} button - The delete button that was clicked
 */
function deleteInterplanetaryPlayer(playerId, button) {
    // Confirm deletion with the user
    const confirmation = confirm('Are you sure you want to delete this Interplanetary Player? This action cannot be undone.');
    if (!confirmation) return;

    // Disable the delete button to prevent multiple clicks
    button.disabled = true;
    button.textContent = 'Deleting...';

    // Send DELETE request to the server
    fetch(`http://media.maar.world:3001/api/interplanetaryPlayers/${playerId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete the Interplanetary Player.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            showToast('Interplanetary Player deleted successfully!', 'success');
            // Remove the player from the DOM
            const playerListItem = button.closest('.interplanetaryPlayer-list-item');
            if (playerListItem) {
                playerListItem.remove();
            }
        } else {
            throw new Error(data.message || 'Failed to delete the Interplanetary Player.');
        }
    })
    .catch(error => {
        console.error('Error deleting Interplanetary Player:', error);
        showToast(`Error: ${error.message}`, 'error');
        // Re-enable the delete button
        button.disabled = false;
        button.textContent = 'Delete';
    });
}
    
// Event listener to close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    // If the click is not within a more-options-container, close all dropdowns
    if (!event.target.closest('.more-options-container')) {
        closeAllDropdowns();
    }
});
</script>
