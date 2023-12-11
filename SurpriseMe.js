const director = document.getElementById("director");
const writer = document.getElementById("writer");
const cast = document.querySelector(".cast");
const genres = document.getElementById("genres");
const apiKey = "036b0b507ec3030ff18d168e53caffc1";
let movie_id = null;

function fetchMovie() {
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?&append_to_response=credits&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showMovie(data);
    })
    .catch((err) => console.error(err));
}

function showMovie(data) {
  const moviePosterClass = document.querySelector(".moviePosterClass");
  const bodyEl = document.querySelector("body");

  bodyEl.style.backgroundImage = `url(//image.tmdb.org/t/p/original/${data.backdrop_path})`;

  moviePosterClass.innerHTML = `
  <img id="moviePosterImg" src="//image.tmdb.org/t/p/w500/${data.poster_path}">
  <button id="watchTrailerBtn">Watch Trailer</button>`;

  const movieContainer = document.querySelector(".movieContainer");
  const headline = document.getElementById("headline");
  headline.innerText = `${data.original_title}`;

  const movieOverview = document.getElementById("movieOverview");
  movieOverview.innerText = `${data.overview}`;

  const releaseDate = document.getElementById("releaseDate");
  releaseDate.innerText = `${data.release_date}`;

  const runTime = document.getElementById("runTime");

  let runTimeNumber = `${data.runtime}`;
  if (runTimeNumber > 60) {
    runTime.innerText =
      Math.floor(`${runTimeNumber}` / 60) +
      "h" +
      (`${runTimeNumber}` % 60) +
      "m";
  } else {
    runTime.innerText = `${runTimeNumber}` + "m";
  }

  data.genres.forEach((genre) => {
    genres.innerHTML += `<span>${genre.name}</span>`;
  });
}

function fetchMovieCredits() {
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showMovieCredits(data);
    })
    .catch((err) => console.error(err));
}

function showMovieCredits(data) {
  data.crew.forEach((manCrew) => {
    if (manCrew.job == "Director") {
      director.innerText = `${manCrew.name}`;
    }
    if (manCrew.department == "Writing") {
      writer.innerText = `${manCrew.name}`;
    }
  });

  for (let i = 0; i < 10; i++) {
    cast.innerHTML += `
      <div class="castMember">
        <img class="castImg" src="//image.tmdb.org/t/p/w500/${data.cast[i].profile_path}">
        <h3>${data.cast[i].name}</h3>
        <p>${data.cast[i].character}</p>
      </div>`;
  }
}

function fetchMovieTrailer() {
  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&append_to_response=videos`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showMovieTrailer(data);
    })
    .catch((err) => console.error(err));
}

function showMovieTrailer(data) {
  const trailer = document.querySelector(".trailer");

  data.videos.results.forEach((video) => {
    if (video.type == "Trailer") {
      const trailerKey = video.key;
      trailer.innerHTML = `<iframe width="475" height="257.06" src="https://www.youtube.com/embed/${trailerKey}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    }
  });
}

const searchIdBtn = document.getElementById("searchIdBtn");
const idInput = document.getElementById("idInput");
searchIdBtn.addEventListener("click", () => {
  movie_id = idInput.value;
  cast.innerHTML = "";
  genres.innerText = "";
  fetchMovie();
  fetchMovieCredits();
  fetchMovieTrailer();
});

// https://api.themoviedb.org/3/movie/${movie_id}/credits?&api_key=${apiKey}
// https://api.themoviedb.org/3/trending/movie/${trending}?page=${page}&sort_by=popularity.desc&api_key=${apiKey}
//980489 #bbd111
