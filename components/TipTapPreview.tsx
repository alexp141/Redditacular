"use client";
import { TipTap } from "./TipTap";
import { useElementSize } from "@mantine/hooks";

export default function TipTapPreview({
  json,
  editable,
}: {
  json: any;
  editable: boolean;
}) {
  const { ref, width, height } = useElementSize();

  return (
    <div className="max-h-72 relative overflow-clip" ref={ref}>
      <TipTap json={json} editable={editable}>
        <TipTap.Editor />
      </TipTap>

      {height === 288 && (
        <div className="absolute bottom-0 inset-x-0 h-24 w-full bg-gradient-to-t from-muted to-transparent"></div>
      )}
    </div>
  );
}
