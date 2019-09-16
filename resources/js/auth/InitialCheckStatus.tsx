import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { handleCheckAuthStatus } from './actions';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      height: '100vh',
      paddingTop: 'calc(50vh - 20px)',
    },
  });
type Props = WithStyles<typeof styles>;

const InitialCheckStatus: FunctionComponent<Props> = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('@InitialCheckStatus: start initial auth check');
    dispatch(handleCheckAuthStatus());
  }, []);
  const { classes } = props;
  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(InitialCheckStatus);
