import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  render() {
    console.log('render start at Login component');
    console.log(this.props);
    const {
      email,
      password,
      authErrorMessage,
    } = this.props;
    const {
      handleChange,
      handleAuthenticate,
    } = this.props;

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
            />
            <br />
            <TextField
              floatingLabelText="password"
              hintText="enter your password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
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
              <p>{authErrorMessage}</p>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Login;
