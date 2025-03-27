---
layout: article
title: plantasia.space
show_title: false
permalink: /index.html
full_width: false
show_excerpt: false
public: true
---

<!-- Hero Section with Video -->
<section class="hero hero--video">
  <video autoplay loop muted playsinline class="hero__video">
    <source src="/img/landing/header-1.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</section>

<div id="feed">
  <!-- Track containers will be added dynamically here -->
</div>
<button id="load-more">Cargar más</button>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    // BASE URL for your production API
    const API_BASE_URL = 'https://api.plantasia.space/api';
    
    let currentPage = 1;
    const limit = 5;  // how many tracks per page

    const feed = document.getElementById('feed');
    const loadMoreButton = document.getElementById('load-more');

    async function loadItems(page) {
      try {
        const offset = (page - 1) * limit;
        const url = `${API_BASE_URL}/feed?type=global&limit=${limit}&offset=${offset}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          console.error('Error fetching global feed:', response.statusText);
          return;
        }

        const tracks = await response.json();

        if (!tracks.length) {
          loadMoreButton.style.display = 'none';
          return;
        }

        // For each track, create a container that will load the iframe once visible.
        tracks.forEach(track => {
          const container = document.createElement('div');
          container.className = 'container';
          // Set the player URL as a data attribute for lazy-loading.
          container.setAttribute('data-src', `https://player.plantasia.space/?trackId=${track._id}`);
          container.style.marginBottom = '333px'; // Gap between frames

          // Display track info.
          const info = `
            <br>
            Owner: ${track.ownerId} – <strong>${track.trackName}</strong> (Track ID=${track._id})
            <br>
            <a href="https://player.plantasia.space/?trackId=${track._id}"
               rel="Plantasia Player" target="_blank">
               Play full screen
            </a>
            <br>
            #RegenerativeMusic
            <hr>
          `;
          container.innerHTML = info;
          feed.appendChild(container);
        });

        // Observe new containers to load iframes as they become visible.
        observeContainers();
      } catch (error) {
        console.error('Error loading items:', error);
      }
    }

    // IntersectionObserver callback modified to load iframes without deactivating them.
    function observeContainers() {
      const containers = document.querySelectorAll('.container[data-src]');

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const container = entry.target;
          if (entry.isIntersecting) {
            const src = container.getAttribute('data-src');
            if (src) {
              // Prepend the iframe to the container. Once loaded, remove the data attribute.
              container.innerHTML = `
                <iframe class="responsive-iframe"
                        src="${src}"
                        style="border: 0"
                        allowfullscreen>
                </iframe>` + container.innerHTML;
              container.removeAttribute('data-src');
            }
          }
          // Bypass deactivation: do nothing when container is not in view.
        });
      });

      containers.forEach(container => observer.observe(container));
    }

    // Initial load.
    loadItems(currentPage);

    // Load more on button click.
    loadMoreButton.addEventListener('click', () => {
      currentPage++;
      loadItems(currentPage);
    });

    // (Optional) Restore scroll position.
    const lastScrollY = localStorage.getItem('lastScrollY');
    if (lastScrollY) {
      window.scrollTo({
        top: lastScrollY,
        behavior: 'smooth'
      });
    }

    window.addEventListener('scroll', () => {
      localStorage.setItem('lastScrollY', window.scrollY);
    });
  });
</script>