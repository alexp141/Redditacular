import Feed from "@/components/Feed";
import { LucideHouse } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import PostFeed from "./PostFeed";

export default function Home() {
  return (
    <main className="container pt-6">
      <h1 className="text-3xl font-semibold">Your Feed</h1>
      <div className="grid grid-cols-3 mt-6 gap-x-8">
        {/*  feed */}
        <section className="col-span-2">
          <PostFeed subName="main" />
        </section>
        {/*  subreddit info panel */}
        <section className="col-span-1">
          <div className="rounded-md overflow-hidden">
            <div className="bg-emerald-500 flex gap-2 p-6 text-lg font-semibold items-center">
              <LucideHouse />
              <p>Home</p>
            </div>
            <div className="p-6 bg-muted">
              <p className="text-muted-foreground">
                Your personal frontpage. Come here to check in with your
                favorite communities.
              </p>
              <Button asChild>
                <Link href={"/create"} className="w-full mt-6">
                  Create Community
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
