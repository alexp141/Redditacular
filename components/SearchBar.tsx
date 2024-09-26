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
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { Post, Subreddit } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const { data, fetchStatus } = useQuery({
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

  // checks if a click occured outside the command list
  const checkifOutsideClick = useCallback(function (e: MouseEvent) {
    if (listRef.current && !listRef.current.contains(e.target as Node)) {
      closeList();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", checkifOutsideClick);

    //remove listener after unmount
    return () => {
      document.removeEventListener("mousedown", checkifOutsideClick);
    };
  }, [checkifOutsideClick]);

  const handleSearch = useCallback(
    debounce((query: string) => {
      setQuery(query);
      console.log("running");
    }, 300),
    []
  );

  function handleNewInput(query: string) {
    handleSearch(query);
  }

  function closeList() {
    setQuery("");
  }

  return (
    <div className=" gap-2 flex w-full max-w-sm items-center">
      <div className="w-full">
        <Command
          className={cn(
            "relative",
            { "overflow-visible": query !== "" },
            { "overflow-hidden": query === "" }
          )}
        >
          <CommandInput
            placeholder="Search Communities and posts"
            className="w-full border-none"
            onValueChange={(query) => handleNewInput(query)}
          />
          <CommandList className="absolute bg-white rounded-b-md top-full border w-full z-50">
            <div ref={listRef}>
              {fetchStatus !== "fetching" && query.length > 0 && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
              {fetchStatus === "fetching" && query.length > 0 && (
                <p className="text-center">loading...</p>
              )}
              {/* subreddits */}
              {data[0].length > 0 && (
                <CommandGroup heading="Subreddits">
                  {data[0].map((elem, i) => {
                    return (
                      <Link href={`/r/${elem.name}`} key={i}>
                        <CommandItem
                          className="cursor-pointer"
                          onClick={() => {
                            closeList();
                          }}
                        >{`r/${elem.name}`}</CommandItem>
                      </Link>
                    );
                  })}
                </CommandGroup>
              )}
              {/* posts */}
              {data[1].length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Posts">
                    {data[1].map((elem, i) => {
                      return (
                        <Link
                          href={`/r/${elem.subName}/post/${elem.id}`}
                          key={i}
                          onClick={() => {
                            closeList();
                          }}
                        >
                          <CommandItem className="cursor-pointer">
                            {elem.title}
                          </CommandItem>
                        </Link>
                      );
                    })}
                  </CommandGroup>
                </>
              )}
            </div>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
