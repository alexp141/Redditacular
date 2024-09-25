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
    console.log("returning null");
    return Response.json([]);
  }

  //find subreddits
  const data = await prisma.favoriteSubreddit.findMany({
    where: { userId },
    select: { subredditId: true, subreddit: { select: { name: true } } },
  });

  const subreddits = data.map((elem) => {
    return {
      subredditId: elem.subredditId,
      name: elem.subreddit.name,
    };
  });
  console.log("favorite subreddits", subreddits);
  return Response.json(subreddits);
}
