import { PostInfo } from "@/lib/types";
import {
  ArrowBigDownIcon,
  ArrowBigUpIcon,
  MessageSquareIcon,
  TicketPercentIcon,
} from "lucide-react";
import Link from "next/link";
import { TipTap } from "./TipTap";
import PostVoter from "./PostVoter";

export default function PostPreview({
  post,
  voteRating,
  userVoteType,
}: {
  post: PostInfo;
  voteRating: number;
  userVoteType: string;
}) {
  return (
    <div className="bg-muted rounded-md overflow-hidden">
      <div className="flex">
        <PostVoter initialRating={voteRating} userVoteType={userVoteType} />
        <div className="bg-slate-300 w-full p-2">
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
          <div className="text-2xl font-semibold my-2">{post.title}</div>
          {/*content*/}
          <TipTap json={post.content} editable={false} />
        </div>
      </div>
      <div className="bg-zinc-500 p-2">
        <Link href={"/"} className="flex gap-2 items-center w-fit">
          <MessageSquareIcon />
          <p>0 comments</p>
        </Link>
      </div>
    </div>
  );
}
