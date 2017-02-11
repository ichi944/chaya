import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import rootReducer from './rootReducer';
import Header from './application/Header';
import LoginContainer from './auth/LoginContainer';

injectTapEventPlugin();

const store = createStore(rootReducer);

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
        <Provider
          store={store}
        >
          <div>
            <Header />
            <BrowserRouter>
              <Switch>
                <Route path="/app/login" component={LoginContainer} />
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

render(
  <App />,
  document.querySelector('#root'),
);
