import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LoginState } from './interfaces/login';
import { AuthState } from './interfaces/auth';
import { updateLoginForm, authenticate } from './actions';
import { RootState } from '../interfaces/rootState';

const Login: React.SFC = () => {
  const { email, password, showErrorMessage, errorMessage }: LoginState = useSelector<
    RootState,
    LoginState
  >(state => state.login);
  const { isAuthenticated } = useSelector<RootState, AuthState>(state => state.auth);
  const dispatch = useDispatch();

  if (isAuthenticated) {
    console.log('you are alredy authenticated, redirect to home.');
    return <Redirect to="/app/home" />;
  }
  return (
    <div>
      <Paper className="login-form">
        <div className="login-inner">
          <h1 className="login-title">WELCOME</h1>
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
          <div className="login-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={() => authenticate(email, password)}
            >
              Login
            </Button>
          </div>
          <div className="login-links">
            <Link to="signup">Sign up</Link>
          </div>
          <div className="login-error_message">
            {showErrorMessage ? <p>{errorMessage}</p> : <p>&nbsp;</p>}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
