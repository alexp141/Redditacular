import prisma from "@/lib/db";

export async function GET(res: Response) {
  const url = new URL(res.url);

  const query = url.searchParams.get("query");
  if (!query) {
    return new Response("invalid query", { status: 400 });
  }
  //get posts
  //get subreddits

  const [subreddits, posts] = await Promise.all([
    getSubreddits(query),
    getPosts(query),
  ]);
  console.log("SEARCH RESULTS", [subreddits, posts]);
  return Response.json([subreddits, posts]);
}

async function getSubreddits(query: string) {
  const data = await prisma.subreddit.findMany({
    where: {
      name: { startsWith: query, mode: "insensitive" },
    },
    select: { name: true },
    take: 5,
  });

  return data;
}

async function getPosts(query: string) {
  const data = await prisma.post.findMany({
    where: {
      title: { startsWith: query, mode: "insensitive" },
    },
    select: { title: true, id: true, subName: true },
    take: 5,
  });

  return data;
}
