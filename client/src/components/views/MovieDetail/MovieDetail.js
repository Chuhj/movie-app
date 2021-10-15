import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Button } from 'antd';

import { API_KEY, API_URL, IMG_BASE_URL } from '../../Config';
import MainMovieImage from '../commons/MainMovieImage';
import MovieInfo from './Sections/MovieInfo';
import FavoriteButton from './Sections/FavoriteButton';
import GridCard from '../commons/GridCard';

function MovieDetail({ match }) {
  const [movie, setMovie] = useState({});
  const [casts, setCasts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [movieLoading, setMovieLoading] = useState(true);
  const [castsLoading, setCastsLoading] = useState(true);

  useEffect(() => {
    const movieUrl = `${API_URL}movie/${match.params.movieId}?language=ko-KR&api_key=${API_KEY}`;
    const creditsUrl = `${API_URL}movie/${match.params.movieId}/credits?api_key=${API_KEY}`;

    fetch(movieUrl)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
        setMovieLoading(false);
      });

    fetch(creditsUrl)
      .then((res) => res.json())
      .then((res) => {
        setCasts(res.cast);
        setCastsLoading(false);
      });
  }, [match]);

  const handleClickButton = () => {
    setToggle(!toggle);
  };

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
        {movieLoading && <div>Loading...</div>}
        {movie && (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <FavoriteButton
                userFrom={localStorage.getItem('userId')}
                movieInfo={movie}
              />
            </div>
            <MovieInfo movie={movie} />
          </>
        )}

        {/* Movie Casts */}
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}
        >
          <Button onClick={handleClickButton}>Toggle</Button>
        </div>
        {toggle && castsLoading && <div>Loading...</div>}
        {toggle && (
          <Row gutter={[16, 16]}>
            {casts &&
              casts.map((cast) => (
                <GridCard
                  key={cast.id}
                  image={`${IMG_BASE_URL}w500${cast.profile_path}`}
                  castName={cast.name}
                  castCharacter={cast.character}
                />
              ))}
          </Row>
        )}
      </div>
    </>
  );
}

export default withRouter(MovieDetail);
