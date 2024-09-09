"use client";

import { createComment } from "@/lib/actions";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import FormSubmitButton from "./FormSubmitButton";
import { useToast } from "@/hooks/use-toast";
import { Dispatch, SetStateAction } from "react";

export default function CommentCreator({
  postId,
  replyToId,
  setIsReplying,
}: {
  postId: number;
  replyToId?: string;
  setIsReplying: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  async function handleSubmit(formData: FormData) {
    const res = await createComment(formData);
    if (res.status === "zodError") {
      toast({ title: "Error: invalid input", description: res.message });

      return;
    }
    toast({ title: "success", description: "Comment Posted" });
    setIsReplying(false);
  }

  return (
    <div className="bg-muted rounded-md overflow-hidden p-4 space-y-2">
      <form action={handleSubmit} className="space-y-2">
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="replyToId" value={replyToId} />
        <Label>Your comment</Label>
        <Textarea
          placeholder="Type your message here"
          className=""
          name="comment"
        />
        <div className="flex justify-end">
          <FormSubmitButton>
            {replyToId ? <p>Reply</p> : <p>Post</p>}
          </FormSubmitButton>
        </div>
      </form>
    </div>
  );
}
