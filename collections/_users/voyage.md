---
layout: articles
show_title: false
show_date: false
permalink: /voyage
titles:
  en: &EN voyage
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
public: false
---

<div id="voyage-content">
    <h1>Voyage</h1>
    <p id="user-info"></p>

    <p><a href="/voyage/profile"><span class="material-symbols-outlined">account_circle</span> Go to your profile</a></p> 
    <p><a href="/voyage/soundengine"><span class="material-symbols-outlined">noise_control_on</span> Create a new sound engine</a></p> 
    <p><a href="/voyage/interplanetary-player"><span class="material-symbols-outlined">globe</span> Create or edit a new Interplanetary Player</a></p> 
    <p><a href="/voyage/track-release"><span class="material-symbols-outlined">diversity_1</span> Release a new track</a></p> 
    <p><a href="/voyage/playlist"><span class="material-symbols-outlined">playlist_add_circle</span> Create a new playlist or album</a></p> 

    <h2>Your Released Tracks:</h2>
    <ul id="tracks-list"></ul>

    <h2>Your Sound Engines:</h2>
    <ul class="soundEngine-list" id="sound-engines-list"></ul>

    <h2>Your Interplanetary Players:</h2>
    <ul class="interplanetaryPlayer-list" id="interplanetary-players-list"></ul>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const cachedSession = localStorage.getItem('sessionData');
    const user = cachedSession ? JSON.parse(cachedSession) : null;

    if (user) {
        // Display user-related data using the cached session
        displayUserInfo(user.role || 'Listener', user.username || user.email);
        displayTracks(user.tracksOwned || []);
        displaySoundEngines(user.enginesOwned || [], user.userId);
        displayInterplanetaryPlayers(user.interplanetaryPlayersOwned || []);
    } else {
        console.error('No valid session found. Redirecting to login...');
        window.location.href = '/login';
    }
});

// Function to display user information
function displayUserInfo(userRole, userName) {
    const userInfoElement = document.getElementById('user-info');
    userInfoElement.innerHTML = `
        <strong>User Role:</strong> ${userRole}<br>
        <strong>User Name:</strong> ${userName}
    `;
}

// Function to display tracks on the page
function displayTracks(tracks) {
    const tracksListElement = document.getElementById('tracks-list');

    if (!tracks || tracks.length === 0) {
        tracksListElement.innerHTML = '<li>No tracks found.</li>';
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
}

// Function to display sound engines on the page
function displaySoundEngines(engineIds, userId) {
    const soundEnginesListElement = document.getElementById('sound-engines-list');
    soundEnginesListElement.innerHTML = '';

    if (!engineIds || engineIds.length === 0) {
        soundEnginesListElement.innerHTML = '<li>No sound engines found.</li>';
        return;
    }

    engineIds.forEach(async (engineId) => {
        try {
            const response = await fetch(`http://media.maar.world:3001/api/soundengines/${engineId}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch details for engine ID: ${engineId}`);
            }

            const data = await response.json();
            const engine = data.soundEngine;

            const imageUrl = engine.soundEngineImage 
                ? `https://media.maar.world${engine.soundEngineImage}` 
                : '/path/to/default-placeholder.png';

            const engineElement = document.createElement('li');
            engineElement.classList.add('soundEngine-list-item');
            engineElement.innerHTML = `
                <div class="soundEngine-profile-pic">
                    <img src="${imageUrl}" alt="${engine.soundEngineName}">
                </div>
                <div class="soundEngine-details">
                    <div class="soundEngine-name">${engine.soundEngineName}</div>
                    <div class="soundEngine-availability"><strong>Availability:</strong> ${engine.isPublic ? '🌍 Shared' : '🔐 Exclusive'}</div>

                    <div class="soundEngine-params">
                        X Parameter: ${engine.xParam.label} |
                        Y Parameter: ${engine.yParam.label} |
                        Z Parameter: ${engine.zParam.label}
                    </div>
                </div>
                <div class="soundEngine-actions">
                    <button class="soundEngine-edit-button" onclick="editSoundEngine('${engine._id}')"><span class="material-symbols-outlined">edit</span> Edit</button>
                    <button 
                        class="btn share-button" 
                        ${engine.isPublic ? '' : 'disabled'} 
                        onclick="shareSoundEngine('${engine._id}')"
                    >
                          <span class="material-symbols-outlined">share</span> Share
                    </button>
                </div>
            `;
            soundEnginesListElement.appendChild(engineElement);
        } catch (error) {
            console.error(`Error fetching sound engine details for ID: ${engineId}`, error);
        }
    });
}

