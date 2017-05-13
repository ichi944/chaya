import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { logger } from 'redux-logger';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import rootReducer from './rootReducer';
import appHistory from './services/appHistory';

import InitializerContainer from './InitializerContainer';

injectTapEventPlugin();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    routerMiddleware(appHistory),
    logger,
  ),
);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider
          store={store}
        >
          <InitializerContainer />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

render(
  <App />,
  document.querySelector('#root'),
);
