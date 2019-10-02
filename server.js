const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '1761e9ec4af1121c1c95fb82c24a2986';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', { weather: null, error: null });
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'That city doesn`t exist' });
            } else {
                let weatherText = `Its's ${weather.main.temp} degress in ${weather.name} and ${weather.weather[0].description}`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})

app.listen(3000, function () {
    console.log('App Listen on port 3000!')
})