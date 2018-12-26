import * as React from 'react';
import { connect } from 'react-redux';

import { handleCheckAuthStatus } from './actions';

interface Props {
  checkAuthStatus: () => void;
}
class InitialCheckStatus extends React.Component<Props> {
  componentDidMount() {
    const { checkAuthStatus } = this.props;
    console.log('in InitialCheckStatus: start initial auth check');
    checkAuthStatus();
  }
  render() {
    return <div>initial</div>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    checkAuthStatus() {
      dispatch(handleCheckAuthStatus());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialCheckStatus);
