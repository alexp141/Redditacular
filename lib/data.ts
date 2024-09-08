import { JsonValue } from "@prisma/client/runtime/library";
import prisma from "./db";
import { PostInfo } from "./types";

type Post = {
  id: number;
  title: string;
  content: JsonValue;
  image: string | null;
  createdAt: Date;
  authorId: string;
  subName: string;
};

export async function checkIfSubredditExists(subName: string) {
  const subreddit = await prisma.subreddit.findFirst({
    where: { name: subName },
  });

  if (!subreddit) {
    return false;
  }
  return true;
}

export async function getPosts({
  pageParam,
  subName,
}: {
  pageParam: number;
  subName: string;
}) {
  const res = await fetch(`/api/test?subName=${subName}&cursor=${pageParam}`);
  const data: PostInfo[] = await res.json();
  console.log("returned data", data);
  return data;
}

export async function getComments(postId: number) {
  const result = await prisma.comment.findMany({
    include: {
      author: { select: { username: true } },
      commentVotes: true,
      comments: true,
    },
  });
}
