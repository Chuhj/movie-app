import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

function FavoriteButton({ userFrom, movieInfo }) {
  const movieId = movieInfo.id;
  const movieTitle = movieInfo.original_title;
  const movieImage = movieInfo.poster_path;
  const movieRuntime = movieInfo.runtime;

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  // 저장할 정보: userFrom(userId), movieId, movieTitle, movieImage, movieRuntime

  useEffect(() => {
    const fetchData = async () => {
      if (movieId) {
        try {
          // favorite 수를 불러옴
          const data = { movieId };
          const res = await axios.post('/api/favorite/favoriteNumber', data);

          if (res.data.success) {
            setFavoriteNumber(res.data.favoriteNumber);
          } else {
            alert('Failed to fetch favorite number!');
          }
        } catch (err) {
          alert('Failed to fetch favorite number!');
          console.log(err);
        }

        try {
          // favorited 여부를 불러옴
          const data = { movieId, userFrom };
          const res = await axios.post('/api/favorite/favorited', data);
          console.log(res.data);
          if (res.data.success) {
            setFavorited(res.data.favorited);
          } else {
            alert('Failed to fetch favorited!');
          }
        } catch (err) {
          alert('Failed to fetch favorited!');
          console.log(err);
        }
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <Button>
      {favorited ? 'Remove from favorites ' : 'Add to favorites '}
      {favoriteNumber}
    </Button>
  );
}

export default FavoriteButton;
