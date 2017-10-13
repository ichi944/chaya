import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { logger } from 'redux-logger';

import Echo from 'laravel-echo';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';

import injectTapEventPlugin from 'react-tap-event-plugin';

import rootReducer from './rootReducer';
import appHistory from './services/appHistory';

import InitializerContainer from './InitializerContainer';

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: `${window.location.hostname}:6001`,
});

window.Echo.channel('shared').listen('Hello', () => {
  console.log('got the message "Hello" from someone!');
});

injectTapEventPlugin();

const store = createStore(
  rootReducer,
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
