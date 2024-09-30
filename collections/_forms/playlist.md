---
layout: articles
show_title: false
show_date: false
permalink: /voyage/playlist
titles:
  en: &EN Create Playlist
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
---

<!-- Playlist Form Container -->
<div class="form-container">
    <div class="button-container">
        <div class="back-button-container">
            <a href="/voyage" title="Back to Voyage">
                <button id="backButton" class="btn button--outline-primary button--circle">
                    <span class="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
            </a>
        </div>
        <div class="edit-button-container">
            <button id="editButton" class="btn button--outline-primary button--circle" title="Edit Playlist" style="display: none;">
                <span class="material-symbols-outlined">edit</span> 
            </button>
        </div>
    </div>

    <h3 id="formTitle">Create a Collection</h3>
    <p>Group tracks as a Playlist, Album, EP, Single, or Compilation.</p>
    <div class="p-2"></div>

    <!-- View Mode -->
    <div id="playlistView">
        <div id="playlistImagePreviewContainer">
            <img id="playlistImagePreview" src="" alt="Playlist Image">
        </div>
        <p><strong>Playlist Name:</strong> <span id="displayPlaylistName"></span></p>
        <p><strong>Description:</strong> <span id="displayPlaylistDescription">No description provided.</span></p>
        <p><strong>Privacy:</strong> <span id="displayPlaylistPrivacy"></span></p>
        <p><strong>Type:</strong> <span id="displayPlaylistType"></span></p>
    </div>

    <!-- Edit/Create Mode -->
    <form id="playlistForm" class="contact-form" style="display: none;">
        <label for="playlistImage">Choose your Playlist Image:</label>
        <div id="playlistImagePreviewContainer">
            <img id="playlistImagePreviewForm" src="" alt="Playlist Image" width="480" height="480">
        </div>
        <input type="file" id="playlistImage" name="coverImage" accept=".jpg, .jpeg, .png"><br><br>

        <label for="playlistName">Playlist Name<span style="color: red;">*</span>:</label>
        <input type="text" id="playlistName" name="playlistName" required><br><br>

        <label for="playlistDescription">Description:</label>
        <textarea id="playlistDescription" name="description" rows="3" maxlength="500"></textarea><br><br>

        <label for="playlistType">Type<span style="color: red;">*</span>:</label>
        <select id="playlistType" name="type" required>
            <option value="Playlist">Playlist</option>
            <option value="Album">Album</option>
            <option value="EP">EP</option>
            <option value="Single">Single</option>
            <option value="Compilation">Compilation</option>
        </select><br><br>

        <label for="playlistPrivacy">Privacy Settings<span style="color: red;">*</span>:</label>
        <select id="playlistPrivacy" name="privacy" required>
            <option value="private">Private</option>
            <option value="collaborative">Collaborative</option>
            <option value="public">Public</option>
        </select><br><br>

        <button type="submit">Save Playlist</button>
        <div class="p-2"></div>

        <button type="button" id="cancelButton" class="btn button--outline-primary button--circle">Cancel</button>
        <div class="p-2"></div>
    </form>
</div>

