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
type SubscribedSubredditsResponse =
  | ({
      subreddit: {
        name: string;
      };
    } & {
      userId: string;
      subredditId: string;
    })[]
  | null;

export async function getSubscribedSubreddits(userId?: string) {
  const res = await fetch(
    `/api/subreddits/getSubscribedSubreddits?userId=${userId ?? ""}`,
    { next: { tags: ["subscribedSubreddits"] } }
  );
  const subscribedSubreddits: SubscribedSubredditsResponse = await res.json();

  return subscribedSubreddits;
}

export async function getFavoriteSubreddits(userId?: string) {
  const res = await fetch(
    `/api/subreddits/getFavoriteSubreddits?userId=${userId ?? ""}`,
    {
      next: {
        tags: ["favoriteSubreddits"],
      },
    }
  );
  const favoriteSubreddits: {
    subredditId: string;
    name: string;
  }[] = await res.json();
  return favoriteSubreddits;
}
