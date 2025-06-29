"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Separator } from "./ui/separator";
import FavoriteStar from "./FavoriteStar";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavoriteSubreddits, getSubscribedSubreddits } from "@/lib/data";

export default function ToolbarClient({ userId }: { userId?: string }) {
  const queryClient = useQueryClient();
  const { data: subscribedSubreddits } = useQuery({
    queryKey: ["subscribedSubreddits"],
    queryFn: async () => getSubscribedSubreddits(userId),
  });
  const { data: favoriteSubreddits, isPending: isPendingFavorites } = useQuery({
    queryKey: ["favoriteSubreddits"],
    queryFn: async () => getFavoriteSubreddits(userId),
  });

  return (
    <Menubar className="border-t-0 bg-muted rounded-none shadow-sm">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-zinc-300 data-[state=open]:bg-zinc-300">
          Profile
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href={`/settings`}>Settings</Link>
          </MenubarItem>
          {userId && (
            <>
              <MenubarSeparator />
              <MenubarItem className="focus:bg-rose-500" asChild>
                <LogoutLink>Logout</LogoutLink>
              </MenubarItem>
            </>
          )}
        </MenubarContent>
      </MenubarMenu>
      <Separator orientation="vertical" className="bg-orange-500" />
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-zinc-300 data-[state=open]:bg-zinc-300 ">
          My Subreddits
        </MenubarTrigger>
        <MenubarContent>
          {subscribedSubreddits?.map((subscription) => {
            return (
              <MenubarItem key={subscription.subredditId} asChild>
                <Link
                  href={`/r/${subscription.subreddit.name}`}
                  className="flex justify-between items-center w-full"
                >
                  <p>{subscription.subreddit.name}</p>
                  <FavoriteStar
                    isFavorite={
                      favoriteSubreddits?.findIndex((elem) => {
                        return elem.subredditId === subscription.subredditId;
                      }) === -1
                        ? false
                        : true
                    }
                    subredditId={subscription.subredditId}
                    subredditName={subscription.subreddit.name}
                  />
                </Link>
              </MenubarItem>
            );
          })}
          {(!subscribedSubreddits || subscribedSubreddits.length === 0) && (
            <p className="text-muted-foreground p-4">
              Your are not currently subscribed to any subreddits.
            </p>
          )}
        </MenubarContent>
      </MenubarMenu>
      <Separator orientation="vertical" className="bg-orange-500" />

      <div className="p-1 flex">
        {isPendingFavorites && <p>Loading...</p>}
        {!isPendingFavorites &&
          favoriteSubreddits &&
          favoriteSubreddits.length === 0 && (
            <p className="text-muted-foreground">
              (Your favorite subreddits will appear here)
            </p>
          )}
        {!isPendingFavorites &&
          favoriteSubreddits?.map((elem) => {
            return (
              <Link
                href={`/r/${elem.name}`}
                key={elem.subredditId}
                className="hover:underline underline-offset-4"
              >
                {elem.name}
              </Link>
            );
          })}
      </div>
    </Menubar>
  );
}
