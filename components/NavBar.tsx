import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Command, CommandInput } from "./ui/command";

export default function Navbar() {
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
        <Button type="button">Sign in </Button>
      </div>
    </div>
  );
}
