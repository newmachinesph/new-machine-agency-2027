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

