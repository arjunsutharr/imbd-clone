import {
  favouriteMovies,
  addToFavourite,
  removeMovieFromFavourite,
} from "./script.js";

window.addEventListener("DOMContentLoaded", () => {
  const movieTitleEl = document.getElementById("movie-title");
  const imdbRatingEl = document.getElementById("imdbRating");
  const runtimeEl = document.getElementById("runtime");
  const boxOfficeEl = document.getElementById("boxOffice");
  const movieGenreEl = document.getElementById("movie-genre");
  const movieLanguageEl = document.getElementById("movie-language");
  const movieWriterEl = document.getElementById("movie-writer");
  const moviePosterEl = document.getElementById("movie-poster");
  const moviePlotEl = document.getElementById("movie-plot");
  const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
  const starEl = document.querySelector(".favourite-add");

  displaySelectedMovie();
  function displaySelectedMovie() {
    movieTitleEl.textContent = `${selectedMovie.Title}`;
    imdbRatingEl.textContent = `Rating: ${selectedMovie.imdbRating}⭐`;
    runtimeEl.textContent = `Duration: ${selectedMovie.Runtime}`;
    boxOfficeEl.textContent = `BoxOffice: ${selectedMovie.BoxOffice}`;
    movieGenreEl.textContent = `Genre: ${selectedMovie.Genre}`;
    movieLanguageEl.textContent = `Language: ${selectedMovie.Language}`;
    movieWriterEl.textContent = `Writer: ${selectedMovie.Writer}`;
    moviePlotEl.textContent = `${selectedMovie.Plot}`;
    moviePosterEl.src = `${selectedMovie.Poster}`;

    const isAlreadyInFavMoviePage = favouriteMovies.some(
      (favMovie) => favMovie.imdbID === selectedMovie.imdbID
    );

    if (isAlreadyInFavMoviePage) {
      starEl.classList.add("fa-solid");
    } else {
      starEl.classList.remove("fa-solid");
    }
    starEl.addEventListener("click", () => {
      if (isAlreadyInFavMoviePage) {
        removeMovieFromFavourite(selectedMovie);
        displaySelectedMovie();
      } else {
        addToFavourite(selectedMovie);
        displaySelectedMovie();
      }
    });
  }
});
