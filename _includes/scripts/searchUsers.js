// searchUsers.js

(function() {
    // Configuration
    const API_ENDPOINT = 'http://media.maar.world:3001/api/users/searchUsers'; // Ensure this matches your server's route
    const DEBOUNCE_DELAY = 300; // milliseconds

    /**
     * Debounce function to limit the rate of API calls
     * @param {Function} func - The function to debounce
     * @param {number} delay - Delay in milliseconds
     * @returns {Function} - Debounced function
     */
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    /**
     * Initialize search functionality for all .user-search-input fields
     */
    function initializeSearchUsers() {
        const searchInputs = document.querySelectorAll('.user-search-input');

        searchInputs.forEach(input => {
            // Avoid initializing the same input multiple times
            if (input.dataset.initialized) return;
            input.dataset.initialized = 'true';

            const wrapper = input.closest('.input-wrapper');
            const dropdown = wrapper.querySelector('.dropdown');

            if (!dropdown) return; // Skip if no dropdown container is found

            // Ensure there's a hidden input for userId
            let hiddenInput = wrapper.querySelector('.artistUserId');
            if (!hiddenInput) {
                hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.classList.add('artistUserId');
                hiddenInput.name = 'artistUserIds[]'; // Adjust the name attribute as needed
                wrapper.appendChild(hiddenInput);
            }

            // Debounced input handler
            const debouncedHandleInput = debounce(handleInput, DEBOUNCE_DELAY);

            // Attach event listeners
            input.addEventListener('input', debouncedHandleInput);
            input.addEventListener('keydown', handleKeyDown);
            input.addEventListener('blur', handleBlur);

            // Click outside to close dropdown
            document.addEventListener('click', function(event) {
                if (!wrapper.contains(event.target)) {
                    dropdown.classList.remove('active');
                }
            });
        });
    }

    /**
     * Handle input event with debounce
     * @param {Event} event 
     */
    async function handleInput(event) {
        const input = event.target;
        const query = input.value.trim();

        console.log(`Searching for users with query: "${query}"`);

        if (query.length < 2) { // Minimum characters to start search
            clearDropdown(input);
            return;
        }

        try {
            const response = await fetch(`${API_ENDPOINT}?query=${encodeURIComponent(query)}`);

            console.log(`API Response Status: ${response.status}`);

            if (response.status === 429) { // Too Many Requests
                showDropdownMessage(input, 'Too many requests. Please wait.', 'error');
                return;
            }

            if (response.status === 404) { // No Users Found
                showNoUsersFound(input);
                return;
            }

            if (!response.ok) { // Other Errors
                showDropdownMessage(input, 'Error fetching results.', 'error');
                return;
            }

            const data = await response.json();

            console.log('API Response Data:', data);

            // Since server returns an array, check if it's an array and has users
            if (Array.isArray(data) && data.length > 0) {
                populateDropdown(input, data);
            } else {
                showNoUsersFound(input);
            }
        } catch (error) {
            console.error('Error fetching user search results:', error);
            showDropdownMessage(input, 'Error fetching results.', 'error');
        }
    }

    /**
     * Populate the dropdown with user results
     * @param {HTMLElement} input 
     * @param {Array} users 
     */
    function populateDropdown(input, users) {
        const wrapper = input.closest('.input-wrapper');
        const dropdown = wrapper.querySelector('.dropdown');
        dropdown.innerHTML = ''; // Clear previous results

        users.forEach(user => {
            const item = document.createElement('div');
            item.classList.add('dropdown-item');
            item.textContent = `${user.displayName} (@${user.username})`;
            item.dataset.userId = user.userId; // Store userId for later use

            // Click event to select the user
            item.addEventListener('click', () => {
                input.value = user.username;
                const hiddenInput = wrapper.querySelector('.artistUserId');
                hiddenInput.value = user.userId;
                dropdown.classList.remove('active');
            });

            dropdown.appendChild(item);
        });

        dropdown.classList.add('active');
    }

    /**
     * Show a message in the dropdown (e.g., errors)
     * @param {HTMLElement} input 
     * @param {string} message 
     * @param {string} type - 'error' or 'info'
     */
    function showDropdownMessage(input, message, type) {
        const wrapper = input.closest('.input-wrapper');
        const dropdown = wrapper.querySelector('.dropdown');
        dropdown.innerHTML = ''; // Clear previous results

        const messageItem = document.createElement('div');
        messageItem.classList.add('dropdown-item', `dropdown-item-${type}`);
        messageItem.textContent = message;
        dropdown.appendChild(messageItem);

        dropdown.classList.add('active');
    }

    /**
     * Show "No users found" message with an invite option
     * @param {HTMLElement} input 
     */
    function showNoUsersFound(input) {
        const wrapper = input.closest('.input-wrapper');
        const dropdown = wrapper.querySelector('.dropdown');
        dropdown.innerHTML = ''; // Clear previous results

        const noResultItem = document.createElement('div');
        noResultItem.classList.add('dropdown-item', 'dropdown-item-info');
        noResultItem.textContent = 'No users found. Invite them to join for better collaboration!';
        dropdown.appendChild(noResultItem);

        const inviteButton = document.createElement('button');
        inviteButton.classList.add('invite-button');
        inviteButton.textContent = 'Register a new xPlorer';
        inviteButton.addEventListener('click', () => {
            window.location.href = '/register';
        });
        dropdown.appendChild(inviteButton);

        dropdown.classList.add('active');
    }

    /**
     * Clear the dropdown and reset hidden input
     * @param {HTMLElement} input 
     */
    function clearDropdown(input) {
        const wrapper = input.closest('.input-wrapper');
        const dropdown = wrapper.querySelector('.dropdown');
        dropdown.innerHTML = '';
        dropdown.classList.remove('active');

        const hiddenInput = wrapper.querySelector('.artistUserId');
        if (hiddenInput) {
            hiddenInput.value = '';
        }
    }

    /**
     * Handle keydown events for navigation (Arrow keys and Enter)
     * @param {KeyboardEvent} event 
     */
    function handleKeyDown(event) {
        const input = event.target;
        const wrapper = input.closest('.input-wrapper');
        const dropdown = wrapper.querySelector('.dropdown');
        const items = dropdown.querySelectorAll('.dropdown-item');

        if (!dropdown.classList.contains('active') || items.length === 0) return;

        let currentIndex = Array.from(items).findIndex(item => item.classList.contains('active-item'));

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (currentIndex < items.length - 1) {
                    if (currentIndex >= 0) {
                        items[currentIndex].classList.remove('active-item');
                    }
                    items[currentIndex + 1].classList.add('active-item');
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (currentIndex > 0) {
                    items[currentIndex].classList.remove('active-item');
                    items[currentIndex - 1].classList.add('active-item');
                }
                break;
            case 'Enter':
                event.preventDefault();
                if (currentIndex >= 0 && items[currentIndex]) {
                    items[currentIndex].click();
                }
                break;
            default:
                break;
        }
    }

    /**
     * Handle blur event to validate selection
     * @param {Event} event 
     */
    function handleBlur(event) {
        const input = event.target;
        const wrapper = input.closest('.input-wrapper');
        const hiddenInput = wrapper.querySelector('.artistUserId');
        const dropdown = wrapper.querySelector('.dropdown');

        setTimeout(() => { // Delay to allow click event to register
            if (!hiddenInput.value) {
                input.value = ''; // Clear input if no valid selection
                dropdown.classList.remove('active');
            }
        }, 200);
    }

    // Expose initializeSearchUsers globally
    window.initializeSearchUsers = initializeSearchUsers;
    window.debounce = debounce; // Expose debounce globally

    // Initialize search on DOM load
    document.addEventListener('DOMContentLoaded', initializeSearchUsers);
})();
