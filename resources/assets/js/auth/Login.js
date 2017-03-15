import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  render() {
    const {
      email,
      password,
      showErrorMessage,
      errorMessage,
      isAuthenticated,
    } = this.props;
    const {
      handleChange,
      handleAuthenticate,
      handlePressEnter,
    } = this.props;

    if (isAuthenticated) {
      console.log('you are alredy authenticated, redirect to home.');
      return (
        <Redirect to="/app/home" />
      );
    }
    return (
      <div>
        <Paper className="login-form" zDepth={1}>
          <div className="login-inner">
            <h1 className="login-title">WELCOME</h1>
            <TextField
              floatingLabelText="email"
              hintText="you@example.com"
              name="email"
              value={email}
              onChange={handleChange}
              onKeyPress={e => handlePressEnter(e, email, password)}
            />
            <br />
            <TextField
              floatingLabelText="password"
              hintText="enter your password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              onKeyPress={e => handlePressEnter(e, email, password)}
            />
            <br />
            <div className="login-buttons">
              <RaisedButton
                primary
                label="Login"
                onClick={() => handleAuthenticate(email, password)}
              />
            </div>
            <div className="login-error_message">
              { showErrorMessage ? (
                <p>{errorMessage}</p>
                ) : (
                  <p>&nbsp;</p>
                )
              }
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Login;
