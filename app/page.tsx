import Home from "@/components/Home";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div>
      <Home userId={user?.id} />
    </div>
  );
}
