// js/podcastPreview.js
import { getGenreTitles, formatDate } from "./utils.js";

export class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["title", "image", "genres", "seasons", "updated"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const title = this.getAttribute("title") || "";
    const image = this.getAttribute("image") || "https://placehold.co/600x400";
    const genres = JSON.parse(this.getAttribute("genres") || "[]");
    const seasons = this.getAttribute("seasons") || "";
    const updated = this.getAttribute("updated") || "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .podcast-card {
          background-color: var(--secondaryBg-color, #fff);
          margin-bottom: 24px;
          height: 390px;
          cursor: pointer;
          transition: transform 0.2s ease;
          overflow: hidden;
        }
        .podcast-card:hover {
          transform: translateY(-5px);
        }
        .podcast-card img {
          width: 100%;
          height: 245px;
          object-fit: cover;
        }
        .podcast-card-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 15px;
        }
        .podcast-card-info h1 {
          font-size: 20px;
          font-weight: 500;
          color: var(--primary-color, #000);
          margin: 0;
        }
        .podcast-categories {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .podcast-categories-items {
          background-color: var(--secondary-color, #D1D5DB);
          color: var(--accent-color, #66696d);
          font-size: 12px;
          font-weight: 400;
          padding: 2px 10px;
          text-align: center;
          border-radius: 3px;
        }
        .season-info,
        .date {
          font-size: 13px;
          font-weight: 500;
          color: var(--accent-color, #66696d);
          margin: 0;
        }
      </style>
      <div class="podcast-card">
        <img src="${image}" alt="${title} podcast cover">
        <div class="podcast-card-info">
          <h1>${title}</h1>
          <div class="podcast-categories">
            ${getGenreTitles(genres)
              .map(
                (genre) =>
                  `<span class="podcast-categories-items">${genre}</span>`
              )
              .join("")}
          </div>
          <p class="season-info">${seasons} Seasons</p>
          <p class="date">Last updated: ${formatDate(updated)}</p>
        </div>
      </div>
    `;

    this.shadowRoot
      .querySelector(".podcast-card")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("podcast-selected", {
            detail: { title },
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

customElements.define("podcast-preview", PodcastPreview);
