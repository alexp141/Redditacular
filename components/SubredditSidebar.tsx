import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { getSubredditInfo } from "@/lib/data";

export default async function SubredditSidebar({
  subName,
}: {
  subName: string;
}) {
  const subredditInfo = await getSubredditInfo(subName);

  if (!subredditInfo) {
    return <p className="text-red-500">error loading Subreddit info...</p>;
  }

  return (
    <Card className="rounded-md overflow-hidden">
      <CardHeader className="bg-muted">
        <CardTitle>About r/{`${subName}`}</CardTitle>
        <CardDescription className="text-zinc-500">Description</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between mt-4">
          <p>Created by</p>
          <p>{`${subredditInfo.owner.username}`}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p>Created on</p>
          <p>{new Date(subredditInfo.createdAt).toDateString()}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p>Members</p>
          <p>{subredditInfo._count.subscribers + 1}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p>Post Count</p>
          <p>{subredditInfo._count.posts}</p>
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild className="w-full">
          <Link href={`/r/${subName}/create`}>Create Post</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
