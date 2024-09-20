import PostCreator from "@/components/PostCreator";
import SiteWideRules from "@/components/SiteWideRules";
import { checkIfSubredditExists } from "@/lib/data";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { subName: string };
}) {
  const { getUser } = getKindeServerSession();

  const [subredditExists, user] = await Promise.all([
    checkIfSubredditExists(params.subName),
    getUser(),
  ]);

  if (!subredditExists) {
    return notFound();
  }

  if (!user) {
    redirect(`/api/auth/login`);
  }

  return (
    <section className="flex gap-10 max-w-5xl mx-auto mt-10">
      <div className="w-[65%]">
        <PostCreator subName={params.subName} />
      </div>
      <div className="w-[35%]">
        <SiteWideRules />
      </div>
    </section>
  );
}
