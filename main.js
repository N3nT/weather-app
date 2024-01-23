import axios from 'axios'
import './style.scss'

const body = document.querySelector('body')
const box = document.querySelector('.box')
const cityName = document.querySelector('.box__left-weather-info-city')
const tempContent = document.querySelector('.box__left-weather-info-temp')
const dataInfo = document.querySelector('.box__left-weather-info-date')
const weatherIcon = document.querySelector('.box__left-weather-info-icon')

const searchButton = document.querySelector('.box__right-btn')
const cityInput = document.querySelector('.box__right-input')
const lastLocations = document.querySelector('.box__right-locations')

const pressure = document.querySelector('.box__right-info-pressure')
const humidity = document.querySelector('.box__right-info-humidity')
const maxTemp = document.querySelector('.box__right-info-maxtemp')
const minTemp = document.querySelector('.box__right-info-mintemp')
const feelsLike = document.querySelector('.box__right-info-feelslike')
const visibility = document.querySelector('.box__right-info-visibility')

const windSpeed = document.querySelector('.box__right-info-windspeed')
const windGust = document.querySelector('.box__right-info-windgust')
const windDeg = document.querySelector('.box__right-info-winddeg')

const localTime = document.querySelector('.box__right-info-time')
const sunrise = document.querySelector('.box__right-info-sunrise')
const sunset = document.querySelector('.box__right-info-sunset')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = 'a1f28905bb879b4ebe17972bf2fe8cf6'
const API_UNITS = '&units=metric'

const getTime = () => {
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	const date = new Date()
	const year = date.getFullYear()
	const monthName = months[date.getMonth()]
	const dayName = days[date.getDay()]
	const dayNum = date.getDate()
	const hours = date.getHours()
	let minutes

	if (date.getMinutes() < 10) {
		minutes = `0${date.getMinutes()}`
	} else {
		minutes = date.getMinutes()
	}

	dataInfo.textContent = `${hours}:${minutes} - ${dayName}, ${dayNum} ${monthName} ${year}`
}

