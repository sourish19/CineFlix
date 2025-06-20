const descContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.";
const genre = ["all", "action", "scifi", "drama", "comedy"];

const movies = [
  {
    id: 1,
    name: "intersteller",
    rating: 4.6,
    description: descContent,
    genre: ["action", "scifi", "drama"],
    image: "./interstellar.jpeg",
    releaseYear: 2014,
  },
  {
    id: 2,
    name: "bad boys",
    rating: 2.7,
    description: descContent,
    genre: ["action", "comedy"],
    image: "./bad_boys.jpeg",
    releaseYear: 2007,
  },
  {
    id: 3,
    name: "inception",
    rating: 4.2,
    description: descContent,
    genre: ["action", "scifi", "fantacy"],
    image: "./inception.jpeg",
    releaseYear: 2010,
  },
  {
    id: 4,
    name: "Bahubali",
    rating: 3.8,
    description: descContent,
    genre: ["action", "drama"],
    image: "./bahubali.jpeg",
    releaseYear: 2015,
  },
  {
    id: 5,
    name: "Fast & Furious 2",
    rating: 3.4,
    description: descContent,
    genre: ["action", "drama"],
    image: "./not-found-image.jpg",
    releaseYear: 2004,
  },
];

export { movies, genre };
