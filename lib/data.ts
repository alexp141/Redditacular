import prisma from "./db";
import { CommentProps, PostInfo } from "./types";

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

  return comments;
}

export async function getCommentReplies(
  postId: number,
  commentId: string,
  page: number
) {
  const res = await fetch(
    `/api/comments/replies/${postId}/${commentId}?pageNumber=${page}`
  );
  const data: Omit<CommentProps, "_count">[] = await res.json();

  return data;
}

export async function getSubredditInfo(subName: string) {
  const info = await prisma.subreddit.findUnique({
    where: { name: subName },
    include: {
      _count: { select: { subscribers: true, posts: true } },
      owner: { select: { username: true } },
    },
  });

  return info;
}

export async function getSubscribedSubreddits(userId: string) {
  const subreddits = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscripton: { select: { subreddit: true } } },
  });

  if (!subreddits) {
    return null;
  }

  return subreddits.subscripton;
}
