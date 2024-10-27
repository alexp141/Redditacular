export default function CommentSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="">
      {new Array(count).fill(null).map((elems, i) => {
        return (
          <div className="flex" key={i}>
            <div className="shrink-0">
              <span className="size-12 block bg-gray-200 rounded-full dark:bg-neutral-700"></span>
            </div>

            <div className="ms-4 mt-2 w-full">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700 w-[40]"></div>

              <ul className="mt-5 space-y-3">
                <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
                <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
