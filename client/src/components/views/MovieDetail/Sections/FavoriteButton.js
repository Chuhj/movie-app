import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

function FavoriteButton({ userFrom, movieInfo }) {
  const movieId = movieInfo.id;
  const movieTitle = movieInfo.original_title;
  const movieImage = movieInfo.poster_path;
  const movieRuntime = movieInfo.runtime;

  const [favoriteNumber, setFavoriteNumber] = useState(0);

  // 저장할 정보: userFrom(userId), movieId, movieTitle, movieImage, movieRuntime

  useEffect(async () => {
    if (movieId) {
      try {
        // favorite 수를 불러옴
        const data = { movieId };
        const res = await axios.post('/api/favorite/favoriteNumber', data);
        console.log(res.data);
        if (res.data.success) {
          setFavoriteNumber(res.data.favoriteNumber);
        } else {
          alert('Failed to fetch favorite number!');
        }
      } catch (err) {
        alert('Failed to fetch favorite number!');
        console.log(err);
      }
    }
  }, [movieId]);

  return <Button>Favorite</Button>;
}

export default FavoriteButton;
