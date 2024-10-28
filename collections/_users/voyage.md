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
<!-- Voyage Page Container -->
<div id="voyage-content">
    <h1>Voyage</h1>
    <div class="world-form">
        <div class="form-box">
            <p id="user-info"></p>
            <ul class="user-list" id="user-profile-list">
                <!-- User profile will be populated here -->
            </ul>

            <!-- Dashboard Menu with Collapsible Section -->
            <div class="collapsible-section" data-section-id="dashboard-menu">
                <div class="section-header" tabindex="0" role="button" aria-expanded="true" aria-controls="menu-list">
                    <h2 class="section-title">Dashboard</h2>
                    <button class="toggle-button" aria-expanded="true" aria-controls="menu-list" aria-label="Toggle Dashboard Menu">
                        <span class="material-symbols-outlined toggle-icon">keyboard_arrow_up</span>
                    </button>
                </div>
                <div class="section-content" id="menu-list">
                    <ul>
                        <!-- Menu List Items -->
                        <li class="menu-list-item">
                            <a href="/voyage/profile" class="menu-link">
                                <div class="menu-item-details">
                                    <span class="material-symbols-large">account_circle</span>
                                    <div>
                                        <div class="menu-item-title">Edit your profile</div>
                                        <div class="menu-item-description">Update your profile information and preferences.</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="menu-list-item">
                            <a href="/voyage/track-release" class="menu-link">
                                <div class="menu-item-details">
                                    <span class="material-symbols-large">diversity_1</span>
                                    <div>
                                        <div class="menu-item-title">Release a track</div>
                                        <div class="menu-item-description">Upload and share your latest music tracks.</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="menu-list-item">
                            <a href="/voyage/playlist" class="menu-link">
                                <div class="menu-item-details">
                                    <span class="material-symbols-large">playlist_add_circle</span>
                                    <div>
                                        <div class="menu-item-title">Create a playlist or album</div>
                                        <div class="menu-item-description">Organize your tracks into playlists or albums.</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="menu-list-item">
                            <a href="/voyage/interplanetary-player" class="menu-link">
                                <div class="menu-item-details">
                                    <span class="material-symbols-large">public</span>
                                    <div>
                                        <div class="menu-item-title">Create an Interplanetary Player</div>
                                        <div class="menu-item-description">Design your own Interplanetary Player for regenerative music.</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="menu-list-item">
                            <a href="/voyage/soundengine" class="menu-link">
                                <div class="menu-item-details">
                                    <span class="material-symbols-large">noise_control_on</span>
                                    <div>
                                        <div class="menu-item-title">Create a Sound Engine</div>
                                        <div class="menu-item-description">Build and configure a custom sound engine for your tracks.</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="menu-list-item">
                            <a href="/" class="menu-link">
                                <div class="menu-item-details">
                                    <span class="material-symbols-large">conditions</span>
                                    <div>
                                        <div class="menu-item-title">Discover</div>
                                        <div class="menu-item-description">Explore new music, albums, and playlists from other users.</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Released Tracks Section -->
            <div class="collapsible-section" data-section-id="released-tracks">
                <div class="section-header" tabindex="0" role="button" aria-expanded="true" aria-controls="tracks-list">
                    <h2 class="section-title">Your Released Tracks:</h2>
                    <button class="toggle-button" aria-expanded="true" aria-controls="tracks-list" aria-label="Toggle Released Tracks">
                        <span class="material-symbols-outlined toggle-icon">keyboard_arrow_up</span>
                    </button>
                </div>
                <div class="section-content" id="tracks-list">
                    <ul class="track-list">
                        <!-- Track items will be populated here -->
                    </ul>
                </div>
            </div>

            <!-- Playlists Section -->
            <div class="collapsible-section" data-section-id="playlists">
                <div class="section-header" tabindex="0" role="button" aria-expanded="true" aria-controls="playlist-list">
                    <h2 class="section-title">Your Playlists:</h2>
                    <button class="toggle-button" aria-expanded="true" aria-controls="playlist-list" aria-label="Toggle Playlists">
                        <span class="material-symbols-outlined toggle-icon">keyboard_arrow_up</span>
                    </button>
                </div>
                <div class="section-content" id="playlist-list">
                    <ul class="playlist-list">
                        <!-- Playlist items will be populated here -->
                    </ul>
                </div>
            </div>

            <!-- Interplanetary Players Section -->
            <div class="collapsible-section" data-section-id="interplanetary-players">
                <div class="section-header" tabindex="0" role="button" aria-expanded="false" aria-controls="interplanetary-players-list">
                    <h2 class="section-title">Your Interplanetary Players:</h2>
                    <button class="toggle-button" aria-expanded="false" aria-controls="interplanetary-players-list" aria-label="Toggle Interplanetary Players">
                        <span class="material-symbols-outlined toggle-icon">keyboard_arrow_down</span>
                    </button>
                </div>
                <div class="section-content" id="interplanetary-players-list">
                    <ul class="interplanetaryPlayer-list">
                        <!-- Interplanetary Player items will be populated here -->
                    </ul>
                </div>
            </div>

            <!-- Sound Engines Section -->
            <div class="collapsible-section" data-section-id="sound-engines">
                <div class="section-header" tabindex="0" role="button" aria-expanded="true" aria-controls="sound-engines-list">
                    <h2 class="section-title">Your Sound Engines:</h2>
                    <button class="toggle-button" aria-expanded="true" aria-controls="sound-engines-list" aria-label="Toggle Sound Engines">
                        <span class="material-symbols-outlined toggle-icon">keyboard_arrow_up</span>
                    </button>
                </div>
                <div class="section-content" id="sound-engines-list">
                    <ul class="soundEngine-list">
                        <!-- Sound Engine items will be populated here -->
                    </ul>
                </div>
            </div>

        </div>
    </div>
