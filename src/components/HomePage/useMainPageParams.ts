import { useMemo } from 'react';
import { useLocation } from 'react-router';

export const useHomePageParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  let currentPage = 1;
  const parsePageNum = Number(searchParams.get('page'));

  if (Number.isNaN(parsePageNum) || parsePageNum <= 0) {
    currentPage = 1;
  } else {
    currentPage = parsePageNum;
  }

  return useMemo(
    () => ({
      currentPage,
    }),
    [currentPage]
  );
};
