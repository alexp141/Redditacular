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
import SubscriptionForm from "./SubscriptionForm";
import { format } from "date-fns";

export default async function SubredditSidebar({
  subName,
  userId,
}: {
  subName: string;
  userId?: string;
}) {
  const subredditInfo = await getSubredditInfo(subName);
  if (!subredditInfo) {
    return <p className="text-red-500">error loading Subreddit info...</p>;
  }
  const res = await fetch(
    `${process.env.URL}/api/subreddits/${subredditInfo.id}/isSubscribed?userId=${userId}`,
    { next: { tags: ["isSubscribed"] } }
  );
  const isSubscribed = await res.json();

  return (
    <Card className="rounded-md overflow-hidden shadow-sm">
      <CardHeader className="bg-orange-500">
        <CardTitle>About r/{`${subName}`}</CardTitle>
        <CardDescription className="text-zinc-700">
          {subredditInfo.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between mt-4">
          <p>Created by</p>
          <p>{`${subredditInfo.owner.username}`}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p>Created on</p>
          <p>{format(new Date(subredditInfo.createdAt), "PPP")}</p>
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
      <CardFooter className="flex flex-col justify-between gap-2">
        <Button asChild className="w-full" variant={"orange"}>
          <Link href={`/r/${subName}/create`}>Create Post</Link>
        </Button>
        <SubscriptionForm
          isSubscribed={isSubscribed}
          userId={userId}
          subredditId={subredditInfo.id}
        />
      </CardFooter>
    </Card>
  );
}