</div>

<!-- Toast Notification Container -->
<div id="toastContainer" class="toast-container"></div>


<!-- Ensure lscache is loaded before this script -->

<script>
// Ensure lscache is loaded before this script
// Include collapsible.js via include directive
{%- include scripts/collapsible.js -%}

/**
 * Your existing JavaScript code
 */

/**
 * Fetches data from the API with caching using lscache.
 * Specifically used for Sound Engines and other data.
 * @param {string} url - The API endpoint.
 * @param {string} cacheKey - The key to store/retrieve data from cache.
 * @param {number} ttl - Time-to-live for the cache in minutes.
 * @param {boolean} forceRefresh - If true, bypasses the cache.
 * @returns {Promise<Object>} - The fetched data.
 */
async function fetchDataWithCache(url, cacheKey, ttl, forceRefresh = false) {
    if (!forceRefresh) {
        const cachedData = lscache.get(cacheKey);
        if (cachedData) {
            console.log(`Cache hit for ${cacheKey}`);
            return cachedData;
        }
    }

    console.log(`Fetching data from server for ${cacheKey}`);
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        lscache.set(cacheKey, data, ttl); // Cache for specified minutes
        console.log(`Data fetched and cached for ${cacheKey}`);
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
}

/**
 * Fetches data directly from the API without using caching.
 * Specifically used for Interplanetary Players (IPP) or real-time data.
 * @param {string} url - The API endpoint.
 * @returns {Promise<Object>} - The fetched data.
 */
async function fetchData(url) {
    console.log(`Fetching data from server: ${url}`);
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            }
        });
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
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error('No userId found. Redirecting to login.');
        window.location.href = '/login';
        return;
    }

    // Fetch user profile data and initialize collapsible sections after data is loaded
    fetchUserProfile(userId)
        .catch(error => {
            console.error('Failed to fetch and populate user profile:', error);
        });

    // Restore scroll position
    restoreScrollPosition();
});

/**
 * Function to fetch user profile data
 * @param {string} userId
 */
