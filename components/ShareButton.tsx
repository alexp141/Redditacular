"use client";

import { copyToClipboard } from "@/lib/utils";
import { Button } from "./ui/button";
import { Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ShareButton({ link }: { link: string }) {
  const { toast } = useToast();
  return (
    <Button
      variant={"outline"}
      onClick={async () => {
        try {
          await copyToClipboard(link);
          toast({ title: "Link copied to clipboard" });
        } catch (e) {
          toast({
            title: "Uh oh, something went wrong!",
            description: "Unable to copy link to clipboard",
            variant: "destructive",
          });
        }
      }}
      className="flex gap-1 items-center justify-center border-none"
    >
      <Share />
      <p>Share</p>
    </Button>
  );
}
