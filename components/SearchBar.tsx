"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Post, Subreddit } from "@prisma/client";
import Link from "next/link";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { data, refetch, fetchStatus } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (query.length <= 0) return [[], []];
      const response = await fetch(`/api/search?query=${query}`);
      const result: [
        Pick<Subreddit, "name">[],
        Pick<Post, "id" | "title" | "subName">[]
      ] = await response.json();
      return result;
    },
    initialData: () => {
      return [[], []];
    },
  });
  useEffect(() => {
    refetch();
  }, [query, refetch]);
  const handleSearch = debounce((query: string) => {
    setQuery(query);
    console.log("NEW QUERY", query);
  }, 300);
  console.log("data", data);
  return (
    <div className=" gap-2 flex w-full max-w-sm items-center">
      <div className="w-full">
        <Command className="relative overflow-visible">
          <CommandInput
            placeholder="Search Communities..."
            className="w-full "
            onValueChange={(query) => handleSearch(query)}
          />
          <CommandList className="absolute bg-white rounded-b-md top-full border w-full  z-50">
            {fetchStatus !== "fetching" && query.length > 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {fetchStatus === "fetching" && query.length > 0 && (
              <p className="text-center">loading...</p>
            )}
            {data[0].length > 0 && (
              <CommandGroup heading="Subreddits">
                {data[0].map((elem, i) => {
                  return (
                    <Link href={`/r/${elem.name}`} key={i}>
                      <CommandItem>{elem.name}</CommandItem>
                    </Link>
                  );
                })}
              </CommandGroup>
            )}
            {data[1].length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Posts">
                  {data[1].map((elem, i) => {
                    return (
                      <Link href={`/r/${elem.subName}/post/${elem.id}`} key={i}>
                        <CommandItem>{elem.title}</CommandItem>
                      </Link>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
