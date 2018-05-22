// @flow
import React from 'react';
import Dropzone from 'react-dropzone';
import grey from 'material-ui/colors/grey';

import { withStyles } from 'material-ui/styles';

const styles = {
  wrapper: {
    margin: '1rem',
  },
  dropzone: {
    height: '3rem',
    backgroundColor: grey[50],
    color: grey[500],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed #E0E0E0',
  },
};
type Props = {
  handleDrop: Function,
  classes: Object,
};
const DropAttachment = ({ handleDrop, classes }: Props) => {
  return (
    <div className={classes.wrapper}>
      <Dropzone className={classes.dropzone} onDrop={handleDrop}>
        Drop files into here
      </Dropzone>
    </div>
  );
};

export default withStyles(styles)(DropAttachment);
