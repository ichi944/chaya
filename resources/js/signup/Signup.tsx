import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface Props {
  name: string;
  email: string;
  password: string;
  showErrorMessage: boolean;
  errorMessage: string;
  isAuthenticated: boolean;
  handleChange: (e: React.FormEvent) => void;
  handleSubmit: (name: string, email: string, password: string) => void;
  handlePressEnter: (e: React.FormEvent, name: string, email: string, password: string) => void;
}
class Siginup extends React.Component<Props> {
  render() {
    const { name, email, password, showErrorMessage, errorMessage, isAuthenticated } = this.props;
    const { handleChange, handleSubmit, handlePressEnter } = this.props;

    if (isAuthenticated) {
      console.log('you are alredy authenticated, redirect to home.');
      return <Redirect to="/app/home" />;
    }
    return (
      <div>
        <Paper className="login-form" elevation={1}>
          <div className="login-inner">
            <h1 className="login-title">SIGN UP</h1>
            <TextField
              label="name"
              placeholder="your name"
              name="name"
              value={name}
              fullWidth
              autoFocus
              onChange={handleChange}
              onKeyPress={e => handlePressEnter(e, name, email, password)}
            />
            <br />
            <TextField
              label="email"
              placeholder="you@example.com"
              name="email"
              value={email}
              fullWidth
              onChange={handleChange}
              onKeyPress={e => handlePressEnter(e, name, email, password)}
            />
            <br />
            <TextField
              label="password"
              placeholder="enter your password"
              type="password"
              name="password"
              value={password}
              fullWidth
              onChange={handleChange}
              onKeyPress={e => handlePressEnter(e, name, email, password)}
            />
            <br />
            <div className="login-buttons">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(name, email, password)}
              >
                Sign Up
              </Button>
            </div>
            <div className="login-links">
              <Link to="login">return to Login</Link>
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

export default Siginup;
