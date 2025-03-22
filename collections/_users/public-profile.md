---
layout: articles
show_title: false
show_date: false
permalink: /xplorer/
titles:
  en: &EN xPlorer Public Profile
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: xPlorer
public: true
---

<div class="p-5"></div>

<div class="form-container">
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Back to Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
            </a>
        </div>
    </div>

    <h3>xPlorer Public Profile</h3>
    <div class="p-2"></div>

    <div id="profileView">
        <!-- Profile Image Display -->
        <div id="profileImagePreviewContainer">
            <img id="profileImagePreview" src="" alt="Profile Image">
        </div>

        <div class="p-2"></div>
        <!-- Displayed Profile Information -->
        <p><strong>Display Name:</strong> <span id="displayDisplayName"></span></p>
        <p><strong>Username:</strong> <span id="displayUsername"></span></p>
        <p><strong>Profile URL:</strong> maar.world/xplorer/<span id="displayProfileURL"></span></p>
        <p><strong>Role:</strong> <span id="displayRole"></span></p>
        <!-- Pronouns Fields -->
        <p id="pronounsDisplay" style="display: none;"><strong>Pronouns:</strong> <span id="displayPronouns"></span></p>
        <p id="otherPronounsDisplay" style="display: none;"><strong>Other Pronouns:</strong> <span id="displayOtherPronouns"></span></p>
        <!-- New Display Fields -->
        <p><strong>City:</strong> <span id="displayCity"></span></p>
        <p><strong>Country:</strong> <span id="displayCountry"></span></p>
        <p><strong>Bio:</strong> <span id="displayBio"></span></p>
        <p><strong>Custom Links:</strong>
        <div id="displayCustomLinks">
            <span id="customLink1Display"></span>
            <span id="separator1" style="display:none;"> | </span> <!-- Hide separator by default -->
            <span id="customLink2Display"></span>
            <span id="separator2" style="display:none;"> | </span> <!-- Hide separator by default -->
            <span id="customLink3Display"></span>
        </div>
        </p>

        <!-- Following/Followers/Mutual Followers Sections -->
        <div id="followingContainer">
            <h4>Following (<span id="followingCount">0</span>)</h4>
            <ul id="followingList"></ul>
        </div>

        <div id="followersContainer">
            <h4>Followers (<span id="followersCount">0</span>)</h4>
            <ul id="followersList"></ul>
        </div>

        <div id="mutualFollowersContainer">
            <h4>Mutual Followers (<span id="mutualFollowersCount">0</span>)</h4>
            <ul id="mutualFollowersList"></ul>
        </div>

        <!-- New Button Container -->
        <div class="new-button-container">
            <button id="followButton" class="btn button--primary" title="Follow/Unfollow User">
                <span id="followButtonIcon" class="material-symbols-outlined">forest</span> <span id="followButtonText">Follow</span>
            </button>
            <button id="shareButton" class="btn button--outline-primary" title="Share Profile">
                <span class="material-symbols-outlined">share</span> Share
            </button>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const loggedInUserId = localStorage.getItem('userId');
    const loggedUsername = localStorage.getItem('username');

    if (!username) {
        document.getElementById('profileView').innerHTML = '<p style="color:red;">Profile not found. Please provide a valid username.</p>';
        return;
    }

    // Fetch the public profile data
    fetch(`https://api.plantasia.space:443/api/users/getPublicProfile?username=${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.error) {
                document.getElementById('profileView').innerHTML = '<p style="color:red;">Profile not found.</p>';
                return;
            }

            // Populate profile data
            document.getElementById('displayDisplayName').innerText = data.displayName || 'Not provided';
            document.getElementById('displayUsername').innerText = data.username || 'Not provided';
            document.getElementById('displayProfileURL').innerText = username || 'Not provided';
            document.getElementById('displayRole').innerText = data.role || 'Not provided';
            console.log(data);
            // Set profile image or fallback
            const profileImageUrl = data.thumbMidURL || 'https://mw-storage.fra1.digitaloceanspaces.com/default/default-profile_thumbnail_mid.webp';
            document.getElementById('profileImagePreview').src = profileImageUrl;

            document.getElementById('displayCity').innerText = data.city || 'Not provided';
            document.getElementById('displayCountry').innerText = data.country || 'Not provided';
            document.getElementById('displayBio').innerText = data.bio || 'Not provided';

            // Custom links
            const customLinks = data.customLinks || [];
            if (customLinks[0]) document.getElementById('customLink1Display').innerHTML = `<a href="${customLinks[0]}" target="_blank">${customLinks[0]}</a>`;
            if (customLinks[1]) document.getElementById('customLink2Display').innerHTML = `<a href="${customLinks[1]}" target="_blank">${customLinks[1]}</a>`;
            if (customLinks[2]) document.getElementById('customLink3Display').innerHTML = `<a href="${customLinks[2]}" target="_blank">${customLinks[2]}</a>`;

            // Fetching following users
            fetch(`https://api.plantasia.space:443/api/userRelationships/following/${username}`)
                .then(response => response.json())
                .then(followingData => {
                    const followingList = document.getElementById('followingList');
                    followingList.innerHTML = followingData.length > 0 
                        ? followingData.map(following => `
                            <li class="user-list-item">
                                <div class="user-profile-pic">
                                    <img src="${following.user.thumbMidURL || 'https://mw-storage.fra1.digitaloceanspaces.com/default/default-profile_thumbnail_mid.webp'}" alt="${following.user.username}">
                                </div>
                                <div class="user-details">
                                    <div class="user-display-name">${following.user.displayName || 'Unknown'}</div>
                                    <div class="user-username">
                                        <a href="/xplorer/?username=${following.user.username}" target="_self">
                                            @${following.user.username || 'Unknown'}
                                        </a>
                                    </div>
                                </div>
                            </li>`).join('')
                        : '<li>No following users.</li>';
                    document.getElementById('followingCount').innerText = followingData.length;
                });

            // Fetching followers
            fetch(`https://api.plantasia.space:443/api/userRelationships/followers/${username}`)
                .then(response => response.json())
                .then(followersData => {
                    const followersList = document.getElementById('followersList');
                    followersList.innerHTML = followersData.length > 0 
                        ? followersData.map(follower => `
                            <li class="user-list-item">
                                <div class="user-profile-pic">
                                    <img src="${follower.user.thumbMidURL || 'https://mw-storage.fra1.digitaloceanspaces.com/default/default-profile_thumbnail_mid.webp'}" alt="${follower.user.username}">
                                </div>
                                <div class="user-details">
                                    <div class="user-display-name">${follower.user.displayName || 'Unknown'}</div>
                                    <div class="user-username">
                                        <a href="/xplorer/?username=${follower.user.username}" target="_self">
                                            @${follower.user.username || 'Unknown'}
                                        </a>
                                    </div>
                                </div>
                            </li>`).join('')
                        : '<li>No followers.</li>';
                    document.getElementById('followersCount').innerText = followersData.length;
                });

            // Fetching mutual followers
fetch(`https://api.plantasia.space:443/api/userRelationships/mutualFollowers/${loggedUsername}/${username}`)
    .then(response => response.json())
    .then(mutualFollowersData => {
        const mutualFollowersList = document.getElementById('mutualFollowersList');
        
        // Check if mutualFollowersData and mutualFollowersData.mutualFollowers are defined
        if (mutualFollowersData && mutualFollowersData.mutualFollowers) {
            mutualFollowersList.innerHTML = mutualFollowersData.mutualFollowers.length > 0 
                ? mutualFollowersData.mutualFollowers.map(mutualFollower => `
                    <li class="user-list-item">
                        <div class="user-profile-pic">
                            <img src="${mutualFollower.user.thumbMidURL || 'https://mw-storage.fra1.digitaloceanspaces.com/default/default-profile_thumbnail_mid.webp'}" alt="${mutualFollower.user.username}">
                        </div>
                        <div class="user-details">
                            <div class="user-display-name">${mutualFollower.user.displayName || 'Unknown'}</div>
                            <div class="user-username">
                                <a href="/xplorer/?username=${mutualFollower.user.username}" target="_self">
                                    @${mutualFollower.user.username || 'Unknown'}
                                </a>
                            </div>
                        </div>
                    </li>`).join('')
                : '<li>No mutual followers.</li>';
            document.getElementById('mutualFollowersCount').innerText = mutualFollowersData.mutualFollowers.length;
        } else {
            mutualFollowersList.innerHTML = '<li>No mutual followers.</li>';
            document.getElementById('mutualFollowersCount').innerText = '0';
        }
    })
    .catch(error => {
        console.error('Error fetching mutual followers data:', error);
        document.getElementById('mutualFollowersList').innerHTML = '<li>Error fetching mutual followers.</li>';
    });

            // Check follow/unfollow status and set button accordingly
            fetch(`https://api.plantasia.space:443/api/userRelationships/checkFollowStatus`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ followerUsername: loggedUsername, followingUsername: username })
            })
            .then(response => response.json())
            .then(statusData => {
                let isFollowing = statusData.isFollowing;
                const followButtonText = document.getElementById('followButtonText');
                const followButtonIcon = document.getElementById('followButtonIcon');

                function updateFollowButton() {
                    followButtonText.innerText = isFollowing ? 'Unfollow' : 'Follow';
                    followButtonIcon.innerText = isFollowing ? 'park' : 'forest';
                }

                document.getElementById('followButton').addEventListener('click', function() {
                    const url = isFollowing ? 'unfollow' : 'follow';
                    const endpoint = `https://api.plantasia.space:443/api/userRelationships/${url}`;

                    fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ followerUsername: loggedUsername, followingUsername: username })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            isFollowing = !isFollowing;
                            updateFollowButton();
                        }
                    });
                });

                updateFollowButton();
            });

            // Share button logic
            document.getElementById('shareButton').addEventListener('click', function() {
                const tempInput = document.createElement('input');
                tempInput.value = profileUrl;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                alert('Profile URL copied to clipboard');
            });
        })
        .catch(error => {
            console.error('Error fetching public user data:', error);
            document.getElementById('profileView').innerHTML = '<p style="color:red;">Error fetching profile. Please try again later.</p>';
        });
});
</script>
