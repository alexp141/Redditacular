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
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
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
        <Link href={`/settings`}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <LogoutLink>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </LogoutLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
