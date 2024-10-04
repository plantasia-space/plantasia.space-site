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
---

<div id="voyage-content">
    <h1>Bon voyage xPlorer...</h1>
    <p id="user-info"></p> <!-- Placeholder for user role and email -->

    <p><a href="/voyage/profile"><span class="material-symbols-outlined">account_circle</span> Go to your profile</a></p> 

   <p><a href="/voyage/soundengine"><span class="material-symbols-outlined">noise_control_on</span> Create a new sound engine</a></p> 

    <p><a href="/voyage/proto"><span class="material-symbols-outlined">globe</span> Create or edit a new Interplanetary Player</a></p> 

    <p><a href="/voyage/track-release"><span class="material-symbols-outlined">diversity_1</span> Release a new track</a></p> 

    <p><a href="/voyage/playlist"><span class="material-symbols-outlined">playlist_add_circle</span> Create a new playlist or album</a></p> 


    <h2>Your Released Tracks:</h2>
    <ul id="tracks-list"></ul> <!-- Placeholder for the tracks list -->
</div>

<script>
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const supabaseToken = localStorage.getItem('supabaseToken');
        
        if (!supabaseToken) {
            console.error('No token found, redirecting to login.');
            window.location.href = '/login';
            return;
        }

        // Fetch user details using the token
        const { data: { user }, error } = await supabase.auth.getUser(supabaseToken);

        if (error || !user) {
            console.error('Failed to fetch user details, redirecting to login.');
            window.location.href = '/login';
            return;
        }

        console.log('Retrieved user:', user);

        // Display user info on the page
        displayUserInfo(user.role || 'Listener', user.email);

        // Fetch user profile and track data
        await fetchUserTracks(user.id);
    } catch (error) {
        console.error('Error fetching user details:', error);
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


// Function to fetch all user tracks
async function fetchUserTracks(userId) {
    try {
        // Fetch the user's tracks data
        const response = await fetch(`http://media.maar.world:3001/api/user/${userId}/tracks`);

        if (!response.ok) {
            throw new Error('Failed to fetch user tracks');
        }

        const data = await response.json();
        const tracks = data.tracks; // Array of track objects with details

        console.log('Tracks Owned:', tracks);

        // Display tracks on the page
        displayTracks(tracks);
    } catch (error) {
        console.error('Error fetching user tracks:', error);
    }
}

// Function to display tracks on the page
// Function to display tracks on the page
function displayTracks(tracks) {
    const tracksListElement = document.getElementById('tracks-list');

    if (!tracks || tracks.length === 0) {
        tracksListElement.innerHTML = '<li>No tracks found.</li>';
        return;
    }

    tracks.forEach(track => {
        // Assuming track.artistNames is an array of objects, where each object has a `name` field
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

</script>
