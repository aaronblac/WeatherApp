const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {
  const query = req.body.cityName;
  const apiKey = "49e99c8e9cdeb289f185a7bd0f754e4f";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=imperial";

  https.get( url, (response) => {
    console.log(response.statusCode);

    response.on('data', (data) => {
    const weatherData =  JSON.parse(data);
    const weatherDescription = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Farenheight</h1>");
    res.write("<p>The weather is currently " + weatherDescription + ".</p>");
    res.write("<img src = " + imageURL + ">");
    res.send();
    })
  });

})


app.listen(3000, () =>{
  console.log('Server is running on port 3000');
})
