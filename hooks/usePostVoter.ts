"use client";

import { voteOnPost } from "@/lib/actions";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export default function usePostVoter(
  setVoteCount: Dispatch<SetStateAction<number>>,
  setCurrentVoteType: Dispatch<SetStateAction<string>>,
  currentVoteType: string,
  voteCount?: number
) {
  const {
    mutate: vote,
    error: voteError,
    isPending,
    status,
  } = useMutation({
    mutationFn: async ({
      postId,
      voteType,
    }: {
      postId: number;
      voteType: string;
    }) => voteOnPost(postId, voteType),
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
    onError: (e, { postId, voteType }) => {},
  });

  return { vote, voteError, isPending, status };
}
