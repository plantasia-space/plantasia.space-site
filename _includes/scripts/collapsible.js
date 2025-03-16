
/**
 * Function to handle all collapsible sections.
 */
// Function to handle all collapsible sections.
async function handleCollapsibleSections() {
    const collapsibleSections = document.querySelectorAll('.collapsible-section');

    collapsibleSections.forEach(section => {
        const header = section.querySelector('.section-header');
        const toggleButton = section.querySelector('.toggle-button');
        const content = section.querySelector('.section-content');
        const icon = toggleButton.querySelector('.toggle-icon');
        const sectionId = section.getAttribute('data-section-id');

        if (!sectionId) {
            console.warn('Collapsible section missing data-section-id:', section);
            return;
        }

        // Retrieve the saved state from localStorage
        const savedState = localStorage.getItem(`collapsible_${sectionId}`);
        let isExpanded;

        if (savedState !== null) {
            isExpanded = savedState === 'true';
            console.log(`Section "${sectionId}" retrieved from localStorage as: ${isExpanded}`);
        } else {
            // On first load, set default state
            isExpanded = (sectionId === 'dashboard-menu'); // Only Dashboard Menu is expanded by default
            console.log(`Section "${sectionId}" set to default state: ${isExpanded}`);
        }

        // Initialize state based on saved state or default rule
        toggleButton.setAttribute('aria-expanded', isExpanded);
        header.setAttribute('aria-expanded', isExpanded);
        section.classList.toggle('collapsed', !isExpanded);
        icon.textContent = isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

        if (isExpanded) {
            // Initially expanded, set height to 'auto' after ensuring images are loaded
            content.style.height = 'auto';
        } else {
            // Initially collapsed, ensure height is 0
            content.style.height = '0px';
        }

        // Toggle function
        const toggleSection = () => {
            const currentlyExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            const newExpandedState = !currentlyExpanded;

            // Update aria-expanded attributes
            toggleButton.setAttribute('aria-expanded', newExpandedState);
            header.setAttribute('aria-expanded', newExpandedState);

            // Toggle collapsed class
            section.classList.toggle('collapsed', !newExpandedState);

            // Update icon
            icon.textContent = newExpandedState ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

            if (newExpandedState) {
                // Expanding
                const contentHeight = content.scrollHeight;
                content.style.height = `${contentHeight}px`;

                // After the transition, reset height to 'auto' to accommodate dynamic content
                content.addEventListener('transitionend', function handleTransitionEnd() {
                    content.style.height = 'auto';
                    content.removeEventListener('transitionend', handleTransitionEnd);
                });
            } else {
                // Collapsing
                // Temporarily set height to current height to enable transition
                const contentHeight = content.scrollHeight;
                content.style.height = `${contentHeight}px`;

                // Force a reflow to ensure the browser registers the change
                content.offsetHeight;

                // Then set height to 0
                content.style.height = '0';
            }

            // Save the new state to localStorage
            localStorage.setItem(`collapsible_${sectionId}`, newExpandedState);
            console.log(`Section "${sectionId}" state saved as: ${newExpandedState}`);
        };

        // Click event on header (excluding the toggle button)
        header.addEventListener('click', function (e) {
            // If the toggle button itself is clicked, do nothing here
            if (e.target.closest('.toggle-button')) return;
            toggleSection();
        });

        // Click event on toggle button
        toggleButton.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event from bubbling to header
            toggleSection();
        });

        // Keyboard accessibility: toggle on Enter or Space key when header is focused
        header.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSection();
            }
        });
    });
}
        
/**
 * Function to recalculate max-height for all expanded sections after content is loaded
 */
async function recalculateMaxHeight() {
    const expandedSections = document.querySelectorAll('.collapsible-section[data-section-id]:not(.collapsed)');
    for (const section of expandedSections) {
        const content = section.querySelector('.section-content');
        if (content) {
            // Wait for all images within the section to load
            const images = content.querySelectorAll('img');
            await Promise.all(Array.from(images).map(img => {
                if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve; // Resolve even if image fails to load
                });
            }));
            // Now, set max-height
            content.style.maxHeight = `${content.scrollHeight}px`;
            console.log(`Recalculated max-height for section "${section.getAttribute('data-section-id')}" to ${content.scrollHeight}px`);
        }
    }
}

// Expose the functions globally
window.handleCollapsibleSections = handleCollapsibleSections;
window.recalculateMaxHeight = recalculateMaxHeight;
