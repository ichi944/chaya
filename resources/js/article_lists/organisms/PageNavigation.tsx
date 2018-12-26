import * as React from 'react';

import Button from '@material-ui/core/Button';

interface Props {
  handleNavigatePage: (page_url, query) => void;
  prev_page_url: string | null;
  next_page_url: string | null;
  query?: string | null;
}
export const PageNavigation = ({
  handleNavigatePage,
  prev_page_url,
  next_page_url,
  query = null,
}: Props) => {
  const handleGoPrevPage = prev_page_url
    ? () => handleNavigatePage(prev_page_url, query)
    : () => null;
  const handleGoNextPage = next_page_url
    ? () => handleNavigatePage(next_page_url, query)
    : () => null;
  return (
    <div className="article_index-page_navi">
      <Button onClick={handleGoPrevPage} disabled={prev_page_url === null}>
        prev
      </Button>
      <Button onClick={handleGoNextPage} disabled={next_page_url === null}>
        next
      </Button>
    </div>
  );
};
