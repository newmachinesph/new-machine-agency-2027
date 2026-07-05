import services from "@/content/services.json";
import {
  IconBrandMark,
  IconCompass,
  IconSearch,
  IconWebsite,
  IconLanding,
  IconCorporate,
  IconAppWindow,
  IconMobile,
  IconSocial,
  IconLeads,
  IconTarget,
  IconRank,
  IconMail,
  IconAIAgent,
  IconDashboard,
  IconSplitTest,
  IconHelm,
  type BrandIcon,
} from "@/components/ui/icons";

export type Service = (typeof services)[number];

/** Services grouped by lifecycle stage, preserving first-seen order in the JSON. */
export const stageGroups: { stage: string; services: Service[] }[] = (() => {
  const order: string[] = [];
  const byStage = new Map<string, Service[]>();
  for (const service of services) {
    if (!byStage.has(service.stage)) {
      order.push(service.stage);
      byStage.set(service.stage, []);
    }
    byStage.get(service.stage)!.push(service);
  }
  return order.map((stage) => ({ stage, services: byStage.get(stage)! }));
})();

/** Unique lifecycle stages in order — e.g. for footer/nav column headings. */
export const stages: string[] = stageGroups.map((group) => group.stage);

/** Maps each service's `icon` key to its brand icon component. */
export const serviceIcons: Record<string, BrandIcon> = {
  brandmark: IconBrandMark,
  compass: IconCompass,
  search: IconSearch,
  monitor: IconWebsite,
  zap: IconLanding,
  building: IconCorporate,
  appwindow: IconAppWindow,
  mobile: IconMobile,
  share: IconSocial,
  magnet: IconLeads,
  target: IconTarget,
  rank: IconRank,
  mail: IconMail,
  aiagent: IconAIAgent,
  dashboard: IconDashboard,
  splittest: IconSplitTest,
  helm: IconHelm,
};
