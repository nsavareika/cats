"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import fetchCats from "../actions/fetchCats";
import Cat from "../types/Cat";
import PaginatedFetchResult from "../types/PaginatedFetchResult";

export default function useFetchCats(initialData: PaginatedFetchResult<Cat>) {
  return useInfiniteQuery({
    queryKey: ["cats"],
    queryFn: fetchCats,
    initialData: { pages: [initialData], pageParams: [1] },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 100000
  });
}
