import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function page() {
  return (
    <main className=" max-w-5xl mx-auto">
      <form action="">
        <h1 className="text-2xl font-bold mt-4">Create a New Subreddit</h1>
        <Separator className="my-4" />

        <Label htmlFor="title" className="text-lg font-semibold">
          Title
        </Label>
        <p className="text-sm text-muted-foreground">
          Subreddit names cannot be changed.
        </p>
        <div className="relative mt-4">
          <Input type="text" className="pl-6" />
          <p className="absolute left-0 h-full flex items-center top-0 w-8 justify-center text-muted-foreground">
            r/
          </p>
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
