import CreateSubredditForm from "@/components/CreateSubredditForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <main className=" max-w-5xl mx-auto">
      <CreateSubredditForm />
    </main>
  );
}
