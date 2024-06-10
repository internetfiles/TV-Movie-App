"use strict";

import { api_key, fetchDataFromServer } from "./api.js";
import { createMediaCard } from "./media-card.js"; // Updated import for a generic media card
import { sidebar } from "./sidebar.js";

export function search() {
  const searchWrapper = document.querySelector("[search-wrapper]");
  const searchField = document.querySelector("[search-field]");

  const searchResultModal = document.createElement("div");
  searchResultModal.classList.add("search-modal");
  document.querySelector("main").appendChild(searchResultModal);

  let searchTimeout;

  searchField.addEventListener("input", function () {
    if (!searchField.value.trim()) {
      searchResultModal.classList.remove("active");
      searchWrapper.classList.remove("searching");
      clearTimeout(searchTimeout);
      return;
    }

    searchWrapper.classList.add("searching");
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(function () {
      fetchDataFromServer(
        `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&page=1&include_adult=false&query=${searchField.value}`,
        function ({ results: mediaList }) {
          searchWrapper.classList.remove("searching");
          searchResultModal.classList.add("active");
          searchResultModal.innerHTML = ""; //remove old results

          searchResultModal.innerHTML = `
            <p class="label">Result for</p>
            <h1 class="heading">${searchField.value}</h1>

            <div class="media-list">
              <div class="grid-list"></div>
            </div>
          `;

          for (const media of mediaList) {
            const mediaCard = createMediaCard(media); // Use generic media card function

            searchResultModal
              .querySelector(".grid-list")
              .appendChild(mediaCard);
          }
        }
      );
    }, 500);
  });
}
