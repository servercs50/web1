const weatherRouter = require('express').Router()
const fetch = require('node-fetch');

const APP_ID = '263bacc60191ddc5e17b82d2d0c753d4'

/*
routes for route with prefix '/weather'
*/
weatherRouter.get("/", (req, res) => {
  const city = encodeURIComponent(req.query.city);
  if (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`)
      .then(response => response.json())
      .then(data => {
        res.status(data.cod).send(data);
      })
      .catch(err => {
        res.status(500).send(err.toString());
      })
  }
});

weatherRouter.get("/coordinates", (req, res) => {
  const
    lat = encodeURIComponent(req.query.lat),
    lon = encodeURIComponent(req.query.lon);

  if (lat && lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}`)
      .then(response => response.json())
      .then(data => {
        res.status(data.cod).send(data);
      })
      .catch(err => {
        res.status(500).send(err.toString())
      })
  }
})

module.exports = weatherRouter;
