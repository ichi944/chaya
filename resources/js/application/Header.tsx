import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  typography: {
    flex: 1,
  },
};

interface Props {
  isAuthenticated: boolean;
  handleSignOut: (e: React.FormEvent) => void;
}
class Header extends React.Component<Props> {
  render() {
    const { isAuthenticated, handleSignOut } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" style={styles.typography} />
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleSignOut}>
                Logout
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
