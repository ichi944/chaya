import React from 'react';

import {
  FlatButton,
} from 'material-ui';

export const PageNavigation = (props) => {
  const {
    handlePrevPage,
    prev_page_url,
    handleNextPage,
    next_page_url,
    query,
  } = props;
  return (
    <div className="article_index-page_navi">
      <FlatButton
        label="prev"
        onTouchTap={e => handlePrevPage(e, prev_page_url, query)}
        disabled={prev_page_url === null}
      />
      <FlatButton
        label="next"
        onTouchTap={e => handleNextPage(e, next_page_url, query)}
        disabled={next_page_url === null}
      />
    </div>
  );
};
