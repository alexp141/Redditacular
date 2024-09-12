import { getCommentReplies } from "@/lib/data";
import prisma from "@/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";

const commentRepliesSchema = z.object({
  postId: z.coerce.number(),
  commentId: z.string(),
  pageNumber: z.coerce.number(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { commentId: string; postId: string } }
) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const res = commentRepliesSchema.safeParse({
    postId: params.postId,
    commentId: params.commentId,
    pageNumber: searchParams.get("pageNumber"),
  });

  if (!res.success) {
    throw new Error(
      "invalid types when submitted when retrieving comment reply data"
    );
  }

  const { commentId, pageNumber, postId } = res.data;

  const offset = 4 * pageNumber;

  const replies = await prisma.comment.findMany({
    skip: offset,
    take: 4,
    where: {
      postId,
      replyToId: commentId,
    },
    include: {
      author: { select: { username: true, avatar: true } },
      commentVotes: true,
    },
    orderBy: { createdAt: "asc" },
  });
  console.log("server");
  replies.map((reply) => console.log("todate", reply.createdAt.toDateString()));
  return Response.json(replies);
}
