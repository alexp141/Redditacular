import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ToolbarClient from "./ToolbarClient";

export default async function ToolbarServer() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return <ToolbarClient userId={user?.id} />;
}
