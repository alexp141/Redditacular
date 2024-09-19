"use client";

import { createComment } from "@/lib/actions";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import FormSubmitButton from "./FormSubmitButton";
import { useToast } from "@/hooks/use-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export default function CommentCreator({
  postId,
  replyToId,
  setIsReplying,
  commentId,
}: {
  postId: number;
  replyToId?: string;
  setIsReplying?: Dispatch<SetStateAction<boolean>>;
  commentId?: string;
}) {
  const { toast } = useToast();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  async function handleSubmit(formData: FormData) {
    const res = await createComment(formData);
    if (res.status === "zodError") {
      toast({ title: "Error: invalid input", description: res.message });

      return;
    }
    console.log("invalidate", commentId);
    queryClient.invalidateQueries({ queryKey: ["comment-replies", replyToId] });
    toast({ title: "success", description: "Comment Posted" });
    setComment("");
    if (setIsReplying) setIsReplying(false);
  }

  return (
    <div className="bg-muted rounded-md overflow-hidden p-4 space-y-2">
      <form action={handleSubmit} className="space-y-2">
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="replyToId" value={replyToId} />
        <input type="hidden" name="pathname" value={pathname} />
        <Label>Your comment</Label>
        <Textarea
          placeholder="Type your message here"
          className=""
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
