"use client";
import { useEffect, useRef, useState } from "react";
import { TipTap } from "./TipTap";

export default function TipTapPreview({
  json,
  editable,
}: {
  json: any;
  editable: boolean;
}) {
  return (
    <div className="h-40 relative overflow-clip">
      <TipTap json={json} editable={editable}>
        <TipTap.Editor />
      </TipTap>

      <div className="absolute bottom-0 inset-x-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
