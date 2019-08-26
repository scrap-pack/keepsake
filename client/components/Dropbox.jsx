import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

class Dropbox extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.state = {
      files: [],
    };
  }
  onDrop(acceptedFiles) {
    this.setState({
      files: this.state.files.concat(acceptedFiles),
    });
  }
  render() {
    const { files } = this.state;
    const maxSize = 5242880;

    console.log(this.state);
    return (
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br />

          <div
            className="row center"
            style={{
              width: '50%',
              height: '100px',
              border: '2px dashed ',
              borderRadius: '5px',
              background: 'white',
            }}
          >
            <div className="container text-center mt-5">
              <Dropzone
                onDrop={this.onDrop}
                accept="image/*"
                minSize={0}
                maxSize={maxSize}
              >
                {({
                  getRootProps,
                  getInputProps,
                  isDragActive,
                  isDragReject,
                  acceptedFiles,
                  rejectedFiles,
                }) => {
                  const isFileTooLarge =
                    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                  return (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!isDragActive && 'Click here or drop a file to upload!'}
                      {isDragActive &&
                        !isDragReject &&
                        "Drop it like it's hot!"}
                      {isDragReject && 'File type not accepted, sorry!'}
                      {isFileTooLarge && (
                        <div className="text-danger mt-2">
                          File is too large.
                        </div>
                      )}
                      <br />
                      <i className="medium material-icons teal-text text-darken-2">
                        add_a_photo
                      </i>
                    </div>
                  );
                }}
              </Dropzone>
              <ul className="red-text text-accent-4">
                {files.length > 0 &&
                  files.map((acceptedFile, i) => (
                    <li
                      key={i}
                      className="list-group-item list-group-item-success"
                    >
                      {acceptedFile.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <br />
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  dropImage: image => dispatch(addImage(image)),
});

export default connect(
  null,
  mapDispatch
)(Dropbox);
