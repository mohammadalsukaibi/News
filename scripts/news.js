class News{

    constructor(){
        this.defaultLocation = 'us';
        this.news_api_key = config.news_api_key;
    }

    async getNews() {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.defaultLocation}&apiKey=${this.news_api_key}`);
    
        const responseData = await response.json();
    
        return responseData;
    }

    async getCustomNews(userInput) {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${userInput}&apiKey=${this.news_api_key}`);
    
        const responseData = await response.json();
    
        return responseData;
    }

    async getHealth(){
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.defaultLocation}&category=health&apiKey=${this.news_api_key}`);
    
        const responseData = await response.json();
    
        return responseData;

    }

    async getBusiness(){
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.defaultLocation}&category=business&apiKey=${this.news_api_key}`);
    
        const responseData = await response.json();
    
        return responseData;

    }

    async getEntertainment(){
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.defaultLocation}&category=entertainment&apiKey=${this.news_api_key}`);
    
        const responseData = await response.json();
    
        return responseData;

    }

    async getTech(){
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.defaultLocation}&category=technology&apiKey=${this.news_api_key}`);
    
        const responseData = await response.json();
    
        return responseData;

    }

    async getSports(){
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.defaultLocation}&category=sports&apiKey=${this.news_api_key}`);
    
        const responseData = await response.json();
    
        return responseData;

    }
}
// fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${news_api_key}`).then((res) => {
//     console.log(res);
//     return res.json();  
// }).then(data => {
//     console.log(data.articles);
// })