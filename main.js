import axios from 'axios'
import './style.scss'

const cityInput = document.querySelector('.box__right-input')
const cityName = document.querySelector('.box__left-weather-info-city')
const tempContent = document.querySelector('.box__left-weather-info-temp')
const dataInfo = document.querySelector('.box__left-weather-info-date')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = 'a1f28905bb879b4ebe17972bf2fe8cf6'
const API_UNITS = '&units=metric'

const getTime = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const date = new Date
  const year = date.getFullYear()
  const monthName = months[date.getMonth()]
  const dayName = days[date.getDay()]
  const dayNum = date.getDate()
  const hours = date.getHours()
  let minutes

  if(date.getMinutes() < 10){
    minutes = `0${date.getMinutes()}`
  }
  
  dataInfo.textContent = `${hours}:${minutes} - ${dayName}, ${dayNum} ${monthName} ${year}`

}

const getWeather = () => {
	const city = cityInput.value || 'Brzesko'
	const URL = API_LINK + city + API_UNITS + `&appid=${API_KEY}`

	axios.get(URL).then((resposne) => {
    const data = resposne.data
    console.log(data);
    cityName.textContent = data.name
    tempContent.innerHTML = `${Math.floor(data.main.feels_like)}&deg;`
  })
}

document.addEventListener('load', getWeather(), getTime())