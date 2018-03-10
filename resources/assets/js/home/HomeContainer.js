import { connect } from 'react-redux';

import Home from './Home';
import { sayHello } from './actions';

const mapStateToProps = ({ profile }) => {
  return {
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleHello(text) {
      dispatch(sayHello(text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
