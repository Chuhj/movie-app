import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Descriptions } from 'antd';

import { API_KEY, API_URL, IMG_BASE_URL } from '../../Config';
import MainMovieImage from '../commons/MainMovieImage';
import MovieInfo from './Sections/MovieInfo';
import GridCard from '../commons/GridCard';

function MovieDetail({ match }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const movieUrl = `${API_URL}movie/${match.params.movieId}?api_key=${API_KEY}`;

    fetch(movieUrl)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMovie(res);
      });
  }, []);

  return (
    <>
      {movie.backdrop_path && (
        <MainMovieImage
          image={`${IMG_BASE_URL}w1280${movie.backdrop_path}`}
          title={movie.title}
          description={movie.overview}
        />
      )}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        {/* Movie Info */}
        {movie && <MovieInfo movie={movie} />}
      </div>
    </>
  );
}

export default withRouter(MovieDetail);
