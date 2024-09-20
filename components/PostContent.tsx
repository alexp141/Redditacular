"use client";
import { TipTap } from "./TipTap";

export default function PostContent({ content }: { content: any }) {
  return (
    <TipTap json={content} editable={false}>
      <TipTap.Editor />
    </TipTap>
  );
}
