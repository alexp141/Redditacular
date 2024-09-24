import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";

const requestSchema = z.string();

export async function GET(req: Request) {
  const url = new URL(req.url);
  //validate input
  const res = requestSchema.safeParse(url.searchParams.get("userId"));

  if (!res.success) {
    throw new Error("Incorrect type");
  }

  //make sure request comes from the correct user
  const userIdParam = res.data;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return Response.json(null);
  }

  if (userIdParam !== user.id) {
    throw new Error("client and server userId's do not match");
  }

  //find subreddits
  const subreddits = await prisma.user.findUnique({
    where: { id: user.id },
    select: { subscripton: { select: { subreddit: true } } },
  });
  console.log("about to return");
  return Response.json(subreddits);
}
