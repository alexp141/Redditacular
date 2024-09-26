"use client";
import { ArrowBigDownIcon, ArrowBigUpIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { voteOnComment } from "@/lib/actions";

export default function CommentVoter({
  initialRating = 0,
  userVoteType = "NONE",
  commentId,
}: {
  initialRating?: number;
  userVoteType?: string;
  commentId: string;
}) {
  const [voteCount, setVoteCount] = useState(initialRating);
  const [currentVoteType, setCurrentVoteType] = useState(userVoteType);
  const { mutate: vote } = useMutation({
    mutationFn: async ({
      commentId,
      voteType,
    }: {
      commentId: string;
      voteType: "UPVOTE" | "DOWNVOTE";
    }) => voteOnComment(commentId, voteType),
    onMutate: ({ voteType }) => {
      setCurrentVoteType((curr) => {
        if (voteType === curr) {
          return "NONE";
        } else {
          return voteType;
        }
      });
      setVoteCount((curr) => {
        if (voteType === currentVoteType) {
          if (voteType === "UPVOTE") {
            return curr - 1;
          } else {
            return curr + 1;
          }
        } else if (currentVoteType === "NONE") {
          if (voteType === "UPVOTE") {
            return curr + 1;
          } else {
            return curr - 1;
          }
        } else {
          if (voteType === "UPVOTE") {
            return curr + 2;
          } else {
            return curr - 2;
          }
        }
      });
    },
    onError: (e, { commentId, voteType }) => {},
  });

  return (
    <div className=" flex items-center gap-1">
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => vote({ commentId, voteType: "UPVOTE" })}
        className="p-0"
      >
        <ArrowBigUpIcon
          className={cn("h-6 w-6 text-slate-700", {
            "text-orange-500 fill-orange-500": currentVoteType === "UPVOTE",
          })}
        />
      </Button>

      <p
        className={cn(
          { "text-orange-500": currentVoteType === "UPVOTE" },
          { "text-[#5b89ff]": currentVoteType === "DOWNVOTE" }
        )}
      >
        {voteCount}
      </p>
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => vote({ commentId, voteType: "DOWNVOTE" })}
        className="p-0"
      >
        <ArrowBigDownIcon
          className={cn("h-6 w-6 text-slate-700", {
            "text-[#5b89ff] fill-[#5b89ff]": currentVoteType === "DOWNVOTE",
          })}
        />
      </Button>
    </div>
  );
}
