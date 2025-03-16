---
layout: article
title: Plantasia.spacE
show_title: false

permalink: /index.html
full_width: false
show_excerpt: false

public: true

header:
  theme: dark
  background: 'linear-gradient(135deg, rgb(0, 0, 0), rgba(71, 255, 4, 0.56))' # Removed the extra comma

---

<!-- Hero Section with Video -->
<section class="hero hero--video">
  <video autoplay loop muted playsinline class="hero__video">
    <source src="/img/landing/header-1.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</section>


# Releases

<div id="feed">
  <!-- Contenedores se agregarán dinámicamente aquí -->

</div>
<button id="load-more">Cargar más</button>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    const maxActivePlayers = 5;
    let activePlayers = 0;
    const feed = document.getElementById('feed');
    const loadMoreButton = document.getElementById('load-more');

    function loadItems(page) {
      // Supongamos que cada página tiene 5 elementos
      const items = [
        { trackId: "6722827ad2c02370b6b8c423" },
        { trackId: "6729d2b349c2c24bbf8c67b9" },
        { trackId: "6729f817cbc71363fd8ce90c" },
        { trackId: "6729fa5d1ba44ea87bf49e18" },
        { trackId: "6729fc3b6bafcb1eeac61fcc" },
        { trackId: "672a09a0d0cfe69140ed3cc2" },
        { trackId: "672a1a9aeab0bb9e1a3a8c21" },
        { trackId: "672a1d5152f40314cc58bcab" },
        { trackId: "6738c0f53af6425d6ef6ba9b" }
      ];

      const startIndex = (page - 1) * 5;
      const endIndex = startIndex + 5;

      for (let i = startIndex; i < endIndex; i++) {
        if (i >= items.length) break;

        const { trackId } = items[i];
        const container = document.createElement('div');
        container.className = 'container';
        container.setAttribute('data-src', `https://player.maar.world/?trackId=${trackId}&s=0`);
        container.style.marginBottom = '333px'; // Espaciado entre iframes

        const info = `
          <br> 
          𝐵𝓇𝓊𝓃𝒶 𝒢𝓊𝒶𝓇𝓃𝒾𝑒𝓇𝒾 - trackId=${trackId}
          <br>
          <a href="https://player.maar.world/?trackId=${trackId}&s=0" rel="Maar World Player" target="_blank">Play full screen</a>
          <br>
          \`#RegenerativeMusic\`{:.success}
          <hr>
        `;

        container.innerHTML = info;
        feed.appendChild(container);
      }

      // Vuelve a activar el IntersectionObserver
      observeContainers();
    }

    function observeContainers() {
      const containers = document.querySelectorAll('.container[data-src]');
      
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const container = entry.target;
          if (entry.isIntersecting) {
            if (activePlayers < maxActivePlayers) {
              const src = container.getAttribute('data-src');
              if (src) {
                container.innerHTML = `<iframe class="responsive-iframe" src="${src}" style="border: 0"></iframe>` + container.innerHTML;
                container.removeAttribute('data-src');
                activePlayers++;
              }
            }
          } else {
            const iframe = container.querySelector('iframe');
            if (iframe) {
              iframe.remove();
              container.setAttribute('data-src', iframe.src);
              activePlayers--;
            }
          }
        });
      });

      containers.forEach(container => {
        observer.observe(container);
      });
    }

    loadMoreButton.addEventListener('click', () => {
      currentPage++;
      loadItems(currentPage);
    });

    // Cargar los primeros 5 elementos
    loadItems(currentPage);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const lastScrollY = localStorage.getItem('lastScrollY');
    if (lastScrollY) {
        // Use a smoother scroll effect
        window.scrollTo({
            top: lastScrollY,
            behavior: 'smooth' // This will apply smooth scrolling
        });
    }
});

window.addEventListener('scroll', () => {
    // Save the current scroll position to local storage
    localStorage.setItem('lastScrollY', window.scrollY);
});

</script>
