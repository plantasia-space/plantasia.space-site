---
layout: articles
show_title: false
show_date: false
permalink: /voyage/playlist
titles:
  en: &EN Manage Playlist
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
public: false
---

<!-- Playlist Management Container -->
<div class="form-container">
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Back to Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">brightness_6</span>
                </button>
            </a>
        </div>
        <div class="edit-button-container">
            <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Playlist" style="display: none;">
                <span class="material-symbols-outlined">edit</span>
            </button>
        </div>
    </div>
    <h3 id="formTitle">Playlist</h3>

    <!-- View Mode -->
    <div id="playlistView" style="display: none;">
        <div id="coverImageView" class="cover-image-container">
            <img id="coverImageDisplay" src="" alt="Cover Image" style="max-width: 100%; height: auto;" />
        </div>
        <p id="viewPlaylistName"></p>
        <p id="viewDescription"></p>
        <p id="viewPlaylistType"></p>
        <p id="viewPlaylistPrivacy"></p>
        <p id="viewPlaylistOwner"></p>
        <p id="viewPlaylistTracks"></p>
        <!-- Tracks List -->
        <div id="tracksListContainer">
            <h4>Tracks</h4>
            <ul id="tracksList"></ul>
            <button id="addTrackButton" class="btn btn-success">Add Track</button>
        </div>
    </div>
  
    <!-- Edit/Create Mode -->
    <form id="playlistForm" class="contact-form" style="display: none;" enctype="multipart/form-data">
        <!-- Hidden ownerId input -->
        <input type="hidden" id="ownerId" name="ownerId" value="">
        <input type="hidden" id="playlistId" name="playlistId" value="">
        
        <!-- Cover Image Preview -->
        <div id="coverImagePreviewContainer" class="cover-image-container">
            <img id="coverImagePreview" src="" alt="Cover Image Preview" style="display: none; max-width: 100%; height: auto;">
        </div><br>
        
        <!-- Cover Image Upload -->
        <label for="uploadCoverImage">Upload the cover image for your playlist (Best Size: 800x800 pixels, Max: 5MB, JPG or PNG):</label>
        <input type="file" id="uploadCoverImage" name="coverImage" accept=".jpg, .jpeg, .png"><br><br>

        <!-- Playlist Name -->
        <label for="playlistName">What is the name of the playlist?*</label>
        <input type="text" id="playlistName" name="playlistName" required><br><br>
                
        <!-- Description -->
        <label for="description">Please provide a description for this playlist.</label>
        <textarea id="description" name="description" rows="4" style="width: 100%;"></textarea><br><br>

        <!-- Playlist Type -->
        <label for="playlistType">Playlist Type</label>
        <select id="playlistType" name="playlistType">
            <option value="Playlist" selected>Playlist</option>
            <option value="Album">Album</option>
            <option value="EP">EP</option>
            <option value="Single">Single</option>
            <option value="Compilation">Compilation</option>
        </select><br><br>

        <!-- Playlist Privacy -->
        <label for="playlistPrivacy">Privacy Setting</label>
        <select id="playlistPrivacy" name="playlistPrivacy">
            <option value="public" selected>Public</option>
            <option value="collaborative">Collaborative</option>
            <option value="private">Private</option>
        </select>
        <p class="hint">Choose "Public" to allow anyone to see this playlist, "Collaborative" for shared editing, or "Private" to keep it to yourself.</p><br><br>
        
        <!-- Tracks Management -->
        <div id="tracksManagement">
            <h4>Manage Tracks</h4>
            <ul id="editTracksList"></ul>
            <button type="button" id="addTrackToEditButton" class="btn btn-success">Add Track</button>
        </div>
        <br>
        
        <!-- Submit Button -->
        <button type="submit" id="submitButton">Submit</button>
        <button type="button" id="cancelButton" class="btn button--outline-primary button--circle">Cancel</button>
    </form>
    
    <!-- Loading Message -->
    <div id="loadingMessage" style="display: none; text-align: center;">
        <p>Uploading your playlist, please wait...</p>
        <!-- Loading Spinner -->
        <div class="spinner"></div>
    </div>
    
    <!-- Toast Container -->
    <div id="toastContainer"></div>
</div>

