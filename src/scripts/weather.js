// Day and Dates display
var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var dates = new Date();
function dateInfo(){
    document.getElementById("txtDay").innerHTML = `${weekdays[dates.getDay()]}`;
    document.getElementById("txtDate").innerHTML = `${dates.getDate()} ${month[dates.getMonth()]} ${dates.getFullYear()}`;
}
// Search Function for seraching city name
var city;
var temp;
var lat,lot;
var msg = document.createElement("p");
var dtype;
function searchClick(){
     msg.innerHTML = "";
    document.getElementById("dataList").style.display="block";
    document.getElementById("weather-carousel").style.display="block";
    city = document.getElementById("txtCity").value.toLowerCase();
    temp = document.getElementById("temp");
    // var temp = ;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1d513753013f5d702eaa2b66c4f3bea7`)
        .then(function(response){
            if(response.ok)
            {
                return response.json();
            }
            else{
                throw new Error("City name not found!");
            }
        })
        .then(function (City){
                document.getElementById("location").innerHTML = City.name.toUpperCase();
                temp.innerHTML = `${(parseFloat(City.main.temp)-273.15).toFixed(2)}&deg;`;
                document.getElementById("temperature").innerHTML = `${(parseFloat(City.main.temp)-273.15).toFixed(2)}&deg;C`;
                document.getElementById("humid").innerHTML = `${(parseFloat(City.main.humidity)).toFixed(2)}%`;
                document.getElementById("windSpeed").innerHTML = `${(parseFloat(City.wind.speed))} m/s`;
                document.getElementById("desc").innerHTML = `${City.weather[0].description.toUpperCase()}`;
                document.getElementById("cloud-info").innerHTML = `${City.weather[0].main.toUpperCase()}`;
                lat = City.coord.lat;
                lon = City.coord.lon;
                console.log(lat);
                console.log(lon);
                document.getElementById("maincloudIcon").src = `https://openweathermap.org/img/wn/${City.weather[0].icon}@2x.png`;
                NextDays();
            })
            .catch(function (error){
                document.getElementById("dataList").style.display="none";
                document.getElementById("weather-carousel").style.display="none";
                msg.innerHTML = `<h2 class="text-center fw-bold text-danger" style = "margin-top:20% !important;margin-left:3% !important;">City Name Does Not Found!</h2>`;
                document.getElementById("message").appendChild(msg);
                console.log("Error: " + error)
            })
            document.getElementById("txtCity").value = "";//For clearing the search box after searching
        //
    }

function NextDays(){
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1d513753013f5d702eaa2b66c4f3bea7`)
        .then(function(response){
            return response.json();
        })
        .then(function(City){
                // Object.keys(City)
                const forecastList = City.list;
                //var nextDate = new Date(dates);
                for(let i = 0;i<5;i++)
                {
                    let forecast = forecastList[i*8];
                    let temp = parseFloat((forecast.main.temp-273.15)).toFixed(2);
                    document.getElementById(`nextTemp`).innerHTML = `${temp}&deg;C`;
                    document.getElementById(`nextTemp${i+1}`).innerHTML = `${temp}&deg;C`;
                    document.getElementById(`nextDay1`).innerHTML = `${weekdays[((dates.getDay())+1)%7]}`;
                    document.getElementById(`nextDaythree`).innerHTML = `${weekdays[((dates.getDay())+3)%7]}`;
                    //Switch case for displaying the clouds images based on cloud Types

                    if(forecast.sys.pod === "d")
                    {
                        document.getElementById("cloudTime").src = `../public/images/daytimeCloud2.jpg`;
                        document.querySelector("body").style.backgroundImage = `url("../public/images/wbg.jpg")`
                        document.querySelector("body").style.backgroundSize = "cover !important";
                        // let dtElements = document.getElementsByTagName("dt");
                        // let dlElements = document.getElementsByTagName("dd");
                        let dlElements = document.querySelectorAll("dt,dd");
                        for(let j = 0;j<dlElements.length;j++)
                        {
                            if(dlElements[j].tagName === "DT")
                            {
                                dlElements[j].style.color = "#333333";
                                dlElements[j].style.fontWeight = "bold";
                            }
                            if(dlElements[j].tagName === "DD")
                            {
                                dlElements[j].style.color = "#FFA500";
                                dlElements[j].style.fontWeight = "500";
                            }
                        }

                    }
                    if(forecast.sys.pod === "n")
                    {
                         document.getElementById("cloudTime").src = `../public/images/midnight-cloud.png`;
                        document.querySelector("body").style.backgroundImage = `url("../public/images/space2.jpg")`
                        document.querySelector("body").style.backgroundSize = "cover !important";
                        document.querySelector("body").style.backgroundPosition = "center !important";
                        document.querySelector("body").style.backgroundAttachment = "fixed !important";
                        document.querySelector("body").style.backgroundRepeat = "no-repeat !important";
                            let dlElements = document.querySelectorAll("dt,dd");
                        for(let j = 0;j<dlElements.length;j++)
                        {
                            if(dlElements[j].tagName === "DT")
                            {
                                dlElements[j].style.color = "white";
                                dlElements[j].style.fontWeight = "bold";
                            }
                            if(dlElements[j].tagName === "DD")
                            {
                                dlElements[j].style.color = "white";
                                dlElements[j].style.fontWeight = "500";
                            }
                        }
                    }
                }
                for(let i = 1;i<5;i++)
                {
                       // document.getElementById(`nextDay`).innerHTML = `${weekdays[((dates.getDay())+1)%7]}`;
                    // if(i===2)
                    // {
                    //     document.getElementById(`nextDay3`).innerHTML = `${weekdays[((dates.getDay())+i)%7]}`;
                    //     // document.getElementById(`nextDay3`).innerHTML = `${weekdays[((dates.getDay())+i)%7]}`;
                    // }
                    document.getElementById(`nextDay${i+1}`).innerHTML = `${weekdays[((dates.getDay())+(i+1))%7]}`;

                }
                dtype = forecast.sys.pod;
        })
        .catch(function(error){
            console.log("Error please check and try again..");
        })
}

function bodyLoad(){
    dateInfo();
    var sInput = document.getElementById("txtCity");
    sInput.addEventListener("keypress",function(event){
        if(event.key === "Enter")
        {
            event.preventDefault();
            document.getElementById("searchBtn").click();
        }
    });
}
//haze,clouds,clear,cloudy,mist
