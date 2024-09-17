import { PostInfo } from "@/lib/types";
import { MessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { TipTap } from "./TipTap";
import PostVoter from "./PostVoter";
import { Separator } from "./ui/separator";

export default function PostPreview({
  post,
  voteRating = 0,
  userVoteType = "NONE",
}: {
  post: PostInfo;
  voteRating?: number;
  userVoteType?: string;
}) {
  return (
    <div className=" rounded-md overflow-hidden border shadow">
      <div className="flex">
        <PostVoter
          initialRating={voteRating}
          userVoteType={userVoteType}
          postId={post.id}
        />
        <div className=" w-full p-2">
          <div className="text-xs text-gray-500">
            <Link
              className="text-sm hover:underline underline-offset-2"
              href={`r/${post.subName}`}
            >
              {`r/${post.subName}`}
            </Link>

            <span className="px-1">*</span>
            <span>Posted by {post.author.username ?? "undefined"}</span>
          </div>
          <div className="">
            <Link
              href={`/r/${post.subName}/post/${post.id}`}
              className="flex gap-2 items-center w-fit"
            >
              <h2 className="text-3xl font-bold my-2 hover:underline underline-offset-4">
                {post.title}
              </h2>
            </Link>
          </div>
          <Separator />
          <TipTap json={post.content} editable={false} />
          <Separator />
          <div className="p-4">
            <Link
              href={`/r/${post.subName}/post/${post.id}`}
              className="flex gap-2 items-center w-fit"
            >
              <MessageSquareIcon />
              <p>
                {post._count.comments}{" "}
                {post._count.comments === 1 ? "comment" : "comments"}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
