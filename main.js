let page = 1;
let trending = "week";
const apiKey = "036b0b507ec3030ff18d168e53caffc1";
let favoriteMovieArray = [];
const storedFavorites = localStorage.getItem("favoriteMovieArray");
if (storedFavorites) {
  favoriteMovieArray = JSON.parse(storedFavorites);
}

function fetchMoviesResults() {
  fetch(
    `https://api.themoviedb.org/3/trending/movie/${trending}?page=${page}&append_to_response=credits&sort_by=popularity.desc&api_key=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchMovieData(data.results);
      showTrending(data.results);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}

function fetchMovieData(data) {
  const promises = data.map((movie) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?&append_to_response=credits&api_key=${apiKey}`
    ).then((response) => {
      return response.json();
    });
  });

  Promise.all(promises)
    .then((movieDataArray) => {
      showSlider(movieDataArray);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}

// --------------------------------------------------

function showSlider(movieDataArray) {
  let screenview = window.matchMedia("(max-width: 500px)");
  const swiper_wrapper = document.querySelector(".swiper-wrapper");
  swiper_wrapper.innerHTML = "";

  movieDataArray.forEach((data) => {
    console.log(data);

    const genreList = data.genres
      .map((genre) => `<span id="genresId">${genre.name}</span>`)
      .join(" ");

    if (screenview.matches) {
      swiper_wrapper.innerHTML += `
        <div class="swiper-slide">
          <img id="sliderImg" src="//image.tmdb.org/t/p/original/${data.poster_path}" />
          <div class="movieData">
            <h1>${data.original_title}</h1>
            <p>${data.overview}</p>
            <div class="timeDataGenreClass">
              <div>
                <i class="fa-solid fa-calendar-days" style="color: #ffffff;">
                </i><span id="releaseDateId">${data.release_date}</span>
              </div>
              <div>
                <i class="fa-solid fa-clock-rotate-left" style="color: #ffffff;">
                </i><span id="runTimeId">${data.runtime}m</span>
              </div>
              <div>
                <i class="fa-solid fa-dna" style="color: #ffffff;"></i>
                ${genreList}
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      swiper_wrapper.innerHTML += `
        <div class="swiper-slide">
          <img id="sliderImg" src="//image.tmdb.org/t/p/original/${data.backdrop_path}" />
          <div class="movieData">
            <h1>${data.original_title}</h1>
            <p>${data.overview}</p>
            <div class="timeDataGenreClass">
              <div>
                <i class="fa-solid fa-calendar-days" style="color: #ffffff;">
                </i><span id="releaseDateId">${data.release_date}</span>
              </div>
              <div>
                <i class="fa-solid fa-clock-rotate-left" style="color: #ffffff;">
                </i><span id="runTimeId">${data.runtime}m</span>
              </div>
              <div>
                <i class="fa-solid fa-dna" style="color: #ffffff;"></i>
                ${genreList}
              </div>
            </div>
          </div>
        </div>
      `;
    }
  });
  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  screenview.addEventListener("change", function(){
    showSlider(movieDataArray);
  })
}


// ------------------------------------------------

function showTrending(data) {
  console.log(data);
  const trendingMovies = document.querySelector(".trendingMovies");
  trendingMovies.innerHTML = `
  <div class="navBarTrending">
    <h1>Trending</h1>
    <div class="btnTrendingContainer">
      <span>Soet By:</span>
      <button id="dayBtn">Day</button>
      <button id="weekBtn">Week</button>
    </div>
  </div>
  <div class="moviesContainer"></div>
  <div class="btnPageContainer"><div>
  `;

  const moviesContainer = document.querySelector(".moviesContainer");
  data.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movieCard";
    movieCard.innerHTML = `
      <img id="movieCardImg" src="//image.tmdb.org/t/p/w1280/${movie.poster_path}">
      <div class="movieDataTrending">
        <div class="titleDateContainer">
          <h2>${movie.title}</h2>
          <p>${movie.release_date}</p>
        </div>
        <div class="runTimeRateContainer">
          <p>${movie.vote_average}</p>
          <p>126m</p>
          <button class="favoriteBtn"><i class="fa-regular fa-heart fa-xl"></i></button>
        </div>
      </div>
    `;

    const favoriteBtn = movieCard.querySelector(".favoriteBtn");
    favoriteBtn.addEventListener("click", () => {
      console.log("Favorite button clicked for movie:", movie.title);
      const myMovie = {
        poster: `${movie.poster_path}`,
        title: `${movie.title}`,
        dateRelease: `${movie.release_date}`,
        movieRate: `${movie.vote_average}`,
      };
      favoriteMovieArray.push(myMovie);
      localStorage.setItem(
        "favoriteMovieArray",
        JSON.stringify(favoriteMovieArray)
      );
      const storegVal = localStorage.getItem("favoriteMovieArray");
      console.log(JSON.parse(storegVal));
    });

    moviesContainer.appendChild(movieCard);
  });

  const btnPageContainer = document.querySelector(".btnPageContainer");
  btnPageContainer.innerHTML = `
  <button id="page1">1</button>
  <button id="page2">2</button>
  <button id="page3">3</button>
  <button id="page4">4</button>
  <button id="page5">5</button>
  `;

  const dayBtn = document.getElementById("dayBtn");
  dayBtn.addEventListener("click", () => {
    trending = "day";
    fetchMoviesResults();
    console.log("Day button clicked");
  });

  const weekBtn = document.getElementById("weekBtn");
  weekBtn.addEventListener("click", () => {
    trending = "week";
    fetchMoviesResults();
    console.log("Week button clicked");
  });

  for (let i = 1; i <= 5; i++) {
    const btnPpage = document.querySelector(`#page${i}`);
    btnPpage.addEventListener("click", () => {
      page = i;
      fetchMoviesResults();
    });
  }
}
fetchMoviesResults();

// function showMovies(data) {
//   moviesContainer.innerHTML = "";
// data.forEach((element) => {
//   const movieEl = document.createElement("div"); // יוצר אלמנט חדש
//   movieEl.classList.add("movieCard"); // מוסיף לאלנמט שם מחלקה
//   movieEl.style.backgroundImage = `url(//image.tmdb.org/t/p/w500/${element.poster_path})`;
//   movieEl.style.backgroundSize = "cover";
//   movieEl.innerHTML += `
//     <div class="movieInfo_class">
//       <h2 id="movieTitel">${element.title}</h2>
//       <span id="movieYear">${element.release_date}</span>
//       <div class="movieRateTime_class">
//       <span id="movieRate">${element.vote_average}</span>
//       <span id="movieTime">120</span>
//       </div>
//       </div>
//       `;

//       moviesContainer.appendChild(movieEl); // מכניס ויוצר את האובייקט החדש לפי בחירה
//     });
//   }
//https://api.themoviedb.org/3/movie/${movie_id}?&append_to_response=credits&api_key=${apiKey}

// const buttonsContainer = document.getElementById("buttonsContainer"); // השמה לאלמנט in html

// for (let i = 1; i <= 6; i++) {
//   const btn = document.createElement("button"); // יוצר אלמנט חדש
//   btn.textContent = i;
//   btn.addEventListener("click", () => {
//     page = i;
//     fetchMovies();
//   });
//   buttonsContainer.appendChild(btn); // מכניס ויוצר את האובייקט החדש לפי בחירה
// }

// const buttonsSortingContainer = document.getElementById(
//   "buttonsSortingContainer"
// );
// const btnSortWeak = document.createElement("button");
// btnSortWeak.innerText = "week"
// btnSortWeak.addEventListener("click", () => {
//   trending = "week";
//   fetchMovies();
// });
// buttonsSortingContainer.appendChild(btnSortWeak);

// const btnSortDay = document.createElement("button");
// btnSortDay.innerText = "Day"
// btnSortDay.addEventListener("click", () => {
//   trending = "day";
//   fetchMovies();
// });
// buttonsSortingContainer.appendChild(btnSortDay);

// fetchMovies();

// function getMovies() {
//   fetch(
//     `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=036b0b507ec3030ff18d168e53caffc1`
//   )
//     .then((res) => res.json())
//     .then((moviesList) => {
//       console.log(moviesList);
//       moviesList.results.forEach((moviePlace) => {
//         movieEl.style.backgroundImage += `url(//image.tmdb.org/t/p/w500/${moviePlace.poster_path})`;
//         movieEl.style.backgroundSize += "contain";
//         movieEl.innerHTML += `
//         <div class="movieInfo_class">
//           <h2>${moviePlace.title}</h2>
//           <span id="movieYear">${moviePlace.release_date}</span>
//           <div class="movieRateTime_class">
//             <span id="movieRate">${moviePlace.vote_average}</span>
//             <span id="movieTime">120</span>
//           </div>
//         </div>
//       `;
//         container.appendChild(movieEl);
//       });
//     })
//     .czatch((err) => console.error(err));
// }
// getMovies();
// for (let i = 1; i <= 6; i++) {
//   const btn = document.getElementById(`btn${i}`);
//   btn.addEventListener("click", () => {
//     page = i;
//     getMovies();
//   });
// }

// let bookArray = [{ titel: "haryy poter", pages: "600", auther: "J.K roling" }];

// const btnSubmit = document.getElementById("btnSubmit");
// btnSubmit.addEventListener("click", () => {
//   const book = {
//     titel: titleVal.value,
//     pages: pagesVal.value,
//     auther: authorVal.value,
//   };
//   bookArray.push(book);
//   console.log(bookArray);

//   localStorage.setItem("bookArray", JSON.stringify(bookArray));
// });

// const storegVal = localStorage.getItem("bookArray");

// console.log(storegVal);

// console.log(JSON.parse(storegVal));

// localStorage.clear(bookArray);

// let fetchWeather = (cityVal) => {
//   const baseUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityVal}&units=metric&appid=55e3735b21e57c109e0f2b41c791dc30`;
//   fetch(baseUrl)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       const container = document.getElementById("container");

//       container.innerHTML += `
//       <h1>The city of: ${data.city.name}</h1>
//       <p>${data.list[0].dt_txt}</p>
//       <img src="https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png"/>
//       `;
//     })

//     .catch((error) => {
//       console.log(error);
//     });
// };

// const city = document.getElementById("city");
// const btn = document.getElementById("btn");
// btn.addEventListener("click", () => {
//   const cityVal = city.value;
//   fetchWeather(cityVal);
// });

// function getJoke() {
//   fetch("https://api.chucknorris.io/jokes/random")
//     .then((response) => {
//       console.log(response);
//       return response.json();
//     })

//     .then((data) => {
//       const container = document.getElementById("container");
//       container.innerHTML = `<p>${data.value}</p>`;
//     })

//     .catch((error) => {
//       console.log(error);
//     });
// }

// const btn = document.getElementById("btnJoke");
// btn.addEventListener("click", getJoke);
