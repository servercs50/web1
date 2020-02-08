const express = require('express');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');

const app = express();
const weatherRouter = require('./routes/weather')
const favoritesRouter = require('./routes/favorites')

app.use(cors());
app.use(bodyParser.json());
app.use("/weather", weatherRouter)
app.use("/favorites", favoritesRouter)

MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true })
  .then(client => {
    app.locals.db = client.db('web-weather')
    app.listen(9000, () => console.info(`Server started on port 9000`));
  }).catch(error => console.error(error));
