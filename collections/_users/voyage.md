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
    <p><a href="/voyage/proto"><span class="material-symbols-outlined">globe</span> Create or edit a new Interplanetary Player</a></p> 
    <p><a href="/voyage/track-release"><span class="material-symbols-outlined">diversity_1</span> Release a new track</a></p> 
    <p><a href="/voyage/playlist"><span class="material-symbols-outlined">playlist_add_circle</span> Create a new playlist or album</a></p> 

    <h2>Your Released Tracks:</h2>
    <ul id="tracks-list"></ul>

    <h2>Your Sound Engines:</h2>
<ul class="soundEngine-list" id="sound-engines-list"></ul>
</div>

<script>
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found, redirecting to login.');
            window.location.href = '/login';
            return;
        }

        // Send a request to the backend to verify the token and fetch user data
        const response = await fetch('http://media.maar.world:3001/api/auth/check-session', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Check if the response is valid
        if (!response.ok) {
            console.error('Session validation failed, redirecting to login.');
            window.location.href = '/login';
            return;
        }

        const { user } = await response.json();

        if (!user) {
            console.error('No user data found, redirecting to login.');
            window.location.href = '/login';
            return;
        }

        console.log('User is logged in:', user);

        // Display user information on the page using username instead of email
        displayUserInfo(user.role || 'Listener', user.username || user.email);

        // Display user tracks and sound engines using the user object
        displayTracks(user.tracksOwned || []);
        displaySoundEngines(user.enginesOwned || [], user.userId);
    } catch (error) {
        console.error('Error fetching user session:', error);
        window.location.href = '/login';
    }
});

// Function to display user information
function displayUserInfo(userRole, userName) {
    const userInfoElement = document.getElementById('user-info');

    // Store the username in localStorage
    localStorage.setItem('username', userName);

    // Display the user info in the HTML
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
function displaySoundEngines(engineIds) {
    const soundEnginesListElement = document.getElementById('sound-engines-list');
    soundEnginesListElement.innerHTML = ''; // Clear any existing content

    if (!engineIds || engineIds.length === 0) {
        soundEnginesListElement.innerHTML = '<li>No sound engines found.</li>';
        return;
    }

    // For each sound engine ID, fetch its details and display
    engineIds.forEach(async (engineId) => {
        try {
            const response = await fetch(`http://media.maar.world:3001/api/soundengines/${engineId}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch details for engine ID: ${engineId}`);
            }

            const data = await response.json();
            const engine = data.soundEngine;
            console.log('Fetched Sound Engine:', engine);

            // Construct the full image URL, using a default if none exists
            const imageUrl = engine.soundEngineImage 
                ? `https://media.maar.world${engine.soundEngineImage}` 
                : '/path/to/default-placeholder.png';

            // Create the sound engine display element
            const engineElement = document.createElement('li');
            engineElement.classList.add('soundEngine-list-item');
            engineElement.innerHTML = `
                <div class="soundEngine-profile-pic">
                    <img src="${imageUrl}" alt="${engine.soundEngineName}">
                </div>
                <div class="soundEngine-details">
                    <div class="soundEngine-name">${engine.soundEngineName}</div>
                    <div class="soundEngine-availability">Availability: ${engine.availability}</div>
                    <div class="soundEngine-params">
                        X Parameter: ${engine.xParam.label} |
                        Y Parameter: ${engine.yParam.label} |
                        Z Parameter: ${engine.zParam.label}
                    </div>
                </div>
                <div class="soundEngine-actions">
                    <button class="soundEngine-edit-button" onclick="editSoundEngine('${engine._id}')">Edit</button>
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

</script>
