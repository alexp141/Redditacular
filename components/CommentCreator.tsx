"use client";

import { createComment } from "@/lib/actions";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import FormSubmitButton from "./FormSubmitButton";
import { useToast } from "@/hooks/use-toast";

export default function CommentCreator({ postId }: { postId: number }) {
  const { toast } = useToast();
  async function handleSubmit(formData: FormData) {
    const res = await createComment(formData);
    if (res.status === "zodError") {
      toast({ title: "Error: invalid input", description: res.message });
      return;
    }
    toast({ title: "success", description: "Comment Posted" });
  }

  return (
    <div className="bg-muted rounded-md overflow-hidden p-4 space-y-2">
      <form action={handleSubmit} className="space-y-2">
        <input type="hidden" name="postId" value={postId} />
        <Label>Your comment</Label>
        <Textarea
          placeholder="Type your message here"
          className=""
          name="comment"
        />
        <div className="flex justify-end">
          <FormSubmitButton>Post</FormSubmitButton>
        </div>
      </form>
    </div>
  );
}
