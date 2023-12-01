// function displayFavorites() {
//   const storedData = localStorage.getItem("favoriteMovieArray");

//   if (storedData) {
//     const favorites = JSON.parse(storedData);
//     console.log("Favorites:", favorites);
//   }
//   const container = document.querySelector(".container");
//   container.innerHTML = "";

//   favorites.forEach((favMovie) => {
//     container.innerHTML += `
//     <div calss="movieContainer">
//         <img src="//image.tmdb.org/t/p/w1280/${favMovie.backdrop_path}"/>
//     </div>
//     `;
//   });
// }

// displayFavorites();

function displayFavorites() {
  const storedData = localStorage.getItem("favoriteMovieArray");

  if (storedData) {
    const favorites = JSON.parse(storedData);
    console.log("Favorites:", favorites);

    const container = document.querySelector(".container");
    container.innerHTML =`
    <h1>Your Favorites <span>Movies</span></h1>
    <div class="favoritesMoviesContainer"></div>
    `;
    const favoritesMoviesContainer = document.querySelector(".favoritesMoviesContainer")
    favorites.forEach((favMovie) => {
      favoritesMoviesContainer.innerHTML += `
      <div class="favoritesMoviesContainer">
          <div class="movieContainer">
            <img id="movieCardImg" src="//image.tmdb.org/t/p/w1280/${favMovie.poster}">
            <div class="movieDataTrending">
              <div class="titleDateContainer">
              <h2>${favMovie.title}</h2>
              <p>${favMovie.dateRelease}</p>
            </div>
            <div class="runTimeRateContainer">
              <p>${favMovie.movieRate}</p>
              <p>126m</p>
            </div>
          </div>
      </div>

          `;
    });
  } else {
    console.log("No favorites found in localStorage on the second page");
  }
}
displayFavorites();
