import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'antd';

function GridCard(props) {
  const { image, movieId, movieName } = props;
  return (
    <Col lg={6} md={12} xs={24}>
      <Link to={`/movie/${movieId}`}>
        <img src={image} style={{ width: '100%', height: '350px' }}></img>
      </Link>
    </Col>
  );
}

export default GridCard;
