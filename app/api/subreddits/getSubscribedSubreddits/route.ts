import prisma from "@/lib/db";
import { z } from "zod";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const validation = z.string().safeParse(url.searchParams.get("userId"));
  if (!validation.success) {
    throw new Error("invalid user id");
  }

  const userId = validation.data;

  if (!userId) {
    return Response.json(null);
  }

  //find subreddits
  const subreddits = await prisma.subscription.findMany({
    where: { userId },
    include: {
      subreddit: {
        select: { name: true },
      },
    },
  });

  return Response.json(subreddits);
}
