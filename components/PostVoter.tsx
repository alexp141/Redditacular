"use client";
import { ArrowBigDownIcon, ArrowBigUpIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import usePostVoter from "@/hooks/usePostVoter";

export default function PostVoter({
  initialRating = 0,
  userVoteType,
  postId,
}: {
  initialRating?: number;
  userVoteType: string;
  postId: number;
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
    <div className=" flex flex-col items-center p-2">
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => vote({ postId, voteType: "UPVOTE" })}
      >
        <ArrowBigUpIcon
          className={cn("h-6 w-6 text-slate-700", {
            "text-sky-400 fill-sky-400": currentVoteType === "UPVOTE",
          })}
        />
      </Button>

      <p>{voteCount}</p>
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => vote({ postId, voteType: "DOWNVOTE" })}
      >
        <ArrowBigDownIcon
          className={cn("h-6 w-6 text-slate-700", {
            "text-rose-700 fill-rose-700": currentVoteType === "DOWNVOTE",
          })}
        />
      </Button>
    </div>
  );
}
