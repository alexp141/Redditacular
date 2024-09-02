import PostCreator from "@/components/PostCreator";

export default function Page({ params }: { params: { subName: string } }) {
  return (
    <section className="flex gap-10 max-w-5xl mx-auto mt-10">
      <div className="w-[65%]">
        <PostCreator subName={params.subName} />
      </div>
      <div className="w-[35%]">section two</div>
    </section>
  );
}
