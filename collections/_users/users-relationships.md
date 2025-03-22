---
layout: articles
show_title: false
show_date: false
permalink: /voyage/user-relationships
titles:
  en: &EN User Relationships
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: userRelationships
public: false
---

<div class="p-5"></div>

<div class="form-container">
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
            </a>
        </div>
    </div>

    <h3>User Relationships</h3>
    <div class="p-2"></div>

    <div id="relationshipView">
        <!-- Displayed Relationship Information -->
        <p><strong>Follower ID:</strong> <span id="displayFollowerId"></span></p>
        <p><strong>Following ID:</strong> <span id="displayFollowingId"></span></p>
        <p><strong>Following IP ID:</strong> <span id="displayFollowingIpId"></span></p>
        <p><strong>Status:</strong> <span id="displayStatus"></span></p>
        <p><strong>Notes:</strong> <span id="displayNotes"></span></p>

        <!-- Buttons to interact with relationships -->
        <div class="button-container">
            <button id="followButton" class="btn button--primary">Follow</button>
            <button id="unfollowButton" class="btn button--danger">Unfollow</button>
            <button id="blockButton" class="btn button--danger">Block</button>
            <button id="unblockButton" class="btn button--primary">Unblock</button>
            <button id="checkMutualButton" class="btn button--primary">Check Mutual Followers</button>
        </div>
    </div>

    <form id="relationshipForm" class="contact-form">
        <!-- Follower ID -->
        <strong><label for="followerId">Your User ID:</label></strong>
        <input type="text" id="followerId" name="followerId" required><br><br>

        <!-- Following ID -->
        <strong><label for="followingId">User ID to Follow/Unfollow:</label></strong>
        <input type="text" id="followingId" name="followingId"><br><br>

        <!-- Following IP ID -->
        <strong><label for="followingIpId">IP ID to Follow/Unfollow:</label></strong>
        <input type="text" id="followingIpId" name="followingIpId"><br><br>

        <!-- Category -->
        <strong><label for="category">Category:</label></strong>
        <input type="text" id="category" name="category"><br><br>

        <!-- Notes -->
        <strong><label for="notes">Notes:</label></strong>
        <textarea id="notes" name="notes" maxlength="500"></textarea><br><br>
    </form>

    <div class="p-2"></div>

    <!-- Progress Bar -->
    <div class="progress-bar" style="width: 100%; background-color: lightgray;">
        <div id="progress" style="width: 0%; height: 20px; background-color: green;"></div>
    </div>

    <!-- Message Display -->
    <p id="messageDisplay" style="text-align: center;"></p>
</div>


