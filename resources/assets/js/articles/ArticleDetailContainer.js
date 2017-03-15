import { connect } from 'react-redux';

import ArticleDetail from './ArticleDetail';

const mapStateToProps = ({ article }) => {
  return {
    article,
  }
};

export default connect(mapStateToProps)(ArticleDetail);
