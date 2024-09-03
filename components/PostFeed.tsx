"use client";

import { getPosts } from "@/lib/data";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function PostFeed({ subName }: { subName: string }) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts({ pageParam, subName }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      console.log("last page", lastPage);
      console.log("pages", pages);
      if (
        lastPage.length < Number(process.env.MAXIMUM_POSTS_PER_FEED) ||
        lastPage.at(-1)?.id === lastPageParam
      ) {
        return null;
      }

      return lastPage.at(-1)?.id ?? null;
    },
  });

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((page, pageIndex) => {
        return page.map((post, postIndex) => {
          return <div key={pageIndex + postIndex}>{post.id}</div>;
        });
      })}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </>
  );
}
