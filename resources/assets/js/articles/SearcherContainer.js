// @flow
import { connect } from 'react-redux';

import Searcher from './Searcher';

import { updateSearchQuery, requestSearch } from './actions';

const mapStateToProps = ({ searcher }) => {
  return {
    ...searcher,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    handleChange(e) {
      dispatch(updateSearchQuery(e.target.value));
    },
    handleSubmit(query) {
      dispatch(requestSearch(query));
    },
    handlePressEnter(e) {
      if (e.key === 'Enter') {
        dispatch(requestSearch(e.target.value));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searcher);
