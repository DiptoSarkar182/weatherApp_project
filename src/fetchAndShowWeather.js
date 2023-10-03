function initialize(){
    const showData = document.querySelector('.showData');
    const searchBtn = document.querySelector('.searchBtn');
    const searchArea = document.getElementById('searchArea');
    const searchError = document.querySelector('#searchArea + span.error');
    const cityAndCountry = document.getElementById('cityAndCountry');
    const showDate = document.getElementById('date');
    const showTime = document.getElementById('time');
    const showDay = document.getElementById('week');

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
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const amOrPm = hours >=12 ? "PM" : "AM"
                const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat'];
                const weekdaysIndex = date.getDay();
                const weekday = weekdays[weekdaysIndex];
                showDate.textContent = `${day}/${month}/${year}`;
                if(minutes<10){
                    showTime.textContent = `${hours % 12 || 12}:0${minutes} ${amOrPm}`; //12hour conversion
                }
                else{
                    showTime.textContent = `${hours % 12 || 12}:${minutes} ${amOrPm}`; //12hour conversion
                }
                showDay.textContent = `${weekday}`;

            }



        }catch(error){
            console.error(error);
        }
    }

}
export default initialize;