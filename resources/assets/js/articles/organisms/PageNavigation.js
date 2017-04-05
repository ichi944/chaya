// @flow
import React from 'react';

import {
  FlatButton,
} from 'material-ui';

type Props = {
  handleNavigatePage: Function;
  prev_page_url: string;
  next_page_url: string;
  query: string;
}
export const PageNavigation = ({
  handleNavigatePage,
  prev_page_url,
  next_page_url,
  query,
}: Props) => {
  const handleGoPrevPage: Function = prev_page_url ? () => handleNavigatePage(prev_page_url, query): () => {};
  const handleGoNextPage: Function = next_page_url ? () => handleNavigatePage(next_page_url, query): () => {};
  return (
    <div className="article_index-page_navi">
      <FlatButton
        label="prev"
        onTouchTap={handleGoPrevPage}
        disabled={prev_page_url === null}
      />
      <FlatButton
        label="next"
        onTouchTap={handleGoNextPage}
        disabled={next_page_url === null}
      />
    </div>
  );
};
