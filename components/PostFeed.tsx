"use client";

import { getPosts } from "@/lib/data";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostPreview from "./PostPreview";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

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
      if (
        lastPage.length < Number(process.env.MAXIMUM_POSTS_PER_FEED) ||
        lastPage.at(-1)?.id === lastPageParam
      ) {
        return null;
      }

      return lastPage.at(-1)?.id ?? null;
    },
  });

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <div className="flex flex-col gap-4 w-full">
        {data.pages.flatMap((posts) =>
          posts.map((post, postIndex) => {
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
            return postIndex === posts.length - 1 ? (
              <PostPreview
                innerRef={ref}
                key={post.id}
                post={post}
                voteRating={voteRating}
                userVoteType={userVoteType}
              />
            ) : (
              <PostPreview
                key={post.id}
                post={post}
                voteRating={voteRating}
                userVoteType={userVoteType}
              />
            );
          })
        )}

        <div className="flex justify-center items-center">
          {isFetchingNextPage ? <p>loading...</p> : null}
        </div>
      </div>
    </>
  );
}
