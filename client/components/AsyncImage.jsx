import React from 'react';
import PropTypes from 'prop-types';

class AsyncImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  onImageLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { image } = this.props;
    const { loaded } = this.state;
    return (
      <div>
        {image.id ? (
          <div className="card-image">
            <img
              className={
                loaded
                  ? 'responsive-img image'
                  : 'responsive-img image image-loading-placeholder'
              }
              src={loaded ? image.imageUrl : '/placeholder.png'}
              onLoad={this.onImageLoad}
              alt=""
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const propTypes = {
  image: PropTypes.object.isRequired,
};

AsyncImage.propTypes = propTypes;

export default AsyncImage;
