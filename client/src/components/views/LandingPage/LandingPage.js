import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { API_URL, API_KEY, IMG_BASE_URL } from '../../Config';
import MainMovieImage from './Sections/MainMovieImage';

function LandingPage(props) {
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState('');

  useEffect(() => {
    const url = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
        setMainMovie(res.results[0]);
        console.log(res.results[0]);
      });
  }, []);

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
        <h2>Movies by latest</h2>
        <hr />
        {/* movie grid */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button>Load more</button>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
