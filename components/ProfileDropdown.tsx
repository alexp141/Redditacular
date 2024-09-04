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
import Avatar from "./Avatar";
export default function ProfileDropdown({
  user,
}: {
  user: KindeUser<Record<string, any>>;
}) {
  const profilePic = user.picture;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar profilePic={profilePic} />
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
