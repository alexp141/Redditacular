import { JsonValue } from "@prisma/client/runtime/library";
import prisma from "./db";
import { PostInfo } from "./types";

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

export async function getTopLevelComments(postId: number) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      replyToId: null,
    },
    include: {
      author: { select: { username: true, avatar: true } },
      commentVotes: true,
      _count: { select: { comments: true } },
    },
  });

  console.log(comments);
  return comments;
}

export async function getCommentReplies(postId: number, commentId: string) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      replyToId: commentId,
    },
    include: {
      author: { select: { username: true, avatar: true } },
      commentVotes: true,
    },
  });

  console.log(comments);
  return comments;
}
