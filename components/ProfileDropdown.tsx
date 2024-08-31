import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
export default function ProfileDropdown({
  user,
}: {
  user: KindeUser<Record<string, any>>;
}) {
  const profilePic = user.picture;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-10 h-full rounded-full overflow-hidden">
          <img src={profilePic ?? "/pfpfallback.png"} alt="avatar" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/users/${user.username}`}>Profile</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
