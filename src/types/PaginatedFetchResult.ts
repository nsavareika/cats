type PaginatedFetchResult<T> = {
  data: T[];
  currentPage: number;
  nextPage: number;
};

export default PaginatedFetchResult;
