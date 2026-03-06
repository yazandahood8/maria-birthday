# Birthday Surprise for Maria

A romantic birthday website with confetti, music, a heartfelt letter, and a photo gallery.

## How to Run

1. Open `index.html` in your web browser (double-click or right-click → Open with → your browser).
2. Or use a simple local server: `npx serve .` (if you have Node.js installed).

## Customization Guide

### 1. Add Your Photos

- Place your photos in the `assets/images/` folder.
- Name them: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc. (or `.png`)
- Open `index.html` and update the `src` in each gallery item:

```html
<img src="assets/images/photo1.jpg" alt="Memory 1" ...>
```

- You can add more gallery items by copying a `<div class="gallery-item">` block and changing the image path.

### 2. Add Your Music

- Place your song file in `assets/music/`
- Name it `birthday-song.mp3` (or update the path in `index.html`)
- Supported formats: MP3, OGG

In `index.html`, find the `<audio>` tag and update the source:

```html
<source src="assets/music/birthday-song.mp3" type="audio/mpeg">
```

**Note:** Some browsers block autoplay. The user must click "Play our song" to start the music.

### 3. Edit the Letter

- Open `index.html`
- Find the section with class `letter-paper`
- Replace the placeholder paragraphs with your own message

### 4. Change Her Name

- In `index.html`, search for "Maria" and replace with the correct name in the hero title and footer.

## Project Structure

```
maria/
├── index.html      # Main page
├── style.css       # Styling
├── script.js       # Confetti, music, gallery logic
├── README.md       # This file
└── assets/
    ├── images/     # Your photos go here
    └── music/      # Your song goes here
```

## Features

- **Confetti animation** – Romantic colors, runs on page load
- **Music player** – Play/pause button for your song
- **Heartfelt letter** – Easy to edit in HTML
- **Photo gallery** – Click any photo to view it larger (lightbox)
