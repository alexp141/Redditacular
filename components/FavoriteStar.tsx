"use client";
import { handleToolbarFavorites } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import { useState } from "react";

export default function FavoriteStar({
  className,
  isFavorite,
  subredditId,
  subredditName,
}: {
  className?: string;
  isFavorite: boolean;
  subredditId: string;
  subredditName: string;
}) {
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(isFavorite);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({
      isFavorite,
      subredditId,
    }: {
      isFavorite: boolean;
      subredditId: string;
    }) => {
      return handleToolbarFavorites(subredditId, isFavorite);
    },
    onMutate: async () => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["favoriteSubreddits"] });

      // Snapshot the previous value
      const previousfavoritedSubreddits = queryClient.getQueryData([
        "favoriteSubreddits",
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["favoriteSubreddits"],
        (old: Array<{ subredditId: string; name: string }>) => {
          if (isFavorite) {
            return (
              old?.filter((elem) => elem.subredditId !== subredditId) || []
            );
          } else {
            return [...(old || []), { subredditId, name: subredditName }];
          }
        }
      );
      setIsFavoriteLocal((curr) => !curr);

      // Return a context object with the snapshotted value
      return { previousfavoritedSubreddits };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["favoriteSubreddits"],
        context?.previousfavoritedSubreddits
      );
      setIsFavoriteLocal((curr) => !curr);
    },

    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["favoriteSubreddits"] });
    },
  });

  return (
    <StarIcon
      className={cn(
        "text-amber-400",
        className,
        {
          "hover:fill-amber-400  fill-white": !isFavoriteLocal,
        },
        { "hover:fill-white fill-amber-400": isFavoriteLocal }
      )}
      onClick={(e) => {
        e.preventDefault();
        mutate({ isFavorite, subredditId });
      }}
    />
  );
}
