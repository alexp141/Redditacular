import SettingsForm from "@/components/SettingsForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect(`/api/auth/login`);
  }

  const userInfo = await prisma.user.findUnique({ where: { id: user.id } });

  if (!userInfo) {
    return <p className="text-500-red">Error loading user information.</p>;
  }

  return (
    <div className="max-w-2xl mt-10">
      <SettingsForm userInfo={userInfo} />
    </div>
  );
}
