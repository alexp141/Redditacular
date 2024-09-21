import CreateSubredditForm from "@/components/CreateSubredditForm";
import FormSubmitButton from "@/components/FormSubmitButton";
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
      <CreateSubredditForm />
    </main>
  );
}
