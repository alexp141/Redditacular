"use client";

import { Button } from "@/components/ui/button";
import {
  useEditor,
  type Editor as EditorType,
  EditorContent,
} from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { UploadDropzone } from "./uploadthing";
import { cn } from "@/lib/utils";
import { createContext, ReactNode, useContext } from "react";
import { EditorContext, useTipTap } from "@/hooks/useTipTap";

function Menubar() {
  const { editor } = useTipTap();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2 mt-6">
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
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant={editor.isActive("codeBlock") ? "default" : "outline"}
      >
        Code Block
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "default" : "outline"}
      >
        Bullet list
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive("orderedList") ? "default" : "outline"}
      >
        Ordered list
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Upload Image</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload a new image</DialogTitle>
            <DialogDescription>
              Images can be no greater than 4MB
            </DialogDescription>
          </DialogHeader>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              editor.chain().focus().setImage({ src: res[0].url }).run();
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.

              alert(`ERROR! ${error.message}`);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Editor() {
  const { editor, editable } = useTipTap();

  return (
    <EditorContent
      editor={editor}
      className={cn(`p-2 mt-2`, {
        "rounded-lg border min-h-32": editable,
      })}
    />
  );
}
function TipTap({
  setJson,
  json,
  editable = false,
  children,
}: {
  setJson?: any;
  json: any | null; //setting this to any since JsonValue and JSONContent are the same thing but typescript doesn't realize it
  editable?: boolean;
  children: ReactNode;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: json ?? "<p>Hello world</p>",
    editorProps: {
      attributes: {
        class: "prose",
      },
    },
    onUpdate: (props) => {
      setJson(props.editor.getJSON());
    },
    editable,
    immediatelyRender: true, //rendered client side
  });

  return (
    <EditorContext.Provider value={{ editor, editable }}>
      {children}
    </EditorContext.Provider>
  );
}

TipTap.Menubar = Menubar;
TipTap.Editor = Editor;

export { TipTap, useTipTap };
