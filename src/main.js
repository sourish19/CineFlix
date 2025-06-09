import { movies, genre } from "./api.js";

const mainContainer = document.querySelector(".main-container");
const movieCardContainer = document.querySelector(".movie-card-container");
const createMovieBttn = document.querySelector(".create-movie-bttn");
const ratingsBttn = document.querySelector(".ratingBttn");

const modalContainer = document.querySelector(".modal-container");
const crossBttn = document.querySelector(".cross-bttn");
const movieCreateName = document.querySelector("#movie-create-name");
const movieCreateDesc = document.querySelector("#movie-create-desc");
const movieCreateRating = document.querySelector("#movie-create-rating");
const movieCreateYear = document.querySelector("#movie-create-year");
const movieCreateBttn = document.querySelector(".movie-create-bttn");

const renderMovies = (
  movieId,
  movieTitle,
  movieGenre,
  movieRelease,
  movieRating,
  movieDesc,
  movieImage
) => {
  let div = document.createElement("div");
  div.classList.add("movie-card");
  div.id = `card-${movieId}`;
  div.innerHTML = `
            <img src=${defaultImage(
              movieImage
            )} alt="" class="movi-img h-50 object-cover" />
            <div
              class="movie-details-container flex gap-1.5 flex-col border-y-2 my-2"
            >
              <div class="movie-name">${formatMovieTitle(movieTitle)}</div>
              <div class="movie-desc">${movieDesc}</div>
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
                <span class="movie-meta-content movie-rating-content">${displayRatings(
                  movieRating
                )}</span>
              </div>
            </div>
            <div class="flex justify-end gap-2 items-center">
              <button class="bttn">Details</button>
              <button class="bttn">Delete</button>
            </div>`;
  movieCardContainer.append(div);
};

// Render all movies
const getMoviesFromApi = () => {
  movies.forEach((movie) => {
    let movieId = movie.id;
    let movieTitle = movie.name;
    let movieImage = movie.image;
    let movieGenre = movie.genre;
    let movieRelease = movie.releaseYear;
    let movieRating = movie.rating;
    let movieDesc = movie.description;
    renderMovies(
      movieId,
      movieTitle,
      movieGenre,
      movieRelease,
      movieRating,
      movieDesc,
      movieImage
    );
  });
};

// Format Movie Name
const formatMovieTitle = (movieName) => {
  const splitedMovieName = movieName.split(" ");
  let finalChar = [];
  splitedMovieName.forEach((value) => {
    const fChar = value.at(0).toUpperCase();
    const restChar = value.substring(1);
    finalChar.push(fChar + restChar);
  });
  return finalChar.join(" ");
};

// Display Star Ratings
const displayRatings = (movieRating) => {
  if (movieRating <= 0 || typeof movieRating !== "number")
    return "Invalid Rating";
  const rating = Math.floor(movieRating);
  let startRating = "";
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      startRating += '<i class="fa-solid fa-star" style="color: #FFD43B;"></i>';
    } else {
      startRating +=
        '<i class="fa-regular fa-star" style="color: #FFD43B;"></i>';
    }
  }
  return startRating;
};

// Set Default Image
const defaultImage = (image) => {
  return image || "./not-found-image.jpg";
};

// Remove Modal Container
const removeModalContainer = () => {
  modalContainer.classList.toggle("hidden", true);
  mainContainer.classList.toggle("opacity-10", false);
  mainContainer.classList.toggle("backdrop-blur", false);
  mainContainer.classList.toggle("bg-black/50", false);
};

// Show Modal Container
const showModalContainer = () => {
  modalContainer.classList.toggle("hidden", false);
  mainContainer.classList.toggle("opacity-10", true);
  mainContainer.classList.toggle("backdrop-blur", true);
  mainContainer.classList.toggle("bg-black/50", true);
};

// Remove Modal Container Event
crossBttn.addEventListener("click", () => {
  removeModalContainer();
});

// Show Modal Container Event
createMovieBttn.addEventListener("click", (e) => {
  showModalContainer();
});

const getMovieGenre = () => {
  const arrayGenre = genre.map((val) => {
    const radios = document.getElementsByName(val);
    if (radios[0].checked) {
      return radios[0].value;
    }
  });
  console.log(String(arrayGenre));

  // return arrayGenre;
};

// Modal Container inputs
movieCreateBttn.addEventListener("click", () => {
  if (
    movieCreateName.value.trim() == "" ||
    movieCreateDesc.value.trim() == "" ||
    movieCreateRating.value.trim() == "" ||
    movieCreateYear.value.trim() == ""
  ) {
    alert("Please Enter all the details for creating a Movie");
  } else {
    const createModalMovieName = movieCreateName.value;
    const createModalMovieDesc = movieCreateDesc.value;
    const createModalMovieRating = movieCreateRating.value;
    const createModalMovieYear = movieCreateYear.value;
    const createModalMovieGenre = getMovieGenre();
    renderMovies(
      10,
      createModalMovieName,
      createModalMovieGenre,
      createModalMovieYear,
      createModalMovieRating,
      createModalMovieDesc
    );

    removeModalContainer();
  }
});
// ratingsBttn.addEventListener("click", (e) => {
//   console.log("jjj");
// });

getMoviesFromApi();
