"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./db";
import { JSONContent } from "@tiptap/react";
import { UTApi } from "uploadthing/server";

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

  const data = prisma.post.create({
    data: {
      authorId: user.id,
      title,
      subName,
      content: content ?? undefined,
      image: imageString,
    },
  });

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
