//get date and time

let now = new Date();
let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h2.innerHTML = day + " " + hours + ":" + minutes;

//search form
//function search(event) {
//event.preventDefault();
//let searchCity = document.querySelector(`#city-input`);

//let city = document.querySelector(`#current-city`);
//city.innerHTML = `${searchCity.value}`;
//console.log(searchCity);
// }

//let form = document.querySelector(`#search-form`);
//form.addEventListener(`submit`, search);

//WEEK 5 PLUS HOMEWORK
//celsius- fahrenheit

function celsiusTemperature() {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 10;
}

function fahrenheitTemperature() {
  let temperature = document.querySelector("#temperature");
  let celsius = currentTemperature.innerHTML;
  celsius = Number(celsius);
  temperature.innerHTML = Math.round((celsius * 9) / 5 + 32);
}

// serch city temp

function searchCityTemperature(response) {
  console.log(response);
  let heading = document.querySelector("h1");
  let temperature = document.querySelector("#temperature");
  let description = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind");
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  heading.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windSpeedElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;
}

// search city
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let heading = document.querySelector("#search-city");
  let apiKey = "38386c702ec671ac43837ee169cd48bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  heading.innerHTML = `${cityInput.value}`;
  axios.get(`${apiUrl}`).then(searchCityTemperature);
}

// find location
function findCurrentLocation(position) {
  let apiKey = "38386c702ec671ac43837ee169cd48bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(searchCityTemperature);
}

// default city
function defaultCity(city) {
  let heading = document.querySelector("h1");
  let apiKey = "38386c702ec671ac43837ee169cd48bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  heading.innerHTML = city;
  axios.get(`${apiUrl}`).then(searchCityTemperature);
}

function runNavigator() {
  navigator.geolocation.getCurrentPosition(findCurrentLocation);
}

let currentTimeElement = document.querySelector("#current-time");
//let now = new Date();
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
//currentTimeElement.innerHTML = formatDate(now);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitTemperature);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", runNavigator);

defaultCity("New York");
