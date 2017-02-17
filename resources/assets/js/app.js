import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import PrivateRoute from './util_components/PrivateRoute';

import rootReducer from './rootReducer';
import HeaderContainer from './application/HeaderContainer';
import LoginContainer from './auth/LoginContainer';

injectTapEventPlugin();

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

class Home extends Component {
  render() {
    return (
      <div>home screen</div>
    );
  }
}

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
            <HeaderContainer />
            <BrowserRouter>
              <div>
                <Link to="/app/home">home</Link>
                <Switch>
                  <Route path="/app/login" component={LoginContainer} />
                  <PrivateRoute path="/app/home" component={Home} />
                  <Route component={NotFound} />
                </Switch>
              </div>
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
