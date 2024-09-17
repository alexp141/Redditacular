"use client";
import { useRef } from "react";
import { TipTap } from "./TipTap";

export default function TipTapPreview({
  json,
  editable,
}: {
  json: any;
  editable: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  console.log(ref.current?.clientHeight);
  return (
    <div className="max-h-48 relative overflow-hidden" ref={ref}>
      <TipTap json={json} editable={editable} />

      <div className="absolute bottom-0 inset-x-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
