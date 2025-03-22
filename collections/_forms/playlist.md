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
<div class="p-5"></div>

<div class="form-container">
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">brightness_6</span>
                </button>
            </a>
        </div>
        <div class="edit-button-container">
            <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Profile" data-mode="view">
                <span class="material-symbols-outlined" id="editButtonIcon">edit</span> 
            </button>
        </div>
    </div>
    <h3 id="formTitle">Playlist</h3>

    <!-- View Mode -->
    <div id="playlistView" style="display: none;">
        <div id="coverImageView" class="cover-image-container playlist">
            <img id="coverImageDisplay" src="" alt="Cover Image" style="max-width: 100%; height: auto;" />
        </div>
        <p id="viewPlaylistName"></p>
        <p id="viewDescription"></p>
        <p id="viewPlaylistType"></p>
        <p id="viewPlaylistPrivacy"></p>
        <p id="viewPlaylistOwner"></p>
        <p id="viewPlaylistTracks"></p>
        <!-- Tracks List -->

    </div>

    <!-- Edit/Create Mode -->
    <form id="playlistForm" class="contact-form" style="display: none;" enctype="multipart/form-data">
        <!-- Hidden ownerId input -->
        <input type="hidden" id="ownerId" name="ownerId" value="">
        <input type="hidden" id="playlistId" name="playlistId" value="">
        
        <!-- Cover Image Preview -->
        <div id="coverImagePreviewContainer" class="cover-image-container playlist">
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
        <textarea id="description" name="description" rows="4" style="width: 100%;" maxlength="500"></textarea>
        <div id="descriptionCounter">500 characters remaining</div><br><br>

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
        <label for="playlistPrivacy">
            Privacy Setting 
            <span class="tooltip" aria-label="Privacy Settings Info" tabindex="0" data-tooltip='Choose "Public" to allow anyone to see this playlist,<br> "Collaborative" for shared editing,<br> or "Private" to keep it to yourself.'>
                <span class="material-symbols-outlined">tooltip_2</span>
            </span>
        </label>

        <select id="playlistPrivacy" name="playlistPrivacy">
            <option value="public" selected>Public</option>
            <option value="collaborative">Collaborative</option>
            <option value="private">Private</option>
        </select>

        <!-- Tracks Management (Only in Edit/Create Mode) -->
        <div id="tracksManagement">
            <h4>Manage Tracks</h4>
            <ul id="editTracksList"></ul>
        </div>

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
<!-- Include SortableJS once -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>


<script>

