import PostCreator from "@/components/PostCreator";
import { TipTap } from "@/components/TipTap";

export default function Page() {
  return (
    <section className="flex gap-10 max-w-5xl mx-auto mt-10">
      <div className="w-[65%]">
        <PostCreator />
      </div>
      <div className="w-[35%]">section two</div>
    </section>
  );
}
