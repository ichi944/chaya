import React from 'react';
import Dropzone from 'react-dropzone';

import { AvatarPreview } from '../molecules/AvatarPreview';

export const AvatarEditor = ({ currentImageUrl, newImageUrl, onDrop }) => {
  const styles = {
    dropzone: {
      width: '200px',
      height: '160px',
      backgroundColor: '#eeeeee',
      border: 'dashed 2px #666666',
      borderRadius: '4px',
    },
  };
  return (
    <div className="avatar-preview_wrapper">
      <div>
        <AvatarPreview label="current" imageUrl={currentImageUrl} />
      </div>
      <div className="avatar-preview_new-image">
        <AvatarPreview label="new" imageUrl={newImageUrl} />
      </div>
      <div className="avatar-preview_dropzone">
        <Dropzone style={styles.dropzone} onDrop={onDrop}>
          <p>Drop the iamge you choose.</p>
        </Dropzone>
      </div>
    </div>
  );
};
