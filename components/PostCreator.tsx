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
  const [image, setImage] = useState<null | string>(null);

  const formAction = createPost.bind(null, editorJSON);

  return (
    <Tabs defaultValue="editor" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="image/video">Image & Video</TabsTrigger>
      </TabsList>
      <TabsContent value="editor">
        <Card>
          <CardHeader>
            <CardTitle>New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <form action={formAction} className="space-y-1">
              <input type="hidden" name="image" value={image ?? undefined} />
              <input type="hidden" name="subName" value={subName} />
              <Label htmlFor="post-title" className="text-lg">
                Title
              </Label>
              <Input
                id="post-title"
                name="title"
                type="text"
                minLength={2}
                maxLength={24}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </form>
            <TipTap setJson={setEditorJSON} json={editorJSON} />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Submit Post</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="image/video">
        <Card>
          <CardHeader>
            <CardTitle>Upload a File</CardTitle>
            <CardDescription>Files can be a maximum of 4MB</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setImage(res[0].url);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
