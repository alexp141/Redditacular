"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./db";
import { JSONContent } from "@tiptap/react";
import { UTApi } from "uploadthing/server";
import { z } from "zod";
import { CommentSchema, VoteType } from "./types";

export async function createSubreddit(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const subName = formData.get("subName") as string;

  const data = await prisma.subreddit.create({
    data: { name: subName, ownerId: user.id },
  });

  return redirect(`/r/${subName}`);
}

export async function createPost(
  content: JSONContent | null,
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const title = formData.get("title") as string;
  const imageString = formData.get("image") as string;
  const subName = formData.get("subName") as string;

  if (!content) {
    throw new Error("The content of the post is empty");
  }

  const data = await prisma.post.create({
    data: {
      authorId: user.id,
      title,
      content: content,
      image: imageString,
      subName,
    },
  });

  if (!data.id) {
    throw new Error("Error creating post");
  }

  redirect(`/r/${subName}`);
}

export async function deleteUTFiles(files: string[]) {
  const utapi = new UTApi();

  try {
    await utapi.deleteFiles(files);
  } catch (error) {
    console.error("UTAPI: Error deleting files", error);
  }
}

export async function voteOnPost(
  postId: number,
  voteType: "UPVOTE" | "DOWNVOTE"
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const userVote = await prisma.postVote.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId: postId,
      },
    },
    select: { vote: true },
  });

  if (userVote) {
    if (userVote.vote === voteType) {
      // delete the vote
      const result = await prisma.postVote.delete({
        where: { userId_postId: { postId: postId, userId: user.id } },
      });
    } else {
      // update the vote
      const result = await prisma.postVote.update({
        where: { userId_postId: { postId: postId, userId: user.id } },
        data: { vote: { set: voteType } },
      });
    }
  } else {
    const result = await prisma.postVote.create({
      data: {
        userId: user.id,
        postId,
        vote: voteType as "UPVOTE" | "DOWNVOTE",
      },
    });
  }
}

export async function voteOnComment(
  commentId: string,
  voteType: "UPVOTE" | "DOWNVOTE"
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }
  console.log(commentId, voteType);
  const userVote = await prisma.commentVote.findUnique({
    where: {
      userId_commentId: {
        userId: user.id,
        commentId: commentId,
      },
    },
    select: { vote: true },
  });
  console.log(userVote);
  if (userVote) {
    if (userVote.vote === voteType) {
      // delete the vote
      await prisma.commentVote.delete({
        where: { userId_commentId: { commentId, userId: user.id } },
      });
    } else {
      // update the vote
      console.log("not equal");
      const res = await prisma.commentVote.update({
        where: { userId_commentId: { commentId, userId: user.id } },
        data: { vote: { set: voteType } },
      });
      console.log(res);
    }
  } else {
    await prisma.commentVote.create({
      data: {
        userId: user.id,
        commentId,
        vote: voteType as "UPVOTE" | "DOWNVOTE",
      },
    });
  }
}

export async function createComment(formData: FormData) {
  const res = CommentSchema.safeParse({
    postId: formData.get("postId"),
    comment: formData.get("comment"),
    replyToId: formData.get("replyToId"),
  });

  if (!res.success) {
    return {
      status: "zodError",
      message: res.error.issues
        .map((issue) => {
          return `${issue.code} - ${issue.path}: ${issue.message}`;
        })
        .join("\n"),
    };
  }
  const { comment, postId, replyToId } = res.data;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  await prisma.comment.create({
    data: { postId: Number(postId), text: comment, replyToId, userId: user.id },
  });

  return { status: "success" };
}
