import Link from "next/link";
import { TipTap } from "./TipTap";
import PostVoter from "./PostVoter";
import { Prisma } from "@prisma/client";
import PostContent from "./PostContent";

type PostProps = Prisma.PostGetPayload<{
  include: {
    comments: true;
    votes: true;
    author: { select: { username: true } };
  };
}>;

export default function Post({
  post,
  initialRating = 0,
  userVoteType = "NONE",
}: {
  post: PostProps;
  initialRating?: number;
  userVoteType?: string;
}) {
  return (
    <div className="bg-muted rounded-md overflow-hidden">
      <div className="flex">
        <PostVoter
          initialRating={initialRating}
          userVoteType={userVoteType}
          postId={post.id}
          variant="vertical"
        />
        <div className=" w-full p-2">
          <div className="text-xs text-gray-500">
            <Link className="text-sm underline underline-offset-2" href={"/"}>
              {`r/${post.subName}`}
            </Link>
            <span className="px-1">*</span>
            <span>
              Posted by{" "}
              <Link href={"/"} className="hover:underline underline-offset-2">
                {post.author.username ?? "undefined"}
              </Link>
            </span>
          </div>
          <div className="text-2xl font-semibold my-2">
            <Link
              href={`/r/${post.subName}/post/${post.id}`}
              className="flex gap-2 items-center w-fit"
            >
              {post.title}
            </Link>
          </div>

          <PostContent content={post.content} />
        </div>
      </div>
    </div>
  );
}
