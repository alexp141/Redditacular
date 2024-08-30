import {
  ArrowBigDownIcon,
  ArrowBigUpIcon,
  MessageSquareIcon,
} from "lucide-react";
import Link from "next/link";

export default function PostPreview() {
  return (
    <div className="bg-muted rounded-md overflow-hidden">
      <div className="flex">
        <div className=" flex flex-col items-center p-2">
          <ArrowBigUpIcon />
          <p>0</p>
          <ArrowBigDownIcon />
        </div>
        <div className="bg-slate-300 w-full p-2">
          <div className="text-xs text-gray-500">
            <Link className="text-sm underline underline-offset-2" href={"/"}>
              r/subreddit
            </Link>
            <span className="px-1">*</span>
            <span>
              Posted by <Link href={"/"}>userOne</Link>
            </span>
          </div>
          {/*content*/}
          <div className="h-32 bg-orange-400">content</div>
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
