import { getComments } from "@/lib/data";

export default async function CommentSection({ postId }: { postId: number }) {
  await getComments(postId);

  return <div className=""></div>;
}
