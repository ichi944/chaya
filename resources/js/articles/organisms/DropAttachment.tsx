import * as React from 'react';
import Dropzone from 'react-dropzone';
import grey from '@material-ui/core/colors/grey';

import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
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
});
interface Props {
  handleDrop: (accepted: File[], rejected: File[], event: any) => void;
  classes: {
    wrapper: string;
    dropzone: string;
  },
}
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
