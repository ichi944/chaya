import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  typography: {
    flex: 1,
  },
};

class Header extends Component {
  render() {
    const { isAuthenticated, handleSignOut } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" style={styles.typography} />
            {isAuthenticated
              ? <Button color="inherit" onClick={handleSignOut}>Logout</Button>
              : null}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
