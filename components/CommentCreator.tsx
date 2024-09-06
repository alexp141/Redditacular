import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function CommentCreator({ postId }: { postId: number }) {
  return (
    <div className="bg-muted rounded-md overflow-hidden p-4 space-y-2">
      <form action="">
        <input type="hidden" name="postId" value={postId} />
        <Label>Your comment</Label>
        <Textarea
          placeholder="Type your message here"
          className=""
          name="comment"
        />
        <div className="flex justify-end">
          <Button type="submit">Post</Button>
        </div>
      </form>
    </div>
  );
}
