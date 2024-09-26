"use client";

import { siteWideRules } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function SiteWideRules() {
  return (
    <Card className="rounded-md overflow-hidden border-2 border-orange-500">
      <CardHeader className="bg-orange-500">
        <CardTitle className="flex items-center gap-2">
          <img
            src="/reddit-logo-2436.svg"
            alt="reddit snoo"
            className="max-h-12"
          />
          <p>Site-wide Rules</p>
        </CardTitle>
        <CardDescription className="text-black">
          Rules that must be followed when creating a new post or commenting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {siteWideRules.map((rule) => {
            return (
              <AccordionItem value={rule.title} key={rule.id}>
                <AccordionTrigger>{rule.title}</AccordionTrigger>
                <AccordionContent>{rule.description}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
