import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { logger } from 'redux-logger';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import blue from 'material-ui/colors/blue';

import injectTapEventPlugin from 'react-tap-event-plugin';

import rootReducer from './rootReducer';
import appHistory from './services/appHistory';

import InitializerContainer from './InitializerContainer';

injectTapEventPlugin();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, routerMiddleware(appHistory), logger),
);

const theme = createMuiTheme({
  palette: createPalette({
    primary: blue,
  }),
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
