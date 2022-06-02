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
    return `Last updated ${day} ${hours}:${minutes}`
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

function showWeather(response) {
    console.log(response.data.name)
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

}

let city = 'tbilisi';
let apiKey = '52548afd3d9067b1c2e40e02f67065f2';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(showWeather)