const getWeather = (cityName) => {
	const city = cityName || 'Brzesko'
	const URL = API_LINK + city + API_UNITS + `&appid=${API_KEY}`

	axios.get(URL).then((resposne) => {
		const data = resposne.data
		console.log(data)
		lastSearch(data.name)
		writeData(data)
		document.cookie = `cityName=${data.name}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
		setBackground(data.weather[0].id)
	})
	cityInput.value = ''
}

const getCookie = (name) => {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop().split(';').shift()
}

const writeData = (data) => {
	cityName.textContent = data.name
	weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`
	tempContent.innerHTML = `${Math.round(data.main.temp, 0.5)}&deg;`
	pressure.textContent = `Pressure: ${data.main.pressure} hPa`
	humidity.textContent = `Humidity: ${data.main.humidity} %`
	maxTemp.innerHTML = `Max. temp: ${Math.round(data.main.temp_max, 0.5)}&deg;C`
	minTemp.innerHTML = `Min. temp: ${Math.round(data.main.temp_min, 0.5)}&deg;C`
	feelsLike.innerHTML = `Feels like: ${Math.round(data.main.feels_like)}&deg;C`
	if (data.visibility < 1000) {
		visibility.textContent = `Visibility: ${data.visibility} m`
	} else {
		visibility.textContent = `Visibility: ${Math.round(
			data.visibility / 1000,
			0.5
		)} km`
	}
	windSpeed.textContent = `Wind speed: ${data.wind.speed} (m/s)`
	if (data.wind.gust === undefined) {
		windGust.textContent = `Wind gust: no data`
	} else {
		windGust.textContent = `Wind gust: ${data.wind.gust} (m/s)`
	}
	windDeg.textContent = `Wind degree: ${data.wind.deg}`
	sunrise.textContent = `Sunrise: ${unixToHours(data.sys.sunrise)}*`
	sunset.textContent = `Sunset: ${unixToHours(data.sys.sunset)}*`
}

const lastSearch = (city) => {
	const lastLocationsNode = lastLocations.querySelectorAll(
		'.box__right-location'
	)
	let lastLocationsArray = convertNodeList(lastLocationsNode)
	const lastLocationElement = document.createElement('p')
	lastLocationElement.classList.add('box__right-location')
	lastLocationElement.setAttribute('onclick', `getWeather('${city}')`)
	if (!lastLocationsArray.includes(city)) {
		lastLocationElement.textContent = city
		if (lastLocationsNode.length > 2) {
			//???
			lastLocations.lastChild.remove()
			lastLocations.prepend(lastLocationElement)
		} else {
			lastLocations.prepend(lastLocationElement)
		}
	}
}

const convertNodeList = (nodeList) => {
	let array = []
	for (let i = 0; i < nodeList.length; i++) {
		array[i] = nodeList[i].textContent
	}
	return array
}

const setBackground = (status) => {
	if (status === 200) {
		body.style.backgroundImage = 'url(./img/200.jpg)'
		box.style.backgroundImage = 'url(./img/200.jpg)'
	} else if (status === 201 || status === 202) {
		body.style.backgroundImage = 'url(./img/201.jpg)'
		box.style.backgroundImage = 'url(./img/201.jpg)'
	} else if (status === 210 || status === 211) {
		body.style.backgroundImage = 'url(./img/210.jpg)'
		box.style.backgroundImage = 'url(./img/210.jpg)'
	} else if (
		status === 212 ||
		status === 221 ||
		(status === 230) | (status === 231) | (status === 232)
	) {
		body.style.backgroundImage = 'url(./img/212.jpg)'
		box.style.backgroundImage = 'url(./img/212.jpg)'
	} else if (status === 300) {
		body.style.backgroundImage = 'url(./img/300.jpg)'
		box.style.backgroundImage = 'url(./img/300.jpg)'
	} else if (status === 301 || status === 302) {
		body.style.backgroundImage = 'url(./img/301.jpg)'
		box.style.backgroundImage = 'url(./img/301.jpg)'
	} else if (status === 310 || status === 311) {
		body.style.backgroundImage = 'url(./img/310.jpg)'
		box.style.backgroundImage = 'url(./img/310.jpg)'
	} else if (status === 312 || status === 313) {
		body.style.backgroundImage = 'url(./img/312.jpg)'
		box.style.backgroundImage = 'url(./img/312.jpg)'
	} else if (status === 314 || status === 321) {
		body.style.backgroundImage = 'url(./img/314.jpg)'
		box.style.backgroundImage = 'url(./img/314.jpg)'
	} else if (status === 500) {
		body.style.backgroundImage = 'url(./img/500.jpg)'
		box.style.backgroundImage = 'url(./img/500.jpg)'
	} else if (status === 501 || status === 502) {
		body.style.backgroundImage = 'url(./img/502.jpg)'
		box.style.backgroundImage = 'url(./img/502.jpg)'
	} else if (status === 503 || status === 504) {
		body.style.backgroundImage = 'url(./img/503.jpg)'
		box.style.backgroundImage = 'url(./img/503.jpg)'
	} else if (status === 511) {
		body.style.backgroundImage = 'url(./img/511.jpg)'
		box.style.backgroundImage = 'url(./img/511.jpg)'
	} else if (
		status === 520 ||
		status === 521 ||
		status === 522 ||
		status === 532
	) {
		body.style.backgroundImage = 'url(./img/520.jpg)'
		box.style.backgroundImage = 'url(./img/520.jpg)'
	} else if (
		status === 600 ||
		status === 611 ||
		status === 612 ||
		status === 613 ||
		status === 615 ||
		status === 616 ||
		status === 620 ||
		status === 621
	) {
		body.style.backgroundImage = 'url(./img/600.jpg)'
		box.style.backgroundImage = 'url(./img/600.jpg)'
	} else if (status === 601) {
		body.style.backgroundImage = 'url(./img/601.jpg)'
		box.style.backgroundImage = 'url(./img/601.jpg)'
	} else if (status === 602 || status === 622) {
		body.style.backgroundImage = 'url(./img/602.jpg)'
		box.style.backgroundImage = 'url(./img/602.jpg)'
	} else if (status === 701) {
		body.style.backgroundImage = 'url(./img/701.jpg)'
		box.style.backgroundImage = 'url(./img/701.jpg)'
	} else if (status === 711) {
		body.style.backgroundImage = 'url(./img/711.jpg)'
		box.style.backgroundImage = 'url(./img/711.jpg)'
	} else if (status === 721) {
		body.style.backgroundImage = 'url(./img/721.jpg)'
		box.style.backgroundImage = 'url(./img/721.jpg)'
	} else if (status === 731) {
		body.style.backgroundImage = 'url(./img/731.jpg)'
		box.style.backgroundImage = 'url(./img/731.jpg)'
	} else if (status === 741) {
		body.style.backgroundImage = 'url(./img/741.jpg)'
		box.style.backgroundImage = 'url(./img/741.jpg)'
	} else if (status === 762) {
		body.style.backgroundImage = 'url(./img/762.jpg)'
		box.style.backgroundImage = 'url(./img/762.jpg)'
	} else if (status === 781) {
		body.style.backgroundImage = 'url(./img/781.jpg)'
		box.style.backgroundImage = 'url(./img/781.jpg)'
	} else if (status === 800) {
		body.style.backgroundImage = 'url(./img/800.jpg)'
		box.style.backgroundImage = 'url(./img/800.jpg)'
	} else if (status === 801) {
		body.style.backgroundImage = 'url(./img/801.jpg)'
		box.style.backgroundImage = 'url(./img/801.jpg)'
	} else if (status === 802) {
		body.style.backgroundImage = 'url(./img/802.jpg)'
		box.style.backgroundImage = 'url(./img/802.jpg)'
	} else if (status === 803) {
		body.style.backgroundImage = 'url(./img/803.jpg)'
		box.style.backgroundImage = 'url(./img/803.jpg)'
	} else if (status === 804) {
		body.style.backgroundImage = 'url(./img/804.jpg)'
		box.style.backgroundImage = 'url(./img/804.jpg)'
	} else {
		body.style.backgroundImage = 'url(./img/default.jpg)'
		box.style.backgroundImage = 'url(./img/default.jpg)'
	}
}

const unixToHours = (unix) => {
	const date = new Date(unix * 1000)
	const hours = date.getHours()
	let minutes
	if (date.getMinutes() < 10) {
		minutes = '0' + date.getMinutes()
	} else {
		minutes = date.getMinutes()
	}

	return `${hours}:${minutes}`
}

document.addEventListener(
	'load',
	getWeather(getCookie('cityName')),
	getTime(),
	setInterval(() => {
		getTime()
	}, 1000)
)

searchButton.addEventListener('click', () => {
	if (cityInput.value !== '') {
		getWeather(cityInput.value)
	}
})

cityInput.addEventListener('keydown', (e) => {
	if (e.code === 'Enter' && cityInput.value !== '') {
		getWeather(cityInput.value)
	}
})

console.log(unixToHours(1705936393))
window.getWeather = getWeather
