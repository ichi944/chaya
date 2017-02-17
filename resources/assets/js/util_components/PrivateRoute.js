import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      props.isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: '/app/login',
            state: { from: props.location },
          }}
        />
      )
    )}
  />
);

const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
