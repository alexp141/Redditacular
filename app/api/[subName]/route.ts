import prisma from "@/lib/db";
import { sub } from "date-fns";
import { NextResponse } from "next/server";

// Force this route to be dynamic
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  const pageParam = Number(searchParams.get("pageParam"));
  const subName = searchParams.get("subName") ?? undefined;
  const dateType = searchParams.get("type") ?? "";
  console.log("subName", subName);
  let queryData = await prisma.post.findMany({
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
    skip: pageParam,
    take: 3, //take three posts per fetch
    orderBy: {
      id: "desc",
    },
  });

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
