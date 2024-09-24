"use client";

import { ReactNode } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export default function FormSubmitButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={cn("", className)}>
      {pending ? "Loading..." : children}
    </Button>
  );
}
