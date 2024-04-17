const apiKey = "0a5dd232dede957b9cef361e0954df4c"
const searchBtn = document.getElementById("searchbtn")
const cityEl = document.getElementById("search-input")

function handleSearch() {
    if (!cityEl.value) return
    let city = cityEl.value.trim()
    fetchWeather(city)

}

function fetchWeather(city) {
    var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
    fetch(apiUrlWeather).then(res => res.json()).then(data => {
        console.log(data)
        displayCurrentWeather(data)
        const {
            lat, lon

        } = data.coord

        const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        fetch(apiUrlForecast).then(res => res.json()).then(data => {
            console.log(data)
        })
    })

}

function displayCurrentWeather(data) {
    const cityNameEl = document.getElementById("city-name")
    const dateEl = document.getElementById("today")
    const icon = document.getElementById("icon")
    const tempEl = document.getElementById("temp")
    const humEl = document.getElementById("hum")
    const windEl = document.getElementById("wind")
    tempEl.textContent = `Temp: ${data.main.temp} F`
    dateEl.textContent = dayjs.unix(data.dt).format("MM/DD/YYYY")
    cityNameEl.textContent = data.name
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    icon.alt = data.weather[0].description
    humEl.textContent = `humidity: ${data.main.humidity} %`
    windEl.textContent = `windspeed: ${data.wind.speed} mph`

}







searchBtn.addEventListener("click", handleSearch)