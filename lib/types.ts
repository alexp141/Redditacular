import { $Enums, Comment } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { z } from "zod";

export const CommentSchema = z.object({
  postId: z.string(),
  comment: z.string(),
  replyToId: z.string().optional().nullable(),
  pathname: z.string(),
});

export const CreateSubredditSchema = z.object({
  description: z.string().min(1),
  subName: z.string().min(2).max(24),
});

export type CommentProps = Comment & {
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

export type VoteType = "UPVOTE" | "DOWNVOTE" | "NONE";
// export type CommentSchema = z.infer<typeof CommentSchema>;

export type PostInfo = {
  author: {
    username: string;
  };
  votes: {
    vote: $Enums.VoteType;
    userId: string;
  }[];
  _count: {
    comments: number;
  };
} & {
  id: number;
  title: string;
  content: JsonValue;
  image: string | null;
  createdAt: Date;
  authorId: string;
  subName: string;
} & {
  voteRating: number;
};

export const profileFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(24, {
      message: "Username must not be longer than 24 characters.",
    }),
  bio: z.string().optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

// get types
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
