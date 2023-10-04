function initialize(){
    const showData = document.querySelector('.showData');
    const searchBtn = document.querySelector('.searchBtn');
    const searchArea = document.getElementById('searchArea');
    const searchError = document.querySelector('#searchArea + span.error');
    const cityAndCountry = document.getElementById('cityAndCountry');
    const showDateWeek = document.getElementById('dateWeek');
    const showTime = document.getElementById('time');
    const fBtn = document.getElementById('fahrenheit');
    const cBtn = document.getElementById('celsius');
    const showTemp = document.getElementById('temp');
    const showCondition = document.getElementById('condition');
    const showWind = document.getElementById('wind');
    const showHumidity = document.getElementById('humidity');
    const showTempFeels = document.getElementById('tempFeels');
    const showAirQuality = document.getElementById('airQuality');

    searchBtn.addEventListener('click', (event)=>{
        event.preventDefault();
        if(searchArea.value === ''){
            searchError.textContent = 'Please enter a location';
        }
        else {
            const searchValue = String(searchArea.value);
            fetchAndShowWeatherData(searchValue);
        }

    });

    async function fetchAndShowWeatherData(getValue){
        searchError.textContent = '';
        const api_key = `http://api.weatherapi.com/v1/current.json?key=b5e7182569e7426eb6e160345230310&q=${getValue}&aqi=yes`;
        try{
            const response = await fetch(api_key, {mode:'cors'})
            
            if(!response.ok){
                searchError.textContent = 'Location not found!'; 
            }

            const fetchData = await response.json();

            if(fetchData.location.name && fetchData.location.country){
                const cityName = String(fetchData.location.name);
                const countryName = String(fetchData.location.country);
                cityAndCountry.textContent = `${cityName}, ${countryName}`; 
            }

            if(fetchData.location.localtime){
                const localtimeAndDate = fetchData.location.localtime;
                const date = new Date(localtimeAndDate);
                
                const year = date.getFullYear();
                // const month = date.getMonth() + 1;
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const month = monthNames[date.getMonth()];
                const day = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const amOrPm = hours >=12 ? "PM" : "AM";
                const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const weekdaysIndex = date.getDay();
                const weekday = weekdays[weekdaysIndex];
                showDateWeek.textContent = `${weekday}, ${day} ${month} ${year}`;
                if(minutes<10){
                    showTime.textContent = `${hours % 12 || 12}:0${minutes} ${amOrPm}`; //12hour conversion
                }
                else{
                    showTime.textContent = `${hours % 12 || 12}:${minutes} ${amOrPm}`; //12hour conversion
                }
                
            }

            if(fetchData.current.temp_c && fetchData.current.temp_f && fetchData.current.feelslike_f && fetchData.current.feelslike_c){
                const degreeSign = '\u00b0';
                showTempFeels.textContent = `Feels Like: ${Math.ceil(fetchData.current.feelslike_c)}${degreeSign}C`;
                showTemp.textContent = `${Math.ceil(fetchData.current.temp_c)}${degreeSign}C`;
                cBtn.style.backgroundColor = '#e74c3c';

                fBtn.addEventListener('click', ()=>{
                    cBtn.style.backgroundColor = '';
                    showTemp.textContent = `${Math.ceil(fetchData.current.temp_f)}${degreeSign}F`;
                    showTempFeels.textContent = `Feels Like: ${Math.ceil(fetchData.current.feelslike_f)}${degreeSign}F`;
                    fBtn.style.backgroundColor = '#e74c3c';
                });
                cBtn.addEventListener('click', ()=>{
                    fBtn.style.backgroundColor = '';
                    showTemp.textContent = `${Math.ceil(fetchData.current.temp_c)}${degreeSign}C`;
                    showTempFeels.textContent = `Feels Like: ${Math.ceil(fetchData.current.feelslike_c)}${degreeSign}C`;
                    cBtn.style.backgroundColor = '#e74c3c';
                });
            }

            if(fetchData.current.condition.text && fetchData.current.humidity && fetchData.current.wind_kph){
                showCondition.textContent = fetchData.current.condition.text;
                showWind.textContent = `Wind: ${fetchData.current.wind_kph} km/h`;
                showHumidity.textContent = `Humidity: ${fetchData.current.humidity}%`
            }
            if(fetchData.current.air_quality['us-epa-index']){
                const aqiScale = fetchData.current.air_quality['us-epa-index'];
                let aqiStatus;
                switch(aqiScale){
                    case 1 :
                        aqiStatus = 'Good';
                        break;
                    case 2:
                        aqiStatus = 'Moderate';
                        break;
                    case 3:
                        aqiStatus = 'Unhealthy for Sensitive Groups';
                        break;
                    case 4:
                        aqiStatus = 'Unhealthy';
                        break;
                    case 5:
                        aqiStatus = 'Very Unhealthy';
                        break;
                    case 6:
                        aqiStatus = 'Hazardous';
                        break;
                    default:
                        throw new Error('No AQI is available');
                }
                showAirQuality.textContent = `Air Quality: ${aqiStatus}`;

            }
            if (showData.textContent.trim() === '') {
                showData.style.boxShadow = 'none';
            } else {
                showData.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
            }

        }catch(error){
            console.error(error);
        }
    }

}
export default initialize;