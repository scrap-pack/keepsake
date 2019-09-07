import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  searchTags,
  clearFilteredTags,
  clearSelectedTag,
  setSelectedTag,
} from '../redux/tags';
import { searchImagesByTag, clearFilteredImages } from '../redux/images';
import Tag from './SearchTag.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { searchMatchingTags } = this.props;
    this.setState({ value: event.target.value });
    searchMatchingTags(event.target.value);
  }

  clearInput() {
    this.handleChange({ target: { value: '' } });
  }

  render() {
    const { value } = this.state;
    const { filteredTags, selectTag, clearSearch, selectedTag } = this.props;
    const styles = {
      border: 'none',
      borderBottom: 'none',
      backgroundColor: 'transparent',
    };

    return (
      <div className="row col s12">
        <form>
          <ul className="collection with-header" style={styles}>
            <div className="row col s12">
              {selectedTag.id ? (
                <div>
                  <p>Showing images tagged with:</p>
                  <Tag selectedTag={selectedTag} clearSearch={clearSearch} />
                </div>
              ) : (
                <li className="collection-header" style={styles}>
                  <div className="input-field col s5">
                    <input
                      style={styles}
                      className="input-field"
                      onChange={this.handleChange}
                      placeholder="Search..."
                      value={value}
                    />
                  </div>
                  <div className="input-field col s1">
                    {value !== '' ? (
                      <button
                        type="button"
                        className="secondary-content"
                        onClick={() => {
                          this.clearInput();
                          clearSearch();
                        }}
                        style={styles}
                      >
                        <i className="material-icons">clear</i>
                      </button>
                    ) : null}
                  </div>
                </li>
              )}
            </div>
            <div className="row col s3">
              {filteredTags.length
                ? filteredTags.map(tag => {
                    return (
                      <li
                        className="collection-item"
                        key={tag.id}
                        value={tag.description}
                        style={styles}
                      >
                        <span className="title">{tag.description}</span>
                        <button
                          type="submit"
                          style={styles}
                          className="secondary-content"
                          onClick={event => {
                            event.preventDefault();
                            selectTag(tag);
                            this.clearInput();
                          }}
                        >
                          <i className="material-icons">arrow_forward</i>
                        </button>
                      </li>
                    );
                  })
                : null}
            </div>
          </ul>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filteredTags: state.tags.filteredTags,
  selectedTag: state.tags.selectedTag,
});

const mapDispatchToProps = dispatch => ({
  searchMatchingTags: value => dispatch(searchTags(value)),
  clearSearch: () => {
    dispatch(clearFilteredTags());
    dispatch(clearSelectedTag());
    dispatch(clearFilteredImages());
  },
  selectTag: tag => {
    dispatch(setSelectedTag(tag));
    dispatch(searchImagesByTag(tag.description));
  },
});

const connectedSearch = connect(
  mapStateToProps,
  mapDispatchToProps
);

const propTypes = {
  searchMatchingTags: PropTypes.func.isRequired,
  filteredTags: PropTypes.array.isRequired,
  clearSearch: PropTypes.func.isRequired,
  selectTag: PropTypes.func.isRequired,
  selectedTag: PropTypes.object.isRequired,
};

Search.propTypes = propTypes;

const ConnectedSearch = connectedSearch(Search);

export default ConnectedSearch;
