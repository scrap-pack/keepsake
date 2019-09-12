import React from 'react';

const DeleteImages = () => (
  <div id="delete-images" className="modal">
    <div className="modal-content">
      <h4>Delete Images</h4>
      <p>Are you sure you want to delete the selected images?</p>
    </div>
    <div className="modal-footer">
      <button type="button" className="modal-close waves-effect waves-green btn-flat">Delete</button>
    </div>
  </div>
);

export default DeleteImages;
