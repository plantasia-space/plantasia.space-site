---
layout: articles
show_title: false
show_date: false
permalink: /track-release
titles:
  # @start locale config
  en      : &EN       Track Release
  en-GB   : *EN
  en-US   : *EN
  en-CA   : *EN
  en-AU   : *EN
  # @end locale config
key: IP

---

<div class="p-5"></div>


<div class="form-container">
    <h3>Track Release Form</h3>
    <p>Fill the form with details about your track.</p>

    <form id="articleForm" class="contact-form">
        <!-- Track Information -->
        <label for="artistName">Artist Name:*</label>
        <input type="text" id="artistName" name="artistName" required><br><br>

        <label for="songName">Song Name:*</label>
        <input type="text" id="songName" name="songName" required><br><br>

        <label for="uploadWAV">Upload Audio File (.WAV or .AIFF):</label>
        <input type="file" id="uploadWAV" name="uploadWAV" accept=".wav, .aiff" required><br><br>

        <label for="uploadMP3">Upload Audio File (.MP3 256-KBPS):</label>
        <input type="file" id="uploadMP3" name="uploadMP3" accept=".mp3" required><br><br>



        <!-- Categories -->
        <label for="type">Type:*</label>
        <select id="type" name="type">
            <option value="">Please select a type</option>
            <option value="Music">Music</option>
            <option value="Spoken Voice">Spoken Voice</option>
            <option value="Soundscape">Soundscape</option>
            <option value="Other">Other</option>
        </select><br><br>

        <label for="genre">Genre:</label>
        <input type="text" id="genre" name="genre"><br><br>

        <label for="mood">Mood:</label>
        <input type="text" id="mood" name="mood"><br><br>

        <label for="additionalTags">Additional Tags:</label>
        <input type="text" id="additionalTags" name="additionalTags"><br><br>

        <!-- Description -->
        <label for="description">Description:*</label>
        <textarea id="description" name="description" required rows="4" style="width: 100%;"></textarea><br><br>

        <!-- Collaborators -->
        <label for="credits">Credits:*</label>
        <input type="text" id="credits" name="credits" required><br><br>

        <label for="privacy">Privacy:</label>
        <select id="privacy" name="privacy">
            <option value="public">Public</option>
            <option value="private">Private</option>
        </select><br><br>

        <!-- Metadata -->
        <label for="releaseDate">Release Date:</label>
        <input type="date" id="releaseDate" name="releaseDate" required><br><br>

        <!-- License Selection -->
        <label for="licence">License:</label>
        <select id="licence" name="licence">
            <option value="regenerative">This work is has Regenerative Music Copy Nibble 1.0</option>
            <option value="creative-commons">This work is licensed under CC BY-SA 4.0</option>
        </select><br><br>

        <!-- License Information Display -->
        <p>Regenerative Music Copy Nibble 1.0:</p>
        <a href="https://4fqic5ajlayeqxfzzlq2pamrrqfwc2hthgaklvw3y3jrjtniikba.arweave.net/4WCBdAlYMEhcucrhp4GRjAthaPM5gKXW28bTFM2oQoI" target="_blank">
            Read more about Regenerative Music Copy Nibble 1.0
        </a><br><br>

        <p>Creative Commons CC BY-SA 4.0:</p>
        <a href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank">
            Read more about CC BY-SA 4.0
        </a>
        <br><br>

        <!-- Advanced -->
        <label for="enableDirectDownloads">Enable Direct Downloads:</label>
        <input type="checkbox" id="enableDirectDownloads" name="enableDirectDownloads"><br><br>

        <button type="submit">Submit</button>
    </form>
</div>
