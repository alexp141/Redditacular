"use client";

import { createSubreddit } from "@/lib/actions";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import FormSubmitButton from "./FormSubmitButton";
import { useToast } from "@/hooks/use-toast";

export default function CreateSubredditForm() {
  const { toast } = useToast();

  async function handleSubmit(formData: FormData) {
    try {
      await createSubreddit(formData);
      toast({
        title: "Success",
        description: "Your new community has been succesfully created!",
      });
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Uh oh! An error occured.",
          description: e.message,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <h1 className="text-2xl font-bold mt-4">Create a New Subreddit</h1>
      <Separator className="my-4" />
      <div>
        <Label htmlFor="title" className="text-lg font-semibold">
          Title
        </Label>
        <p className="text-sm text-muted-foreground">
          Subreddit names cannot be changed.
        </p>

        <div className="relative mt-2">
          <Input
            type="text"
            className="pl-6"
            name="subName"
            required
            minLength={2}
            maxLength={24}
          />
          <p className="absolute left-0 h-full flex items-center top-0 w-8 justify-center text-muted-foreground">
            r/
          </p>
        </div>
      </div>
      <div className="">
        <Label htmlFor="description" className="text-lg font-semibold">
          Description
        </Label>
        <Textarea
          placeholder="Your subreddit description"
          name="description"
          required
        />
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <Button type="button" variant={"secondary"}>
          Cancel
        </Button>
        <FormSubmitButton>Create Community</FormSubmitButton>
      </div>
    </form>
  );
}
