"use client";

import { ReactNode } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton({
  children,
}: {
  children: ReactNode;
}) {
  const { pending } = useFormStatus();

  return <Button type="submit">{pending ? "Loading..." : children}</Button>;
}