async function fetchUserProfile(userId) {
    const cacheKey = `profile_${userId}`;
    try {
        const data = await fetchDataWithCache(
            `http://media.maar.world:3001/api/profile?userId=${userId}`,
            cacheKey,
            60 // Cache for 60 minutes
        );
        await populateUserProfile(data);
        // After data is fetched and all sections are populated, handle collapsible sections
        await window.handleCollapsibleSections(); // Call global function
        // Then recalculate max-height for expanded sections
        await window.recalculateMaxHeight(); // Call global function
    } catch (error) {
        console.error('Error fetching user data:', error);
        showToast('Error fetching user data. Please try again.', 'error');
    }
}

/**
 * Function to populate user profile UI
 * @param {Object} profileData - The user's profile data
 */
async function populateUserProfile(profileData) {
    // Populate the user profile list
    populateUserProfileList(profileData);

    console.log('User profile populated:', profileData);

    // Display Sound Engines
    if (Array.isArray(profileData.enginesOwned)) {
        await displaySoundEnginesBatch(profileData.enginesOwned);
    } else {
        console.warn('enginesOwned is not an array:', profileData.enginesOwned);
        document.getElementById('sound-engines-list').innerHTML = '<li>No sound engines found.</li>';
    }

    // Display Interplanetary Players
    if (Array.isArray(profileData.interplanetaryPlayersOwned)) {
        await displayInterplanetaryPlayersBatch(profileData.interplanetaryPlayersOwned);
    } else {
        console.warn('interplanetaryPlayersOwned is not an array:', profileData.interplanetaryPlayersOwned);
        document.querySelector('.interplanetaryPlayer-list').innerHTML = '<li>No interplanetary players found.</li>';
    }

    // Display Tracks using Batch Fetching
    if (Array.isArray(profileData.tracksOwned)) {
        await displayTracksBatch(profileData.tracksOwned);
    } else {
        console.warn('tracksOwned is not an array:', profileData.tracksOwned);
        document.getElementById('tracks-list').innerHTML = '<li>No tracks found.</li>';
    }

    // Display Playlists
    if (Array.isArray(profileData.playlistsOwned)) {
        await displayPlaylists(profileData.playlistsOwned);
    } else {
        console.warn('playlistsOwned is not an array:', profileData.playlistsOwned);
        document.getElementById('playlist-list').innerHTML = '<li>No playlists found.</li>';
    }
}

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
    <div class="parent-container">

        <li class="voyage-profile">
            <!-- Profile Image -->
            <div class="voyage-profile-pic">
                <a href="/voyage/profile">
                    <img src="https://media.maar.world${profileData.profileImage || '/default_profile.png'}" alt="${profileData.username || 'User'}">
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
    </div>

    `;
}

/**
 * Function to display tracks on the page using batch fetching with caching.
 * Consolidates action buttons into a single "More Options" button with a dropdown menu.
 * @param {Array<string>} trackIds - Array of track IDs owned by the user.
 */
async function displayTracksBatch(trackIds) {
    console.log('Starting displayTracksBatch with IDs:', trackIds);

    const tracksListElement = document.getElementById('tracks-list');
    tracksListElement.innerHTML = ''; // Clear existing list

    if (!trackIds || trackIds.length === 0) {
        tracksListElement.innerHTML = '<li>No tracks found.</li>';
        console.log('No tracks to display.');
        return;
    }

    // Validate and filter track IDs
    const validTrackIds = trackIds.filter(id => isValidObjectId(id));
    if (validTrackIds.length === 0) {
        tracksListElement.innerHTML = '<li>No valid track IDs found.</li>';
        console.warn('No valid track IDs to fetch.');
        return;
    }

    // Create a cache key based on sorted IDs for consistency
    const sortedIds = [...validTrackIds].sort();
    const cacheKey = `tracks_batch_${sortedIds.join('_')}`;
    const batchUrl = `http://media.maar.world:3001/api/tracks/batch?ids=${sortedIds.join(',')}`;

    try {
        const data = await fetchDataWithCache(
            batchUrl,
            cacheKey,
            10 // Cache for 10 minutes
        );

        if (data.success && Array.isArray(data.tracks)) {
            console.log(`Fetched ${data.tracks.length} tracks.`);
            data.tracks.forEach(track => {
                if (!track || typeof track !== 'object') {
                    console.warn('Invalid track data:', track);
                    return;
                }

                const imageUrl = track.soundEngineId?.soundEngineImage
                    ? `https://media.maar.world${encodeURI(track.coverImage)}`
                    : 'https://media.maar.world/uploads/default/default-tracks.jpg'; // Provide a default image path

                const trackName = track.trackName || 'Unnamed Track';
                const privacy = track.privacy || 'Private';
                const releaseDate = track.releaseDate ? new Date(track.releaseDate).toLocaleDateString() : 'Unknown';

                const ownerName = track.owner?.displayName || 'Unknown';
                const artistNames = track.artists.map(artist => artist.displayName || 'Unknown').join(', ');

                // Create DOM elements
                const trackDiv = document.createElement('li');

                trackDiv.innerHTML = `
                    <div class="track-list-item" onclick="handleCardClick('${track._id}', event)" style="cursor: pointer;">
                        <div class="track-profile-pic">
                            <img src="${imageUrl}" alt="${trackName}" loading="lazy">
                        </div>
                        <div class="track-details">
                            <div class="track-name"><strong>Track Name:</strong> ${trackName}</div>
                            <div class="track-artists"><strong>Artists:</strong> ${artistNames}</div>
                            <div class="track-owner"><strong>Owner:</strong> ${ownerName}</div>
                            <div class="track-privacy"><strong>Privacy:</strong> ${privacy}</div>
                            <div class="track-release-date"><strong>Release Date:</strong> ${releaseDate}</div>
                        </div>
                        <div class="track-actions">
                            <div class="more-options-container">
                                <button class="more-options-button" onclick="event.stopPropagation(); toggleMoreOptions(event);" aria-haspopup="true" aria-expanded="false" aria-label="More options">
                                    <span class="material-symbols-outlined">more_horiz</span>
                                </button>
                                <div class="more-options-dropdown">
                                    <button class="option-button" onclick="editTrack('${track._id}')">
                                        <span class="material-symbols-outlined">edit</span> Edit
                                    </button>
                                    <button class="option-button" onclick="shareTrack('${track._id}')">
                                        <span class="material-symbols-outlined">share</span> Share
                                    </button>
                                    <button class="option-button" onclick="deleteTrack('${track._id}', this)">
                                        <span class="material-symbols-outlined">delete</span> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                tracksListElement.appendChild(trackDiv);
            });
            console.log('All tracks displayed successfully.');
        } else {
            console.error('Failed to fetch tracks:', data.message);
            tracksListElement.innerHTML = '<li>Failed to load tracks.</li>';
            showToast('Failed to load your tracks.', 'error');
        }
    } catch (error) {
        console.error('Error displaying tracks:', error);
        tracksListElement.innerHTML = '<li>No tracks found.</li>';
        //showToast('No tracks found.', 'error');
    }
}

/**
 * Function to display sound engines on the page using batch fetching with caching.
 * Consolidates action buttons into a single "More Options" button with a dropdown menu.
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
        const data = await fetchDataWithCache(
            batchUrl,
            cacheKey,
            5 // Cache for 5 minutes
        );

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

                soundEngineDiv.innerHTML = `
                    <div class="soundEngine-list-item" onclick="handleCardClick('${engine._id}', event)" style="cursor: pointer;">
                        <div class="soundEngine-profile-pic">
                            <img src="${imageUrl}" alt="${soundEngineName}" loading="lazy">
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
                        <div class="soundEngine-actions">
                            <div class="more-options-container">
                                <button class="more-options-button" onclick="event.stopPropagation(); toggleMoreOptions(event);" aria-haspopup="true" aria-expanded="false" aria-label="More options">
                                    <span class="material-symbols-outlined">more_horiz</span>
                                </button>
                                <div class="more-options-dropdown">
                                    <button class="option-button" onclick="editSoundEngine('${engine._id}')">
                                        <span class="material-symbols-outlined">edit</span> Edit
                                    </button>
                                    <button class="option-button" onclick="shareSoundEngine('${engine._id}')">
                                        <span class="material-symbols-outlined">share</span> Share
                                    </button>
                                    <button class="option-button" onclick="deleteSoundEngine('${engine._id}', this)">
                                        <span class="material-symbols-outlined">delete</span> Delete
                                    </button>
                                </div>
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
 * Function to display interplanetary players on the page using batch fetching.
 * Consolidates action buttons into a single "More Options" button with a dropdown menu.
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
            
            for (const player of data.interplanetaryPlayers) {
                console.log('Interplanetary Player Object:', player); // Debugging Line

                if (!player || typeof player !== 'object') {
                    console.warn('Invalid interplanetary player data:', player);
                    continue;
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

                playerDiv.innerHTML = `
                    <div class="interplanetaryPlayer-list-item" onclick="handleCardClick('${player._id}', event)" style="cursor: pointer;">
                        <div class="interplanetaryPlayer-profile-pic">
                            <img src="${imageUrl}" alt="${playerName}" loading="lazy">
                        </div>
                        <div class="interplanetaryPlayer-details">
                            <div class="interplanetaryPlayer-name"><strong>Name:</strong> ${playerName}</div>
                            <div class="interplanetaryPlayer-sciName"><strong>Scientific Name:</strong> ${sciName}</div>
                            <div class="interplanetaryPlayer-description"><strong>Description:</strong> ${description}</div>
                            <div class="interplanetaryPlayer-availability"><strong>Availability:</strong> ${player.isPublic ? '🌍 Public' : '🔐 Private'}</div>
                        </div>
                        <div class="interplanetaryPlayer-actions">
                            <div class="more-options-container">
                                <button class="more-options-button" onclick="event.stopPropagation(); toggleMoreOptions(event);" aria-haspopup="true" aria-expanded="false" aria-label="More options">
                                    <span class="material-symbols-outlined">more_horiz</span>
                                </button>
                                <div class="more-options-dropdown">
                                    <button class="option-button" onclick="editInterplanetaryPlayer('${player._id}')">
                                        <span class="material-symbols-outlined">edit</span> Edit
                                    </button>
                                    <button class="option-button" onclick="shareInterplanetaryPlayer('${player._id}')">
                                        <span class="material-symbols-outlined">share</span> Share
                                    </button>
                                    <button class="option-button" onclick="deleteInterplanetaryPlayer('${player._id}', this)">
                                        <span class="material-symbols-outlined">delete</span> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                playersListElement.appendChild(playerDiv);
            }
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
 * Function to display playlists on the page.
 * @param {Array} playlists - Array of playlist objects owned by the user.
 */
function displayPlaylists(playlists) {
    const playlistListElement = document.getElementById('playlist-list');

    if (!playlists || playlists.length === 0) {
        playlistListElement.innerHTML = '<li>No playlists found.</li>';
        console.log('No playlists to display.');
        return;
    }

    playlistListElement.innerHTML = ''; // Clear existing list

    playlists.forEach(playlist => {
        const playlistElement = document.createElement('li');
        playlistElement.classList.add('playlist-list-item'); // Ensure consistent class naming
        playlistElement.innerHTML = `
            <div class="playlist-list-item" onclick="handleCardClick('${playlist._id}', event)" style="cursor: pointer;">
                <div class="playlist-profile-pic">
                    <img src="${playlist.playlistImage || 'https://media.maar.world/uploads/default/default-playlist.jpg'}" alt="${playlist.playlistName}" loading="lazy">
                </div>
                <div class="playlist-details">
                    <div class="playlist-name"><strong>Playlist Name:</strong> ${playlist.playlistName}</div>
                    <div class="playlist-description"><strong>Description:</strong> ${playlist.description || 'No description provided.'}</div>
                    <div class="playlist-privacy"><strong>Privacy:</strong> ${playlist.privacy}</div>
                    <div class="playlist-created-on"><strong>Created On:</strong> ${new Date(playlist.createdAt).toLocaleDateString()}</div>
                </div>
                <div class="playlist-actions">
                    <div class="more-options-container">
                        <button class="more-options-button" onclick="event.stopPropagation(); toggleMoreOptions(event);" aria-haspopup="true" aria-expanded="false" aria-label="More options">
                            <span class="material-symbols-outlined">more_horiz</span>
                        </button>
                        <div class="more-options-dropdown">
                            <button class="option-button" onclick="editPlaylist('${playlist._id}')">
                                <span class="material-symbols-outlined">edit</span> Edit
                            </button>
                            <button class="option-button" onclick="sharePlaylist('${playlist._id}')">
                                <span class="material-symbols-outlined">share</span> Share
                            </button>
                            <button class="option-button" onclick="deletePlaylist('${playlist._id}', this)">
                                <span class="material-symbols-outlined">delete</span> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        playlistListElement.appendChild(playlistElement);
    });
    console.log(`${playlists.length} playlists displayed.`);
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
 * Function to handle editing a track.
 * @param {string} trackId - The ID of the track to edit.
 */
function editTrack(trackId) {
    console.log(`Editing track with ID: ${trackId}`);
    window.location.href = `/voyage/track-release?mode=edit&trackId=${trackId}`;
}

/**
 * Function to handle sharing a track.
 * @param {string} trackId - The ID of the track to share.
 */
function shareTrack(trackId) {
    const shareUrl = `http://maar.world/xplorer/track/?trackId=${trackId}`;
    console.log(`Sharing track with URL: ${shareUrl}`);
    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            showToast('Track link copied to clipboard!', 'success');
        })
        .catch(err => {
            console.error('Failed to copy track link:', err);
            showToast('Failed to copy the track link. Please try again.', 'error');
        });
}

/**
 * Function to handle editing a playlist.
 * @param {string} playlistId - The ID of the playlist to edit.
 */
function editPlaylist(playlistId) {
    console.log(`Editing playlist with ID: ${playlistId}`);
    window.location.href = `/voyage/playlist-edit?mode=edit&id=${playlistId}`;
}

/**
 * Function to handle sharing a playlist.
 * @param {string} playlistId - The ID of the playlist to share.
 */
function sharePlaylist(playlistId) {
    const shareUrl = `http://maar.world/xplorer/playlist/?playlistId=${playlistId}`;
    console.log(`Sharing playlist with URL: ${shareUrl}`);
    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            showToast('Playlist link copied to clipboard!', 'success');
        })
        .catch(err => {
            console.error('Failed to copy playlist link:', err);
            showToast('Failed to copy the playlist link. Please try again.', 'error');
        });
}

