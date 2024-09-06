import { $Enums } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

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
