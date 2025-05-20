import Feed from "@/components/Feed";
import { LucideHouse } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import PostFeed from "./PostFeed";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import SiteWideRules from "./SiteWideRules";
import Filters from "./Filters";
import { Suspense } from "react";

// Fallback component to show while loading
function SearchParamsFallback() {
  return <div>Loading search parameters...</div>;
}

export default async function Home({ userId }: { userId?: string }) {
  return (
    <main className="pt-6">
      <h1 className="text-3xl font-semibold">Your Feed</h1>
      <div className="md:grid grid-cols-3 mt-6 gap-x-8">
        {/*  feed */}
        <section className="col-span-2">
          {/* filters */}
          {/* //filters: top: day,week,month,year,all-time | new, */}
          <Suspense fallback={<SearchParamsFallback />}>
            <Filters />
            <PostFeed subName="main" userId={userId} />
          </Suspense>
        </section>
        {/*  subreddit info panel */}
        <section className="hidden md:block col-span-1 space-y-8">
          <div className="rounded-md overflow-hidden">
            <div className="bg-orange-500 flex gap-2 p-6 text-lg font-semibold items-center">
              <img src="/reddit-1.svg" alt="reddit icon" className="max-h-12" />
              <p>Home</p>
            </div>
            <div className="p-6 bg-muted">
              <p className="text-muted-foreground">
                Your personal frontpage. Come here to check in with your
                favorite communities.
              </p>
              <Button asChild variant={"orange"}>
                <Link href={"/create"} className="w-full mt-6">
                  Create Community
                </Link>
              </Button>
            </div>
          </div>
          {/* rules */}
          <SiteWideRules />
        </section>
      </div>
    </main>
  );
}
