---
layout: articles
title: Lab
show_title: true
excerpt: "Step into a time lab. <br> A public bitacora to share new and old creations." 
show_date: false
show_tags: true
permalink: /lab
key: lab
cover: /img/lab.png


header:
  theme: dark
 # background: 'linear-gradient(135deg, rgb(0, 255, 0), rgb(139, 34, 139, .1))'

article_header:
  height: 66vh
  type: overlay
  background_image:
    src: /img/lab/genesis-lab.jpg

---

<div class="layout--archive js-all">
  {%- include tags.html -%}
  <section class="my-5">
    <div class="js-result layout--archive__result d-none">

    <header><h2 id="page-layout">Lab</h2></header>
    {%- include article-list.html articles=site.lab type='brief' show_info=true reverse=true group_by='year' -%}    
  
</div>

<script>
  {%- include scripts/archieve.js -%}
</script>
