import { checkIfSubredditExists } from "@/lib/data";
import Link from "next/link";
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

  return (
    <div>
      <Link href={`/r/${params.subName}/create`}></Link>
      subreddit {params.subName}
    </div>
  );
}
