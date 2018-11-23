import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
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
};

const Subheader = (props) => {
  const { children, rightIcon, classes } = props;
  if (rightIcon) {
    return (
      <h3 className={classes.h3}>
        <span>{children}</span><span className={classes.rightIcon}>{rightIcon}</span>
      </h3>
    );
  }
  return <h3 className={classes.h3}><span>{children}</span></h3>;
};

export default withStyles(styles)(Subheader);
