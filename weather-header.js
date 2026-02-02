

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=tooele&units=imperial&appid=82e3d3328f9517689972bb5805ece7a1";


fetch(weatherApiUrl)
	.then(response => response.json())

	.then(data => {
		const description = data.weather[0].description;
		const temp = Math.round(data.main.temp);
		const humidity = data.main.humidity;
		const windSpeed = data.wind.speed;


		let windChill = 'N/A';
		if (temp <= 50 && windSpeed > 3) {
			windChill = Math.round(
				35.74 + 0.6215 * temp - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temp * Math.pow(windSpeed, 0.16)
			);
			windChill = `${windChill}°F`;
		}

		const descElem = document.getElementById('current-desc');
		if (descElem) {
			descElem.textContent = description.charAt(0).toUpperCase() + description.slice(1);
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


	//NEWS SECTION//

	const newsurl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=e55b5c6132c24adab029adc4b60bf621";

	fetch(newsurl)
		.then(response => response.json())
		.then(newsData => {
			const articles = newsData.articles;
			const newsContainer = document.getElementById('news-container');
			
			// Display main article of the day
			if (newsContainer && articles && articles.length > 0) {
				const mainArticle = articles[0];
				newsContainer.innerHTML = `
					<div class="main-article">
						<h2>${mainArticle.title || 'No Title'}</h2>
						<img src="${mainArticle.urlToImage || 'img/x'}" alt="News Image" style="max-width: 100%;" />
						<p>${mainArticle.description || 'No description available'}</p>
						<a href="${mainArticle.url}" target="_blank">Read more</a>
					</div>
				`;
			}
			
			// Populate the 4 news article divs below
			for (let i = 1; i <= 4 && i < articles.length; i++) {
				const article = articles[i];
				const titleElem = document.getElementById(`newsTitle${i}`);
				const imageElem = document.getElementById(`newsImage${i}`);
				const descElem = document.getElementById(`newsDesc${i}`);
				
				if (titleElem) titleElem.textContent = article.title || `Article ${i}`;
				if (imageElem && article.urlToImage) imageElem.src = article.urlToImage;
				if (descElem) descElem.textContent = article.description || 'No description available';
			}
		})
		.catch(error => console.error('Error fetching news:', error));