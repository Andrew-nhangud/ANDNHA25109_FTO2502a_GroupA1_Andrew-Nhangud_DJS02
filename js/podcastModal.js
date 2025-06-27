//podcastModal.js
import { getGenreTitles, formatDate } from "./utils.js";
import { seasons } from "./data.js";

export class PodcastModal {
  constructor(modalId, closeButtonClass) {
    this.modal = document.getElementById(modalId);
    this.closeButton = document.querySelector(`.${closeButtonClass}`);
    this.viewMoreBtn = document.getElementById("viewMoreBtn");
    this.fullScreenModal = document.getElementById("fullScreenModal");
    this.backToPodcastBtn = document.getElementById("backToPodcastBtn");

    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => this.close());
    }

    if (this.viewMoreBtn) {
      this.viewMoreBtn.addEventListener("click", () =>
        this.openFullScreenModal()
      );
    }

    if (this.backToPodcastBtn) {
      this.backToPodcastBtn.addEventListener("click", () =>
        this.closeFullScreenModal()
      );
    }

    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) this.close();
      });
    }
  }

  open(podcastData) {
    this.currentPodcast = podcastData;
    document.getElementById("modalTitle").textContent = podcastData.title;
    document.getElementById("modalImage").src = podcastData.image;
    document.getElementById("modalDescription").textContent =
      podcastData.description;
    document
      .getElementById("modalLastUpdated")
      .querySelector("span").textContent = formatDate(podcastData.updated);
    document.getElementById("modalGenres").innerHTML = getGenreTitles(
      podcastData.genres
    )
      .map((g) => `<span class="podcast-categories-items">${g}</span>`)
      .join("");

    // Add seasons count to the initial modal
    const seasonsCount = podcastData.seasons;
    document.getElementById("modalSeasons").innerHTML = `
      <div class="season-count">${seasonsCount} Seasons</div>
    `;

    this.modal.style.display = "block";
  }

  openFullScreenModal() {
    const podcast = this.currentPodcast;
    document.getElementById("fullScreenModalTitle").textContent = podcast.title;
    document.getElementById("fullScreenModalImage").src = podcast.image;
    document.getElementById("fullScreenModalDescription").textContent =
      podcast.description;
    document
      .getElementById("fullScreenModalLastUpdated")
      .querySelector("span").textContent = formatDate(podcast.updated);
    document.getElementById("fullScreenModalGenres").innerHTML = getGenreTitles(
      podcast.genres
    )
      .map((g) => `<span class="podcast-categories-items">${g}</span>`)
      .join("");

    // Add seasons count to the full screen modal
    const seasonsCount = podcast.seasons;
    document.getElementById("fullScreenModalSeasons").innerHTML = `
      <div class="season-count">${seasonsCount} Seasons</div>
    `;

    const seasonsList =
      seasons.find((s) => s.id === podcast.id)?.seasonDetails || [];
    const seasonsContainer = document.getElementById("seasonsContainer");
    seasonsContainer.innerHTML = seasonsList
      .map(
        (season) => `
            <div class="season-item">
                <div class="season-header">
                    <span class="season-title">${season.title}</span>
                    <span class="season-header-episodes">${
                      season.episodes
                    } episodes</span>
                </div>
                <div class="season-episodes">
                    ${Array.from({ length: season.episodes }, (_, i) => i + 1)
                      .map(
                        (ep) => `<div class="episode-item">
                            <div class="episode-title">Episode ${ep}</div>
                            <div class="episode-desc">Sample description for episode ${ep}</div>
                        </div>`
                      )
                      .join("")}
                </div>
            </div>
        `
      )
      .join("");

    seasonsContainer.querySelectorAll(".season-header").forEach((header) => {
      header.addEventListener("click", function () {
        this.nextElementSibling.style.display =
          this.nextElementSibling.style.display === "block" ? "none" : "block";
      });
    });

    this.close();
    this.fullScreenModal.style.display = "block";
  }

  close() {
    this.modal.style.display = "none";
  }
  closeFullScreenModal() {
    this.fullScreenModal.style.display = "none";
  }
}

export function handlePodcastCardClick(card, podcastModal, podcasts) {
  const title = card.querySelector("h1").textContent;
  const podcast = podcasts.find((p) => p.title === title);
  if (podcast) podcastModal.open(podcast);
}
