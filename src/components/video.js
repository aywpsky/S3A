import React from 'react';

const Video = () => (
  <iframe
    title="cats"
    width="560"
    height="315"
    src="//placekitten.com/4000/3000"
    style={{
      maxWidth: '97%',
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto',
      top: '50%',
      transform: 'translateY(-50%)',
    }}
  />
);

export default Video;
