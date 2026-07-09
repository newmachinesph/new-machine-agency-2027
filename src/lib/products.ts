import {
  IconAppWindow,
  IconCompass,
  IconDashboard,
  IconGrowth,
  IconLeads,
  IconMail,
  IconRank,
  IconSearch,
  IconSocial,
  IconSplitTest,
  IconTarget,
  IconWebsite,
  type BrandIcon,
} from "@/components/ui/icons";

/** Maps each product's `icon` key to its brand icon component. */
export const productIcons: Record<string, BrandIcon> = {
  social: IconSocial,
  rank: IconRank,
  search: IconSearch,
  leads: IconLeads,
  splittest: IconSplitTest,
  growth: IconGrowth,
  website: IconWebsite,
  appwindow: IconAppWindow,
  mail: IconMail,
  dashboard: IconDashboard,
  compass: IconCompass,
  target: IconTarget,
};

/** Status pill styling, shared across the products index and detail pages. */
export function productBadgeClasses(status: string): string {
  if (status === "Live") return "border-accent bg-accent/10 text-accent-fg";
  if (status === "Beta") return "border-accent text-accent-fg";
  return "border-border text-muted";
}
