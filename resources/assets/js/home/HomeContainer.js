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
    handleHello() {
      console.log('hello');
      dispatch(sayHello());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