<!-- Toast Container for Notifications -->
<div id="toastContainer" style="position: fixed; top: 20px; right: 20px; z-index: 1000;"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId'); 
    if (!userId) {
        document.getElementById('messageDisplay').innerText = 'No logged-in user found. Please log in first.';
        document.getElementById('messageDisplay').style.color = 'red';
        window.location.href = '/login';
        return;
    }

    let isEditMode = false;
    let currentPlaylistId = null;
    let isOwner = false;

    const formTitle = document.getElementById('formTitle');
    const playlistView = document.getElementById('playlistView');
    const playlistForm = document.getElementById('playlistForm');
    const editButton = document.getElementById('editButton');
    const backButton = document.getElementById('backButton');
    const cancelButton = document.getElementById('cancelButton');

    const playlistImageInput = document.getElementById('playlistImage');
    const playlistImagePreview = document.getElementById('playlistImagePreview');
    const playlistImagePreviewForm = document.getElementById('playlistImagePreviewForm');

    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    currentPlaylistId = urlParams.get('id');

    if (mode === 'edit' && currentPlaylistId) {
        isEditMode = true;
        formTitle.innerText = 'Edit Playlist';
        loadPlaylistDetails(currentPlaylistId);
    } else if (mode === 'playlist' && currentPlaylistId) {
        formTitle.innerText = 'Playlist Details';
        loadPlaylistDetails(currentPlaylistId);
    } else {
        formTitle.innerText = 'Create a Playlist';
        toggleViewMode(true);
    }

    editButton.addEventListener('click', function() {
        toggleViewMode(true);
    });

    cancelButton.addEventListener('click', function() {
        if (isEditMode) {
            loadPlaylistDetails(currentPlaylistId);
            toggleViewMode(false);
        } else {
            playlistForm.reset();
            playlistImagePreviewForm.src = '';
            playlistImagePreviewForm.style.display = 'none';
            toggleViewMode(false);
        }
    });

    backButton.addEventListener('click', function() {
        window.location.href = '/voyage';
    });

    playlistImageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                playlistImagePreviewForm.src = e.target.result;
                playlistImagePreviewForm.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            playlistImagePreviewForm.src = '';
            playlistImagePreviewForm.style.display = 'none';
        }
    });

    playlistForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const playlistName = document.getElementById('playlistName').value.trim();
        const description = document.getElementById('playlistDescription').value.trim();
        const privacy = document.getElementById('playlistPrivacy').value;
        const type = document.getElementById('playlistType').value;

        if (!playlistName || !privacy || !type) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('ownerId', userId);
        formData.append('playlistName', playlistName);
        formData.append('description', description);
        formData.append('privacy', privacy);
        formData.append('type', type);
        if (playlistImageInput.files[0]) {
            formData.append('coverImage', playlistImageInput.files[0]);
        }

        let apiEndpoint = 'http://media.maar.world:3001/api/playlists';
        let method = 'POST';
        if (isEditMode && currentPlaylistId) {
            apiEndpoint += `/${currentPlaylistId}`;
            method = 'PUT';
        }

        const xhr = new XMLHttpRequest();
        xhr.open(method, apiEndpoint, true);
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 201) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    showToast(response.message || (isEditMode ? 'Playlist updated successfully!' : 'Playlist created successfully!'), 'success');
                    if (isEditMode) {
                        loadPlaylistDetails(currentPlaylistId);
                        toggleViewMode(false);
                    } else {
                        window.location.href = `/voyage/playlist?mode=playlist&id=${response.playlist._id}`;
                    }
                } else {
                    showToast(response.message || 'Failed to save playlist.', 'error');
                }
            } else {
                showToast('An error occurred while saving the playlist.', 'error');
            }
        };
        xhr.send(formData);
    });

    function toggleViewMode(editMode) {
        if (editMode) {
            playlistView.style.display = 'none';
            playlistForm.style.display = 'block';
        } else {
            playlistView.style.display = 'block';
            playlistForm.style.display = 'none';
        }
    }

    function loadPlaylistDetails(playlistId) {
        fetch(`http://media.maar.world:3001/api/playlists/${playlistId}?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.playlist) {
                    populateViewMode(data.playlist);
                    populateFormMode(data.playlist);
                    isOwner = data.canEdit;
                    editButton.style.display = isOwner ? 'block' : 'none';
                } else {
                    showToast(data.message || 'Failed to load playlist details.', 'error');
                }
            })
            .catch(error => {
                console.error('Error fetching playlist details:', error);
                showToast('An error occurred while loading playlist details.', 'error');
            });
    }

    function populateViewMode(playlist) {
        document.getElementById('displayPlaylistName').innerText = playlist.playlistName;
        document.getElementById('displayPlaylistDescription').innerText = playlist.description || 'No description provided.';
        document.getElementById('displayPlaylistPrivacy').innerText = capitalizeFirstLetter(playlist.privacy);
        document.getElementById('displayPlaylistType').innerText = playlist.type || 'Not specified';
        if (playlist.coverImage) {
            playlistImagePreview.src = `https://media.maar.world${playlist.coverImage}`;
            playlistImagePreview.style.display = 'block';
        } else {
            playlistImagePreview.src = '';
            playlistImagePreview.style.display = 'none';
        }
    }

    function populateFormMode(playlist) {
        document.getElementById('playlistName').value = playlist.playlistName;
        document.getElementById('playlistDescription').value = playlist.description || '';
        document.getElementById('playlistPrivacy').value = playlist.privacy;
        document.getElementById('playlistType').value = playlist.type || '';
        if (playlist.coverImage) {
            playlistImagePreviewForm.src = `https://media.maar.world${playlist.coverImage}`;
            playlistImagePreviewForm.style.display = 'block';
        } else {
            playlistImagePreviewForm.src = '';
            playlistImagePreviewForm.style.display = 'none';
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        if (type === 'success') {
            toast.classList.add('success');
        } else if (type === 'error') {
            toast.classList.add('error');
        }
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    }   
});
</script>
