---
layout: articles
show_title: false
show_date: false
permalink: /voyage/field
titles:
  # @start locale config
  en      : &EN      Check Username
  en-GB   : *EN
  en-US   : *EN
  en-CA   : *EN
  en-AU   : *EN
  # @end locale config
key: IP
public: false

---

# Check Username

<div class="form-container">
    <h3>xPlorer Profile</h3>
    <label for="usernameInput">Username:</label>
    <p>Please enter a username to see if it exists:</p>
    <input type="text" class="user-search-input" id="usernameInput" placeholder="Type a username..." autocomplete="off" />
    <div class="dropdown"></div>
</div>

<!-- Include the JavaScript -->
<script src="../../scripts/searchUsers.js"></script>
