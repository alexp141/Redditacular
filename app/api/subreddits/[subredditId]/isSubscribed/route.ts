import prisma from "@/lib/db";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { subredditId: string } }
) {
  const url = new URL(req.url);
  const validationRes = z.string().safeParse(url.searchParams.get("userId"));

  if (!validationRes.success) {
    throw new Error("Invalid userId");
  }
  const userId = validationRes.data;

  if (!userId) {
    return false;
  }

  const res = await prisma.subscription.findUnique({
    where: { userId_subredditId: { userId, subredditId: params.subredditId } },
  });

  if (!res) {
    return Response.json(false);
  }

  return Response.json(true);
}
