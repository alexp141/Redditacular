"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TipTap } from "./TipTap";
import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import { UploadDropzone } from "./uploadthing";
import { createPost } from "@/lib/actions";

export default function PostCreator({ subName }: { subName: string }) {
  const [editorJSON, setEditorJSON] = useState<JSONContent | null>(null);
  const [title, setTitle] = useState("");

  const formAction = createPost.bind(
    null,
    JSON.parse(JSON.stringify(editorJSON))
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <form action={formAction} className="space-y-1" id="createPostform">
          <input type="hidden" name="subName" value={subName} />
          <Label htmlFor="post-title" className="text-lg">
            Title
          </Label>
          <Input
            id="post-title"
            name="title"
            type="text"
            required
            minLength={2}
            maxLength={24}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </form>
        <TipTap
          setJson={setEditorJSON}
          json={editorJSON}
        />
        <CardFooter className="flex justify-end">
          <Button type="submit" form="createPostform">
            Submit Post
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
