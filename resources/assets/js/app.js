import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from './application/Header';
import Login from './auth/Login';

injectTapEventPlugin();

class NotFound extends Component {
  render() {
    return (
      <div>404 not found</div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <BrowserRouter>
            <Switch>
              <Route path="/app/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

render(
  <App />,
  document.querySelector('#root'),
);
