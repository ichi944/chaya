import React, { Component } from 'react';
import { render } from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from './application/Header';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
        </div>
      </MuiThemeProvider>
    );
  }
}

render(
  <App />,
  document.querySelector('#root'),
);
