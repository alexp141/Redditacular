import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const cursor = Number(searchParams.get("cursor"));
  const subName = searchParams.get("subName");
  console.log("REQUEST URL", req.url);
  let queryData;

  if (cursor === 1) {
    queryData = await prisma.post.findMany({
      take: Number(process.env.MAXIMUM_POSTS_PER_FEED),
      orderBy: {
        id: "asc",
      },
    });
  } else {
    queryData = await prisma.post.findMany({
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

  return NextResponse.json(queryData);
}
