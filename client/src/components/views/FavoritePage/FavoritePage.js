import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { IMG_BASE_URL } from '../../Config';

function FavoritePage() {
  const [favoriteMovies, setfavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        // 자신의 favorite 들을 불러옴
        const userFrom = localStorage.getItem('userId');

        const res = await axios.get(
          `/api/favorite/favorite-movies/${userFrom}`
        );

        if (res.data.success) {
          setfavoriteMovies(res.data.movies);
          setLoading(false);
        } else {
          alert('Failed to fetch favorite movies!');
        }
      } catch (err) {
        alert('Failed to fetch favorite movies!');
        console.log(err);
      }
    };
    fetchFavoriteMovies();
  }, []);

  const handleClickButton = async (movieId) => {
    try {
      const data = { userFrom: localStorage.getItem('userId'), movieId };
      const res = await axios.post('/api/favorite/removeFavorite', data);

      if (res.data.success) {
        setfavoriteMovies(favoriteMovies.filter((m) => m.movieId !== movieId));
      } else {
        alert('Failed to remove favorite!');
      }
    } catch (err) {
      console.log(err);
      alert('Failed to remove favorite!');
    }
  };

  return (
    <>
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>My Favorite Movies</h2>
        <hr />
        {favoriteMovies.length > 0 &&
          favoriteMovies.map((movie) => (
            <div
              key={movie.movieId}
              style={{ marginTop: '1rem', position: 'relative' }}
            >
              <Link to={`/movie/${movie.movieId}`}>
                <img
                  src={`${IMG_BASE_URL}w154${movie.movieImage}`}
                  alt={movie.movieTitle}
                />
              </Link>
              <div
                style={{
                  display: 'inline-block',
                  marginLeft: '1rem',
                }}
              >
                <h3 style={{ float: 'left' }}>{movie.movieTitle}</h3>
                <Button
                  style={{
                    position: 'absolute',
                    right: 0,
                    marginRight: '1rem',
                  }}
                  onClick={() => {
                    handleClickButton(movie.movieId);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}

export default FavoritePage;
