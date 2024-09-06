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

export default function SubredditSidebar({ subName }: { subName: string }) {
  return (
    <Card className="rounded-md overflow-hidden">
      <CardHeader className="bg-muted">
        <CardTitle>About r/{`${subName}`}</CardTitle>
        <CardDescription className="text-zinc-500">
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between mt-4">
          <p>Created by</p>
          <p>Owner</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p>Created on</p>
          <p>Date</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p>Members</p>
          <p>4</p>
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
