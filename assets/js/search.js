import { api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";
import { createTvShowCard } from "./tv-show-card.js"; // Assuming you have a similar function for TV show cards
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
      // Search for both movies and TV shows
      Promise.all([
        fetchDataFromServer(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&page=1&include_adult=false&query=${searchField.value}`),
        fetchDataFromServer(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&page=1&include_adult=false&query=${searchField.value}`)
      ]).then(([movieResponse, tvResponse]) => {
        const movieList = movieResponse.results;
        const tvList = tvResponse.results;

        searchWrapper.classList.remove("searching");
        searchResultModal.classList.add("active");
        searchResultModal.innerHTML = ""; //remove old results

        searchResultModal.innerHTML = `
          <p class="label">Result for</p>
          <h1 class="heading">${searchField.value}</h1>

          <div class="result-list">
            <div class="grid-list"></div>
          </div>
        `;

        // Display movie cards
        for (const movie of movieList) {
          const movieCard = createMovieCard(movie);
          searchResultModal
            .querySelector(".grid-list")
            .appendChild(movieCard);
        }

        // Display TV show cards
        for (const show of tvList) {
          const showCard = createTvShowCard(show);
          searchResultModal
            .querySelector(".grid-list")
            .appendChild(showCard);
        }
      }).catch(error => {
        console.error("Error fetching data:", error);
      });
    }, 500);
  });
}
