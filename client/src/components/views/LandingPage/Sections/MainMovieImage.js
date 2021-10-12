import React from 'react';

const MainMovieImage = (props) => {
  console.log(props.title);
  return (
    <div
      style={{
        width: '100%',
        height: '500px',
        background: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7) 85%), url('${props.image}')`,
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          color: 'white',
          position: 'absolute',
          bottom: '2rem',
          marginLeft: '2rem',
        }}
      >
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default MainMovieImage;
