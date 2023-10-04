(()=>{"use strict";!function(){const e=document.querySelector(".showData"),t=document.querySelector(".searchBtn"),n=document.getElementById("searchArea"),o=document.querySelector("#searchArea + span.error"),c=document.getElementById("cityAndCountry"),r=document.getElementById("dateWeek"),a=document.getElementById("time"),i=document.getElementById("fahrenheit"),l=document.getElementById("celsius"),u=document.getElementById("temp"),d=document.getElementById("condition"),s=document.getElementById("wind"),y=document.getElementById("humidity"),m=document.getElementById("tempFeels"),h=document.getElementById("airQuality");t.addEventListener("click",(t=>{t.preventDefault(),""===n.value?o.textContent="Please enter a location":async function(t){o.textContent="";const n=`http://api.weatherapi.com/v1/current.json?key=b5e7182569e7426eb6e160345230310&q=${t}&aqi=yes`;try{const t=await fetch(n,{mode:"cors"});t.ok||(o.textContent="Location not found!");const g=await t.json();if(g.location.name&&g.location.country){const e=String(g.location.name),t=String(g.location.country);c.textContent=`${e}, ${t}`}if(g.location.localtime){const e=g.location.localtime,t=new Date(e),n=t.getFullYear(),o=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],c=t.getDate(),i=t.getHours(),l=t.getMinutes(),u=i>=12?"PM":"AM",d=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()];r.textContent=`${d}, ${c} ${o} ${n}`,a.textContent=l<10?`${i%12||12}:0${l} ${u}`:`${i%12||12}:${l} ${u}`}if(g.current.temp_c&&g.current.temp_f&&g.current.feelslike_f&&g.current.feelslike_c){const e="°";m.textContent=`Feels Like: ${Math.ceil(g.current.feelslike_c)}${e}C`,u.textContent=`${Math.ceil(g.current.temp_c)}${e}C`,l.style.backgroundColor="#e74c3c",i.addEventListener("click",(()=>{l.style.backgroundColor="",u.textContent=`${Math.ceil(g.current.temp_f)}${e}F`,m.textContent=`Feels Like: ${Math.ceil(g.current.feelslike_f)}${e}F`,i.style.backgroundColor="#e74c3c"})),l.addEventListener("click",(()=>{i.style.backgroundColor="",u.textContent=`${Math.ceil(g.current.temp_c)}${e}C`,m.textContent=`Feels Like: ${Math.ceil(g.current.feelslike_c)}${e}C`,l.style.backgroundColor="#e74c3c"}))}if(g.current.condition.text&&g.current.humidity&&g.current.wind_kph&&(d.textContent=g.current.condition.text,s.textContent=`Wind: ${g.current.wind_kph} km/h`,y.textContent=`Humidity: ${g.current.humidity}%`),g.current.air_quality["us-epa-index"]){let e;switch(g.current.air_quality["us-epa-index"]){case 1:e="Good";break;case 2:e="Moderate";break;case 3:e="Unhealthy for Sensitive Groups";break;case 4:e="Unhealthy";break;case 5:e="Very Unhealthy";break;case 6:e="Hazardous";break;default:throw new Error("No AQI is available")}h.textContent=`Air Quality: ${e}`}""===e.textContent.trim()?e.style.boxShadow="none":e.style.boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"}catch(e){console.error(e)}}(String(n.value))}))}()})();