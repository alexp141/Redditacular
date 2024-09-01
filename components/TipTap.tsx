"use client";
import { Button } from "@/components/ui/button";
import {
  useEditor,
  type Editor,
  EditorContent,
  JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const Menubar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-5 mt-5">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "outline"
        }
      >
        H1
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "outline"
        }
      >
        H2
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "outline"
        }
      >
        H3
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "outline"}
      >
        Bold
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "outline"}
      >
        Italic
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "outline"}
      >
        Strike
      </Button>
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        variant={
          !editor.can().chain().focus().undo().run() ? "outline" : "destructive"
        }
      >
        Undo
      </Button>
    </div>
  );
};

export function TipTap({
  setJson,
  json,
}: {
  setJson: any;
  json: JSONContent | null;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json ?? "<p>Hello world</p>",
    editorProps: {
      attributes: {
        class: "prose",
      },
    },
    onUpdate: (props) => {
      setJson(props.editor.getJSON());
    },
  });
  return (
    <div>
      <Menubar editor={editor} />
      <EditorContent
        editor={editor}
        className="rounded-lg border p-2 min-h-[150px] mt-2"
      />
    </div>
  );
}
