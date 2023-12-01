const apiKey = "036b0b507ec3030ff18d168e53caffc1";
let inputValue = null;

function fetchMovies() {
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      fetchMovieID(data);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}

const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", () => {
  inputValue = searchInput.value;
  moveisListContainer.innerHTML = "";
  fetchMovies();
  if (searchInput.value == null) {
    moveisListContainer.innerHTML = "";
  }
});

function fetchMovieID(data) {
  data.results.forEach((movie) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?&append_to_response=credits&api_key=${apiKey}`
    )
      .then((response) => {
        return response.json();
      })

      .then((movieDataArray) => {
        console.log(movieDataArray);
        showMovie(movieDataArray);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  });
}

const moveisListContainer = document.querySelector(".moveisListContainer");
function showMovie(movie) {
  const genreList = movie.genres
    .map((genre) => `<span id="genres">${genre.name}</span>`)
    .join(" ");

  let director = "";
  movie.credits.crew.forEach((manCrew) => {
    if (manCrew.job == "Director") {
      director = `<span id="director">${manCrew.name}</span>`;
    }
  });

  moveisListContainer.innerHTML += `
  <div class="movieContiner">
    <img id="backgroundImg" src="//image.tmdb.org/t/p/original/${movie.backdrop_path}"/>
    <div class="moviePosterContiner">
      <img  id="moviePoster" src="//image.tmdb.org/t/p/w1280/${movie.poster_path}"/>
    </div>
    <div class="movieData">
      <div>
        <h1>${movie.original_title}</h1>
        <i class="fa-solid fa-calendar-days" style="color: #ffffff;">
        </i><p id="releaseDate">${movie.release_date}</p>
      </div>
      <p id="overview">${movie.overview}</p>
      <div class="genre_director_runtime_class">
        <div>
        <i class="fa-solid fa-chair" style="color: #ffffff;"></i>
        ${director}
        </div>
        <div>
        <i class="fa-solid fa-dna" style="color: #ffffff;"></i>
        ${genreList}
        </div>
        <div>
        <i class="fa-solid fa-clock-rotate-left" style="color: #ffffff;"></i>
        <span id="runTime">${movie.runtime}m</span>
        </div>
      </div>
  </div>
        `;
}

// batman
