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
      className="flex gap-2 hover:fill-black hover:text-sky-500 text-xs md:text-base"
      onClick={() => {
        setIsReplying(true);
      }}
    >
      <MessageSquareQuoteIcon className="h-4 w-4 md:h-6 md:w-6" />
      <p>Reply</p>
    </Button>
  );
}
