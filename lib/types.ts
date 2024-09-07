import { $Enums } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { z } from "zod";

export const CommentSchema = z.object({
  postId: z.string(),
  comment: z.string(),
  replyToId: z.string().optional().nullable(),
});

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
};
