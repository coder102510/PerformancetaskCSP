//Some code was generated through AI, and I edited the code to simplify it and improve it.

const button = document.getElementById("button");

//Makes sure this is the first time we are running the code
let firstAttempt = true;

//This function is used to get the weather from the API
async function getWeather(input) {
    try {
        //This code was made freely availible by Visual Crossing
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=us&key=XUQ5DBC4JP6RYDCPS2VFZSUUM&contentType=json`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
} 

//This function is used to display the weather on the page
async function displayWeather(json) {
    const cityName = document.getElementById("city");    

    if (firstAttempt) {
        cityName.insertAdjacentHTML("beforeend", json.resolvedAddress);
        firstAttempt = false;
    } else {
        cityName.innerHTML = "Weather for: " + json.resolvedAddress;
    }

    makeGrid(json);

    //Logs the weather data to the console for debugging purposes
    console.log(json)

}


//This function uses data to create a grid of data to display on the page
function makeGrid(jsonData) {

    const firstRow = document.getElementById("firstRow");

    const todayData = [
        "Current temperature: " + jsonData.currentConditions.temp,
        "Today's High: " + jsonData.days[0].tempmax,
        "Today's Low: " + jsonData.days[0].tempmin,
        "Today's Conditions: " + jsonData.currentConditions.conditions,
        "Today's Humidity: " + jsonData.currentConditions.humidity,
        "Today's Sunrise: " + jsonData.currentConditions.sunrise,
        "Today's Sunset: " + jsonData.currentConditions.sunset
    ];

    if (!firstAttempt) {
        firstRow.innerHTML = "";
    }

    for (let i = 0; i < todayData.length; i++) {
        const newElem = document.createElement("div");
        newElem.classList.add("col-*-*", "display-6");
        newElem.innerHTML = todayData[i];
        firstRow.appendChild(newElem);
    }

}

//This function is activated when the button is clicked, and triggers the other functions
button.onclick = async function() {
    let city;
    do {
        city = prompt("What city would you like to know the weather for?");
    } while (city === "" || city === null)
    const data = await getWeather(city);
    displayWeather(data);
}

