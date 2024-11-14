"use client";

import { getPosts } from "@/lib/data";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostPreview from "./PostPreview";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import SkeletonFeed from "./SkeletonFeed";
import { useSearchParams } from "next/navigation";

export default function PostFeed({
  subName,
  userId,
}: {
  subName: string;
  userId?: string;
}) {
  const searchParams = useSearchParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", subName, searchParams.toString()],
    queryFn: ({ pageParam }) => getPosts({ pageParam, subName, searchParams }),
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
    <SkeletonFeed />
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <div className="flex flex-col gap-4 w-full">
        {data.pages.flatMap((posts) =>
          posts
            .sort((post1, post2) => {
              if (searchParams.get("type"))
                //if the user is searching by "top"
                return post2.voteRating - post1.voteRating;
              else return 0;
            })
            .map((post, postIndex) => {
              let userVoteType = "NONE";
              post.votes.forEach((curr) => {
                if (curr.userId === userId) {
                  userVoteType = curr.vote;
                }
              });
              return postIndex === posts.length - 1 ? (
                <PostPreview
                  innerRef={ref}
                  key={post.id}
                  post={post}
                  voteRating={post.voteRating}
                  userVoteType={userVoteType}
                />
              ) : (
                <PostPreview
                  key={post.id}
                  post={post}
                  voteRating={post.voteRating}
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
