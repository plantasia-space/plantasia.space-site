---
layout: landing
title: Maar World
excerpt: >
    Records from the Cygnus Constellation
permalink: /index.html
full_width: false
public: true

header:
  theme: dark
  background: 'linear-gradient(135deg, rgba(255, 0, 222, 1), rgba(255, 0, 0, .5),)'

article_header:
  height: 10vh
  theme: ocean
  background_color: '#203028' 
  background_image:
  #  gradient: 'linear-gradient(135deg, rgba(0, 0, 0 , .9), rgba(139, 34, 139, .9))'
    src: /img/landing/433-mw-index.gif
    
---

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
        { c: 0, g: 401 },
        { c: 1, g: 334 },
        { c: 2, g: 334 },
        { c: 3, g: 334 },
        { c: 4, g: 334 },
        { c: 5, g: 334 },
        { c: 6, g: 334 },
        { c: 7, g: 334 },
        { c: 8, g: 334 },
        { c: 9, g: 334 },
        { c: 10, g: 334 },
        { c: 11, g: 334 }
      ];

      const startIndex = (page - 1) * 5;
      const endIndex = startIndex + 5;

      for (let i = startIndex; i < endIndex; i++) {
        if (i >= items.length) break;

        const { c, g } = items[i];
        const container = document.createElement('div');
        container.className = 'container';
        container.setAttribute('data-src', `http://192.168.178.121:5500/?g=${g}&s=0&c=${c}`);
        
        const info = `
          <br> 
          𝐵𝓇𝓊𝓃𝒶 𝒢𝓊𝒶𝓇𝓃𝒾𝑒𝓇𝒾 - c=${c}
          <br>
          <a href="http://192.168.178.121:5500/?g=${g}&s=0&c=${c}" rel="Maar World Player" target="_blank">Play full screen</a>
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
</script>
