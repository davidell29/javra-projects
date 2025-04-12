const API_GEOLOCATION_URL = "https://geocoding-api.open-meteo.com/v1/search";


const cityForm = document.querySelector('#cityForm');

cityForm.addEventListener('submit', onCityFormSubmit);

async function onCityFormSubmit(event) {
    event.preventDefault();

    const cityInput = cityForm.querySelector('#city');
    const cityName = cityInput.value.trim();

    if (!cityName) {
        alert('Introduceti numele orasului!');
        return;
    }

    const cityCoordinates = await getCityCoordinates(cityName);
    
    if (!cityCoordinates == null) {
        alert('Orasul nu a fost gasit!');
        return;
    }
}    

async function getCityCoordinates(cityName) {
    const apiUrl = new URL(API_GEOLOCATION_URL);
    apiUrl.searchParams.append('name', cityName);
    apiUrl.searchParams.append('count', 1);

    console.log(apiUrl.toString());

    const response = await fetch(apiUrl.toString())
    const data = await response.json();

    if (!data || data.hasOwnProperty('results')) {
        return null;
    }

    const result = data.results[0];

    return {lat: result.latitude, long: result.longitude};

    
}