// Function to handle editing a sound engine
function editSoundEngine(engineId) {
    window.location.href = `/voyage/soundEngine?mode=edit&id=${engineId}`;
}

// Function to handle sharing a sound engine
function shareSoundEngine(engineId) {
    const shareUrl = `http://maar.world/xplorer/sound-engine/?engineId=${engineId}`;
    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy link: ', err);
            alert('Failed to copy the link. Please try again.');
        });
}

// Function to display interplanetary players on the page
function displayInterplanetaryPlayers(playerIds) {
    const playersListElement = document.querySelector('.interplanetaryPlayer-list');
    playersListElement.innerHTML = ''; // Clear any existing content

    if (!playerIds || playerIds.length === 0) {
        playersListElement.innerHTML = '<li>No interplanetary players found.</li>';
        return;
    }

    playerIds.forEach(async (playerId) => {
        try {
            const response = await fetch(`http://media.maar.world:3001/api/interplanetaryplayers/${playerId}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch details for player ID: ${playerId}`);
            }

            const data = await response.json();
            const player = data.player;

            const imageUrl = player.ddd?.textureURL ? `https://media.maar.world${player.ddd.textureURL}` : '/path/to/default-image.png';

            const playerElement = document.createElement('li');
            playerElement.classList.add('interplanetaryPlayer-list-item');
            playerElement.innerHTML = `
                <div class="interplanetaryPlayer-profile-pic">
                    <img src="${imageUrl}" alt="${player.artName}">
                </div>
                <div class="interplanetaryPlayer-details">
                    <div class="interplanetaryPlayer-name">${player.artName || 'Unnamed'}</div>
                    <div class="interplanetaryPlayer-params"><strong>Scientific Name:</strong> ${player.sciName || 'Unknown'}</div>
                    <div class="interplanetaryPlayer-params"><strong>Description:</strong> ${player.description?.slice(0, 50) || 'No description available.'}...</div>
                    <div class="interplanetaryPlayer-availability"><strong>Availability:</strong> ${player.isPublic ? 'Public' : 'Private'}</div>
                </div>
                <div class="interplanetaryPlayer-actions">
                    <button class="interplanetaryPlayer-edit-button" onclick="editInterplanetaryPlayer('${player._id}')">
                        <span class="material-symbols-outlined">edit</span> Edit
                    </button>
                    <button 
                        class="btn share-button" 
                        ${player.isPublic ? '' : 'disabled'} 
                        onclick="shareInterplanetaryPlayer('${player._id}')"
                    >
                        <span class="material-symbols-outlined">share</span> Share
                    </button>
                </div>
            `;
            playersListElement.appendChild(playerElement);
        } catch (error) {
            console.error(`Error fetching interplanetary player details for ID: ${playerId}`, error);
        }
    });
}

// Function to handle editing an interplanetary player
function editInterplanetaryPlayer(playerId) {
    window.location.href = `/voyage/interplanetary-player?mode=edit&playerId=${playerId}`;
}

// Function to handle sharing an interplanetary player
function shareInterplanetaryPlayer(playerId) {
    const shareUrl = `http://maar.world/xplorer/interplanetary-player/?playerId=${playerId}`;
    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy link: ', err);
            alert('Failed to copy the link. Please try again.');
        });
}
</script>
