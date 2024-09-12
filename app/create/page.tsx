import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createSubreddit } from "@/lib/actions";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <main className=" max-w-5xl mx-auto">
      <form action={createSubreddit} className="space-y-6">
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
          <Button type="submit">Create Community</Button>
        </div>
      </form>
    </main>
  );
}
