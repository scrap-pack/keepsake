import React from 'react';
import { connect } from 'react-redux';

const Scrapbook = props => {
  const { allImages } = props.images;
  console.log('scrapbook images', allImages);

  return (
    <div>
      Images will be stored here
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {allImages.map(elem => {
          return (
            <div key={elem.id}>
              <img src={elem.imageUrl} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapState = ({ images }) => ({ images });

export default connect(mapState)(Scrapbook);
