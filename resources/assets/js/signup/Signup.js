import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Siginup extends Component {
  render() {
    const {
      name,
      email,
      password,
      showErrorMessage,
      errorMessage,
      isAuthenticated,
    } = this.props;
    const {
      handleChange,
      handleSubmit,
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
            <h1 className="login-title">SIGN UP</h1>
            <TextField
              floatingLabelText="name"
              hintText="your name"
              name="name"
              value={name}
              onChange={handleChange}
              onKeyPress={e => handlePressEnter(e, name, email, password)}
            />
            <br />
            <TextField
              floatingLabelText="email"
              hintText="you@example.com"
              name="email"
              value={email}
              onChange={handleChange}
              onKeyPress={e => handlePressEnter(e, name, email, password)}
            />
            <br />
            <TextField
              floatingLabelText="password"
              hintText="enter your password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              onKeyPress={e => handlePressEnter(e, name, email, password)}
            />
            <br />
            <div className="login-buttons">
              <RaisedButton
                primary
                label="Sign Up"
                onClick={() => handleSubmit(name, email, password)}
              />
            </div>
            <div className="login-links">
              <Link to="login">return to Login</Link>
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

export default Siginup;
