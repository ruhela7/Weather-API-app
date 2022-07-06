let weather = {
    apiKey: "daa4af821bc1e097386a6135cb0d3f22",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city + 
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => {
            if(!response.ok){
                alert("NO weather found.");
                throw new error("No weather found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?" + name + ")";
    }, 

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },

};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

//By-default..lets keep for Kharagpur.
weather.fetchWeather("Kharagpur");

// https://api.openweathermap.org/data/2.5/weather?q=Uttar Pradesh&units=metric&appid=daa4af821bc1e097386a6135cb0d3f22