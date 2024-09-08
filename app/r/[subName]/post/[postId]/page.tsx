import CommentCreator from "@/components/CommentCreator";
import CommentSection from "@/components/CommentSection";
import Post from "@/components/Post";
import SubredditSidebar from "@/components/SubredditSidebar";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { subName: string; postId: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const post = await prisma.post.findUnique({
    where: { id: Number(params.postId) },
    include: {
      comments: true,
      votes: true,
      author: { select: { username: true } },
    },
  });

  if (!post || !post.id) {
    return notFound();
  }

  let userVoteType;
  const voteRating = post.votes.reduce((acc, elem) => {
    if (elem.userId === user?.id) {
      userVoteType = elem.vote;
    }

    if (elem.vote === "UPVOTE") {
      return acc + 1;
    } else {
      return acc - 1;
    }
  }, 0);

  return (
    <div className="flex gap-10 mt-10">
      <section className="w-[65%] flex flex-col gap-4">
        <Link href={`/r/${params.subName}`} className="space-x-4 flex my-4">
          <MoveLeftIcon />
          <p className="hover:underline underline-offset-4">
            Back to community
          </p>
        </Link>
        <Post
          post={post}
          initialRating={voteRating}
          userVoteType={userVoteType}
        />
        <CommentCreator postId={post.id} />
        <CommentSection postId={post.id} />
      </section>
      <section className="w-[35%]">
        <SubredditSidebar subName={params.subName} />
      </section>
    </div>
  );
}
