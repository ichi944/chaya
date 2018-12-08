import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
  h3: {
    boxSizing: 'border-box',
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '48px',
    paddingLeft: '16px',
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    verticalAlign: 'baseline',
  },
  rightIcon: {
    paddingTop: '0.25rem',
    paddingRight: '1rem',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.6,
    },
  },
});

interface Props {
  title: string;
  rightIcon: any | null;
  classes: {
    h3: string;
    rightIcon: string;
  };
}
const Subheader = (props: Props) => {
  const { title, rightIcon, classes } = props;
  if (rightIcon) {
    return (
      <h3 className={classes.h3}>
        <span>{title}</span>
        <span className={classes.rightIcon}>{rightIcon}</span>
      </h3>
    );
  }
  return (
    <h3 className={classes.h3}>
      <span>{title}</span>
    </h3>
  );
};

export default withStyles(styles)(Subheader);
