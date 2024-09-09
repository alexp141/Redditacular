import { getTopLevelComments } from "@/lib/data";
import Avatar from "./Avatar";
import Link from "next/link";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import CommentVoter from "./CommentVoter";

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
            <div className="flex flex-col gap-4" key={comment.id}>
              <div className="flex gap-2">
                <Avatar profilePic={comment.author.avatar} />
                <Link href={`/`}>{`u/${comment.author.username}`}</Link>
                <p>{`${comment.createdAt.toDateString()}`}</p>
              </div>
              <div className="ml-2">
                <p>{`${comment.text}`}</p>
              </div>
              {/* comment voter */}
              <div className="flex">
                <CommentVoter
                  commentId={comment.id}
                  initialRating={initialRating}
                  userVoteType={userVoteType}
                />
              </div>
              <Separator />
            </div>
          );
        })}
      </div>
    </div>
  );
}
