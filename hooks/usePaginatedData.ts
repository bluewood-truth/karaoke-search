import {useEffect, useMemo, useState} from 'react';

export const usePaginatedData = <T>(data: T[], itemCountPerPage = 10) => {
  const [page, setPage] = useState(1);

  const maxPage = useMemo(
    () => Math.ceil(data.length / itemCountPerPage),
    [data.length, itemCountPerPage]
  );

  const paginatedData = useMemo(
    () => data.slice((page - 1) * itemCountPerPage, page * itemCountPerPage),
    [data, itemCountPerPage, page]
  );

  useEffect(() => {
    setPage(1);
  }, [data]);

  return {page, setPage, maxPage, paginatedData};
};
