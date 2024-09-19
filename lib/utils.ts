import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { formatDistance, subDays } from "date-fns";
import { describe } from "node:test";

export function calculateDateDistance(laterDate: Date, earlierDate: Date) {
  return formatDistance(laterDate, earlierDate, {
    addSuffix: true,
    includeSeconds: true,
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyToClipboard(str: string) {
  await navigator.clipboard.writeText(str);
}

export const siteWideRules = [
  {
    id: 1,
    title: "Remember the Human",
    description:
      "Reddit emphasizes respectful interaction. Harassment, bullying, or promoting hate based on identity or vulnerability are not tolerated. Treat others as you would like to be treated.",
  },
  {
    id: 2,
    title: "Abide by Community-Specific Rules",
    description:
      "Every subreddit (community) may have its own rules. You must respect these in addition to the site-wide rules. Moderators can remove posts and ban users based on these.",
  },
  {
    id: 3,
    title: "No Spam",
    description:
      "Reddit prohibits excessive self-promotion, spammy links, and irrelevant posts. Make sure your contributions are genuine and don’t simply promote external content.",
  },
  {
    id: 4,
    title: "Don’t Break the Law",
    description:
      "Reddit adheres to local laws and prohibits content that promotes illegal activities or violates laws, such as drugs, copyright infringement, or other illegal material.",
  },
  {
    id: 5,
    title: "Respect Privacy",
    description:
      "Posting other people's private or confidential information (also known as doxxing) is strictly prohibited. This includes addresses, financial information, or other personal identifiers.",
  },
  {
    id: 6,
    title: "Do Not Impersonate",
    description:
      "Pretending to be someone else or creating deceptive accounts is against the rules. Authenticity is important.",
  },
  {
    id: 7,
    title: "Follow Reddiquette",
    description:
      "Reddiquette refers to unofficial guidelines, encouraging users to be polite, avoid reposting without credit, and contribute meaningfully to discussions.",
  },
  {
    id: 8,
    title: "Enforcement and Appeals",
    description:
      "Reddit has a report feature to flag rule violations. Additionally, users may be temporarily or permanently banned from Reddit or specific subreddits if they violate these rules. Users can appeal if they believe their ban was unjust.",
  },
];
