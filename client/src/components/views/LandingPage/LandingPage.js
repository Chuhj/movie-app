import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { API_URL, API_KEY, IMG_BASE_URL } from '../../Config';
import MainMovieImage from './Sections/MainMovieImage';
import GridCard from '../commons/GridCard';
import { Row } from 'antd';

function LandingPage(props) {
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMovies([...movies, ...res.results]);
        page === 1 && setMainMovie(res.results[0]);
      });
  }, [page]);

  const handleClickButton = () => {
    setPage(page + 1);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* main movie */}
      {mainMovie && (
        <MainMovieImage
          image={`${IMG_BASE_URL}w1280${mainMovie.backdrop_path}`}
          title={mainMovie.title}
          description={mainMovie.overview}
        />
      )}

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Movies by popularity</h2>
        <hr />
        {/* movie grid */}
        <Row gutter={[16, 16]}>
          {movies &&
            movies.map((movie) => (
              <GridCard
                key={movie.id}
                image={`${IMG_BASE_URL}w500${movie.poster_path}`}
                movieId={movie.id}
                movieName={movie.original_title}
              />
            ))}
        </Row>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleClickButton}>Load more</button>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
