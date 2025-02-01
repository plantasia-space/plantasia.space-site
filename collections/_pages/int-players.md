---
layout: landing
title: Interplanetary Players 
cover: /img/docs/covers/int-players-cover.jpeg
excerpt: >
      Imagine turning your browser into a turntable from outer space. 
permalink: /interplanetary-players.html
full_width: false
show_date: false
public: true
header:
  theme: dark
 # background: 'linear-gradient(135deg, rgba(0, 0, 0, .5), rgba(0, 0, 0, .5),)'
article_header:
  height: 30vh
  theme: ocean
  background_color: '#203028' 
  background_image:
  #  gradient: 'linear-gradient(135deg, rgba(0, 0, 0 , .9), rgba(139, 34, 139, .9))'
    src: /img/interplanetary-players/433-decks.gif
---

  <div class="p-4"></div>
  <div class="grid">
    <div class="cell cell--bordered cell--12">

<div class="hero hero--center" style="background-color: #000000;">
  <div class="hero__content">
    <h3>Start your journey</h3>
  </div>
</div>

<script>
  {%- include scripts/lib/swiper.js -%}
  var SOURCES = window.TEXT_VARIABLES.sources;
  window.Lazyload.js(SOURCES.jquery, function() {
    $('.swiper-demo--0').swiper();
    $('.swiper-demo--1').swiper();
    $('.swiper-demo--2').swiper();
    $('.swiper-demo--3').swiper();
    $('.swiper-demo--4').swiper({ animation: true });
  });
</script>


<style>
  .swiper-demo--3 {
    background-color: black; /* Sets the background color to black */
  }
    .swiper-demo--3 .swiper__slide img {
    width: 100%; /* Ensures images are fully responsive */
    max-width: 100%; /* Ensures images do not exceed their container's width */
    height: auto; /* Maintains aspect ratio */
  }
</style>

<div class="swiper my-3 swiper-demo swiper-demo--image swiper-demo--3">
  <div class="swiper__wrapper">
    <!-- Slide 1 -->
    <div class="swiper__slide">
      <img class="lightbox-ignore" src="/img/interplanetary-players/07_ip-card.jpg" style="max-width: 800px;"/>
      <div class="text-content">
        <h2>I</h2>
        <p>Explore music like never before, allowing you to layer sounds with controls that vary according to the cards you play, creating rich and original sound experiences.</p>
      </div>
    </div>
    <!-- Slide 2 -->
    <div class="swiper__slide">
      <img class="lightbox-ignore" src="/img/interplanetary-players/10_ip-transit.png" style="max-width: 800px;"/>
      <div class="text-content">
        <h2>II</h2>
        <p>Intuitively remix music, making sound creation accessible and fun for everyone, from professional musicians to those with no prior experience.</p>
      </div>
    </div>
    <!-- Slide 3 -->
    <div class="swiper__slide">
      <img class="lightbox-ignore" src="/img/interplanetary-players/08_ip-max-24.jpg" style="max-width: 800px;"/>
      <div class="text-content">
        <h2>III</h2>
        <p>We are in the very beginning of this journey, <a href="https://maar.world/subscribe" target="_blank">stay connected</a> for more.</p>
      </div>
    </div>
  </div>
  <div class="swiper__button swiper__button--prev fas fa-chevron-left"></div>
  <div class="swiper__button swiper__button--next fas fa-chevron-right"></div>
</div>
</div>
</div>

<div class="p-5"></div>

<!-- New section for "Control the Sound:" -->
<section class="grid">
  <article class="cell cell--bordered cell--12">
    <div class="hero hero--center hero--dark" style='background-color: #000000;'>
      <div class="hero__content">
        <h3>Control the Sound:</h3>
        <div class="container">
          <iframe src="https://play.maar.world/?g=335&s=1&c=0" class="responsive-iframe" title="Control the Sound Interactive" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <p>Please unmute your device and press the PLAY ▶️ button. Adjust the sound by moving the XYZ KNOBS up or down until you like what you hear. If you want to go back to the original sound, press the hexagonal ⬢ buttons to reset the knobs to their equilibrium.</p>
      </div>
    </div>
    <div class="hero hero--center hero--dark" style='background-color: #000000;'>
      <div class="hero__content">
        <h3>Explore Regenerative Modes:</h3>
        <div class="container">
          <iframe src="https://play.maar.world/?g=8&s=0&c=21" class="responsive-iframe" title="Explore Regenerative Modes Interactive" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <p>Experiment with 7 unique modes, creating with real data from exoplanets and their transits and orbits across different time scales. Leave the button pressed to get hints about these parameters.</p>
      </div>
    </div>
  </article>
</section>

<div class="p-5"></div>

<div class="grid">
  <div class="cell cell--bordered cell--12">
    <!-- Section 1: Innovative Tradition -->
    <div class="hero hero--center hero--dark" style='background-color: #000;'>
      <div class="hero__content">
        <h3>Innovative Tradition</h3>
        <img src="/img/interplanetary-players/maar-world-banner-ovni.jpg" alt="Innovative Tradition" style="max-width: 100%; height: auto; margin-top: 20px;">
        <p>Discover the different cards effects as if you're adjusting a spaceship's experience.</p>
      </div>
    </div>
    <!-- Section 2: An Extended Harmony of the Spheres -->
    <div class="hero hero--center hero--dark" style='background-color: #000;'>
      <div class="hero__content">
        <h3>An Extended Harmony of the Spheres</h3>
        <img src="/img/interplanetary-players/Planetary_Musical_Scales_from_Harmony_of_the_Worlds.jpg" alt="Harmony of the Spheres" style="max-width: 100%; height: auto; margin-top: 20px;">
        <p>Sync your remix with the movement of the Kepler-47 star system. It's like mixing soundscapes with a touch of stardust, opening a new spectrum of possibilities for jamming with the cosmos.</p>
        <img src="/img/interplanetary-players/Kepler_Space_Telescope.png" alt="Kepler telescope" style="max-width: 100%; height: auto; margin-top: 20px;">
      </div>
    </div>
  </div>
</div>


