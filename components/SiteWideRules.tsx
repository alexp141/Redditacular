"use client";

import { siteWideRules } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function SiteWideRules() {
  return (
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
  );
}