/**
 * Function to handle the deletion of a track
 * @param {string} trackId - The ID of the track to delete
 * @param {HTMLElement} button - The delete button that was clicked
 */
async function deleteTrack(trackId, button) {
    const userId = localStorage.getItem('userId');
    const cacheKey = `profile_${userId}`;

    // Confirm deletion with the user
    const confirmation = confirm('Are you sure you want to delete this Track? This action cannot be undone.');
    if (!confirmation) return;

    // Disable the delete button to prevent multiple clicks
    button.disabled = true;
    button.textContent = 'Deleting...';

    try {
        const response = await fetch(`http://media.maar.world:3001/api/tracks/${trackId}`, {
            method: 'DELETE',
            credentials: 'include', // Include cookies
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to delete the Track.');
        }

        const data = await response.json();
        if (data.success) {
            showToast('Track deleted successfully!', 'success');
            // Remove the track from the DOM
            const trackListItem = button.closest('.track-list-item');
            if (trackListItem) {
                trackListItem.remove();
            }
            // Clear the profile cache after deletion
            lscache.remove(cacheKey);
            console.log(`Track "${trackId}" deleted and DOM updated.`);
        } else {
            throw new Error(data.message || 'Failed to delete the Track.');
        }
    } catch (error) {
        console.error('Error deleting Track:', error);
        showToast(`Error: ${error.message}`, 'error');
        button.disabled = false;
        button.textContent = 'Delete';
    }
}

/**
 * Function to handle the deletion of a playlist
 * @param {string} playlistId - The ID of the playlist to delete
 * @param {HTMLElement} button - The delete button that was clicked
 */
async function deletePlaylist(playlistId, button) {
    const userId = localStorage.getItem('userId');
    const cacheKey = `profile_${userId}`;

    // Confirm deletion with the user
    const confirmation = confirm('Are you sure you want to delete this Playlist? This action cannot be undone.');
    if (!confirmation) return;

    // Disable the delete button to prevent multiple clicks
    button.disabled = true;
    button.textContent = 'Deleting...';

    try {
        const response = await fetch(`http://media.maar.world:3001/api/playlists/${playlistId}`, {
            method: 'DELETE',
            credentials: 'include', // Include cookies
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to delete the Playlist.');
        }

        const data = await response.json();
        if (data.success) {
            showToast('Playlist deleted successfully!', 'success');
            // Remove the playlist from the DOM
            const playlistListItem = button.closest('.playlist-list-item');
            if (playlistListItem) {
                playlistListItem.remove();
            }
            // Clear the profile cache after deletion
            lscache.remove(cacheKey);
            console.log(`Playlist "${playlistId}" deleted and DOM updated.`);
        } else {
            throw new Error(data.message || 'Failed to delete the Playlist.');
        }
    } catch (error) {
        console.error('Error deleting Playlist:', error);
        showToast(`Error: ${error.message}`, 'error');
        button.disabled = false;
        button.textContent = 'Delete';
    }
}

/**
 * Function to handle the deletion of a sound engine
 * @param {string} engineId - The ID of the sound engine to delete
 * @param {HTMLElement} button - The delete button that was clicked
 */
async function deleteSoundEngine(engineId, button) {
    const userId = localStorage.getItem('userId');
    const cacheKey = `profile_${userId}`;

    // Confirm deletion with the user
    const confirmation = confirm('Are you sure you want to delete this Sound Engine? This action cannot be undone.');
    if (!confirmation) return;

    // Disable the delete button to prevent multiple clicks
    button.disabled = true;
    button.textContent = 'Deleting...';

    try {
        const response = await fetch(`http://media.maar.world:3001/api/soundEngines/${engineId}`, {
            method: 'DELETE',
            credentials: 'include', // Include cookies
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to delete the Sound Engine.');
        }

        const data = await response.json();
        if (data.success) {
            showToast('Sound Engine deleted successfully!', 'success');
            // Remove the sound engine from the DOM
            const soundEngineListItem = button.closest('.soundEngine-list-item');
            if (soundEngineListItem) {
                soundEngineListItem.remove();
            }
            // Clear the profile cache after deletion
            lscache.remove(cacheKey);
            console.log(`Sound Engine "${engineId}" deleted and DOM updated.`);
        } else {
            throw new Error(data.message || 'Failed to delete the Sound Engine.');
        }
    } catch (error) {
        console.error('Error deleting Sound Engine:', error);
        showToast(`Error: ${error.message}`, 'error');
        button.disabled = false;
        button.textContent = 'Delete';
    }
}

/**
 * Function to handle the deletion of an interplanetary player
 * @param {string} playerId - The ID of the interplanetary player to delete
 * @param {HTMLElement} buttonElement - The delete button that was clicked
 */
async function deleteInterplanetaryPlayer(playerId, buttonElement) {
    const userId = localStorage.getItem('userId');
    const cacheKey = `profile_${userId}`;

    if (!userId) {
        alert('User not authenticated. Please log in.');
        return;
    }

    // Display a confirmation prompt before deletion
    const confirmation = confirm('Are you sure you want to delete this Interplanetary Player? This action cannot be undone.');
    if (!confirmation) return;

    try {
        const response = await fetch(`http://media.maar.world:3001/api/interplanetaryplayers/${playerId}`, {
            method: 'DELETE',
            credentials: 'include', // Include cookies
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Failed to delete the Interplanetary Player.');
        }

        const result = await response.json();
        if (result.success) {
            const playerContainer = buttonElement.closest('.interplanetaryPlayer-list-item');
            if (playerContainer) {
                playerContainer.remove();
                showToast('Player deleted successfully.', 'success');
                console.log(`Interplanetary Player "${playerId}" deleted and DOM updated.`);
            }
            // Clear the profile cache after deletion
            lscache.remove(cacheKey);
        } else {
            throw new Error(result.message || 'Failed to delete the Interplanetary Player.');
        }
    } catch (error) {
        console.error('Error deleting player:', error);
        showToast(`Error: ${error.message}`, 'error');
    }
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
 * Function to handle the card click and toggle the dropdown.
 * @param {string} itemId - The ID of the item (sound engine, track, or interplanetary player).
 * @param {Event} event - The click event.
 */
function handleCardClick(itemId, event) {
    event.preventDefault(); // Prevent default link behavior
    console.log(`Card clicked for ID: ${itemId}`);

    // Find the dropdown inside the clicked card and toggle it
    const card = event.currentTarget;
    const dropdown = card.querySelector('.more-options-dropdown');

    if (dropdown) {
        const isDisplayed = dropdown.classList.contains('show');
        closeAllDropdowns(); // Close any other open dropdowns.

        // Toggle the dropdown visibility
        if (!isDisplayed) {
            dropdown.classList.add('show');
            card.setAttribute('aria-expanded', 'true');
        } else {
            dropdown.classList.remove('show');
            card.setAttribute('aria-expanded', 'false');
        }

        // Debugging Logs
        console.log(`Dropdown for "${itemId}" is now ${!isDisplayed ? 'shown' : 'hidden'}.`);
    }
}

function toggleMoreOptions(event) {
    console.log(event);
    event.stopPropagation(); // Prevent event from bubbling up.
    const dropdown = event.currentTarget.nextElementSibling;
    if (dropdown) {
        const isDisplayed = dropdown.classList.contains('show');
        closeAllDropdowns(); // Close any other open dropdowns.
        if (!isDisplayed) {
            dropdown.classList.add('show');
            event.currentTarget.setAttribute('aria-expanded', 'true');
            console.log('Dropdown shown.');
        } else {
            dropdown.classList.remove('show');
            event.currentTarget.setAttribute('aria-expanded', 'false');
            console.log('Dropdown hidden.');
        }
    }
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.more-options-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show');
    });

    const buttons = document.querySelectorAll('.more-options-button');
    buttons.forEach(button => {
        button.setAttribute('aria-expanded', 'false');
    });

    console.log('All dropdowns closed.');
}

// Event listener to close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.collapsible-section')) {
        closeAllDropdowns();
    }
});

/**
 * Function to restore the scroll position.
 */
function restoreScrollPosition() {
    const lastScrollY = localStorage.getItem('lastScrollY');
    if (lastScrollY) {
        // Use a smoother scroll effect
        window.scrollTo({
            top: parseInt(lastScrollY, 10),
            behavior: 'smooth' // This will apply smooth scrolling
        });
       // console.log(`Restored scroll position to: ${lastScrollY}`);
    }
}

/**
 * Function to handle saving the scroll position.
 */
window.addEventListener('scroll', () => {
    // Save the current scroll position to local storage
    localStorage.setItem('lastScrollY', window.scrollY);
   // console.log(`Scroll position saved: ${window.scrollY}`);
});
</script>
