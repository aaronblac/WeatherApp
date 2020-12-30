const express = require('express');
const https = require('https');

const app = express();
const url = "https://api.openweathermap.org/data/2.5/weather?q=Lihue&appid=49e99c8e9cdeb289f185a7bd0f754e4f&units=imperial";
app.get('/', (req, res) => {
  https.get( url, (response) => {
    console.log(response.statusCode);

    response.on('data', (data) => {
    const weatherData =  JSON.parse(data);
      console.log(weatherData);
    })
  });
  console.log('server is up and running');
})




app.listen(3000, () =>{
  console.log('Server is running on port 3000');
})