const COVER_IMAGE_DEFAULT= "https://mw-storage.fra1.digitaloceanspaces.com/default/default-playlist_thumbnail_mid.webp"; 

    document.addEventListener('DOMContentLoaded', function() {
        const API_BASE_URL = 'https://api.plantasia.space/api'; // Update if different
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
        const tracksManagementElement = document.getElementById('tracksManagement');
        const editTracksListElement = document.getElementById('editTracksList');
        const tooltipElement = document.querySelector('.tooltip');
        const urlParams = new URLSearchParams(window.location.search);
        const modeParam = urlParams.get('mode');
        currentPlaylistId = urlParams.get('playlistId') || '';
        
        // Set the ownerId hidden input
        document.getElementById('ownerId').value = userId;
        
        // DOM Element for Description and Counter
        const descriptionTextarea = document.getElementById('description');
        const descriptionCounter = document.getElementById('descriptionCounter');

        // Initialize counter
        updateDescriptionCounter();

        // Event Listener for Description Input
        descriptionTextarea.addEventListener('input', updateDescriptionCounter);
        
        /**
         * Updates the description character counter.
         */
        function updateDescriptionCounter() {
            const maxChars = 500;
            const currentLength = descriptionTextarea.value.length;
            const remaining = maxChars - currentLength;
            descriptionCounter.textContent = `${remaining} characters remaining`;

            // Change color based on remaining characters
            if (remaining < 100 && remaining >= 0) {
                descriptionCounter.style.color = '#ff33cc'; // Orange
            } else if (remaining < 0) {
                descriptionCounter.style.color = '#ff3333'; // Red
            } else {
                descriptionCounter.style.color = '#c3c3c3'; // Default color
            }
        }
        
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

        // Set tooltip content
        if (tooltipElement) {
            tooltipElement.setAttribute('data-tooltip', 'Choose "Public" to allow anyone to see this playlist, "Collaborative" for shared editing, or "Private" to keep it to yourself.');
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
        
        /**
         * Load Playlist Details from Backend
         * @param {string} playlistId 
         */
async function loadPlaylistDetails(playlistId, keepMode = false) {
    try {
        // Add a timestamp to the request URL to bypass any caching
        const response = await fetch(`${API_BASE_URL}/playlists/${encodeURIComponent(playlistId)}?userId=${encodeURIComponent(userId)}&timestamp=${new Date().getTime()}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        
        if (data.success && data.playlist) {
            playlistData = data.playlist;
            console.log("aaa", data );
            canEdit = data.canEdit;
            populateViewMode(data.playlist);
            populateFormMode(data.playlist);
            tracks = data.playlist.tracks || [];
            
            if (!keepMode) {
                setFormMode(currentMode);
            }
        } else {
            showToast(data.error || 'Failed to load playlist details.', 'error');
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
            if (playlist.coverImageMidURL) {
                coverImageDisplay.src = playlist.coverImageMidURL;
            } else {
                coverImageDisplay.src = COVER_IMAGE_DEFAULT; // Default image URL
            }
            coverImageDisplay.style.display = 'block';
            
            // Correct Extraction of Track IDs
            const trackIds = playlist.tracks.map(track => track.trackId._id).filter(Boolean);
          //console.log('Extracted Track IDs:', trackIds);
            
          //  displayTracksBatch(trackIds, 'view');
        }
        
        /**
         * Populate Form Mode (Edit/Create) with Playlist Data
         * @param {object} playlist 
         */
        function populateFormMode(playlist) {
            document.getElementById('playlistId').value = playlist._id || '';
            document.getElementById('playlistName').value = playlist.playlistName || '';
            document.getElementById('description').value = playlist.description || '';
            document.getElementById('playlistType').value = playlist.type || 'Playlist';
            document.getElementById('playlistPrivacy').value = playlist.privacy || 'public';

            if (playlist.coverImageMidURL) {
                coverImagePreview.src = playlist.coverImageMidURL;
                coverImagePreview.style.display = 'block';
            } else {
                coverImagePreview.src = COVER_IMAGE_DEFAULT; // Default image URL
                coverImagePreview.style.display = 'block';
            }
            
            // Correct Extraction of Track IDs
            const trackIds = playlist.tracks.map(track => track.trackId._id).filter(Boolean);
            console.log('Extracted Track IDs:', trackIds);
            displayTracksBatch(trackIds);
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
                    coverImagePreview.src = COVER_IMAGE_DEFAULT; // Revert to default
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(e) {
                    coverImagePreview.src = e.target.result;
                    coverImagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                coverImagePreview.src = COVER_IMAGE_DEFAULT; // Default image URL
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
        type: type || 'Playlist',
        privacy: privacy || 'public',
        // Removed 'trackOrder' from here
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
                'Content-Type': 'application/json',
                // Include auth headers if necessary
                'Authorization': `Bearer ${authToken}` // Adjust based on your auth implementation
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Response:', data);

        if (response.ok && data.success) {
            showToast(data.message || 'Playlist saved successfully!', 'success');

            if (data.coverImageURL && data.coverImageKey && coverImageFile) {
                // Proceed to upload cover image only if new image data is returned
                await uploadCoverImage(data.coverImageURL, coverImageFile, data.coverImageKey, isEdit ? playlistId : data.playlistId);
                await finalizePlaylist(isEdit ? playlistId : data.playlistId, data.coverImageKey);
            } else {
                if (isEdit) {
                    loadPlaylistDetails(playlistId, true);
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

            // Optionally, send the reordered tracks if necessary
             await reorderTracks(isEdit ? playlistId : data.playlistId, tracks.map(t => t._id));
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
                    // **Invalidate Cache for This Playlist**
                    if (typeof lscache !== 'undefined') {
                        lscache.remove(`playlist_details_${userId}_${playlistId}`);
                        lscache.remove(`tracks_batch_${userId}_${playlistId}`);
                    }
                    // Reload playlist details to reflect any final changes
                    await loadPlaylistDetails(playlistId);
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
                            console.log(`setFormMode called with newMode: ${newMode}`);

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
                
                // Show Tracks Management Section
                if (tracksManagementElement) {
                    tracksManagementElement.style.display = 'block';
                }
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
            
                // Show Tracks Management Section
                if (tracksManagementElement) {
                    tracksManagementElement.style.display = 'block';
                }
            
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
            coverImagePreview.src = COVER_IMAGE_DEFAULT; // Default image
            coverImagePreview.style.display = 'block';
            coverImageInput.value = ''; // Clear the file input
            tracks = [];
            refreshTracksList(); // Clear the tracks list
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
         */
        function showToast(message, type = 'success') {
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
 * Display Tracks in Batch
 * @param {Array} trackIds 
 */
async function displayTracksBatch(trackIds) {
    console.log('Starting displayTracksBatch with IDs:', trackIds);

    const tracksListElement = document.getElementById('editTracksList'); // Only use editTracksList

    // Check if the tracksListElement exists
    if (!tracksListElement) {
        console.error("tracksListElement is undefined. Ensure 'editTracksList' exists in the DOM.");
        return;
    }

    // Clear existing list to prevent duplication
    tracksListElement.innerHTML = ''; 
    
    if (!trackIds || trackIds.length === 0) {
        tracksListElement.innerHTML = '<li>No tracks found.</li>';
        console.log('No tracks to display.');
        return;
    }

    const cacheKey = `tracks_batch_${userId}_${currentPlaylistId}`;
    const batchUrl = `${API_BASE_URL}/tracks/batch?ids=${trackIds.join(',')}`;

    try {
        const data = await fetchDataWithCache(batchUrl, cacheKey, 10, false); // Force refresh

        if (data.success && Array.isArray(data.tracks)) {
            console.log(`Fetched ${data.tracks.length} tracks.`);
            tracks = trackIds.map(id => data.tracks.find(track => track._id === id));

            // Display tracks in the correct order and update numbers
            trackIds.forEach((id, index) => {
                const track = data.tracks.find(track => track._id === id);
                if (!track) return;

                const imageUrl = track.coverImageURL || 'https://mw-storage.fra1.digitaloceanspaces.com/default/default-texture_thumbnail_small.webp';
                const trackName = track.trackName || 'Untitled';
                const artistNames = (track.artists && track.artists.length > 0) 
                    ? track.artists.map(artist => artist.displayName || 'Unknown Artist').join(', ') 
                    : 'Unknown Artist';
                const duration = track.duration || 'N/A';

                const li = document.createElement('li');
                li.setAttribute('data-track-id', track._id);
                li.innerHTML = `
                    <div class="track-item">
                        <span class="track-number">${index + 1}.</span>
                        <img src="${imageUrl}" alt="${trackName}" class="track-thumbnail">
                        <div class="track-details">
                            <span class="track-name">${escapeHtml(trackName)}</span>
                            <span class="track-artist">${escapeHtml(artistNames)}</span>
                            <span class="track-duration">${escapeHtml(duration)}</span>
                        </div>
                        <button type="option-button" class="option-button" onclick="removeTrack('${track._id}', this)">
                            <span class="material-symbols-outlined">delete</span> 
                        </button>
                    </div>
                `;
                tracksListElement.appendChild(li);
            });
            console.log('All tracks displayed successfully.');

            // Make tracks sortable in edit mode
            initializeSortable();
        } else {
            console.error('Failed to fetch tracks:', data.message);
            tracksListElement.innerHTML = '<li>Failed to load tracks.</li>';
            showToast('Failed to load your tracks.', 'error');
        }
    } catch (error) {
        console.error('Error displaying tracks:', error);
        tracksListElement.innerHTML = '<li>No tracks found.</li>';
        showToast('An error occurred while loading your tracks.', 'error');
    }
}

        /**
         * Check if a string is a valid ObjectId (simple check)
         * @param {string} id 
         * @returns {boolean}
         */
        function isValidObjectId(id) {
            return typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
        }

        /**
         * Fetch Data with Caching
         * @param {string} url 
         * @param {string} cacheKey 
         * @param {number} ttlMinutes 
         * @param {boolean} useCache 
         * @returns {object}
         */
async function fetchDataWithCache(url, cacheKey, ttlMinutes = 10, useCache = true) {
    if (useCache) {
        const cachedData = lscache.get(cacheKey);
        if (cachedData) {
            console.log(`Using cached data for: ${cacheKey}`);
            return cachedData;
        }
    }
    
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const data = await response.json();
    
    if (useCache && data.success) {
        lscache.set(cacheKey, data, ttlMinutes);
        console.log(`Data cached for: ${cacheKey}`);
    }
    
    return data;
}
        
/**
 * Remove Track by ID
 * @param {string} trackId 
 */
window.removeTrack = async function(trackId) {
    if (!trackId || !currentPlaylistId) {
        showToast('Invalid track or playlist ID.', 'error');
        return;
    }

    console.log('Removing track:', trackId, 'from playlist:', currentPlaylistId);

    try {
        const response = await fetch(`${API_BASE_URL}/playlists/remove-track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                playlistId: currentPlaylistId,
                trackId: trackId
            })
        });

        const data = await response.json();
        console.log('Response from remove-track:', data);

        if (data.success) {
            showToast('Track removed successfully!', 'success');
            tracks = tracks.filter(track => track.trackId._id !== trackId);

            if (typeof lscache !== 'undefined') {
                lscache.remove(`playlist_details_${userId}_${currentPlaylistId}`);
                lscache.remove(`tracks_batch_${userId}_${currentPlaylistId}`);
            }

            displayTracksBatch(tracks.map(t => t.trackId._id).filter(Boolean));
            setFormMode('edit'); // Keep the mode in 'edit'
        } else {
            showToast(data.error || 'Failed to remove the track.', 'error');
        }
    } catch (error) {
        showToast('An error occurred while removing the track.', 'error');
    }
};
/**
 * Initialize SortableJS for Edit Mode
 */
