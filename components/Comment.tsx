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
    <div className="grid grid-cols-[auto_1fr] gap-x-4" key={comment.id}>
      <Avatar profilePic={comment.author.avatar} className="" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between gap-4">
          <p className="">{`u/${comment.author.username}`}</p>
          <p className="ml-auto text-muted-foreground">
            {calculateDateDistance(comment.createdAt, new Date())}
          </p>
        </div>
        <div className="my-2">
          <p>{`${comment.text}`}</p>
        </div>
        {/* comment voter */}
        <div className="flex items-center gap-4">
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
              {comment._count.comments === 1 ? (
                <p>{comment._count.comments} Commment</p>
              ) : (
                <p>{comment._count.comments} Commments</p>
              )}
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
      </div>
      <div className="col-span-2">
        {("_count" in comment && comment._count.comments <= 0) ||
        comment.replyToId ? null : (
          <CommentReplies
            commentId={comment.id}
            postId={postId}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}
