import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "./ui/button";
import { Command, CommandInput } from "./ui/command";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProfileDropdown from "./ProfileDropdown";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="bg-muted py-4">
      <div className="container flex items-center justify-between">
        <p>logo</p>
        <div className=" gap-2 flex w-full max-w-sm items-center">
          <div className="w-full">
            <Command>
              <CommandInput
                placeholder="Search Communities..."
                className="w-full"
              />
            </Command>
          </div>
          <Button type="button" className="">
            Search
          </Button>
        </div>
        <div className="flex gap-2">
          {user ? (
            <>
              <ProfileDropdown user={user} />
              <Button asChild>
                <LogoutLink>Logout</LogoutLink>
              </Button>
            </>
          ) : (
            <>
              <Button asChild>
                <LoginLink>Sign in</LoginLink>
              </Button>
              <Button asChild>
                <RegisterLink>Register</RegisterLink>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
