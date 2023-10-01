function initialize(){
    const showData = document.querySelector('.showData');
    const searchBtn = document.querySelector('.searchBtn');
    const searchArea = document.getElementById('searchArea');

    searchBtn.addEventListener('click', (event)=>{
        event.preventDefault();
        showData.textContent = '';
        const searchValue = String(searchArea.value);
        localStorage.setItem('myValue',searchValue);
        fetchAndShowWeatherData();
    });

    async function fetchAndShowWeatherData(){
        const api_key = `http://api.weatherapi.com/v1/current.json?key=02cd537bb4c044b6bc9163059232909&q=${localStorage.getItem('myValue')}&aqi=yes`;
        try{
            const response = await fetch(api_key,{mode:'cors'})
            
            if(!response.ok){
                throw new Error('response was not ok!!!');
            }

            const fetchData = await response.json();
            const infoArray = [];

            if(fetchData.location.name){
                const cityName = fetchData.location.name;
                infoArray.push(String(cityName));
            }

            if(fetchData.location.country){
                const countryName = fetchData.location.country;
                infoArray.push(String(countryName));
            }

            if(fetchData.location.localtime){
                const localTime = fetchData.location.localtime;
                infoArray.push(localTime);
            }

            if(fetchData.current.temp_c){
                const tempC = fetchData.current.temp_c;
                infoArray.push(tempC);
            }

            if(fetchData.current.temp_f){
                const tempF = fetchData.current.temp_f;
                infoArray.push(tempF);
            }

            if(fetchData.current.condition.text){
                const weatherCondition = fetchData.current.condition.text;
                infoArray.push(weatherCondition);
            }

            if(fetchData.current.condition.icon){
                const weatherIcon = fetchData.current.condition.icon;
                infoArray.push(weatherIcon);
            }

            if(fetchData.current.wind_mph){
                const windMPH = fetchData.current.wind_mph;
                infoArray.push(windMPH);
            }

            if(fetchData.current.wind_kph){
                const windKPH = fetchData.current.wind_kph;
                infoArray.push(windKPH);
            }

            if(fetchData.current.humidity){
                const humidity = fetchData.current.humidity;
                infoArray.push(humidity);
            }

            infoArray.forEach((value)=>{
                const paragraph = document.createElement("p");
                paragraph.textContent = value;
                showData.appendChild(paragraph);
            });

        }catch(error){
            console.error(error);
        }
    }
}
export default initialize;