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

export default function PostCreator() {
  const [editorJSON, setEditorJSON] = useState<JSONContent | null>(null);
  const [title, setTitle] = useState("");
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
            <div className="space-y-1">
              <Label htmlFor="post-title" className="text-lg">
                Title
              </Label>
              <Input
                id="post-title"
                type="text"
                minLength={2}
                maxLength={24}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
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
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you will be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Submit Post</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
