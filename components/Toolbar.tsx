import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { StarIcon, StarOff } from "lucide-react";
import { Separator } from "./ui/separator";
import { getSubscribedSubreddits } from "@/lib/data";
import FavoriteStar from "./FavoriteStar";

export default async function Toolbar({ userId }: { userId?: string }) {
  let favoriteSubreddits;

  if (userId) {
    favoriteSubreddits = await getSubscribedSubreddits(userId);
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Profile</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Settings</MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="focus:bg-rose-500">
            <LogoutLink>Logout</LogoutLink>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <Separator orientation="vertical" />
      <MenubarMenu>
        <MenubarTrigger>My Subreddits</MenubarTrigger>
        <MenubarContent>
          {favoriteSubreddits?.map(({ subreddit }) => {
            console.log(subreddit.name);
            return (
              <MenubarItem key={subreddit.id}>
                <p>{subreddit.name}</p>
                <FavoriteStar />
              </MenubarItem>
            );
          })}
          {(!favoriteSubreddits || favoriteSubreddits.length === 0) && (
            <p className="text-muted-foreground p-4">
              Your are not currently subscribed to any subreddits.
            </p>
          )}
        </MenubarContent>
      </MenubarMenu>
      <Separator orientation="vertical" />

      <div className="p-1 flex">
        {favoriteSubreddits?.map(({ subreddit }) => {
          console.log(subreddit.name);
          return <p key={subreddit.id}>{subreddit.name}</p>;
        })}
        {(!favoriteSubreddits || favoriteSubreddits.length === 0) && (
          <p className="text-muted-foreground">
            {`(Your favorite subreddits will appear here)`}
          </p>
        )}
      </div>
    </Menubar>
  );
}
