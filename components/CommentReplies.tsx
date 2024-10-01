import { getCommentReplies } from "@/lib/data";
import { useInfiniteQuery } from "@tanstack/react-query";
import Comment from "./Comment";

export default function CommentReplies({
  commentId,
  postId,
  userId,
}: {
  commentId: string;
  postId: number;
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
    queryKey: ["comment-replies", commentId],
    queryFn: ({ pageParam }) => getCommentReplies(postId, commentId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (lastPage.length < 4) {
        return null;
      }

      return lastPageParam + 1;
    },
  });

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <div className="flex flex-col gap-4 w-full ml-4 border-l-2 p-2">
        {data.pages.map((page, pageIndex) => {
          return page.map((comment, commentIndex) => {
            console.log("comment reply", typeof comment.createdAt);
            let userVoteType = "NONE";
            const voteRating = comment.commentVotes.reduce((acc, curr) => {
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
              <Comment
                comment={comment}
                postId={postId}
                initialRating={voteRating}
                userVoteType={userVoteType}
                key={comment.id}
              />
            );
          });
        })}
        {hasNextPage && (
          <div className="mx-auto">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="text-blue-800 hover:underline underline-offset-2"
            >
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
