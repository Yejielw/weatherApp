var citiesWeather = [];
var weatherApi = 'http://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&units=metric&appid=f2c093b36910d2fe2427d41ef0e658d6'
var $city;
var urlFinal;
var temperature;
var max_temperature;
var min_temperature;
var sky;
var cityName;

var fetch = function () {
  $.ajax({
    method: "GET",
    url: urlFinal,

    dataType: "json",
    success: function(data) {
    	temperature = data.main.temp;
    	max_temperature = data.main.temp_max;
    	min_temperature = data.main.temp_min;
    	sky = data.weather[0].description;
    	cityName = data.name;

    	var niuCity = {
    		name:cityName,
    		temp: temperature,
    		description: sky,
    		max_temp: max_temperature,
    		min_temp: min_temperature,
        comments: []
    	};

		citiesWeather.push(niuCity);
		updateWeatherList();
       },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
   });

};
var updateWeatherList = function () {

  var $cityWeather = $('.cityWeather');
  $cityWeather.empty();

	for (var i = 0; i < citiesWeather.length; i++) {	  
	  var source = $('#weather-template').html();
	  var template = Handlebars.compile(source);
	  var newHTML = template({
	          name: citiesWeather[i].name,
	          weather: citiesWeather[i].temp,
	          max_temp: citiesWeather[i].max_temp,
	          min_temp: citiesWeather[i].min_temp,
            id: i
	        });
	  $cityWeather.append(newHTML);
	}
}
var addCitytoUrl = function () {
   $city = $city.replace(/ /g,'+');
   urlFinal = weatherApi.concat($city);
   urlFinal = urlFinal.concat(apiKey);
}; 

var pushComment = function () {

 citiesWeather[$id].comments.push($comment)
  for (var i = 0; i < citiesWeather[$id].comments.length; i++) {
    console.log(citiesWeather[$id].comments[i])
      var source = $('#comments-template').html();
      var template = Handlebars.compile(source);
      var newHTML = template({
             comment: citiesWeather[$id].comments[i]
            });
      $('.Comments dataset').append(newHTML);
  }
}

$('#myBtn').on('click', function () {
	$city = $('#CityInput').val();
	addCitytoUrl();
	console.log(urlFinal);
	fetch();
});

$('.cityWeather').on('click','#commentBtn', function () {
  $comment= $('.comment-input').val();
  $id = $('this').data().val();
  console.log($id);
//  pushComment();
})
