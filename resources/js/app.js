import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { logger } from 'redux-logger';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import createRootReducer from './rootReducer';
import appHistory from './services/appHistory';

import InitializerContainer from './InitializerContainer';

const store = createStore(
  createRootReducer(appHistory),
  applyMiddleware(thunkMiddleware, routerMiddleware(appHistory), logger),
);

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <InitializerContainer />
      </Provider>
    </MuiThemeProvider>
  );
};

render(<App />, document.querySelector('#root'));
