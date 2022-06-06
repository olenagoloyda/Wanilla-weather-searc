function formatDate(timestamp) {
    let now = new Date(timestamp);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    day = days[now.getDay()];
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${now.getHours()}`
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${now.getMinutes()}`
    }
    return `${day} ${hours}:${minutes}`
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    console.log(days[day])
    return days[day];
}




function displayForecast(response) {
    console.log(response.data.daily[0].dt)
    let forecastElement = document.querySelector('#forecast');
    let forecastHTML = `<div class='row'>`;
    let forecast = response.data.daily;
    console.log(day)
    forecast.forEach(function(forecastDay, index) {
        if (index < 7 && index > 0) {
            forecastHTML =
                forecastHTML + ` <div class="col-2">
                        <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
                        <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather-icon" width='46'>
                        <div class="weather-forecast-temperature">
                            <span class="temperature-max">20</span>
                            <span class="temperature-min">15</span>

                        </div>
                    </div>`;
        }
    });
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;
}



function showInFarenheit() {
    event.preventDefault();
    celsiusElement.classList.remove('active');
    farenheitElement.classList.add('active');
    let farenheitDegrees = document.querySelector('.degrees');
    farenheitDegrees.innerHTML = Math.round(celsius * 9 / 5) + 32;
}

function showInCelsius() {
    event.preventDefault();
    let celsiusDegrees = document.querySelector('.degrees');
    celsiusDegrees.innerHTML = celsius;
}

let celsiusElement = document.querySelector('#celsius');
celsiusElement.addEventListener('click', showInCelsius);

let celsius = 32;
let farenheitElement = document.querySelector('#farenheit');
farenheitElement.addEventListener('click', showInFarenheit);

function getForecast(coord) {
    let apiKey = '52548afd3d9067b1c2e40e02f67065f2';
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast)
}

function showWeather(response) {
    let cityElement = document.querySelector('#cityElement');
    let descriptionElement = document.querySelector('#description-element');
    let humidityElement = document.querySelector('#humidity-element');
    let windElement = document.querySelector('#wind-element');
    let dateElement = document.querySelector('#date-elements');
    let degreesElement = document.querySelector('.degrees');
    iconCode = response.data.weather[0].icon;
    let icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    let iconElement = document.querySelector('.icon-element');

    cityElement.innerHTML = response.data.name;
    humidityElement.innerHTML = response.data.main.humidity;
    degreesElement.innerHTML = Math.round(response.data.main.temp);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.weather[0].description;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute('src', icon);
    getForecast(response.data.coord)
}

function searchWeather(city) {
    let apiKey = '52548afd3d9067b1c2e40e02f67065f2';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather)
}


function scanCity(event) {
    event.preventDefault();
    let inputCity = document.querySelector('#city-input');
    console.log(inputCity.value)
    let city = inputCity.value;
    searchWeather(city)
}



searchWeather('new york');
let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', scanCity)