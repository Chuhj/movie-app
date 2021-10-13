import React from 'react';
import { Descriptions } from 'antd';

function MovieInfo({ movie }) {
  return (
    <Descriptions title="Movie Info" bordered>
      <Descriptions.Item label="Title">
        {movie.original_title}
      </Descriptions.Item>
      <Descriptions.Item label="Release Date">
        {movie.release_date}
      </Descriptions.Item>
      <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="Runtime">{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label="Popularity">
        {movie.popularity}
      </Descriptions.Item>
      <Descriptions.Item label="Revenue">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="Vote Average">
        {movie.vote_average}
      </Descriptions.Item>
      <Descriptions.Item label="Vote Count">
        {movie.vote_count}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default MovieInfo;
