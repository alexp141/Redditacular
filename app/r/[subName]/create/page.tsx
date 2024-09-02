import PostCreator from "@/components/PostCreator";
import { checkIfSubredditExists } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { subName: string };
}) {
  const subredditExists = await checkIfSubredditExists(params.subName);

  if (!subredditExists) {
    return notFound();
  }

  return (
    <section className="flex gap-10 max-w-5xl mx-auto mt-10">
      <div className="w-[65%]">
        <PostCreator subName={params.subName} />
      </div>
      <div className="w-[35%]">section two</div>
    </section>
  );
}
