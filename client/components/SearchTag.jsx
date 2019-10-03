import React from 'react';
import PropTypes from 'prop-types';

const SearchTag = (props) => {
  const { clearSearch, selectedTag } = props;
  return (
    <div className="chip">
      {selectedTag.description}
      <a
        onClick={() => {
          clearSearch();
        }}
      >
        <i className="close material-icons">close</i>
      </a>
    </div>

  );
};

const propTypes = {
  clearSearch: PropTypes.func.isRequired,
  selectedTag: PropTypes.object.isRequired,
};

SearchTag.propTypes = propTypes;

export default SearchTag;