/**
 * Initialize SortableJS for Edit Mode
 */
function initializeSortable() {
    const sortable = new Sortable(editTracksListElement, {
        animation: 150,
        handle: '.track-name',
        onEnd: async function () {
            const reorderedTrackIds = Array.from(editTracksListElement.children)
                .map(child => child.getAttribute('data-track-id'));
    
            // Update the `tracks` array with the new order
            tracks = reorderedTrackIds.map(id => tracks.find(track => track._id === id));
    
            // Update track numbers in the UI
            updateTrackNumbers(editTracksListElement);
    

        }
    });
}
/**
 * Sends the reordered track IDs to the backend to update the playlist order.
 * @param {string} playlistId - The ID of the playlist.
 * @param {Array<string>} reorderedTrackIds - The new ordered array of track IDs.
 */
async function reorderTracks(playlistId, trackIds) {
    try {
    console.log ("sending",playlistId, trackIds );
        const response = await fetch(`${API_BASE_URL}/playlists/${encodeURIComponent(playlistId)}/reorder-tracks`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackIds }),
            credentials: 'include'
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error reordering tracks:', error);
        return { success: false, message: 'An error occurred while reordering tracks.' };
    }
}



/**
 * Function to update track numbers in the UI
 * @param {HTMLElement} trackListElement - The list element containing track items
 */
