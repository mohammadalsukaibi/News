const news = new News();
let articles = [];
let userCity;
let userCountry;
let google_maps_api_key = config.google_maps_api_key;

const cards = document.getElementById('cards');
document.querySelector('.myButton').addEventListener('click', customNews);
document.querySelector('.weather').innerHTML = "<div class='loader'></div>"

// get user location
navigator.geolocation.getCurrentPosition(function (position) {
    const weather = new Weather(position.coords.latitude, position.coords.longitude);
        weather.getWeather()
        .then(results => {
            userCity = results.data[0].city_name;
            userCountry = results.data[0].country_code;
            document.getElementById('location').innerHTML = `Current Location : ${userCity}`
            showWeather(results.data[0].app_temp,results.data[0].city_name,results.data[0].country_code,results.data[0].weather.description);
            
        })
        .catch(err => console.log(err));
    userLocation(position.coords.latitude, position.coords.longitude)
    .then(res => {
        console.log(res.results[0].address_components[3].long_name);
        console.log(res.results[0].address_components[6].long_name);
        userCity = res.results[0].address_components[3].long_name;
        userCountry = res.results[0].address_components[6].long_name;
    })
    .catch(err => console.log(err));
},
function () {
    console.log("The Locator was denied. :(")
})


function customNews(){
    let userInput = document.querySelector('.css-input').value;
    document.getElementById('main').innerHTML = `<div class="ui my-container centered grid stackable">
    <h1>Search results For : ${userInput}</h1>
    <div class="row" id="cards"></div>
</div>`
    const cards = document.getElementById('cards');
    cards.innerHTML = "<div class='loader'></div>";
    news.getCustomNews(userInput)
    .then(results => {
        console.log(results.articles,"custom");
        articles = results.articles
        cards.innerHTML = "";
        articles.map(showNews)
    })
    .catch(err => console.log(err));
}

function topNews(){
    news.getNews()
    .then(results => {
        console.log(results.articles);
        new_articles = results.articles.slice(0,3)
        all_articles = results.articles.slice(4,20)
        new_articles.map(showRecent)
        all_articles.map(showNews)
    })
    .catch(err => console.log(err));
}

function healthNews(){
    news.getHealth()
    .then(results => {
        console.log(results.articles);
        articles = results.articles
        articles.map(showNews)
    })
    .catch(err => console.log(err));
}

function businessNews(){
    news.getBusiness()
    .then(results => {
        console.log(results.articles);
        articles = results.articles
        articles.map(showNews)
    })
    .catch(err => console.log(err));
}

function entertainmentNews(){
    news.getEntertainment()
    .then(results => {
        console.log(results.articles);
        articles = results.articles
        articles.map(showNews)
    })
    .catch(err => console.log(err));
}

function techNews(){
    news.getTech()
    .then(results => {
        console.log(results.articles);
        articles = results.articles
        articles.map(showNews)
    })
    .catch(err => console.log(err));
}

function sportsNews(){
    news.getSports()
    .then(results => {
        console.log(results.articles);
        articles = results.articles
        articles.map(showNews)
    })
    .catch(err => console.log(err));
}


function showNews(item){
    const cards = document.getElementById('cards');
    // the date
    let myDate = item.publishedAt;
    // the description
    let myDescription = item.description;
    if (item.description == null || item.description == "" || item.urlToImage == null){
        console.log('1')
    }else{
        cards.innerHTML += `<div class="sixteen wide mobile eight wide tablet five wide computer only column centered">
        <div class="card">
            <img src="${item.urlToImage}" alt="">
            <div id="card-info">
                <p class="news-date">${myDate.slice(0,10)}</p>
                <p class="news-title">${item.title}</p>
                <p class="news-description">${myDescription.slice(0,150)}...</p>
                <h4>${item.author ? item.author : "Jane doe"}</h4>
            </div>
        </div>
    </div>`
    }
}

function showRecent(item){
    let myDate = item.publishedAt;
    let myDescription = item.description;
    let myTitle = item.title;


    document.querySelector('.recent').innerHTML += `<div class="sixteen wide mobile eight wide tablet five wide computer column recent">
    <div class="card-sm">
        <img src="${item.urlToImage}" alt="">
        <div id="card-info">
            <p class="">${myDate.slice(0,10)}</p>
            <p class="recent-title">${myTitle.slice(0,98)}</p>
            <p class="recent-description">${myDescription}</p>
            <h4>${item.author ? item.author : "Jane doe"}</h4>
        </div>
    </div>
</div>`
}


// function showCarosel(item){
    
//     const li = document.createElement('li');
//     li.classList.add('glide__slide');
//     li.innerHTML = `<div class="card-h">
//     <img src="${item.urlToImage}" alt="">
//     <div class="card-h-info">
//         <p class="h-date">2021-7-19</p>
//         <p class="h-title">Lorem ipsum dolor, adipisicing elit. Pariatur, placeat sint. Odit aliquid quis nobis consequuntur beatae, neque alias.</p>
//         <p class="h-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores est dolorum sapiente dignissimos placeat velit qui aliquam repudiandae. Dolore ut molestias possimus exercitationem. Explicabo aliquam illum adipisci esse asperiores dicta itaque id animi provident possimus consequuntur doloribus maxime, dolore molestiae odio cupiditate! Vitae et eveniet nihil ipsam iste dolores, quo neque incidunt omnis molestias cum inventore corporis ex distinctio rerum minima veritatis ea sunt est asperiores esse maiores beatae! Veritatis, iste exercitationem quam ducimus doloremque nulla possimus deleniti excepturi quaerat?</p>
//         <h3>Jane Doe</h3>
//     </div>
// </div>`
    
//     const ggg = document.querySelector('.glide__slides');
//     ggg.appendChild(li);
//     console.log('done');
// }

function showWeather(temp,city_name,country_code,description){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = days[d.getDay()];
    weatherContainer = document.querySelector('.weather');
    weatherContainer.innerHTML = `<div class="weather-icon">
    <i class="sun icon massive"></i>
</div>
<div class="weather-condition">
    <h1>${description}</h1>
</div>
<br>
<div class="weather-temp">
    <p>${temp}</p>
</div>
<br>
<div class="weather-date">
    <h1>${day}</h1>
</div>
<div class="weather-location">
    <h1>${city_name}, ${country_code} </h1>
</div>`
}

async function userLocation(lat,long){
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${google_maps_api_key}`);
    
    const responseData = await response.json();
    
    return responseData;
}
