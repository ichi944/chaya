import React from 'react';
import {
  Paper,
} from 'material-ui';
import Dropzone from 'react-dropzone';

import { AvatorPreview } from '../molecules/AvatorPreview';

export const AvatorEditor = ({imageUrl, onDrop}) => {
  const styles = {
    dropzone: {
      width: '200px',
      height: '160px',
      backgroundColor: '#eeeeee',
      border: 'dashed 2px #666666',
      borderRadius: '4px',
    }
  }
  return (
    <div className="avator-preview_wrapper">
      <div>
        <AvatorPreview
          imageUrl={imageUrl}
        />
      </div>
      <div className="avator-preview_dropzone">
        <Dropzone
          style={styles.dropzone}
          onDrop={onDrop}
        >
          <p>Drop the iamge you choose.</p>
        </Dropzone>
      </div>
    </div>
  );
}
