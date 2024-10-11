// scripts/searchUsers.js

// Function to search for users based on input
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.user-search-input');
    const resultsContainer = searchInput?.nextElementSibling;

    if (searchInput && resultsContainer && resultsContainer.classList.contains('dropdown')) {
        console.log('Search input initialized.');
        handleUserSearch(searchInput, resultsContainer);
    } else {
        console.warn('Search input or results container not found.');
    }
});

async function searchUsers(query) {
    try {
        console.log(`Searching for users: "${query}"`);
        const response = await fetch(`http://media.maar.world:3001/api/searchUsers?query=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            console.warn(`Search request failed with status: ${response.status}`);
            return [];
        }

        const data = await response.json();
        console.log(`Found ${data.length} users for query: "${query}"`);
        return data;
    } catch (error) {
        console.error('Error during user search:', error);
        return [];
    }
}

// Function to check if a username is valid using the /checkUsername endpoint
async function checkUsernameValidity(username) {
    try {
        console.log(`Validating username: "${username}"`);
        const response = await fetch(`http://media.maar.world:3001/api/checkUsername?username=${encodeURIComponent(username)}`);
        const data = await response.json();

        return data.isUnique === false; // If isUnique is false, it means the username exists
    } catch (error) {
        console.error('Error checking username validity:', error);
        return false;
    }
}

// Function to update the results dropdown
function updateResultsDropdown(users, container, inputElement) {
    container.innerHTML = ''; // Clear previous results

    if (users.length === 0) {
        console.log('No users found.');
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
        return;
    }

    console.log(`Updating dropdown with ${users.length} users.`);
    users.forEach(user => {
        const item = document.createElement('div');
        item.className = 'user-result';

        if (user.profilePicture) {
            const img = document.createElement('img');
            img.src = user.profilePicture;
            img.alt = `${user.displayName}'s profile picture`;
            img.width = 30;
            img.height = 30;
            img.style.marginRight = '10px';
            item.appendChild(img);
        }

        const text = document.createElement('span');
        text.textContent = `${user.displayName} (@${user.username})`;
        item.appendChild(text);

        item.addEventListener('click', () => {
            console.log(`User selected: @${user.username}`);
            inputElement.value = user.username; // Autofill input with the selected username
            container.innerHTML = ''; // Clear the dropdown after selection
        });

        container.appendChild(item);
    });
}

// Function to handle input and display search results
function handleUserSearch(inputElement, resultsContainer) {
    let timeout;

    inputElement.addEventListener('input', () => {
        clearTimeout(timeout);
        const query = inputElement.value.trim();

        if (query.length === 0) {
            resultsContainer.innerHTML = '';
            console.log('Input cleared.');
            return;
        }

        timeout = setTimeout(async () => {
            const users = await searchUsers(query);
            updateResultsDropdown(users, resultsContainer, inputElement);
        }, 300);
    });

    // Validate input when it loses focus
    inputElement.addEventListener('blur', async () => {
        const inputValue = inputElement.value.trim();
        if (inputValue) {
            const isValid = await checkUsernameValidity(inputValue);
            if (!isValid) {
                console.log(`Invalid username entered: ${inputValue}. Clearing input.`);
                inputElement.value = ''; // Clear the input if the username is not valid
            }
        }
    });

    // Optional: Hide dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!resultsContainer.contains(event.target) && event.target !== inputElement) {
            resultsContainer.innerHTML = '';
        }
    });
}

// Initialize the user search feature for all relevant inputs
document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('.user-search-input');
    searchInputs.forEach(input => {
        const resultsContainer = input.nextElementSibling;
        if (resultsContainer && resultsContainer.classList.contains('dropdown')) {
            handleUserSearch(input, resultsContainer);
        }
    });
});
