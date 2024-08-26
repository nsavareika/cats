"use client";

import { AUTO_FETCH_PAUSE_PAGE, FETCH_ITEMS_LIMITS } from "@/lib/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import useFetchCats from "../hooks/useFetchCats";
import Cat from "../types/Cat";
import PaginatedFetchResult from "../types/PaginatedFetchResult";
import CatGalleryItem from "./CatGalleryItem";
import CatGalleryItemPlaceholder from "./CatGalleryItemPlaceholder";

type Props = {
  cats: PaginatedFetchResult<Cat>;
};

export default function CatGallery({ cats }: Readonly<Props>) {
  const observerElem = useRef(null);
  const [autoFetchEnabled, setAutoFetchEnabled] = useState(true);

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchCats(cats);

  useEffect(() => {
    const currentElem = observerElem.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && autoFetchEnabled) {
          fetchNextPage();
          setAutoFetchEnabled(data.pages.length + 1 !== AUTO_FETCH_PAUSE_PAGE);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.0,
      }
    );

    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [fetchNextPage, hasNextPage, autoFetchEnabled, data.pages.length]);

  const handleLoadMore = () => {
    setAutoFetchEnabled(true);
  };

  const items = useMemo(
    () => data.pages.flatMap((page) => page.data),
    [data.pages]
  );

  const placeholders = useMemo(
    () =>
      Array.from({ length: FETCH_ITEMS_LIMITS }).map((_, index) => ({
        key: `item_${index}`,
      })),
    []
  );

  if (status === "error") return <div>{error.message}</div>;
  return (
    <div className="px-5">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
        {items.map((item, index) => (
          <CatGalleryItem key={item.id} {...item} order={index} />
        ))}
        {isFetchingNextPage &&
          placeholders.map((item) => (
            <CatGalleryItemPlaceholder key={item.key} />
          ))}
      </div>
      <div ref={observerElem} />
      {!autoFetchEnabled && !isFetchingNextPage && hasNextPage && (
        <div className="text-center mb-5">
          <button
            onClick={handleLoadMore}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
