import React from 'react';

const FloatingUploadButton = props => {
  return (
    <div className="fixed-action-btn vertical click-to-toggle">
      <a className="btn-floating btn-large red lighten-1">
        <i className="large material-icons">add</i>
      </a>
      <ul>
        <li>
          <a href="/upload" className="btn-floating teal lighten-2">
            <i className="material-icons" title="Upload Image">
              publish
            </i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FloatingUploadButton;
