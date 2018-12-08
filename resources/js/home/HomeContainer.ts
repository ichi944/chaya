import { connect } from 'react-redux';

import Home from './Home';
import { sayHello } from './actions';
import { RootState } from '../interfaces/rootState';

const mapStateToProps = ({ profile }: RootState) => {
  return {
    profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleHello(text: string) {
      dispatch(sayHello(text));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
