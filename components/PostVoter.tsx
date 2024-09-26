"use client";
import { ArrowBigDownIcon, ArrowBigUpIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import usePostVoter from "@/hooks/usePostVoter";

type Variant = "horizontal" | "vertical";

export default function PostVoter({
  initialRating = 0,
  userVoteType = "NONE",
  postId,
  variant = "horizontal",
}: {
  initialRating?: number;
  userVoteType?: string;
  postId: number;
  variant?: Variant;
}) {
  const [voteCount, setVoteCount] = useState(initialRating);
  const [currentVoteType, setCurrentVoteType] = useState(userVoteType);
  const { vote, voteError, status, isPending } = usePostVoter(
    setVoteCount,
    setCurrentVoteType,
    currentVoteType,
    voteCount
  );
  return (
    <div
      className={cn("flex items-center p-2", {
        "flex-col": variant === "vertical",
      })}
    >
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => vote({ postId, voteType: "UPVOTE" })}
        className="hover:bg-orange-300"
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
        onClick={() => vote({ postId, voteType: "DOWNVOTE" })}
        className="hover:bg-[#5b89ff]"
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
