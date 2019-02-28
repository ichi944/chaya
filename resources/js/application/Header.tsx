import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { requestSignOut } from '../auth/actions';
import { AuthState } from '../auth/interfaces/auth';
import { compose } from 'redux';

const styles = createStyles({
  typography: {
    flex: 1,
  },
});

interface Props extends WithStyles<typeof styles> {
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
            <Typography variant="h2" color="inherit" style={styles.typography} />
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

const mapStateToProps = ({ auth }: { auth: AuthState }) => {
  return {
    isAuthenticated: auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSignOut() {
      localStorage.removeItem('authToken');
      dispatch(requestSignOut());
    },
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(Header);
