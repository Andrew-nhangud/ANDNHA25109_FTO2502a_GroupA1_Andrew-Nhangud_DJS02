# Behind the Mic: A Guide to the PodcastHub Website

PodcastHub is a mobile-first web app for discovering and exploring curated podcasts. It features dynamic podcast cards, modals for detailed views, and filtering options for genre and sort order.

## 🚀 Features

- Search and filter podcasts
- Custom Web Component for podcast previews
- Modal system with full-screen view and episode lists
- Responsive layout (mobile to desktop)
- Clean modular JavaScript with ES Modules

## 🛠️ Technologies

- HTML, CSS, JavaScript
- Web Components (Custom Elements)
- Google Fonts

## 🧩 About the Web Component

PodcastHub uses a custom Web Component named `<podcast-preview>` to display podcast cards dynamically. This component:

- Encapsulates its own styles and markup using Shadow DOM
- Accepts attributes such as `title`, `image`, `genres`, `seasons`, and `updated`
- Dynamically parses genre IDs and formats dates using utility functions
- Emits a custom `podcast-selected` event when clicked, triggering the podcast modal

This modular approach improves maintainability, promotes reusability, and keeps concerns clearly separated — a key architectural choice in the project.


## 📦 How to Use

1. Clone the repository  
2. Open `index.html` in your browser  
3. Browse, filter, and explore podcasts

---

Crafted with care by **Andrew**.  
*Curious minds deserve good stories.*
