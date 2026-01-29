
// Weather API URL with your API key
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=tooele&units=imperial&appid=82e3d3328f9517689972bb5805ece7a1";


// Fetch weather data and update the DOM
fetch(weatherApiUrl)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		// Extract needed data
		const description = data.weather[0].description;
		const temp = Math.round(data.main.temp);
		const humidity = data.main.humidity;
		const windSpeed = data.wind.speed;

		// Wind chill calculation (only if temp <= 50°F and wind speed > 3 mph)
		let windChill = 'N/A';
		if (temp <= 50 && windSpeed > 3) {
			windChill = Math.round(
				35.74 + 0.6215 * temp - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temp * Math.pow(windSpeed, 0.16)
			);
			windChill = `${windChill}°F`;
		}

		// Update DOM elements
		// Set the full summary for the weather description
		const descElem = document.getElementById('current-desc');
		if (descElem) {
			descElem.textContent = `Currently: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
		}
		const tempElem = document.getElementById('current-temp');
		if (tempElem) tempElem.textContent = `${temp}°F`;
		const humidElem = document.getElementById('current-humid');
		if (humidElem) humidElem.textContent = `${humidity}%`;
		const windElem = document.getElementById('current-windSpeed');
		if (windElem) windElem.textContent = `${windSpeed} mph`;
		const chillElem = document.getElementById('current-windChill');
		if (chillElem) chillElem.textContent = windChill;
	})
	.catch(error => {
		console.error('Error fetching weather data:', error);
	});
