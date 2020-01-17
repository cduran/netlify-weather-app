import fetch from 'node-fetch';
require("dotenv").config();

const API_KEY = process.env.API_KEY;

exports.handler = async (event, context) => {
    const city = JSON.parse(event.body).city;
    const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${API_KEY}`;

    console.log(API_KEY);
    return fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
      .then(response => response.json())
      .then(data => ({
        statusCode: 200,
        body: JSON.stringify(data)
      }))
      .catch(error => ({ statusCode: 422, body: String(error) }));
  };
