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

// function getJoke(){
// fetch("https://api.chucknorris.io/jokes/random")
//   .then((response) => {
//     console.log(response);
//     return response.json();
//   })

//   .then((data) => {
//     const container = document.getElementById("container");
//     container.innerHTML = `<p>${data.value}</p>`

//   })

//   .catch((error) => {
//     console.log(error);
//   });

// }

// const btn = document.getElementById("btnJoke");
// btn.addEventListener("click", getJoke);
