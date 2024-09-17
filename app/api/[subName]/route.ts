import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const cursor = Number(searchParams.get("cursor"));
  const subName = searchParams.get("subName") ?? undefined;
  let queryData;

  if (cursor === 1) {
    queryData = await prisma.post.findMany({
      where: { subName: { equals: subName === "main" ? undefined : subName } },
      include: {
        author: { select: { username: true } },
        votes: {
          select: {
            userId: true,
            vote: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
      take: Number(process.env.MAXIMUM_POSTS_PER_FEED),
      orderBy: {
        id: "asc",
      },
    });
  } else {
    queryData = await prisma.post.findMany({
      where: { subName: { equals: subName === "main" ? undefined : subName } },
      include: {
        author: { select: { username: true } },
        votes: {
          select: {
            userId: true,
            vote: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
      skip: 1,
      take: Number(process.env.MAXIMUM_POSTS_PER_FEED),
      cursor: {
        id: cursor,
      },
      orderBy: {
        id: "asc",
      },
    });
  }
  console.log(
    "query data",
    queryData.map((elem) => elem.votes)
  );
  return NextResponse.json(queryData);
}
