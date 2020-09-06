import React, { useCallback } from 'react';
import { Pagination } from 'react-bootstrap';

type Props = {
  total: number;
  per: number;
  page: number;
  onClick: (page: number) => void;
};

export const Paginate = React.memo((props: Props) => {
  const { total, per, page, onClick } = props;
  const lastPage = (total / per) + (total % per == 0 ? 0 : 1);

  const paginationItems = [];

  const handleClick = useCallback((page) => {
    if(page < 1 || page > lastPage) {
      return;
    }
    onClick(page);
  }, [onClick, lastPage]);
  for(let i = 1; i <= lastPage; i++) {
    paginationItems.push(
      <Pagination.Item key={i} onClick={() => handleClick(i)} active={i === page}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => handleClick(1)} />
      <Pagination.Prev onClick={() => handleClick(page - 1)} />
      {paginationItems}
      <Pagination.Next onClick={() => handleClick(page + 1)} />
      <Pagination.Last onClick={() => handleClick(lastPage)} />
    </Pagination>
  );
});