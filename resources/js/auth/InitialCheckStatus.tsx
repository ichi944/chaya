import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import { handleCheckAuthStatus } from './actions';
import { ThunkDispatch } from 'redux-thunk';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RootState } from '../interfaces/rootState';
import { AuthActions } from './interfaces/auth';
import { compose } from 'redux';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      height: '100vh',
      paddingTop: 'calc(50vh - 20px)',
    },
  });
interface Props extends WithStyles<typeof styles> {
  checkAuthStatus: () => void;
}
const InitialCheckStatus: FunctionComponent<Props> = props => {
  useEffect(() => {
    const { checkAuthStatus } = props;
    console.log('@InitialCheckStatus: start initial auth check');
    checkAuthStatus();
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, AuthActions>) => ({
  checkAuthStatus() {
    dispatch(handleCheckAuthStatus());
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(InitialCheckStatus);
