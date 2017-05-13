import React from 'react';
import {
  Paper,
} from 'material-ui';

export const AvatorPreview = ({ imageUrl, label }) => {
  const styles = {
    wrapper: {
      width: '160px',
      height: '160px',
      position: 'relative',
    },
    label: {
      position: 'absolute',
      top: '0.3rem',
      left: '0.3rem',
      opacity: 0.7,
    },
    image: {
      width: '100%',
    },
  };
  return (
    <Paper
      style={styles.wrapper}
    >
      <span style={styles.label}>{label}</span>
      { imageUrl ? (
        <img src={imageUrl} style={styles.image} alt="avator" />
      ) : null }
    </Paper>
  );
};
