import { movies, descContent } from "./api.js";

const movieCardContainer = document.querySelector(".movie-card-container");

// Render all movies
movies.forEach((movie) => {
  let movieTitle = `${movie.name.at(0).toUpperCase()}${movie.name.slice(1)}`;
  let movieImage = movie.image;
  let movieGenre = movie.genre;
  let movieRelease = movie.releaseYear;
  let movieRating = movie.rating;

  let div = document.createElement("div");
  div.classList.add("movie-card");
  div.id = `card-${movie.id}`;
  div.innerHTML = `
            <img src=${movieImage} alt="" class="movi-img h-50 object-cover" />
            <div
              class="movie-details-container flex gap-1.5 flex-col border-y-2 my-2"
            >
              <div class="movie-name">${movieTitle}</div>
              <div class="movie-desc">${descContent}</div>
              <div class="movie-meta movie-genre">
                Genre:
                <span class="movie-meta-content movie-genre-content"
                  >${movieGenre}</span
                >
              </div>
              <div class="movie-meta movie-release-year">
                Release Year:
                <span class="movie-meta-content movie-release-content"
                  >${movieRelease}</span
                >
              </div>
              <div class="movie-meta movie-rating">
                Rating:
                <span class="movie-meta-content movie-rating-content">${movieRating}</span>
              </div>
            </div>
            <div class="flex justify-end gap-2 items-center">
              <button class="bttn">Details</button>
              <button class="bttn">Delete</button>
            </div>`;
  movieCardContainer.append(div);
});
