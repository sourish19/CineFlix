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
              <div class="bb movie-name">${formatMovieTitle(movieTitle)}</div>
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
              <button class="details-bttn bttn">Details</button>
              <button class="dele-bttn bttn">Delete</button>
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
const removeModalContainer = (container) => {
  container.classList.toggle("hidden", true);
  mainContainer.classList.toggle("opacity-10", false);
  mainContainer.classList.toggle("backdrop-blur", false);
  mainContainer.classList.toggle("bg-black/50", false);
};

// Show Modal Container
const showModalContainer = (container) => {
  container.classList.toggle("hidden", false);
  mainContainer.classList.toggle("opacity-10", true);
  mainContainer.classList.toggle("backdrop-blur", true);
  mainContainer.classList.toggle("bg-black/50", true);
};

// Remove Modal Container Event
crossBttn.addEventListener("click", () => {
  removeModalContainer(modalContainer);
});

// Show Modal Container Event
createMovieBttn.addEventListener("click", (e) => {
  showModalContainer(modalContainer);
});

// Get Modal Movie Genre
const getMovieGenre = () => {
  const arrayGenre = genre.filter((val) => {
    const element = document.getElementsByName(val);
    if (element[0].checked) {
      return element[0].value;
    }
  });
  return String(arrayGenre);
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
    const createModalMovieRating = Number(movieCreateRating.value);
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
    removeModalContainer(modalContainer);
  }
});

// Global Event Listner
const globalEventListner = (eventType, selector, callback) => {
  document.addEventListener(eventType, (event) => {
    console.log(event.target);

    if (event.target.matches(selector)) {
      callback(event);
    }
  });
};

// Delete Movie Card
globalEventListner("click", ".dele-bttn", (e) => {
  const confirmDelete = confirm("Do you want to delete this movie");
  if (confirmDelete === true) {
    const parentDivCard = e.target.closest(".movie-card");
    parentDivCard.remove();
  }
});

// Details Movie Card
const detailsModalMovieCard = () => {
  const div = document.createElement("div");
  div.innerHTML = `<div
      class="details-modal-container fixed transform -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] bg-gray-500 text-white w-5/12 h-[78%] py-4 px-5"
    >
      <div class="px-3 py-3 flex flex-col min-h-[460px]">
        <div class="details-cross-bttn text-right">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <img
          src="./interstellar.jpeg"
          alt=""
          class="movie-img h-50 object-cover"
        />
        <div
          class="movie-details-container flex gap-1.5 flex-col border-y-2 my-2"
        >
          <div class="details-movie-name movie-name">Interstellar</div>
          <div class="details-movie-desc text-sm text-gray-800">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
            quos officiis cupiditate sunt dolorem velit id laboriosam ratione
            saepe voluptas. Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Voluptate sapiente provident optio magni dolores. Nemo facere,
            quo mollitia aliquam, harum iure minus tempora praesentium corporis
            iste aperiam architecto aspernatur dolorum!
          </div>
          <div class="movie-meta movie-genre">
            Genre:
            <span class="details-movie-meta-genre movie-meta-content"
              >action,comedy</span
            >
          </div>
          <div class="movie-meta">
            Release Year:
            <span class="details-movie-meta-year movie-meta-content">2003</span>
          </div>
          <div class="movie-meta">
            Rating:
            <span class="details-movie-meta-rating movie-meta-content">2</span>
          </div>
        </div>
      </div>
    </div>`;
  mainContainer.append(div);
};

// Details Movie Card Event
globalEventListner("click", ".details-bttn", (e) => {
  const parentDiv = e.target.closest(".movie-card");
  const parentDivMovieImage = parentDiv.querySelector(".movi-img").src;
  const parentDivMovieName = parentDiv.querySelector(".movie-name").innerText;
  const parentDivMovieDesc = parentDiv.querySelector(".movie-desc").innerText;
  const parentDivMovieGenre = parentDiv.querySelector(
    ".movie-genre-content"
  ).innerText;
  const parentDivMovieYear = parentDiv.querySelector(
    ".movie-release-content"
  ).innerText;
  const parentDivMovieRating = parentDiv.querySelector(
    ".movie-rating-content"
  ).innerHTML;
  // console.log(
  //   parentDivMovieImage,
  //   parentDivMovieName,
  //   parentDivMovieDesc,
  //   parentDivMovieGenre,
  //   parentDivMovieYear,
  //   parentDivMovieRating
  // );
  detailsModalMovieCard();
});

globalEventListner("click", ".details-cross-bttn", (e) => {
  if (e.target.matches(".details.cross-bttn")) {
    console.log("hii");
  }
});
// Render Movies from API function call
getMoviesFromApi();