function updateTrackNumbers(trackListElement) {
    Array.from(trackListElement.children).forEach((item, index) => {
        const trackNumber = item.querySelector('.track-number');
        if (trackNumber) {
            trackNumber.textContent = `${index + 1}.`; // Update track number in UI
        }
    });
}

    
        /**
         * Refresh Tracks List (Clear)
         */
        function refreshTracksList() {
            editTracksListElement.innerHTML = '';
        }
    });
</script>

<style>
/* ... [Your existing CSS remains unchanged] ... */

/* Consolidated Tracks List Styles */
#tracksListContainer, #tracksManagement {
    margin-top: 20px;
}

#tracksList, #tracksListContainer ul, #tracksManagement ul {
    list-style: none;
    padding: 0;
}

.track-item {
    display: flex;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

.track-thumbnail {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 10px;
}

.track-details {
    flex-grow: 1;
}

.track-name {
    font-weight: bold;
    margin-right: 5px;
    cursor: move; /* Indicate draggable area */
}

.track-artist {
    color: #555;
    margin-right: 5px;
}

.track-duration {
    color: #777;
    margin-right: 10px;
}

.track-index {
    width: 30px;
    text-align: right;
    margin-right: 10px;
    font-weight: bold;
}

.remove-track-btn {
    background-color: #ff4d4d;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.remove-track-btn:hover {
    background-color: #ff1a1a;
}

/* Optional: Spinner Styles */
.spinner {
    border: 8px solid #f3f3f3; /* Light gray */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
    margin: 20px auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
