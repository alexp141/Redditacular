import { PostInfo } from "@/lib/types";
import { MessageSquareIcon, Share } from "lucide-react";
import Link from "next/link";
import PostVoter from "./PostVoter";
import { Separator } from "./ui/separator";
import TipTapPreview from "./TipTapPreview";
import ShareButton from "./ShareButton";
import { calculateDateDistance } from "@/lib/utils";

export default function PostPreview({
  post,
  voteRating = 0,
  userVoteType = "NONE",
  innerRef,
}: {
  post: PostInfo;
  voteRating?: number;
  userVoteType?: string;
  innerRef?: (node?: Element | null) => void;
}) {
  return (
    <div
      className="rounded-md overflow-hidden border shadow p-4 bg-muted"
      ref={innerRef}
    >
      <div className="flex">
        <div className=" w-full">
          <div className="text-xs text-gray-500 flex items-center">
            <Link
              className="text-sm hover:underline underline-offset-2"
              href={`/r/${post.subName}`}
            >
              {`r/${post.subName}`}
            </Link>

            <span className="px-1">*</span>
            <span>Posted by {post.author.username ?? "undefined"}</span>
            <span className="ml-auto text-muted-foreground">
              {calculateDateDistance(post.createdAt, new Date())}
            </span>
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
          <TipTapPreview json={post.content} editable={false} />
          <div className="flex items-center gap-4 mt-4">
            <PostVoter
              initialRating={voteRating}
              userVoteType={userVoteType}
              postId={post.id}
            />
            <Link
              href={`/r/${post.subName}/post/${post.id}`}
              className="flex gap-2 items-center hover:bg-muted p-2 rounded-md"
            >
              <MessageSquareIcon />
              <p>
                {post._count.comments}{" "}
                {post._count.comments === 1 ? "Comment" : "Comments"}
              </p>
            </Link>
            <ShareButton link={`/r/${post.subName}/post/${post.id}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
