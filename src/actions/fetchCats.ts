import { FETCH_ITEMS_LIMITS } from "@/lib/constants";
import Cat from "../types/Cat";
import PaginatedFetchResult from "../types/PaginatedFetchResult";

export default async function fetchCats({
  pageParam = 1,
}): Promise<PaginatedFetchResult<Cat>> {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?order=ASC&size=med&has_breeds=false&mime_types=jpg&include_breeds=0&include_categories=0&page=${pageParam}&limit=${FETCH_ITEMS_LIMITS}`,
    {
      headers: {
        "x-api-key": process.env.API_KEY!,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return {
    data: await response.json(),
    currentPage: pageParam,
    nextPage: pageParam + 1,
  };
}
