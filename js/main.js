// today variables 
var today = document.querySelector('#today') ;
var todayDate = document.querySelector('#todayDate') ;
var cityLocation = document.querySelector('#cityLocation') ;
var todayDegree = document.querySelector('#todayDegree') ;
var todayCustom = document.querySelector('#todayCustom') ;
var todayIcon = document.querySelector('#todayIcon') ;
var humidity = document.querySelector('#humidity') ;
var windKph = document.querySelector('#windKph') ;
var windDir = document.querySelector('#windDir') ;

// next day variables
var nextDay = document.getElementsByClassName("nextDay") ;
var nextDayIcon = document.getElementsByClassName("nextDayIcon") ;
var maxDegree = document.getElementsByClassName("maxDegree") ;
var minDegree = document.getElementsByClassName("minDegree") ;
var nextDayDescription = document.getElementsByClassName("nextDayDescription") ;


var searchBar = document.querySelector('#searchBar') ;
var currentCity = 'Cairo';

var days = ["Sunday ","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] ;
var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

var responseData ;            


var date = new Date() ;



async function getWeatherData () {
   var  apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6552fa7aaa014fdb9f6121246221510&q=${currentCity}&days=7`) ;
     responseData = await apiResponse.json() ;
    console.log(responseData);
    displayTodayWeather () ;
    displayNextDayWeather () ;
}
getWeatherData () ;
// today 

function displayTodayWeather () {
        today.innerHTML = days[date.getDay()] ;
        todayDate.innerHTML = date.getDate() + month[date.getMonth()] ;
        cityLocation.innerHTML = responseData.location.name ;
        todayDegree.innerHTML = responseData.current.temp_c + '°C';
        todayCustom.innerHTML = responseData.current.condition.text ;
        todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`) ;
        humidity.innerHTML = responseData.current.humidity + '%';
        windKph.innerHTML = responseData.current.wind_kph + 'km/h' ;
        windDir.innerHTML = responseData.current.wind_dir ;
}


// next Day

function displayNextDayWeather () {
    for(let i = 0 ; i<nextDay.length ; i++) {
        nextDay[i].innerHTML = days[ new Date(responseData.forecast.forecastday[i+1].date).getDay() ];
        nextDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`) ;
        maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c +'°C' ;
        minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c +'°';
        nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text ;
    }
}


searchBar.addEventListener("keyup",function() {
    currentCity = searchBar.value ;
    console.log(currentCity);
    getWeatherData () ;
})