import Avatar from "@/components/Avatar";
import PostFeed from "@/components/PostFeed";
import SubredditSidebar from "@/components/SubredditSidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { checkIfSubredditExists } from "@/lib/data";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: { subName: string };
}) {
  const { getUser } = getKindeServerSession();

  const [subredditExists, user] = await Promise.all([
    checkIfSubredditExists(params.subName),
    getUser(),
  ]);

  if (!subredditExists) {
    return notFound();
  }

  return (
    <div className="mt-10">
      <div className="flex mx-auto gap-10">
        <section className="w-[65%]">
          <h1 className="text-5xl font-bold mb-6">r/{params.subName}</h1>
          <PostFeed subName={params.subName} userId={user.id} />
        </section>
        <section className="w-[35%]">
          <SubredditSidebar subName={params.subName} />
        </section>
      </div>
    </div>
  );
}