<script>
document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        document.getElementById('messageDisplay').innerText = 'No logged-in user found. Please log in first.';
        document.getElementById('messageDisplay').style.color = 'red';
        window.location.href = '/login';
        return;
    }

    // Set the followerId to the logged-in user
    document.getElementById('followerId').value = userId;

    // Event listener for the Follow button
    document.getElementById('followButton').addEventListener('click', async function() {
        console.log('Follow button clicked');
        
        const formData = {
            followerId: document.getElementById('followerId').value.trim(),
            followingId: document.getElementById('followingId').value.trim(),
            followingIpId: document.getElementById('followingIpId').value.trim(),
            category: document.getElementById('category').value.trim(),
            notes: document.getElementById('notes').value.trim()
        };

        console.log('Form data to be sent:', formData);

        try {
            const response = await fetch('https://api.plantasia.space:443/api/user-relationships/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);

    // Attempt to parse the response as JSON
    let result;
    try {
        result = await response.json();
    } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        const textResponse = await response.text();
        console.error('Response text:', textResponse);
        throw new Error('Unexpected response format');
    }

    if (response.ok) {
        console.log('Follow operation successful:', result);
        document.getElementById('messageDisplay').innerText = 'Followed successfully!';
        document.getElementById('messageDisplay').style.color = 'green';
    } else {
        throw new Error(result.message || 'Unknown error');
    }
} catch (error) {
    console.error('Error during follow operation:', error);
    document.getElementById('messageDisplay').innerText = error.message;
    document.getElementById('messageDisplay').style.color = 'red';
}
    });

    // Event listener for the Unfollow button
    document.getElementById('unfollowButton').addEventListener('click', async function() {
        console.log('Unfollow button clicked');

        const formData = {
            followerId: document.getElementById('followerId').value.trim(),
            followingId: document.getElementById('followingId').value.trim(),
            followingIpId: document.getElementById('followingIpId').value.trim()
        };

        console.log('Form data to be sent:', formData);

        try {
            const response = await fetch('https://api.plantasia.space:443/api/user-relationships/unfollow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);

            const result = await response.json();
            if (response.ok) {
                console.log('Unfollow operation successful:', result);
                document.getElementById('messageDisplay').innerText = 'Unfollowed successfully!';
                document.getElementById('messageDisplay').style.color = 'green';
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error during unfollow operation:', error);
            document.getElementById('messageDisplay').innerText = error.message;
            document.getElementById('messageDisplay').style.color = 'red';
        }
    });

    // Event listener for the Block button
    document.getElementById('blockButton').addEventListener('click', async function() {
        console.log('Block button clicked');

        const formData = {
            blockerId: document.getElementById('followerId').value.trim(),
            blockedId: document.getElementById('followingId').value.trim(),
            blockedIpId: document.getElementById('followingIpId').value.trim()
        };

        console.log('Form data to be sent:', formData);

        try {
            const response = await fetch('https://api.plantasia.space:443/api/user-relationships/blockUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);

            const result = await response.json();
            if (response.ok) {
                console.log('Block operation successful:', result);
                document.getElementById('messageDisplay').innerText = 'Blocked successfully!';
                document.getElementById('messageDisplay').style.color = 'green';
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error during block operation:', error);
            document.getElementById('messageDisplay').innerText = error.message;
            document.getElementById('messageDisplay').style.color = 'red';
        }
    });

function displayFollowingList(followingList) {
    // Example: Log the usernames of the following users
    followingList.forEach(relationship => {
        console.log(`Following user: ${relationship.followingId.username}`);
    });

    // Alternatively, update the DOM to show the list of following users
    const followingContainer = document.getElementById('followingContainer');
    followingContainer.innerHTML = ''; // Clear any existing content

    followingList.forEach(relationship => {
        const userElement = document.createElement('div');
        userElement.textContent = relationship.followingId.displayName || relationship.followingId.username;
        followingContainer.appendChild(userElement);
    });
}


    // Event listener for the Unblock button
    document.getElementById('unblockButton').addEventListener('click', async function() {
        console.log('Unblock button clicked');

        const formData = {
            blockerId: document.getElementById('followerId').value.trim(),
            blockedId: document.getElementById('followingId').value.trim(),
            blockedIpId: document.getElementById('followingIpId').value.trim()
        };

        console.log('Form data to be sent:', formData);

        try {
            const response = await fetch('https://api.plantasia.space:443/api/user-relationships/unblockUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);

            const result = await response.json();
            if (response.ok) {
                console.log('Unblock operation successful:', result);
                document.getElementById('messageDisplay').innerText = 'Unblocked successfully!';
                document.getElementById('messageDisplay').style.color = 'green';
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error during unblock operation:', error);
            document.getElementById('messageDisplay').innerText = error.message;
            document.getElementById('messageDisplay').style.color = 'red';
        }
    });

    // Event listener for checking mutual followers
    document.getElementById('checkMutualButton').addEventListener('click', async function() {
        console.log('Check mutual followers button clicked');

        const userId1 = document.getElementById('followerId').value.trim();
        const userId2 = document.getElementById('followingId').value.trim();

        try {
            const response = await fetch(`https://api.plantasia.space:443/api/user-relationships/mutualFollowers/${userId1}/${userId2}`, {
                method: 'GET'
            });

            console.log('Response status:', response.status);

            const result = await response.json();
            if (response.ok) {
                console.log('Mutual followers check successful:', result);
                document.getElementById('messageDisplay').innerText = `Mutual Followers: ${result.mutualFollowers}`;
                document.getElementById('messageDisplay').style.color = 'green';
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error during mutual followers check:', error);
            document.getElementById('messageDisplay').innerText = error.message;
            document.getElementById('messageDisplay').style.color = 'red';
        }
    });
});
</script>
