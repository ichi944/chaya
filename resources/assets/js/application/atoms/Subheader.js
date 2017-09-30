import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  h3: {
    boxSizing: 'border-box',
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '48px',
    paddingLeft: '16px',
    width: '100%',
  },
};

const Subheader = (props) => {
  const { children, classes } = props;
  return <h3 className={classes.h3}>{children}</h3>;
};

export default withStyles(styles)(Subheader);
