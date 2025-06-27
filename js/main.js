// js/main.js
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Import all necessary modules at the start
    const { PodcastModal } = await import("./podcastModal.js");
    const { podcasts } = await import("./data.js");

    // Import the PodcastPreview class explicitly
    const { PodcastPreview } = await import("./podcastPreview.js");

    // Initialize modal
    const podcastModal = new PodcastModal("podcastModal", "close-button");

    // Create podcast cards
    const container = document.querySelector(".podcast-card");
    container.innerHTML = ""; // Clear existing content

    podcasts.forEach((podcast) => {
      const preview = new PodcastPreview();
      preview.setAttribute("title", podcast.title);
      preview.setAttribute("image", podcast.image);
      preview.setAttribute("genres", JSON.stringify(podcast.genres));
      preview.setAttribute("seasons", podcast.seasons);
      preview.setAttribute("updated", podcast.updated);

      preview.addEventListener("podcast-selected", () => {
        podcastModal.open(podcast);
      });

      container.appendChild(preview);
    });
  } catch (error) {
    console.error("Error initializing application:", error);
  }
});
