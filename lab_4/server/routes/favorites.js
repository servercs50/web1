const favoritesRouter = require('express').Router()

favoritesRouter.get('/', (req, res) => {
  req.app.locals.db.collection('favorites').find({}).toArray((err, result) => {
    if (err) {
      res.status(500).send( {
        result: "error",
        desc: err.toString()
      });
    } else {
      res.status(200).send({
        result: "success",
        data: result
      });
    }
  })
})

favoritesRouter.post('/', (req, res) => {
  const favoriteCity = {
    name: req.body.name
  }
  req.app.locals.db.collection('favorites').insertOne(favoriteCity, (err, result) => {
    if (err) {
      res.status(500).send( {
        result: "error",
        desc: err.toString()
      });
    } else {
      res.status(200).send({result: "success"});
    }
  })
})

favoritesRouter.delete('/', (req, res) => {
  const favoriteCity = {
    name: req.body.name
  }
  req.app.locals.db.collection('favorites').deleteOne(favoriteCity, (err, result) => {
    if (err) {
      res.status(500).send( {
        result: "error",
        desc: err.toString()
      });
    } else {
      res.status(200).send({result: "success"});
    }
  })
})

module.exports = favoritesRouter;
