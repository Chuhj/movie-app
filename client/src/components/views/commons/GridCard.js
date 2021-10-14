import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'antd';

function GridCard({
  image,
  movieId,
  movieName,
  castName,
  castCharacter,
  landingPage,
}) {
  if (landingPage) {
    return (
      <Col lg={6} md={12} xs={24}>
        <Link to={`/movie/${movieId}`}>
          <img
            src={image}
            style={{ width: '100%', height: '400px' }}
            alt={movieName}
          />
        </Link>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={12} xs={24}>
        <img
          src={image}
          style={{ width: '100%', height: '400px' }}
          alt={castName}
        />
        <label>{castCharacter} 역</label>
      </Col>
    );
  }
}

export default GridCard;
