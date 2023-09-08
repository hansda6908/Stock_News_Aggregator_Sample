document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-container");

    // We can reeplace 'YOUR_ALPHA_VANTAGE_API_KEY' with our own Alpha Vantage API key
    const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=${apiKey}`;

    // Function to fetch stock market news
    async function fetchStockMarketNews() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data["Meta Data"]) {
                displayNews(data);
            } else {
                console.error("Failed to fetch stock market data:", data["Error Message"]);
            }
        } catch (error) {
            console.error("Error fetching stock market data:", error);
        }
    }

    // Function to display stock market news articles
    function displayNews(data) {
        newsContainer.innerHTML = "";

        const metadata = data["Meta Data"];
        const timeSeries = data["Time Series (5min)"];

        const articleDiv = document.createElement("div");
        articleDiv.classList.add("article");

        const articleTitle = document.createElement("h2");
        articleTitle.textContent = `Stock Market News for ${metadata["2. Symbol"]}`;

        const articleContent = document.createElement("p");
        articleContent.textContent = `Last Refreshed: ${metadata["3. Last Refreshed"]}`;

        articleDiv.appendChild(articleTitle);
        articleDiv.appendChild(articleContent);

        for (const timestamp in timeSeries) {
            const articleInfo = document.createElement("div");
            articleInfo.classList.add("article-info");
            articleInfo.innerHTML = `Time: ${timestamp}<br>Open: ${timeSeries[timestamp]["1. open"]}<br>High: ${timeSeries[timestamp]["2. high"]}<br>Low: ${timeSeries[timestamp]["3. low"]}<br>Close: ${timeSeries[timestamp]["4. close"]}`;

            articleDiv.appendChild(articleInfo);
        }

        newsContainer.appendChild(articleDiv);
    }

    // Initial display of stock market news
    fetchStockMarketNews();

    // We can periodically update the news by calling fetchStockMarketNews() at intervals
    // Example: Use setInterval(fetchStockMarketNews, 60000); to fetch news every minute
});
