import { Skeleton } from "./ui/skeleton";

export default function SkeletonFeed({ count = 5 }: { count?: number }) {
  return (
    <div className="w-full space-y-8">
      {new Array(count).fill(null).map((elem, i) => {
        return (
          <div
            key={i}
            className="border rounded-md border-muted p-4 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-[40%]"></div>

            <ul className="mt-5 space-y-3">
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
