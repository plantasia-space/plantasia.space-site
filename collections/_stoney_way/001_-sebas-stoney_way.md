---
layout: article
permalink: /STW3344
show_title: false
header: false
cover: https://www.dropbox.com/scl/fi/dgh8bkkom33308bxlgjsj/Stoney-Way-Cover.jpg?rlkey=5s2g0qf0xq5335vamiigc1asv&raw=1
suit_title: Stoney_Way
card_title: Card I
card_image: https://www.dropbox.com/scl/fi/dgh8bkkom33308bxlgjsj/Stoney-Way-Cover.jpg?rlkey=5s2g0qf0xq5335vamiigc1asv&raw=1
card_description: esta es una piedra muy especial que me acompaña hace años y viene de aguas corrientes en Uruguay. qué opinas de volver a trabajar en la edición Stoney Way? poc a poc i amb bona lletra
ent_link: https://maarworld.gumroad.com/
physical_link: https://maarworld.gumroad.com/l/skysound1
digital_link: https://opensea.io
download: https://dl.dropboxusercontent.com/scl/fi/xp7ew10ihkpg6xd6amumg/Stoney_Way_Mix-10-09-22.mp3?rlkey=b8s5c3mg2n89stv5xzou4tpln&raw=1
download2: https://dl.dropboxusercontent.com/scl/fi/alp4e8enp7ku5j3030uuk/Stoney_Way_Mix-10-09-22.wav?rlkey=7qr7x5pfuz0ou6sb30bkm7pgj&raw=1
player: https://play.maar.world/?g=400&s=0&c=0 
player2: https://play.maar.world/?g=400&s=0&c=0
titles:
  en      : &EN       Maar Sky Sounds Card I

key: skylight ent card 
noindex: true
footer: false
---

<div class="hero hero--dark" style='height: 233px; background-image: url("/img/433.1b.jpg");'>
  <div class="hero__content">  
  </div>
</div>

<div class="hero hero--center" style="background-color: #000000;">
  <div class="hero__content">
    <h3>{{ page.suit_title}}</h3>
  <p style="font-size: 70%;">Please <a href="https://support.apple.com/en-gb/HT208353" rel="unmute" target="_blank">unmute</a> your device and press PLAY ▶️ button.</p>
  </div>
</div>

<div class="hero hero--center" style="background-color: #000000;">
  <div class="hero__content">
    <h3>music</h3>
  </div>

  <div class="container">
    <iframe class="responsive-iframe" src="{{ page.player }}" style="border: 0"></iframe>
  </div>
</div>

<div class="hero hero--center" style="background-color: #000000;">
  <div class="hero__content">
    <a href="{{ page.player }}" rel="Maar World Player" target="_blank"> Play full screen</a>
</div>
</div>


<div class="item">
  <div class="item__image">
  <img class="image image--lg" src="{{ page.card_image}}" style="margin:0 auto; display:block;"/>
  </div>
  <div class="item__content">
    <div class="item__header">
    <div style="text-align: center;">
      <h2>{{ page.card_title }}:</h2>
    </div>    
    </div>
    <div class="item__description">
      <p>{{ page.card_description }}</p>
    </div>
  </div>
</div>



<div class="hero hero--dark" style='height: 233px; background-image: url("/img/433.2.jpg");'>
  <div class="hero__content">  
  </div>
</div>


<div class="hero hero--dark" style="height: 233px;">
  <div class="hero__content" style="display: flex; justify-content: center; align-items: center;">
    <a href="{{ page.download }}" class="button button--info">
      <span class="material-symbols-outlined">Download</span> download wav 
    </a>
    <span style="margin: 0 10px;"></span> <!-- Adjust the value as per your preference -->
    <a href="{{ page.download2 }}" class="button button--error">
      <span class="material-symbols-outlined">Download</span> download mp3
    </a>
  </div>
</div>
