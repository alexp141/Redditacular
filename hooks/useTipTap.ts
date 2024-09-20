//resusable hook to access the TipTap editor

import { createContext, useContext } from "react";
import { type Editor } from "@tiptap/react";
export const EditorContext = createContext<
  { editor: Editor; editable: boolean } | undefined
>(undefined);

export function useTipTap() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error(
      "The TipTap Editor context was used outside of EditorContext.Provider"
    );
  }

  return context;
}
