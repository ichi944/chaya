import React, { Component } from 'react';
import {
  AppBar,
  FlatButton,
} from 'material-ui';

class Header extends Component {
  render() {
    const logoutEl = <FlatButton label="logout" />;
    return (
      <div>
        <AppBar
          title="hello laravel"
          iconElementRight={logoutEl}
        />
      </div>
    );
  }
}

export default Header;
