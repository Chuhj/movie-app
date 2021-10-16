const express = require('express');
const router = express.Router();

const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
  Favorite.find({ movieId: req.body.movieId }, (err, favorites) => {
    // Favorite 모델에서 movieId가 일치하는 데이터를 찾아 그 수를 반환
    if (err) res.status(400).send(err);

    res.json({ success: true, favoriteNumber: favorites.length });
  });
});

router.post('/favorited', (req, res) => {
  Favorite.find(
    { movieId: req.body.movieId, userFrom: req.body.userFrom },
    (err, favorites) => {
      // Favorite 모델에서 movieId와 userFrom 일치하는 데이터를 찾아 있다면 true 없다면 false 반환
      if (err) res.status(400).send(err);

      const favorited = favorites ? false : true;
      res.json({ success: true, favorited });
    }
  );
});

module.exports = router;
