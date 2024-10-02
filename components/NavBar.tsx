import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "./ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="p-4 bg-orange-500 py-2">
      <div className="flex items-center justify-between">
        <Link href={`/`} className="">
          <img
            src={"/original-logo.png"}
            alt="reddit logo"
            className="max-h-16"
          />
        </Link>
        <SearchBar />
        <div className="flex gap-2">
          {user ? (
            <>
              <div></div>
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