<!-- JavaScript Code -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const API_BASE_URL = 'http://media.maar.world:3001/api'; // Update if different
        const userId = localStorage.getItem('userId'); 
        const authToken = localStorage.getItem('authToken'); // Ensure this is set correctly
        
        if (!userId) {
            showToast('No logged-in user found. Please log in first.', 'error');
            window.location.href = '/login';
            return;
        }
        
        let currentMode = 'create'; // Modes: 'create', 'edit', 'view'
        let currentPlaylistId = null;
        let isOwner = false;
        let canEdit = false; // Flag to determine if user can edit
        let playlistData = null; // Holds playlist data
        let tracks = []; // Array to hold track objects
        
        // DOM Elements
        const formTitle = document.getElementById('formTitle');
        const playlistView = document.getElementById('playlistView');
        const playlistForm = document.getElementById('playlistForm');
        const editButton = document.getElementById('editButton');
        const backButton = document.getElementById('backButton');
        const cancelButton = document.getElementById('cancelButton');
        const coverImageInput = document.getElementById('uploadCoverImage');
        const coverImagePreview = document.getElementById('coverImagePreview');
        const submitButton = document.getElementById('submitButton');
        const toastContainer = document.getElementById('toastContainer');
        const addTrackToEditButton = document.getElementById('addTrackToEditButton');
        const editTracksList = document.getElementById('editTracksList');
        const addTrackButton = document.getElementById('addTrackButton'); // For view mode
        
        const urlParams = new URLSearchParams(window.location.search);
        const modeParam = urlParams.get('mode');
        currentPlaylistId = urlParams.get('playlistId') || '';
        
        // Set the ownerId hidden input
        document.getElementById('ownerId').value = userId;
        
        // Initialize based on mode
        if (modeParam === 'edit' && currentPlaylistId) {
            currentMode = 'edit';
            formTitle.innerText = 'Edit Playlist';
            loadPlaylistDetails(currentPlaylistId);
        } else if (modeParam === 'view' && currentPlaylistId) {
            currentMode = 'view';
            formTitle.innerText = 'Playlist Details';
            loadPlaylistDetails(currentPlaylistId);
        } else {
            currentMode = 'create';
            formTitle.innerText = 'Create a Playlist';
            setFormMode('create');
        }
        
        // Event Listener for Edit Button
        if (editButton) {
            editButton.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default button behavior
                toggleEditMode(); // Toggle between view and edit modes
            });
        }

        // Event Listener for Add Track Button in View Mode
        if (addTrackButton) {
            addTrackButton.addEventListener('click', function() {
                openAddTrackModal(false); // false indicates it's not in edit mode
            });
        }
        
        // Event Listener for Cancel Button
        if (cancelButton) {
            cancelButton.addEventListener('click', function() {
                if (currentMode === 'edit') {
                    setFormMode('view'); // Switch back to view mode
                } else if (currentMode === 'create') {
                    window.location.href = '/voyage'; // Redirect to Voyage
                }
            });
        }
        
        // Event Listener for Back Button
        if (backButton) {
            backButton.addEventListener('click', function() {
                window.location.href = '/voyage'; // Adjust the path as needed
            });
        }
        
        // Event Listener for Cover Image Change
        coverImageInput.addEventListener('change', function(event) {
            handleCoverImageChange(event);
        });
        
        // Event Listener for Form Submission
        playlistForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleFormSubmit();
        });
        
        // Event Listener for Add Track Button in Edit Mode
        if (addTrackToEditButton) {
            addTrackToEditButton.addEventListener('click', function() {
                openAddTrackModal(true); // true indicates it's in edit mode
            });
        }
        
        /**
         * Load Playlist Details from Backend
         * @param {string} playlistId 
         */
        async function loadPlaylistDetails(playlistId) {
            try {
                const response = await fetch(`${API_BASE_URL}/playlists/${encodeURIComponent(playlistId)}?userId=${encodeURIComponent(userId)}`, {
                    method: 'GET',
                    credentials: 'include', // Sends HTTP-only cookies for authentication
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log('Load Playlist Details Response:', data); // Debugging
                if (data.success && data.playlist) {
                    playlistData = data.playlist;
                    // Determine ownership based on ownerId structure and privacy setting
                    if (typeof playlistData.ownerId === 'object' && playlistData.ownerId.userId) {
                        isOwner = playlistData.ownerId.userId === userId;
                    } else {
                        isOwner = playlistData.ownerId === userId;
                    }
                    canEdit = isOwner || (playlistData.privacy === 'collaborative');
                    console.log('Is user the owner?', isOwner);
                    console.log('Can user edit?', canEdit);
                    
                    populateViewMode(data.playlist);
                    populateFormMode(data.playlist);
                    tracks = data.playlist.tracks || [];
                    setFormMode(currentMode);
                } else if (data.success === false && data.message === 'Playlist is being processed.') {
                    showProcessingMessage();
                    // Optionally, implement polling to check when the playlist is ready
                } else {
                    // Display detailed error if available
                    const errorMsg = data.error || 'Failed to load playlist details.';
                    showToast(errorMsg, 'error');
                }
            } catch (error) {
                console.error('Error fetching playlist details:', error);
                showToast('An error occurred while loading playlist details.', 'error');
            }
        }
        
        /**
         * Populate View Mode with Playlist Data
         * @param {object} playlist 
         */
        function populateViewMode(playlist) {
            document.getElementById('viewPlaylistName').innerHTML = `<strong>Playlist Name:</strong> ${escapeHtml(playlist.playlistName) || 'N/A'}`;
            document.getElementById('viewDescription').innerHTML = `<strong>Description:</strong> ${escapeHtml(playlist.description) || 'No description provided.'}`;
            document.getElementById('viewPlaylistType').innerHTML = `<strong>Type:</strong> ${capitalizeFirstLetter(playlist.type) || 'N/A'}`;
            document.getElementById('viewPlaylistPrivacy').innerHTML = `<strong>Privacy:</strong> ${capitalizeFirstLetter(playlist.privacy) || 'N/A'}`;
            document.getElementById('viewPlaylistOwner').innerHTML = `<strong>Owner:</strong> ${
                playlist.owner.username
                    ? `<a href="/xplorer/?username=${encodeURIComponent(playlist.owner.username)}" target="_self">@${escapeHtml(playlist.owner.username)}</a>`
                    : 'Unknown'
            }`;            
            document.getElementById('viewPlaylistTracks').innerHTML = `<strong>Number of Tracks:</strong> ${playlist.tracks.length}`;
        
            const coverImageDisplay = document.getElementById('coverImageDisplay');
            if (playlist.coverImageOriginalURL) {
                coverImageDisplay.src = playlist.coverImageOriginalURL;
            } else {
                coverImageDisplay.src = 'https://media.maar.world/uploads/default/default-playlist.jpg'; // Default image URL
            }
            coverImageDisplay.style.display = 'block';
            
            populateTracksList(playlist.tracks);
        }
        
        /**
         * Populate Tracks List in View Mode
         * @param {Array} tracks 
         */
        function populateTracksList(tracks) {
            const tracksList = document.getElementById('tracksList');
            tracksList.innerHTML = '';
            if (tracks.length === 0) {
                tracksList.innerHTML = '<li>No tracks in this playlist.</li>';
                return;
            }
            tracks.forEach((track, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${escapeHtml(track.title)} by ${escapeHtml(track.artist)} (${escapeHtml(track.duration)})`;
                tracksList.appendChild(li);
            });
        }
        
        /**
         * Populate Form Mode with Playlist Data for Editing
         * @param {object} playlist 
         */
        function populateFormMode(playlist) {
            document.getElementById('playlistId').value = playlist._id || '';
            document.getElementById('playlistName').value = playlist.playlistName || '';
            document.getElementById('description').value = playlist.description || '';
            document.getElementById('playlistType').value = playlist.type || 'Playlist';
            document.getElementById('playlistPrivacy').value = playlist.privacy || 'public';
        
            if (playlist.coverImageOriginalURL) {
                coverImagePreview.src = playlist.coverImageOriginalURL;
                coverImagePreview.style.display = 'block';
            } else {
                coverImagePreview.src = 'https://media.maar.world/uploads/default/default-playlist.jpg'; // Default image URL
                coverImagePreview.style.display = 'block';
            }
            
            // Populate tracks
            tracks = playlist.tracks || [];
            populateEditTracksList();
        }
        
        /**
         * Handle Cover Image Change Event
         * @param {Event} event 
         */
        function handleCoverImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) { // 5MB
                    showToast('The cover image is too large. Maximum allowed size is 5MB.', 'error');
                    coverImageInput.value = '';
                    coverImagePreview.src = 'https://media.maar.world/uploads/default/default-playlist.jpg'; // Revert to default
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    coverImagePreview.src = e.target.result;
                    coverImagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                coverImagePreview.src = 'https://media.maar.world/uploads/default/default-playlist.jpg'; // Default image URL
                coverImagePreview.style.display = 'block';
            }
        }
        
        /**
         * Handle Form Submission for Creating/Editing Playlist
         */
        async function handleFormSubmit() {
            const playlistId = document.getElementById('playlistId').value;
            const coverImageFile = coverImageInput.files[0];
            const isEdit = currentMode === 'edit';
            const userId = localStorage.getItem('userId');
        
            const playlistName = document.getElementById('playlistName').value.trim();
            const description = document.getElementById('description').value.trim();
            const type = document.getElementById('playlistType').value;
            const privacy = document.getElementById('playlistPrivacy').value;
        
            // Validation
            if (!playlistName) {
                showToast('Please enter the playlist name.', 'error');
                return;
            }
        
            // Prepare JSON payload
            const payload = {
                ownerId: userId,
                playlistName,
                description,
                type: type || 'Playlist', // Default to 'Playlist' if not provided
                privacy: privacy || 'public', // Default to 'Public' if not provided
            };
        
            // Include cover image details only if a new image is uploaded
            if (coverImageFile) {
                payload.coverImageFileName = coverImageFile.name;
                payload.coverImageFileType = coverImageFile.type || getMimeTypeFromFileName(coverImageFile.name);
            }
        
            // Disable form elements and show loading
            setFormState(false);
            showLoading(true);
        
            try {
                const url = isEdit 
                    ? `${API_BASE_URL}/playlists/${encodeURIComponent(playlistId)}`
                    : `${API_BASE_URL}/playlists`;
                const method = isEdit ? 'PATCH' : 'POST';
        
                const response = await fetch(url, {
                    method: method,
                    credentials: 'include', // Use HTTP-only cookies for authentication
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
        
                const data = await response.json();
                console.log('Response:', data);
        
                if (response.ok && data.success) {
                    if (data.coverImageURL && data.coverImageKey && coverImageFile) {
                        // Proceed to upload cover image only if new image data is returned
                        await uploadCoverImage(data.coverImageURL, coverImageFile, data.coverImageKey, isEdit ? playlistId : data.playlistId);
                        await finalizePlaylist(isEdit ? playlistId : data.playlistId, data.coverImageKey);
                    } else {
                        showToast(data.message || 'Playlist saved successfully!', 'success');
                        if (isEdit) {
                            loadPlaylistDetails(playlistId);
                            setFormMode('view');
                        } else {
                            window.location.href = `/voyage/playlist?mode=view&playlistId=${encodeURIComponent(data.playlistId)}`;
                        }
                    }
        
                    // Clear cache after successful creation
                    if (typeof lscache !== 'undefined') { // Check if lscache is available
                        lscache.remove(`profile_${userId}`);
                        lscache.remove(`playlists_batch_${userId}`);
                    }
        
                    // Handle tracks
                    if (tracks.length > 0) {
                        for (const track of tracks) {
                            const createdTrack = await createTrack(track);
                            if (createdTrack && createdTrack.trackId) {
                                await addTrackToPlaylistAPI(isEdit ? playlistId : data.playlistId, createdTrack.trackId);
                            }
                        }
                    }
                } else {
                    const errorMsg = data.error || data.message || 'Failed to save playlist.';
                    showToast(errorMsg, 'error');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showToast('An error occurred while saving the playlist.', 'error');
            } finally {
                setFormState(true);
                showLoading(false);
            }
        }
        
        /**
         * Upload Cover Image After Playlist Creation/Editing
         * @param {string} uploadURL - Presigned URL for uploading cover image
         * @param {File} coverImageFile - Cover image file
         * @param {string} coverImageKey - Storage key for cover image
         * @param {string} playlistId - ID of the playlist
         */
        async function uploadCoverImage(uploadURL, coverImageFile, coverImageKey, playlistId) {
            try {
                if (!uploadURL) {
                    throw new Error('Upload URL is missing');
                }
        
                console.log('Uploading cover image to presigned URL...');
                
                const response = await fetch(uploadURL, {
                    method: 'PUT',
                    body: coverImageFile,
                    headers: {
                        'Content-Type': coverImageFile.type,
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`Failed to upload cover image: ${response.statusText}`);
                }
                
                console.log('Cover image uploaded successfully.');
                
                // Finalize the playlist to process the cover image (e.g., generate thumbnails)
                await finalizePlaylist(playlistId, coverImageKey);
                
            } catch (error) {
                console.error('Error uploading cover image:', error);
                showToast('Failed to upload cover image. Please try again.', 'error');
            }
        }
        
        /**
         * Create a Track via Backend API
         * @param {object} track - { title, artist, duration }
         * @returns {object} - Created track data
         */
        async function createTrack(track) {
            try {
                const response = await fetch(`${API_BASE_URL}/tracks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(track)
                });
        
                const data = await response.json();
                if (response.ok && data.success) {
                    showToast(`Track "${track.title}" created successfully!`, 'success');
                    return data.track; // Assuming backend returns the created track
                } else {
                    showToast(data.error || `Failed to create track "${track.title}".`, 'error');
                    return null;
                }
            } catch (error) {
                console.error('Error creating track:', error);
                showToast(`An error occurred while creating track "${track.title}".`, 'error');
                return null;
            }
        }
        
        /**
         * Add a Track to a Playlist via Backend API
         * @param {string} playlistId 
         * @param {string} trackId 
         */
        async function addTrackToPlaylistAPI(playlistId, trackId) {
            try {
                const response = await fetch(`${API_BASE_URL}/playlists/addTrackToPlaylist`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({ playlistId, trackId })
                });
        
                const data = await response.json();
                if (response.ok && data.success) {
                    showToast('Track added to playlist successfully!', 'success');
                } else {
                    showToast(data.error || 'Failed to add track to playlist.', 'error');
                }
            } catch (error) {
                console.error('Error adding track to playlist:', error);
                showToast('An error occurred while adding track to playlist.', 'error');
            }
        }
        
        /**
         * Finalizes the playlist by notifying the backend that the cover image has been uploaded.
         * This may trigger additional processing like thumbnail generation.
         * @param {string} playlistId - The ID of the playlist to finalize.
         * @param {string} coverImageKey - The key of the uploaded cover image.
         */
        async function finalizePlaylist(playlistId, coverImageKey) {
            try {
                console.log('Finalizing the playlist...');
                
                const payload = {
                    playlistId,
                    coverImageKey,
                };
        
                const response = await fetch(`${API_BASE_URL}/playlists/finalize`, {
                    method: 'POST',
                    credentials: 'include', // Rely on credentials for authentication
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
        
                const data = await response.json();
        
                console.log('Finalize Playlist Response:', data);
        
                if (response.ok && data.success) {
                    showToast('Playlist finalized successfully!', 'success');
                    // Redirect to view mode after finalization
                    window.location.href = `/voyage/playlist?mode=view&playlistId=${encodeURIComponent(playlistId)}`;
                } else {
                    const errorMsg = data.error || data.message || 'Failed to finalize playlist.';
                    showToast(errorMsg, 'error'); // Display specific error message from backend
                }
            } catch (error) {
                console.error('Error finalizing playlist:', error);
                showToast('An error occurred while finalizing the playlist.', 'error');
            }
        }
        
        /**
         * Toggle Between Edit and View Modes
         */
        function toggleEditMode() {
            if (currentMode === 'view') {
                if (canEdit && playlistData) { // Ensure user can edit and playlist data is loaded
                    setFormMode('edit');
                } else {
                    showToast('You do not have permission to edit this playlist.', 'error');
                }
            } else if (currentMode === 'edit') {
                setFormMode('view');
            }
        }
        
        /**
         * Set the Current Mode (View, Edit, Create)
         */
        function setFormMode(newMode) {
            currentMode = newMode;
            const isViewMode = currentMode === 'view';
            const isEditMode = currentMode === 'edit';
            const isCreateMode = currentMode === 'create';
    
            console.log('Setting form mode:', currentMode, 'Is owner:', isOwner, 'Can edit:', canEdit); // Debugging
    
            // Toggle visibility of form and view sections
            if (isViewMode) {
                playlistView.style.display = 'block';
                playlistForm.style.display = 'none';
            
                // Show Edit Button only if the user can edit
                if (editButton) {
                    editButton.style.display = canEdit ? 'block' : 'none';
                    editButton.innerHTML = `<span class="material-symbols-outlined">edit</span>`;
                    editButton.title = 'Edit Playlist';
                    console.log('Edit button visibility in view mode:', canEdit ? 'visible' : 'hidden'); // Debugging
                }
            
                // Set form title
                formTitle.textContent = 'Playlist Details';
            } else if (isEditMode) {
                playlistView.style.display = 'none';
                playlistForm.style.display = 'block';
            
                // Show Edit Button as a "View" toggle
                if (editButton) {
                    editButton.style.display = 'block';
                    editButton.innerHTML = `<span class="material-symbols-outlined">visibility</span>`;
                    editButton.title = 'View Playlist';
                }
            
                // Set form title
                formTitle.textContent = 'Edit Playlist';
            } else if (isCreateMode) {
                playlistView.style.display = 'none';
                playlistForm.style.display = 'block';
            
                // Hide Edit Button in Create Mode
                if (editButton) {
                    editButton.style.display = 'none';
                }
            
                // Set form title
                formTitle.textContent = 'Create a New Playlist';
            
                // Clear the form fields if in create mode
                clearFormFields();
            
                // Ensure the submit button is enabled
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit'; // Ensure the button text is correct
                }
            }
        }
        
        /**
         * Clear Form Fields (Create Mode)
         */
        function clearFormFields() {
            document.getElementById('playlistId').value = '';
            document.getElementById('playlistName').value = '';
            document.getElementById('description').value = '';
            document.getElementById('playlistType').value = 'Playlist'; // Set to default
            document.getElementById('playlistPrivacy').value = 'public'; // Set to default
            coverImagePreview.src = 'https://media.maar.world/uploads/default/default-playlist.jpg'; // Default image
            coverImagePreview.style.display = 'block';
            coverImageInput.value = ''; // Clear the file input
            clearEditTracksList();
            tracks = [];
        }
        
        /**
         * Clear Edit Tracks List
         */
        function clearEditTracksList() {
            const editTracksList = document.getElementById('editTracksList');
            editTracksList.innerHTML = '';
        }
        
        /**
         * Show or Hide Loading Indicator
         * @param {boolean} show 
         */
        function showLoading(show) {
            const loadingMessage = document.getElementById('loadingMessage');
            if (loadingMessage) {
                loadingMessage.style.display = show ? 'block' : 'none';
            }
        }
        
        /**
         * Enable or Disable Form Elements
         * @param {boolean} enable 
         */
        function setFormState(enable) {
            const formElements = document.querySelectorAll('#playlistForm input, #playlistForm select, #playlistForm button, #playlistForm textarea');
            formElements.forEach(element => {
                element.disabled = !enable;
            });
        }
        
        /**
         * Show Toast Notifications
         * @param {string} message - The message to display.
         * @param {string} type - The type of toast ('success' or 'error').
         * @param {boolean} disableSubmit - Whether to disable the submit button.
         */
        function showToast(message, type = 'success', disableSubmit = false) {
            console.log(`showToast called with message: "${message}", type: "${type}"`);
            const toastContainer = document.getElementById('toastContainer');
            if (!toastContainer) {
                console.error('Toast container not found!');
                return;
            }
        
            // Create Toast Element
            const toast = document.createElement('div');
            const toastId = `toast_${Date.now()}`;
            toast.classList.add('toast', type);
            toast.setAttribute('id', toastId);
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');
            toast.setAttribute('tabindex', '0'); // Make focusable
        
            // Close Button
            const closeBtn = document.createElement('button');
            closeBtn.classList.add('close-btn');
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close notification');
            closeBtn.onclick = () => {
                toast.classList.remove('show');
                setTimeout(() => {
                    const toastElem = document.getElementById(toastId);
                    if (toastElem) {
                        toastElem.remove();
                        console.log(`Toast "${toastId}" removed from DOM.`);
                    }
                }, 500);
            };
        
            // Append Close Button and Message to Toast
            toast.appendChild(closeBtn);
            toast.appendChild(document.createTextNode(message));
            toastContainer.appendChild(toast);
            console.log(`Toast "${toastId}" appended to #toastContainer.`);
        
            // Show the toast with animation
            setTimeout(() => {
                toast.classList.add('show');
                console.log(`Toast "${toastId}" shown.`);
                if (type === 'error') {
                    toast.focus(); // Shift focus to the toast for immediate notification
                }
            }, 100);
        
            // Determine auto-close behavior based on toast type
            if (type === 'success') {
                // Auto-close success toasts after 3 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                    console.log(`Toast "${toastId}" hiding.`);
                    setTimeout(() => {
                        const toastElem = document.getElementById(toastId);
                        if (toastElem) {
                            toastElem.remove();
                            console.log(`Toast "${toastId}" removed from DOM.`);
                        }
                    }, 500);
                }, 3000);
            }
        
            // Disable the submit button if required
            if (disableSubmit) {
                const submitButton = document.getElementById('submitButton');
                if (submitButton) {
                    submitButton.disabled = true;
                    console.log('Submit button disabled due to validation error.');
                } else {
                    console.warn('submitButton element not found.');
                }
            }
        }
        
        /**
         * Capitalize First Letter of a String
         * @param {string} string 
         * @returns {string}
         */
        function capitalizeFirstLetter(string) {
            if (!string) return '';
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        
        /**
         * Escape HTML to prevent XSS
         * @param {string} unsafe 
         * @returns {string}
         */
        function escapeHtml(unsafe) {
            if (typeof unsafe !== 'string') {
                console.warn('escapeHtml received a non-string value:', unsafe);
                return '';
            }
            return unsafe
                 .replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
        }
        
        /**
         * Show a message indicating that the playlist is being processed.
         */
        function showProcessingMessage() {
            playlistView.innerHTML = `
                <p>Your playlist is being processed. Please check back later.</p>
            `;
            playlistView.style.display = 'block';
            playlistForm.style.display = 'none';
        }
        
        /**
         * Open Add Track Modal
         * @param {boolean} isEditMode - Indicates if the modal is opened in edit mode.
         */
        function openAddTrackModal(isEditMode = false) {
            // Create Modal Elements
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.setAttribute('id', 'addTrackModal');
            modal.style.display = 'block'; // Show the modal
            modal.style.position = 'fixed';
            modal.style.zIndex = '1000';
            modal.style.left = '0';
            modal.style.top = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.overflow = 'auto';
            modal.style.backgroundColor = 'rgba(0,0,0,0.4)';
            
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            modalContent.style.backgroundColor = '#fefefe';
            modalContent.style.margin = '15% auto';
            modalContent.style.padding = '20px';
            modalContent.style.border = '1px solid #888';
            modalContent.style.width = '80%';
            
            const closeButton = document.createElement('span');
            closeButton.classList.add('close-btn-modal');
            closeButton.innerHTML = '&times;';
            closeButton.style.color = '#aaa';
            closeButton.style.float = 'right';
            closeButton.style.fontSize = '28px';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.cursor = 'pointer';
            closeButton.onclick = () => {
                modal.style.display = 'none';
                modal.remove();
            };
            
            const modalHeader = document.createElement('h4');
            modalHeader.innerText = 'Add New Track';
            
            const form = document.createElement('form');
            form.setAttribute('id', 'addTrackForm');
            
            // Track Title
            const titleLabel = document.createElement('label');
            titleLabel.setAttribute('for', 'trackTitle');
            titleLabel.innerText = 'Track Title*';
            const titleInput = document.createElement('input');
            titleInput.setAttribute('type', 'text');
            titleInput.setAttribute('id', 'trackTitle');
            titleInput.setAttribute('name', 'trackTitle');
            titleInput.setAttribute('required', 'required');
            titleInput.style.width = '100%';
            
            // Track Artist
            const artistLabel = document.createElement('label');
            artistLabel.setAttribute('for', 'trackArtist');
            artistLabel.innerText = 'Artist*';
            const artistInput = document.createElement('input');
            artistInput.setAttribute('type', 'text');
            artistInput.setAttribute('id', 'trackArtist');
            artistInput.setAttribute('name', 'trackArtist');
            artistInput.setAttribute('required', 'required');
            artistInput.style.width = '100%';
            
            // Track Duration
            const durationLabel = document.createElement('label');
            durationLabel.setAttribute('for', 'trackDuration');
            durationLabel.innerText = 'Duration (MM:SS)*';
            const durationInput = document.createElement('input');
            durationInput.setAttribute('type', 'text');
            durationInput.setAttribute('id', 'trackDuration');
            durationInput.setAttribute('name', 'trackDuration');
            durationInput.setAttribute('required', 'required');
            durationInput.setAttribute('pattern', '^([0-5]?[0-9]):([0-5][0-9])$');
            durationInput.setAttribute('title', 'Enter duration in MM:SS format');
            durationInput.style.width = '100%';
            
            // Submit Button
            const submitTrackButton = document.createElement('button');
            submitTrackButton.setAttribute('type', 'submit');
            submitTrackButton.classList.add('btn', 'btn-primary');
            submitTrackButton.innerText = 'Add Track';
            submitTrackButton.style.marginTop = '10px';
            
            // Append elements to form
            form.appendChild(titleLabel);
            form.appendChild(document.createElement('br'));
            form.appendChild(titleInput);
            form.appendChild(document.createElement('br'));
            form.appendChild(document.createElement('br'));
            
            form.appendChild(artistLabel);
            form.appendChild(document.createElement('br'));
            form.appendChild(artistInput);
            form.appendChild(document.createElement('br'));
            form.appendChild(document.createElement('br'));
            
            form.appendChild(durationLabel);
            form.appendChild(document.createElement('br'));
            form.appendChild(durationInput);
            form.appendChild(document.createElement('br'));
            form.appendChild(document.createElement('br'));
            
            form.appendChild(submitTrackButton);
            
            // Form Submission Handler
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const title = titleInput.value.trim();
                const artist = artistInput.value.trim();
                const duration = durationInput.value.trim();
                
                // Simple validation
                if (!title || !artist || !duration) {
                    showToast('Please fill in all required fields for the track.', 'error');
                    return;
                }
                
                // Validate duration format
                const durationPattern = /^([0-5]?[0-9]):([0-5][0-9])$/;
                if (!durationPattern.test(duration)) {
                    showToast('Please enter duration in MM:SS format.', 'error');
                    return;
                }
                
                // Add track to tracks array
                tracks.push({ title, artist, duration });
                showToast('Track added successfully!', 'success');
                modal.style.display = 'none';
                modal.remove();
                
                // Update UI
                if (isEditMode) {
                    populateEditTracksList();
                } else {
                    populateTracksList(tracks);
                }
            });
            
            // Append elements to modal
            modalContent.appendChild(closeButton);
            modalContent.appendChild(modalHeader);
            modalContent.appendChild(form);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Close modal when clicking outside of the modal content
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                    modal.remove();
                }
            };
        }
        
        /**
         * Populate Tracks List in Edit Mode
         */
        function populateEditTracksList() {
            const editTracksList = document.getElementById('editTracksList');
            editTracksList.innerHTML = '';
            if (tracks.length === 0) {
                editTracksList.innerHTML = '<li>No tracks in this playlist.</li>';
                return;
            }
            tracks.forEach((track, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${escapeHtml(track.title)} by ${escapeHtml(track.artist)} (${escapeHtml(track.duration)}) `;
                
                const removeBtn = document.createElement('button');
                removeBtn.classList.add('btn', 'btn-danger', 'btn-sm');
                removeBtn.innerText = 'Remove';
                removeBtn.style.marginLeft = '10px';
                removeBtn.addEventListener('click', function() {
                    removeTrack(index);
                });
                
                li.appendChild(removeBtn);
                editTracksList.appendChild(li);
            });
        }
        
        /**
         * Remove Track from Tracks Array
         * @param {number} index 
         */
        function removeTrack(index) {
            if (index >= 0 && index < tracks.length) {
                tracks.splice(index, 1);
                showToast('Track removed successfully!', 'success');
                populateEditTracksList();
            } else {
                showToast('Invalid track index.', 'error');
            }
        }
    });
</script>
