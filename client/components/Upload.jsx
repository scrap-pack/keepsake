import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as mobilenet from '@tensorflow-models/mobilenet';
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
    const fileList = e.target.uploadInput.files[0];
    
    // tbd pending AWS S3 bucket
    // dispatch(postImages());
  },
  previewImage: async (e) => {
    e.preventDefault();
    e.persist();
    const preview = document.querySelector('img');
    const fileList = e.target.files[0];
    console.log('FILE HEREEEEE', fileList);
    const reader = new FileReader();

    if (fileList) {
      reader.readAsDataURL(fileList);
    }

    reader.addEventListener("load", async () => {
      preview.src = reader.result;
      const objectDetector = await cocoSsd.load();
      const predictedObject = await objectDetector.detect(preview);
  
      console.log(predictedObject);
  
    }, false);
  },
});

const connectToStore = connect(null, mapDispatchToProps);

const connectedUpload = connectToStore(Upload);

export default connectedUpload;
