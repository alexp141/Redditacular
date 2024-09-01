"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./db";

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
