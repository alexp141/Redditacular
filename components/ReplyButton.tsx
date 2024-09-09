"use client";

import { MessageSquareQuote, MessageSquareQuoteIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useState } from "react";

export default function ReplyButton({
  setIsReplying,
}: {
  setIsReplying: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Button
      type="button"
      variant={"ghost"}
      className="flex gap-2 hover:fill-black hover:text-sky-500"
      onClick={() => {
        setIsReplying(true);
      }}
    >
      <MessageSquareQuoteIcon className="h-6 w-6" />
      <p>Reply</p>
    </Button>
  );
}
