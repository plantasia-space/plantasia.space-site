// Store the last search query to prevent redundant requests
let previousQueryX = '';
let isFetching = false;

// Flag to indicate a valid username selection
let validSelection = false;

// Function to search for users based on input
document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('.user-search-input');

    searchInputs.forEach((searchInput) => {
        // Ensure that the input has not been initialized already
        if (searchInput && !searchInput.dataset.initialized) {
            searchInput.dataset.initialized = 'true'; // Mark as initialized
            const resultsContainer = searchInput.nextElementSibling;

            if (resultsContainer && resultsContainer.classList.contains('dropdown')) {
                handleUserSearch(searchInput, resultsContainer);
            }
        }
    });
});

// Function to handle input and display search results with keyboard navigation
function handleUserSearch(inputElement, resultsContainer) {
    let timeout;
    let selectedIndex = -1;

    inputElement.addEventListener('input', () => {
        clearTimeout(timeout);
        const query = inputElement.value.trim();

        // Check if the query has changed to avoid redundant requests
        if (query === previousQueryX || query.length < 2) {
            resultsContainer.innerHTML = '';
            selectedIndex = -1;
            resultsContainer.classList.remove('active');
            return;
        }

        previousQueryX = query; // Update the last query
        timeout = setTimeout(async () => {
            const users = await searchUsers(query, isFetching);
            updateResultsDropdown(users, resultsContainer, inputElement);
        }, 500); // Adjusted debounce delay for better performance
    });

    inputElement.addEventListener('keydown', (event) => {
        const results = resultsContainer.querySelectorAll('.user-result');

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (selectedIndex < results.length - 1) {
                    selectedIndex++;
                    updateSelection(results, selectedIndex);
                }
                break;

            case 'ArrowUp':
                event.preventDefault();
                if (selectedIndex > 0) {
                    selectedIndex--;
                    updateSelection(results, selectedIndex);
                }
                break;

            case 'Enter':
                event.preventDefault();
                if (selectedIndex >= 0 && results[selectedIndex]) {
                    results[selectedIndex].click();
                }
                break;

            default:
                break;
        }
    });

    inputElement.addEventListener('blur', async () => {
        setTimeout(async () => {
            if (validSelection) {
                validSelection = false; // Reset flag
                return; // Do not clear the input
            }

            const inputValue = inputElement.value.trim();
            if (inputValue) {
                const isValid = await checkUsernameValidity(inputValue);
                if (!isValid) {
                    inputElement.value = '';
                 //   displayDddArtistFeedback('Selected username is invalid or does not exist.', 'error');
                }
            }
        }, 200); // Adjust delay as needed
    });

    // Hide the dropdown when clicking outside the input and dropdown
    document.addEventListener('click', (event) => {
        if (!inputElement.contains(event.target) && !resultsContainer.contains(event.target)) {
            resultsContainer.classList.remove('active');
        }
    });
}

// Update the searchUsers function to accept isFetching as a parameter
async function searchUsers(query, isFetchingParam) {
    if (isFetchingParam) return [];
    isFetching = true;

    try {
        const response = await fetch(`http://media.maar.world:3001/api/searchUsers?query=${encodeURIComponent(query)}`);
        isFetching = false;

        if (response.status === 429) {
            console.warn('Too many requests. Please wait.');
            return [];
        }

        if (response.status === 404) {
            console.warn('No users found for the query.');
            return []; // Treat 404 as "no users found"
        }

        if (!response.ok) {
            console.warn(`Search request failed: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error during user search:', error);
        isFetching = false;
        return [];
    }
}

// Function to update the dropdown results
function updateResultsDropdown(users, container, inputElement) {
    container.innerHTML = ''; // Clear previous results

    if (users.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = 'user-result';
        noResult.textContent = 'No users found. Invite them to join for better collaboration!';
        noResult.style.color = '#d9534f';
        container.appendChild(noResult);

        const inviteButton = document.createElement('button');
        inviteButton.className = 'invite-button';
        inviteButton.textContent = 'Register a new xPlorer';
        inviteButton.addEventListener('click', () => {
            window.location.href = '/register';
        });
        container.appendChild(inviteButton);

        container.classList.add('active'); // Show the dropdown
        return;
    }

    users.forEach(user => {
        const item = document.createElement('div');
        item.className = 'user-result';

        const displayText = highlightMatch(`${user.displayName} (@${user.username})`, inputElement.value);
        const text = document.createElement('span');
        text.innerHTML = displayText;
        item.appendChild(text);

        item.addEventListener('click', () => {
            inputElement.value = user.username;
            container.innerHTML = '';
            container.classList.remove('active'); // Hide the dropdown
            validSelection = true; // Set flag to prevent clearing
            //displayDddArtistFeedback('', 'success'); // Clear any previous error messages
        });

        container.appendChild(item);
    });

    container.classList.add('active'); // Show the dropdown when results are present
}

// Function to update the visual selection in the dropdown
function updateSelection(results, selectedIndex) {
    results.forEach((result, index) => {
        result.classList.toggle('selected', index === selectedIndex);
        if (index === selectedIndex) result.scrollIntoView({ block: 'nearest' });
    });
}

// Function to highlight matching text
function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Function to check if a username is valid using the /checkUsername endpoint
async function checkUsernameValidity(username) {
    try {
        const response = await fetch(`http://media.maar.world:3001/api/checkUsername?username=${encodeURIComponent(username)}`);
        if (response.status === 429) {
            console.warn('Too many requests. Please wait.');
            return false;
        }

        if (!response.ok) {
            console.warn(`Unexpected response status: ${response.status}`);
            return false;
        }

        const data = await response.json();
        console.log('Check Username Response:', data);
        return !data.isUnique; // If `isUnique` is false, the username exists
    } catch (error) {
        console.error('Error checking username validity:', error);
        return false;
    }
}

/* Function to update the form or provide feedback based on validity
function displayDddArtistFeedback(message, type) {
    const feedbackElem = document.getElementById('dddArtistFeedback');
    const dddArtistInput = document.getElementById('dddArtistName');

    feedbackElem.textContent = message;
    feedbackElem.className = 'feedback-message'; // Reset classes

    dddArtistInput.classList.remove('feedback-success', 'feedback-error'); // Reset classes

    if (type === 'success') {
        feedbackElem.classList.add('feedback-success');
        dddArtistInput.classList.add('feedback-success');
    } else if (type === 'error') {
        feedbackElem.classList.add('feedback-error');
        dddArtistInput.classList.add('feedback-error');
    }
}
*/