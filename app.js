const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

const weather = {};
weather.temperature = {
    // value : 18,
    unit : "celsius"
}

const KELVIN = 273;
//API KEY
const key = "a1a9671456312bb8eab1a6e6dff8663a";
//   description : "few clouds",
//   iconId : "01d",
//   city : "London",
//   country : "GB"
//
// };

//getting weather from api
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML= "<p>Browser Doesn't Support geolocation. </p>";
  notificationElement.innerHTML= `<p> ${error.message}</p>`;
}
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML= `<p> ${error.message}</p>`;
}
// function getWeather(latitude, longitude){
//     let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
//     console.log(api)
// }
// //
function getWeather(latitude, longitude){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
      .then(function(response) {
        let data = response.json();
        return data;
      })

      .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
      })
      .then(function(){
        displayWeather();
    });
}
//displayong weather
function displayWeather(){
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
};

function celsiusToFahrenheit(temperature) {
  return (temperature * 9/5) + 32;
}

tempElement.addEventListener("click", function(){
  if(weather.temperature.value === undefined) return;
  if(weather.temperature.unit === "celsius"){
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);
      tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
  }else{
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});
