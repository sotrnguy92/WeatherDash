$(document).ready(function (){

    let $searchBar = $("#searchBar");
    let $citiesList = $(".citiesList");
    let $searchButton = $(".searchButton");
    let $weatherToday = $(".weatherToday");
    let $weatherStats = $(".weatherStats");
    let citySearch;
    let citiesArr = [];
    let storedCities = JSON.parse(localStorage.getItem("cities"));





    const openPage = () => {
        getWeather();
        console.log(storedCities)
        if (storedCities){
            citiesArr = storedCities
            for ( let i =0; i < citiesArr.length; i++){
                const savedCity = $("<p>").text(citiesArr[i]).attr("id", "city" + i);
                const trashButton = $("<button/>").attr("type", "button").addClass("trash").text("delete")
                trashButton.data('index', i);
                savedCity.append(trashButton);
                savedCity.addClass("cityListItem");
                $citiesList.prepend(savedCity);

            }
        }
    }


    let apiKey = "7de6b07945dab56ba69075d82a6e9cc7";

    $("form").on("submit", (e) =>{
        e.preventDefault();
        if (!$searchBar.val()) {
            return;
        }
        getWeather();
        citiesArr.push(citySearch);
        localStorage.setItem("cities", JSON.stringify(citiesArr));
        console.log($searchBar.val());
    })

    $(".trash").on("click", function(event) {
        event.stopPropagation();
        console.log("Im clicked")
        let trashButton = $(event.target);
        let index = trashButton.data('index');
        citiesArr.splice(index, 1);
        localStorage.setItem("cities", JSON.stringify(citiesArr));
        $('#' + trashButton.parent().attr("id")).remove();
    });

    // $(".cityListItem").on("click", function (event) {
    //     event.stopPropagation();
    //     $(".cityListItem").data("clicked", true);
    //     getWeather();
    // });

    const getWeather = () => {
        $weatherStats.empty();
        $weatherToday.empty();

        if ($searchBar.val()) {
            citySearch = $.trim($searchBar.val());
            // if city in left column has been clicked, use this value
        }


        let URL =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            citySearch +
            "&appid=" +
            apiKey +
            "&units=imperial";

        $.ajax({
            url: URL,
            method: "GET",
        }).then(function (response) {
            let city = $("<h4>").addClass("city card-title");
            city.text(response.name + ", " + response.sys.country);
            if (response.sys.country == undefined) {
                city.text(response.name);
            }



            let description = $("<p>").addClass("description card-text");
            description.text(response.weather[0].description);

            let currentTemp = $("<h3>").addClass("currentTemp card-subtitle");
            currentTemp.text(Math.round(response.main.temp) + "ºF");

            let today = $("<p>").addClass("today card-text");
            today.text("TODAY: " + moment().format("dddd"));

            let date = $("<p>").addClass("card-text").text(moment().format("MMMM DD, YYYY"));

            let tempHigh = $("<p>").addClass("tempHigh");
            tempHigh.text("High: " + Math.round(response.main.temp_max) + "º");

            let tempLow = $("<p>").addClass("tempLow");
            tempLow.text("Low: " + Math.round(response.main.temp_min) + "º");

            let icon = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/wn/" +
                response.weather[0].icon +
                "@2x.png"
            );
            let humidity = $("<p>").addClass("humidity");
            humidity.text("Humidity: " + response.main.humidity + "%");

            let wind = $("<p>").addClass("humidity");
            wind.text("Wind: " + response.wind.speed + "mph");

            $weatherToday.append(city, description, icon, currentTemp, today, date);
            $weatherStats.append(tempHigh, tempLow, humidity, wind);



        });
    }

    openPage();

})
