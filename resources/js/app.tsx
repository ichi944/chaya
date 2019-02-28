import * as React from 'react';
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

import AppRouter from './appRouter';

let middlewares = [thunkMiddleware, routerMiddleware(appHistory)];
if (process.env.NODE_ENV === 'development') {
  middlewares = [...middlewares, logger];
}
const store = createStore(createRootReducer(appHistory), applyMiddleware(...middlewares));

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});

const App: React.FunctionComponent = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </MuiThemeProvider>
  );
};

render(<App />, document.querySelector('#root'));
