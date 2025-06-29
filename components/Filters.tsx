"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/menubar";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selection, setSelection] = useState(searchParams.get("sort") || "New");

  function updateSearchParams(filters: object) {
    const params = new URLSearchParams();
    Object.entries(filters).map(([key, value]) => {
      params.set(key, value);
    });
    router.push(`?${params.toString()}`);
  }

  function handleSelection(filterObject: { sort: string; type?: string }) {
    updateSearchParams(filterObject);
    setSelection((curr) => {
      if (filterObject.sort === "top") {
        if (filterObject.type === "all-time") {
          return `Top of all time`;
        }
        return `Top of the ${filterObject.type}`;
      }
      return "New";
    });
  }

  return (
    <div className="flex gap-2 mb-2">
      {/* //filters: top: day,week,month,year,all-time  new, */}
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            {selection} <ChevronDown />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={() => handleSelection({ sort: "new" })}>
              New
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Top</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  onSelect={() => handleSelection({ sort: "top", type: "day" })}
                >
                  Day
                </MenubarItem>
                <MenubarItem
                  onSelect={() =>
                    handleSelection({ sort: "top", type: "week" })
                  }
                >
                  Week
                </MenubarItem>
                <MenubarItem
                  onSelect={() =>
                    handleSelection({ sort: "top", type: "month" })
                  }
                >
                  Month
                </MenubarItem>
                <MenubarItem
                  onSelect={() =>
                    handleSelection({ sort: "top", type: "year" })
                  }
                >
                  Year
                </MenubarItem>
                <MenubarItem
                  onSelect={() =>
                    handleSelection({ sort: "top", type: "all-time" })
                  }
                >
                  All Time
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
