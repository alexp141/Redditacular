"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./db";
import { JSONContent } from "@tiptap/react";
import { UTApi } from "uploadthing/server";
import { z } from "zod";
import {
  CommentSchema,
  CreateSubredditSchema,
  profileFormSchema,
  ProfileFormValues,
  VoteType,
} from "./types";
import { revalidatePath, revalidateTag } from "next/cache";
import { Prisma } from "@prisma/client";

export async function createSubreddit(formData: FormData) {
  const res = CreateSubredditSchema.safeParse({
    subName: formData.get("subName"),
    description: formData.get("description"),
  });

  if (!res.success) {
    throw new Error(res.error.message);
  }

  const { subName, description } = res.data;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  try {
    await prisma.subreddit.create({
      data: { name: subName, ownerId: user.id, description },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new Error("There is already a community with this name.");
      }

      throw new Error("Unable to create community.");
    }
  }

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

  const userVote = await prisma.commentVote.findUnique({
    where: {
      userId_commentId: {
        userId: user.id,
        commentId: commentId,
      },
    },
    select: { vote: true },
  });

  if (userVote) {
    if (userVote.vote === voteType) {
      // delete the vote
      await prisma.commentVote.delete({
        where: { userId_commentId: { commentId, userId: user.id } },
      });
    } else {
      // update the vote
      const res = await prisma.commentVote.update({
        where: { userId_commentId: { commentId, userId: user.id } },
        data: { vote: { set: voteType } },
      });
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
    pathname: formData.get("pathname"),
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
  const { comment, postId, replyToId, pathname } = res.data;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  console.log("replyToId", typeof replyToId);
  await prisma.comment.create({
    data: {
      postId: Number(postId),
      text: comment,
      replyToId: replyToId ? replyToId : null,
      userId: user.id,
    },
  });

  //is a top-level comment
  revalidatePath(pathname);

  return { status: "success" };
}

export async function updateProfile(data: ProfileFormValues) {
  const res = profileFormSchema.safeParse({
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
  });

  if (!res.success) {
    throw new Error("invalid inputs when updating profile");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const { username, lastName, firstName } = res.data;

  await prisma.user.update({
    where: { id: user.id },
    data: { firstName, lastName, username },
  });

  revalidatePath(`/settings`);
}

const subscribeSchema = z.object({
  userId: z.string(),
  subredditId: z.string(),
});

export async function subscribeToSubreddit(formData: FormData) {
  const res = subscribeSchema.safeParse({
    userId: formData.get("userId"),
    subredditId: formData.get("subredditId"),
  });

  if (!res.success) {
    throw new Error("Invalid user id");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const { subredditId, userId } = res.data;

  await prisma.subscription.create({
    data: { userId: userId, subredditId: subredditId },
  });

  //revalidate
  revalidateTag("isSubscribed");
}

export async function unsubscribeToSubreddit(formData: FormData) {
  const res = subscribeSchema.safeParse({
    userId: formData.get("userId"),
    subredditId: formData.get("subredditId"),
  });

  if (!res.success) {
    throw new Error("Invalid user id");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const { subredditId, userId } = res.data;

  await prisma.subscription.delete({
    where: { userId_subredditId: { userId, subredditId } },
  });

  //revalidate
  revalidateTag("isSubscribed");
}
