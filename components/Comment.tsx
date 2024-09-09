"use client";

import { $Enums, Comment as CommentType } from "@prisma/client";
import Avatar from "./Avatar";
import Link from "next/link";
import CommentVoter from "./CommentVoter";
import ReplyButton from "./ReplyButton";
import { Separator } from "./ui/separator";
import CommentCreator from "./CommentCreator";
import { useState } from "react";

type CommentProps = CommentType & {
  _count: {
    comments: number;
  };
  author: {
    username: string;
    avatar: string | null;
  };
  commentVotes: {
    userId: string;
    commentId: string;
    vote: $Enums.VoteType;
  }[];
};

export default function Comment({
  comment,
  postId,
  initialRating = 0,
  userVoteType = "NONE",
}: {
  comment: CommentProps;
  postId: number;
  initialRating?: number;
  userVoteType?: string;
}) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="flex flex-col gap-4" key={comment.id}>
      <div className="flex gap-2">
        <Avatar profilePic={comment.author.avatar} />
        <Link
          href={`/`}
          className="hover:underline underline-offset-4"
        >{`u/${comment.author.username}`}</Link>
        <p>{`${comment.createdAt.toDateString()}`}</p>
      </div>
      <div className="ml-2">
        <p>{`${comment.text}`}</p>
      </div>
      {/* comment voter */}
      <div className="flex items-center justify-between">
        <CommentVoter
          commentId={comment.id}
          initialRating={initialRating}
          userVoteType={userVoteType}
        />
        <ReplyButton setIsReplying={setIsReplying} />
      </div>
      {isReplying && (
        <CommentCreator
          postId={postId}
          replyToId={comment.id}
          setIsReplying={setIsReplying}
        />
      )}
      <Separator />
    </div>
  );
}
