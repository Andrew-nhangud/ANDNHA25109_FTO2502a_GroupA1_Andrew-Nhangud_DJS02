//main.js
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Import necessary modules
    const { PodcastModal, handlePodcastCardClick } = await import(
      "./podcastModal.js"
    );
    const { podcasts } = await import("./data.js");
    const { getGenreTitles, formatDate } = await import("./utils.js");

    // Initialize modal
    const podcastModal = new PodcastModal("podcastModal", "close-button");

    // Create podcast cards
    function createPodcastCards() {
      const container = document.querySelector(".podcast-card");

      podcasts.forEach((podcast) => {
        const card = document.createElement("div");
        card.className = "innerPodcast-card";
        card.innerHTML = `
                    <img src="${podcast.image}" alt="${podcast.title}">
                    <div class="podcast-card-info">
                        <h1>${podcast.title}</h1>
                        <div class="podcast-categories">
                            ${getGenreTitles(podcast.genres)
                              .map(
                                (genre) =>
                                  `<p class="podcast-categories-items">${genre}</p>`
                              )
                              .join("")}
                        </div>
                        <p class="season-info">${podcast.seasons} Seasons</p>
                        <p class="date">Last updated ${formatDate(
                          podcast.updated
                        )}</p>
                    </div>
                `;
        card.addEventListener("click", () =>
          handlePodcastCardClick(card, podcastModal, podcasts)
        );
        container.appendChild(card);
      });
    }

    // Initialize the app
    createPodcastCards();
  } catch (error) {
    console.error("Error initializing application:", error);
  }
});
