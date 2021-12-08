class Weather{
    constructor(lat, long){
        this.lat = lat;
        this.long = long;
        this.weather_api_key = config.weather_api_key;
    }

    async getWeather() {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?key=${this.weather_api_key}&lat=${this.lat}&lon=${this.long}`);
    
        const responseData = await response.json();
    
        return responseData;
    }

    

}