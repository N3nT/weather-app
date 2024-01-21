import axios from 'axios'
import './style.scss'

const cityName = document.querySelector('.box__left-weather-info-city')
const tempContent = document.querySelector('.box__left-weather-info-temp')
const dataInfo = document.querySelector('.box__left-weather-info-date')

const searchButton = document.querySelector('.box__right-btn')
const cityInput = document.querySelector('.box__right-input')
const lastLocations = document.querySelector('.box__right-locations')
const lastLocation = document.querySelectorAll('.box__right-location')

const pressure = document.querySelector('.box__right-info-pressure')
const humidity = document.querySelector('.box__right-info-humidity')
const maxTemp = document.querySelector('.box__right-info-maxtemp')
const minTemp = document.querySelector('.box__right-info-mintemp')
const feelsLike = document.querySelector('.box__right-info-feelslike')
const visibility = document.querySelector('.box__right-info-visibility')

const windSpeed = document.querySelector('.box__right-info-windspeed')
const windGust = document.querySelector('.box__right-info-windgust')
const windDeg = document.querySelector('.box__right-info-winddeg')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = 'a1f28905bb879b4ebe17972bf2fe8cf6'
const API_UNITS = '&units=metric'

const getTime = () => {
	console.log('time')
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

const getWeather = () => {
	const city = cityInput.value || 'Brzesko'
	const URL = API_LINK + city + API_UNITS + `&appid=${API_KEY}`

	axios.get(URL).then((resposne) => {
		const data = resposne.data
		console.log(data)
		lastSearch(data.name)
		writeData(data)
	})
}

const setCookie = (name, value) => {
	document.cookie = `${name} = ${value}; expires=24*60*60*1000;`
}

const writeData = (data) => {
	cityName.textContent = data.name
	tempContent.innerHTML = `${Math.round(data.main.temp, 0.5)}&deg;`
	pressure.textContent = `Pressure: ${data.main.pressure} hPa`
	humidity.textContent = `Humidity: ${data.main.humidity} %`
	maxTemp.innerHTML = `Max. temp: ${Math.round(data.main.temp_max, 0.5)}&deg;C`
	minTemp.innerHTML = `Min. temp: ${Math.round(data.main.temp_min, 0.5)}&deg;C`
	feelsLike.innerHTML = `Feels like: ${Math.round(data.main.feels_like)}&deg;C`
	if (data.visibility < 1000) {
		visibility.textContent = `Visibility: ${data.visibility} m`
	} else {
		visibility.textContent = `Visibility: ${data.visibility / 1000} km`
	}
	windSpeed.textContent = `Wind speed: ${data.wind.speed} (m/s)`
	if (data.wind.gust === undefined) {
		windGust.textContent = `Wind gust: no data`
	} else {
		windGust.textContent = `Wind gust: ${data.wind.gust} (m/s)`
	}
	windDeg.textContent = `Wind degree: ${data.wind.deg}`
}

const lastSearch = (city) => {
	const lastLocationsNode = lastLocations.querySelectorAll(
		'.box__right-location'
	)
	let lastLocationsArray = convertNodeList(lastLocationsNode)
	console.log(lastLocationsArray)
	const lastLocationElement = document.createElement('p')
	lastLocationElement.classList.add('box__right-location')

	if (!lastLocationsArray.includes(city)) {
		lastLocationElement.textContent = city
		if (lastLocationsNode.length > 0) {
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

document.addEventListener('load',
	getWeather(),
	getTime(),
	setInterval(() => {
		getTime()
	}, 1000)
)
searchButton.addEventListener('click', getWeather)
cityInput.addEventListener('keydown', (e) => {
	if (e.code === 'Enter') {
		getWeather()
	}
})
setCookie('name', '123')
