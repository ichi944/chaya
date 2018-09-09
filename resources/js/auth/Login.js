import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {
  render() {
    const {
      email, password, showErrorMessage, errorMessage, isAuthenticated,
    } = this.props;
    const { handleChange, handleAuthenticate, handlePressEnter } = this.props;

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
              onChange={handleChange}
              onKeyPress={e => handlePressEnter(e, email, password)}
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
              onChange={handleChange}
              onKeyPress={e => handlePressEnter(e, email, password)}
            />
            <br />
            <div className="login-buttons">
              <Button
                variant="raised"
                color="primary"
                onClick={() => handleAuthenticate(email, password)}
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
  }
}

export default Login;