"use client";

import Avatar from "./Avatar";
import Link from "next/link";
import CommentVoter from "./CommentVoter";
import ReplyButton from "./ReplyButton";
import { Separator } from "./ui/separator";
import CommentCreator from "./CommentCreator";
import { useState } from "react";
import { Button } from "./ui/button";
import CommentReplies from "./CommentReplies";
import { CommentProps } from "@/lib/types";
import { calculateDateDistance } from "@/lib/utils";

export default function Comment({
  comment,
  postId,
  initialRating = 0,
  userVoteType = "NONE",
  userId,
}: {
  comment: CommentProps | Omit<CommentProps, "_count">;
  postId: number;
  initialRating?: number;
  userVoteType?: string;
  userId?: string;
}) {
  const [isReplying, setIsReplying] = useState(false);
  //   console.log(comment.createdAt);
  return (
    <div className="flex flex-col gap-4" key={comment.id}>
      <div className="flex gap-4">
        <Avatar profilePic={comment.author.avatar} />
        <Link
          href={`/`}
          className="hover:underline underline-offset-4"
        >{`u/${comment.author.username}`}</Link>
        <p className="ml-auto text-muted-foreground">
          {calculateDateDistance(comment.createdAt, new Date())}
        </p>
      </div>
      <div className="ml-2">
        <p>{`${comment.text}`}</p>
      </div>
      {/* comment voter */}
      <div className="flex items-center justify-around">
        <CommentVoter
          commentId={comment.id}
          initialRating={initialRating}
          userVoteType={userVoteType}
        />
        {"_count" in comment && comment._count.comments > 0 && (
          <Button
            variant={"ghost"}
            className="hover:underline underline-offset-4"
          >
            View {comment._count.comments} comments
          </Button>
        )}
        <ReplyButton setIsReplying={setIsReplying} />
      </div>
      {isReplying && (
        <CommentCreator
          postId={postId}
          replyToId={comment.replyToId ?? comment.id}
          setIsReplying={setIsReplying}
          commentId={comment.id}
        />
      )}
      {("_count" in comment && comment._count.comments <= 0) ||
      comment.replyToId ? null : (
        <CommentReplies
          commentId={comment.id}
          postId={postId}
          userId={userId}
        />
      )}
    </div>
  );
}
