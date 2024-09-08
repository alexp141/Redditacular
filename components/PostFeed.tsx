"use client";

import { getPosts } from "@/lib/data";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostPreview from "./PostPreview";

export default function PostFeed({
  subName,
  userId,
}: {
  subName: string;
  userId?: string;
}) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", subName],
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
      <div className="flex flex-col gap-4 w-full">
        {data.pages.map((page, pageIndex) => {
          return page.map((post, postIndex) => {
            let userVoteType = "NONE";
            const voteRating = post.votes.reduce((acc, curr) => {
              if (curr.userId === userId) {
                userVoteType = curr.vote;
              }

              if (curr.vote === "UPVOTE") {
                return acc + 1;
              } else {
                return acc - 1;
              }
            }, 0);

            return (
              <PostPreview
                key={pageIndex + postIndex}
                post={post}
                voteRating={voteRating}
                userVoteType={userVoteType}
              />
            );
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
      </div>
    </>
  );
}
