import { getTopLevelComments } from "@/lib/data";
import Comment from "./Comment";

export default async function CommentSection({
  postId,
  userId,
}: {
  postId: number;
  userId?: string;
}) {
  const topLevelComments = await getTopLevelComments(postId);

  return (
    <div className="bg-muted rounded-md overflow-hidden p-4 space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight my-4">Comments</h1>
      <div className="flex flex-col gap-8">
        {topLevelComments.map((comment) => {
          console.log("top level comment", typeof comment.createdAt);
          let userVoteType;
          const initialRating = comment.commentVotes.reduce((acc, curr) => {
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
              initialRating={initialRating}
              userVoteType={userVoteType}
              key={comment.id}
            />
          );
        })}
      </div>
    </div>
  );
}
