import React, { Component } from 'react';
import { AppBar, FlatButton } from 'material-ui';

class Header extends Component {
  render() {
    const { isAuthenticated, handleSignOut } = this.props;
    console.log('in Header');
    console.log(this.props);

    const logoutEl = isAuthenticated ? <FlatButton label="logout" /> : null;
    return (
      <div>
        <AppBar
          title=""
          showMenuIconButton={false}
          iconElementRight={logoutEl}
          onRightIconButtonTouchTap={handleSignOut}
        />
      </div>
    );
  }
}

export default Header;
