"use client";

import { useRouter } from "next/navigation";
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

export default function Filters() {
  const router = useRouter();

  function updateSearchParams(filters: object) {
    const params = new URLSearchParams();
    console.log(Object.entries(filters));
    Object.entries(filters).map(([key, value]) => {
      params.set(key, value);
    });
    router.push(`?${params.toString()}`);
  }

  function handleSelection(filterObject: object) {
    updateSearchParams(filterObject);
    console.log("something was selected");
  }

  return (
    <div className="flex gap-2 mb-2">
      {/* //filters: top: day,week,month,year,all-time  new, */}
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
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
