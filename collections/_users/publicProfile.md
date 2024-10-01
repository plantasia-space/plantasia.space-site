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

    if (!username) {
        document.getElementById('profileView').innerHTML = '<p style="color:red;">Profile not found. Please provide a valid username.</p>';
        return;
    }

    fetch(`http://media.maar.world:3001/api/profile?username=${username}`)
        .then(response => response.json())
        .then(data => {
            if (!data || data.error) {
                document.getElementById('profileView').innerHTML = '<p style="color:red;">Profile not found.</p>';
                return;
            }

            console.log('Received public user data:', data);

            document.getElementById('displayDisplayName').innerText = data.displayName || 'Not provided';
            document.getElementById('displayUsername').innerText = data.username || 'Not provided';
            document.getElementById('displayProfileURL').innerText = username || 'Not provided';
            document.getElementById('displayRole').innerText = data.role || 'Not provided';

            const userId = data.userId;
            const loggedInUserId = localStorage.getItem('userId');
            console.log("loggedInUserId", loggedInUserId);
            const profileUrl = `https://maar.world/xplorer/?username=${username}`;

            if (data.pronouns && data.pronouns !== 'Prefer not to say') {
                document.getElementById('displayPronouns').innerText = data.pronouns === 'Other' ? data.otherPronouns : data.pronouns;
                document.getElementById('pronounsDisplay').style.display = 'block';
            } else {
                document.getElementById('pronounsDisplay').style.display = 'none';
            }

            if (data.profileImage) {
                const profileImageUrl = `https://media.maar.world${data.profileImage}`;
                document.getElementById('profileImagePreview').src = profileImageUrl;
                document.getElementById('profileImagePreview').style.display = 'block';
            }

            document.getElementById('displayCity').innerText = data.city || 'Not provided';
            document.getElementById('displayCountry').innerText = data.country || 'Not provided';
            document.getElementById('displayBio').innerText = data.bio || 'Not provided';

            const customLinks = data.customLinks || [];
            if (customLinks[0]) document.getElementById('customLink1Display').innerHTML = `<a href="${customLinks[0]}" target="_blank">${customLinks[0]}</a>`;
            if (customLinks[1]) document.getElementById('customLink2Display').innerHTML = `<a href="${customLinks[1]}" target="_blank">${customLinks[1]}</a>`;
            if (customLinks[2]) document.getElementById('customLink3Display').innerHTML = `<a href="${customLinks[2]}" target="_blank">${customLinks[2]}</a>`;

            fetch(`http://media.maar.world:3001/api/following/${userId}`)
                .then(response => response.json())
                .then(followingData => {
                            console.log('Following data:', followingData); // Log the response

                    const followingList = document.getElementById('followingList');
                    if (followingData && Array.isArray(followingData)) {
                        followingList.innerHTML = followingData.length > 0 ? followingData.map(following => `<li>${following.followingId.username}</li>`).join('') : '<li>No following users.</li>';
                        document.getElementById('followingCount').innerText = followingData.length;
                    } else {
                        followingList.innerHTML = '<li>No following users.</li>';
                        document.getElementById('followingCount').innerText = '0';
                    }
                });

            fetch(`http://media.maar.world:3001/api/followers/${userId}`)
                .then(response => response.json())
                .then(followersData => {
                    const followersList = document.getElementById('followersList');
                    if (followersData && Array.isArray(followersData)) {
                        followersList.innerHTML = followersData.length > 0 ? followersData.map(follower => `<li>${follower.followerId.username}</li>`).join('') : '<li>No followers.</li>';
                        document.getElementById('followersCount').innerText = followersData.length;
                    } else {
                        followersList.innerHTML = '<li>No followers.</li>';
                        document.getElementById('followersCount').innerText = '0';
                    }
                });

            fetch(`http://media.maar.world:3001/api/mutualFollowers/${loggedInUserId}/${userId}`)
                .then(response => response.json())
                .then(mutualFollowersData => {
                    const mutualFollowersList = document.getElementById('mutualFollowersList');
                    if (mutualFollowersData && mutualFollowersData.isMutual) {
                        mutualFollowersList.innerHTML = '<li>Mutual followers found.</li>';
                        document.getElementById('mutualFollowersCount').innerText = '1';
                    } else {
                        mutualFollowersList.innerHTML = '<li>No mutual followers.</li>';
                        document.getElementById('mutualFollowersCount').innerText = '0';
                    }
                });

            fetch(`http://media.maar.world:3001/api/checkFollowStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ followerId: loggedInUserId, followingId: userId })
            })
            .then(response => response.json())
            .then(statusData => {
                let isFollowing = statusData.isFollowing;

                function updateFollowButton() {
                    const followButtonText = document.getElementById('followButtonText');
                    const followButtonIcon = document.getElementById('followButtonIcon');
                    followButtonText.innerText = isFollowing ? 'Unfollow' : 'Follow';
                    followButtonIcon.innerText = isFollowing ? 'park' : 'forest'; // Icons for follow/unfollow
                }

                document.getElementById('followButton').addEventListener('click', function() {
                    const url = isFollowing ? 'unfollow' : 'follow';
                    const endpoint = `http://media.maar.world:3001/api/${url}`;

                    fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ followerId: loggedInUserId, followingId: userId }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === 'Followed successfully' || data.message === 'Unfollowed successfully') {
                            isFollowing = !isFollowing;
                            updateFollowButton();

                            // Update Following and Followers counts
                            fetch(`http://media.maar.world:3001/api/following/${userId}`)
                                .then(response => response.json())
                                .then(followingData => {
                                    document.getElementById('followingCount').innerText = followingData.length;
                                });

                            fetch(`http://media.maar.world:3001/api/followers/${userId}`)
                                .then(response => response.json())
                                .then(followersData => {
                                    document.getElementById('followersCount').innerText = followersData.length;
                                });

                            fetch(`http://media.maar.world:3001/api/mutualFollowers/${loggedInUserId}/${userId}`)
                                .then(response => response.json())
                                .then(mutualFollowersData => {
                                    document.getElementById('mutualFollowersCount').innerText = mutualFollowersData.isMutual ? 1 : 0;
                                });
                        } else {
                            console.error('Error:', data.message);
                        }
                    })
                    .catch(error => console.error('Error:', error));
                });

                updateFollowButton();
            })
            .catch(error => console.error('Error checking follow status:', error));

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
        .catch(error => console.error('Error fetching public user data:', error));
});
</script>
