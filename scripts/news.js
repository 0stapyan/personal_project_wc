document.addEventListener('DOMContentLoaded', function() {
    function displayTeamNews() {
        const teamNews = JSON.parse(localStorage.getItem('teamNews')) || [];
        const teamNewsContainer = document.getElementById('teamNews');
        teamNewsContainer.innerHTML = teamNews.map(newsItem => `<p>${newsItem}</p>`).join('');
    }

    async function fetchWorldFootballNews() {
        try {
            const response = await fetch('https://api.example.com/football/news');
            const news = await response.json();
            const newsContainer = document.getElementById('worldFootballNews');
            newsContainer.innerHTML = news.map(newsItem => `<p>${newsItem.title}</p>`).join('');
        } catch (error) {
            console.error('Error fetching world football news:', error);
        }
    }

    displayTeamNews();
    fetchWorldFootballNews();
});

function updateTeamNews(newNews) {
    let teamNews = JSON.parse(localStorage.getItem('teamNews')) || [];
    teamNews.push(newNews);
    localStorage.setItem('teamNews', JSON.stringify(teamNews));
    displayTeamNews(); 
}

document.getElementById('clearNewsButton').addEventListener('click', function() {
    localStorage.removeItem('teamNews');
    displayTeamNews(); 
    alert("News have been cleaned");
});

async function fetchNews() {
    const apiKey = '0246c9d117cc4e2e9dd560777f9900d9';
    const url = `https://newsapi.org/v2/top-headlines?country=gb&category=sports&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayNews(data.articles); 
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayNews(articles) {
    const container = document.getElementById("worldFootballNews"); 
    container.innerHTML = ''; 

    articles.forEach(article => {
        const div = document.createElement('div');
        div.className = 'news-item';
        div.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more...</a>
        `;
        container.appendChild(div);
    });
}

// Виклик функції при завантаженні сторінки
document.addEventListener('DOMContentLoaded', fetchNews);
