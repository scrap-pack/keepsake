import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postImages } from '../redux/images';

const propTypes = {
  uploadImage: PropTypes.func.isRequired,
  previewImage: PropTypes.func.isRequired,
};

const Upload = ({ uploadImage, previewImage, currentUser }) => {
  if (!currentUser.authenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div id="upload-container" className="container valign-wrapper">
      <div className="row center-align">
        <h3>Choose Files To Upload</h3>
        <form
          action="#"
          id="login-form"
          name="uploadForm"
          onSubmit={uploadImage}
          onChange={previewImage}
          className=" card grey lighten-4 col s12 m12 l12 "
        >
          <div className="file-field input-field">
            <div className="btn teal">
              <span>Choose Files</span>
              <input type="file" name="uploadInput" accept="image/*" multiple />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Upload one or more files"
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <img
                src=""
                height="200"
                width="200"
                name="imagePreview"
                alt="Image Preview"
              />
            </div>
          </div>

          <div className="row center-align">
            <div className="col s6">
              <button className="btn teal" type="submit">
                UPLOAD <i className="material-icons right">file_upload</i>
              </button>
            </div>
            <div className="col s6">
              <button className="btn teal ">
                <a className="white-text" href="/scrapbook">
                  My Images <i className="material-icons right">exit_to_app</i>
                </a>
              </button>
            </div>
          </div>
          <div className="row"></div>
        </form>
      </div>
    </div>
  );
};

Upload.propTypes = propTypes;

const mapState = ({ currentUser }) => ({ currentUser });

const mapDispatchToProps = (dispatch, ownProps) => ({
  uploadImage: e => {
    e.preventDefault();
    const image = e.target.uploadInput.files[0];
    const formData = new FormData();
    const preview = document.querySelector('img');
    formData.append('imageUpload', image);
    formData.append('imageSrc', preview.src);
    const toastHTML = '<span class="green-text text-accent-3">Image Uploaded!</span>';
    M.toast({ html: toastHTML });
    dispatch(postImages(formData));

    preview.src = '';
  },
  previewImage: async e => {
    e.preventDefault();
    e.persist();
    const preview = document.querySelector('img');
    const fileList = e.target.files[0];
    const reader = new FileReader();

    if (fileList) {
      reader.readAsDataURL(fileList);
    }

    reader.addEventListener(
      'load',
      async () => {
        preview.src = reader.result;
      },
      false
    );
  },
});

const connectToStore = connect(
  mapState,
  mapDispatchToProps
);

const ConnectedUpload = connectToStore(Upload);

export default ConnectedUpload;
