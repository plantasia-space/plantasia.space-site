---
layout: article
title: plantasia.space
show_title: false

permalink: /index.html
full_width: false
show_excerpt: false

public: true

header:
  theme: dark
  background: 'linear-gradient(135deg, rgb(0, 0, 0), rgb(123, 123, 123))' # Removed the extra comma

---
<div style="height: 5vh;"></div>

<!-- Hero Section with Video -->
<section class="hero hero--video">
  <video autoplay loop muted playsinline class="hero__video">
    <source src="/img/landing/header-1.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</section>

<div style="height: 5vh;"></div>

<hr>

<div style="height: 5vh;"></div>

<div class="form-container-index">
  <h3>🌸 Become a Beta Tester 🌞</h3>
  <p>
    plantasia.space is blooming soon.<br>
    register below to receive your early access invitation.
  </p>
  
  <form
    action="https://formspree.io/f/xvgkqgel"
    method="POST"
    class="contact-form"
  >
    <label>
      Your name:
      <input type="text" name="name" placeholder="e.g. Jasmine Moss" required>
    </label>

    <label>
      Your email:
      <input type="email" name="email" placeholder="you@example.com" required>
    </label>

    <label>
      Why would you like to join as a beta tester?
      <textarea name="message" placeholder="Tell us what draws you to plantasia.space, or how you imagine participating..." required></textarea>
    </label>

    <button type="submit">🌱 Request Beta Access</button>
  </form>
</div>