import prisma from "@/lib/db";
import { sub } from "date-fns";
import { NextResponse } from "next/server";

function subTime(date: Date, type: string = "all-time") {
  if (type === "day") {
    return sub(date, { days: 1 });
  } else if (type === "week") {
    return sub(date, { weeks: 1 });
  } else if (type === "month") {
    return sub(date, { months: 1 });
  } else if (type === "year") {
    return sub(date, { years: 1 });
  } else {
    // Default to "all-time" for any invalid or missing value
    return sub(date, { years: 50 });
  }
}

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const cursor = Number(searchParams.get("cursor"));
  const subName = searchParams.get("subName") ?? undefined;
  const dateType = searchParams.get("type") ?? "";
  let queryData;

  if (cursor === 1) {
    queryData = await prisma.post.findMany({
      where: {
        subName: { equals: subName === "main" ? undefined : subName },
        createdAt: { gte: subTime(new Date(), dateType) },
      },
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
        id: "desc",
      },
    });
  } else {
    queryData = await prisma.post.findMany({
      where: {
        subName: { equals: subName === "main" ? undefined : subName },
        createdAt: { gte: subTime(new Date(), dateType) },
      },

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
        id: "desc",
      },
    });
  }

  // sort by upvotes if needed
  queryData = queryData.map((post) => {
    const voteRating = post.votes.reduce((acc, curr) => {
      if (curr.vote === "UPVOTE") {
        return acc + 1;
      } else {
        return acc - 1;
      }
    }, 0);

    return { ...post, voteRating };
  });
  return NextResponse.json(queryData);
}
