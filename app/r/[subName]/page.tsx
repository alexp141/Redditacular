import { checkIfSubredditExists } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: { subName: string };
}) {
  const subredditExists = await checkIfSubredditExists(params.subName);

  if (!subredditExists) {
    return notFound();
  }

  return <h1>subreddit {params.subName}</h1>;
}
