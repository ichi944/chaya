import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
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
});

interface Props {
  imageUrl: string | null;
  label: string;
  classes: {
    wrapper: string;
    label: string;
    image: string;
  };
}
const AvatarPreview = ({ imageUrl, label, classes }: Props) => {
  return (
    <Paper className={classes.wrapper}>
      <span className={classes.label}>{label}</span>
      {imageUrl ? <img src={imageUrl} className={classes.image} alt="avatar" /> : null}
    </Paper>
  );
};

export default withStyles(styles)(AvatarPreview);
