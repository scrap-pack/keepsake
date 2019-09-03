import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postImages } from '../redux/images';

const propTypes = {
  uploadImage: PropTypes.func.isRequired,
  previewImage: PropTypes.func.isRequired,
};

const Upload = ({ uploadImage, previewImage }) => {
  return (
    <form name="uploadForm" onSubmit={uploadImage} onChange={previewImage} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <div>Choose image to upload</div>
        <input type="file" id="imageUpload" name="uploadInput" accept="image/*" multiple />
        <img src="" height="200" name="imagePreview" alt="preview..." />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

Upload.propTypes = propTypes;

const mapDispatchToProps = dispatch => ({
  uploadImage: (e) => {
    e.preventDefault();
    const image = e.target.uploadInput.files[0];
    const formData = new FormData();
    const preview = document.querySelector('img');
    formData.append('imageUpload', image);
    formData.append('imageSrc', preview.src);

    dispatch(postImages(formData));

    preview.src = "";
  },
  previewImage: async (e) => {
    e.preventDefault();
    e.persist();
    const preview = document.querySelector('img');
    const fileList = e.target.files[0];
    const reader = new FileReader();

    if (fileList) {
      reader.readAsDataURL(fileList);
    }

    reader.addEventListener("load", async () => {
      preview.src = reader.result;
    }, false);
  },
});

const connectToStore = connect(null, mapDispatchToProps);

const ConnectedUpload = connectToStore(Upload);

export default ConnectedUpload;
