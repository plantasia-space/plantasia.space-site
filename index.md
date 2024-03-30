---
layout: landing
title:  Maar World
excerpt: >
    A Recordlabel from the Cygnus Constellation
permalink: /index.html
full_width: false

header:
  theme: dark
  background: 'linear-gradient(135deg, rgba(255, 0, 222, 1), rgba(255, 0, 0, .5),)'

article_header:
  height: 30vh
  theme: ocean
  background_color: '#203028' 
  background_image:
  #  gradient: 'linear-gradient(135deg, rgba(0, 0, 0 , .9), rgba(139, 34, 139, .9))'
    src: /img/landing/433-mw-index.gif
data:
  sections:
    - title: ""
      children:
        - title: 'Explore a new musical dimension <i class="fas fa-arrow-down"></i>'
          image:
            src: /img/landing/2_collect.jpeg
            url: https://collect.maar.world/
            style: "max-width: 200px; max-height: 200px"
            is_row: true
        - title: 'Listen music & sets <i class="fas fa-arrow-down"></i>'
          image:
            src: /img/landing/5_music.jpeg
            url: /music
            style: "max-width: 200px; max-height: 200px"
            is_row: true
        - title: 'Learn about the creative process <i class="fas fa-arrow-down"></i>'
          image:
            src: /img/landing/1_lab.jpeg
            url: /lab
            style: "max-width: 200px; max-height: 200px"
            is_row: true
    - title:
      children:
        - title: 'Interact with the radio <i class="fas fa-arrow-down"></i>'
          image:
            src: /img/landing/4_radio.jpeg
            url: /radio
            style: "max-width: 200px; max-height: 200px"
            is_row: true
        - title: 'Book a live show <i class="fas fa-arrow-down"></i>'
          image:
            src: /img/landing/6_bookings.jpeg
            url: /bookings
            style: "max-width: 200px; max-height: 200px"
            is_row: true
        - title: 'Dates and tours  <i class="fas fa-arrow-down"></i>'
          image:
            src: /img/landing/3_landing.jpeg
            url: /landings
            style: "max-width: 200px; max-height: 200px"
            is_row: true

      background_color: "#000000"

    - title:
      image:
        src: /img/landing/7_about.jpeg
        url: /about
        is_row: true
        full_width: true
        style: "max-width: 200px;"
      excerpt:  Each section offers a window into a different facet of our mission to reactivate auditory consciousness and connect cultures through sound.  
---

<div class="form-container">
  <h3>Contact us</h3>
  <p>Collaborate with us, or simply learn more about our vision and projects.</p>
  
  <form
    action="https://formspree.io/f/mqkrdkde"
    method="POST"
    class="contact-form"
  >
    <label>
      Your name:
      <input type="text" name="name" required>
    </label>
    <label>
      Your email:
      <input type="email" name="email" required>
    </label>
    <label>
      Your message:
      <textarea name="message" required></textarea>
    </label>
    <button type="submit">Send</button>
  </form>
</div>