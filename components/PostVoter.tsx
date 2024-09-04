import { ArrowBigDownIcon, ArrowBigUpIcon } from "lucide-react";

export default function PostVoter({
  initialRating = 0,
  userVoteType,
}: {
  initialRating?: number;
  userVoteType: string;
}) {
  return (
    <div className=" flex flex-col items-center p-2">
      <ArrowBigUpIcon />
      <p>{initialRating}</p>
      <ArrowBigDownIcon />
    </div>
  );
}
