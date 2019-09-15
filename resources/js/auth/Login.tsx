import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { LoginState } from './interfaces/login';
import { AuthState } from './interfaces/auth';
import { updateLoginForm, authenticate } from './actions';
import { RootState } from '../interfaces/rootState';

const styles = (theme: Theme) =>
  createStyles({
    base: {
      maxWidth: '400px',
      margin: '80px auto',
      padding: '1rem',
    },
    inner: {
      width: '256px',
      margin: '1rem auto',
    },
    title: {
      fontSize: '2rem',
      lineHeight: '4rem',
      margin: 0,
      padding: '1rem',
      textAlign: 'center',
      fontWeight: 'normal',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '1rem 0',
    },
    links: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '1rem',
    },
    errorMessages: {
      color: '#F44336',
    },
  });

type Props = WithStyles<typeof styles>;

const Login: React.FC<Props> = props => {
  const { email, password, showErrorMessage, errorMessage } = useSelector<RootState, LoginState>(
    state => state.login,
  );
  const { isAuthenticated } = useSelector<RootState, AuthState>(state => state.auth);
  const dispatch = useDispatch();
  const { classes } = props;

  if (isAuthenticated) {
    console.log('you are alredy authenticated, redirect to home.');
    return <Redirect to="/app/home" />;
  }
  return (
    <Paper className={classes.base}>
      <div className={classes.inner}>
        <h1 className={classes.title}>WELCOME</h1>
        <TextField
          id="email"
          label="email"
          placeholder="you@example.com"
          name="email"
          value={email}
          fullWidth
          autoFocus
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateLoginForm(e))}
          onKeyPress={e => e.key === 'Enter' && dispatch(authenticate(email, password))}
        />
        <br />
        <TextField
          id="password"
          label="password"
          placeholder="enter your password"
          type="password"
          name="password"
          value={password}
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(updateLoginForm(e))}
          onKeyPress={e => e.key === 'Enter' && dispatch(authenticate(email, password))}
        />
        <br />
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" onClick={() => authenticate(email, password)}>
            Login
          </Button>
        </div>
        <div className={classes.links}>
          <Link to="signup">Sign up</Link>
        </div>
        <div className={classes.errorMessages}>
          {showErrorMessage ? <p>{errorMessage}</p> : <p>&nbsp;</p>}
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(Login);
