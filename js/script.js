const searchInputEl = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const movieNameEl = document.getElementById("movieName");
const suggestionPosterEl = document.getElementById("suggestion-poster");
const favoruiteBtn = document.getElementById("favourite-button");
const favMoviePage = document.getElementById("fav-movies-page");

let favouriteMovies = [];

const storedFavouriteMovies =
  JSON.parse(localStorage.getItem("favouriteMovies")) || [];

favouriteMovies = storedFavouriteMovies;

searchInputEl.addEventListener("input", inputHandler);
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputHandler();
});

function inputHandler() {
  const suggesionsContainerEl = document.getElementById("suggesions-container");
  suggesionsContainerEl.classList.remove("d-none");
  const inputValue = searchInputEl.value;

  if (inputValue === "") {
    suggesionsContainerEl.classList.add("d-none");
  } else {
    fetchMovieData(searchInputEl.value);
  }
}

async function fetchMovieData(moviename) {
  const url = `https://www.omdbapi.com/?t=${moviename}&apikey=89c36d9d`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (result.Response === "False") {
      return "";
    } else {
      movieSuggestions(result);
    }
  } catch (error) {
    console.error(error);
  }
}

function movieSuggestions(movie) {
  movieNameEl.textContent = `${movie.Title}`;
  suggestionPosterEl.src = `${movie.Poster}`;
  favoruiteBtn.innerHTML = `<i class="fa-regular fa-star favourite-add"></i>`;
  const starEl = document.querySelector(".favourite-add");

  const isAlreadyInFavMoviePage = favouriteMovies.some(
    (favMovie) => favMovie.imdbID === movie.imdbID
  );

  if (isAlreadyInFavMoviePage) {
    starEl.classList.add("fa-solid");
  }

  starEl.addEventListener("click", () => {
    addToFavourite(movie);
  });
  movieNameEl.addEventListener("click", () => {
    displaySelectedMovie(movie);
  });
}

function addToFavourite(movie) {
  const starEl = document.querySelector(".favourite-add");
  const movieDetails = {
    Title: `${movie.Title}`,
    Year: `${movie.Released}`,
    BoxOffice: `${movie.BoxOffice}`,
    imdbID: `${movie.imdbID}`,
    imdbRating: `${movie.imdbRating}`,
    Plot: `${movie.Plot}`,
    Poster: `${movie.Poster}`,
    Genre: `${movie.Genre}`,
  };

  try {
    const isDuplicate = favouriteMovies.findIndex(
      (movieName) => movieName.imdbID === movie.imdbID
    );

    if (isDuplicate !== -1) {
      starEl.classList.remove("fa-solid");
      favouriteMovies.splice(isDuplicate, 1);
      localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
    } else {
      starEl.classList.add("fa-solid");
      favouriteMovies.push(movieDetails);
      localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
    }
  } catch (error) {
    console.error("Error storing favorite movies:", error);
  }

  if (favMoviePage) {
    favMoviePage.innerHTML = "";
    displayFavouriteMovies();
  }
}

function displayFavouriteMovies() {
  favouriteMovies.forEach((movie) => {
    const favMovie = document.createElement("div");
    favMovie.classList.add("favMovie");
    favMovie.innerHTML = `
    <img class="fav-movie-poster" height= 150px src= ${movie.Poster} alt="" />
    <div class= 'd-flex justify-content-between w-100'>
      <div class="fav-movie-details">
        <h5 class="fav-movie-title mb-3">${movie.Title}</h5>
        <p class="fav-movie-rating mb-1">Rating: ${movie.imdbRating}⭐</p>
        <p class="fav-movie-plot mb-1">Released: ${movie.Year}</p>
        <p class="fav-movie-Genre m-0">Genre: ${movie.Genre}</p>
      </div>
    </div>
    <i class="fa-solid fa-square-minus remove-favourite"></i>
    `;

    if (favMoviePage) {
      favMoviePage.appendChild(favMovie);
    }

    favMovie
      .querySelector(".remove-favourite")
      .addEventListener("click", () => removeMovieFromFavourite(movie));

    favMovie
      .querySelector(".fav-movie-title")
      .addEventListener("click", () => displaySelectedMovie(movie));
  });
}

displayFavouriteMovies();

function removeMovieFromFavourite(selectedMovie) {
  const findMovieIndex = favouriteMovies.findIndex(
    (movie) => movie.imdbID === selectedMovie.imdbID
  );

  favouriteMovies.splice(findMovieIndex, 1);
  localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));

  if (favMoviePage) {
    favMoviePage.innerHTML = "";
    displayFavouriteMovies();
  }
}

function displaySelectedMovie(movie) {
  localStorage.setItem("selectedMovie", JSON.stringify(movie));
  window.location.href = "/movieDetails.html";
}

export { favouriteMovies, addToFavourite, removeMovieFromFavourite };
