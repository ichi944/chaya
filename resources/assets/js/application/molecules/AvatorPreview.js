import React from 'react';
import {
  Paper,
} from 'material-ui';

export const AvatorPreview = ({imageUrl}) => {
  const styles = {
    wrapper: {
      width: '160px',
      height: '160px',
    },
    image: {
      width: '100%',
    }
  };
  return (
    <Paper
      style={styles.wrapper}
    >
      <img src={imageUrl} style={styles.image} />
    </Paper>
  );
}
