"use client";

import { useState } from "react";
import FormSubmitButton from "./FormSubmitButton";
import { useMutation } from "@tanstack/react-query";
import { subscribeToSubreddit, unsubscribeToSubreddit } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SubscriptionForm({
  isSubscribed,
  userId,
  subredditId,
}: {
  isSubscribed: boolean;
  userId?: string;
  subredditId: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  //mutation
  const { mutate, status, error } = useMutation({
    mutationFn: async (formData: FormData) =>
      isSubscribed
        ? unsubscribeToSubreddit(formData)
        : subscribeToSubreddit(formData),
    onError: (e) => {
      //handle error
      if (e instanceof Error) {
        toast({
          title: "An error occurred",
          description: e.message,
          variant: "destructive",
        });
      }
    },
  });

  async function handleSubscription(formData: FormData) {
    if (!userId) {
      router.push(`/api/auth/login`);
      return;
    }
    mutate(formData);
  }

  return (
    <form action={handleSubscription} className="w-full">
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="subredditId" value={subredditId} />
      <FormSubmitButton className="w-full">
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </FormSubmitButton>
    </form>
  );
}
